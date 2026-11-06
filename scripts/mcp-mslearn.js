/**
 * mcp-mslearn.js — Client for Official Microsoft Learn MCP Server (https://learn.microsoft.com/api/mcp)
 * Supports both CLI usage and module import for server.js proxy
 */

const MCP_ENDPOINT = 'https://learn.microsoft.com/api/mcp';

function parseSseJson(sseText) {
  const lines = String(sseText || '').split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith('data:')) {
      const jsonPart = line.slice(5).trim();
      if (jsonPart) {
        try {
          return JSON.parse(jsonPart);
        } catch (e) {
          // continue
        }
      }
    }
  }
  try {
    return JSON.parse(sseText);
  } catch (e) {
    return null;
  }
}

async function callMcpTool(toolName, args) {
  // 1. Initialize session
  const initRes = await fetch(MCP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'ms-student-platform', version: '2.0.0' }
      }
    })
  });

  const sessionId = initRes.headers.get('mcp-session-id');
  await initRes.text();

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream'
  };
  if (sessionId) {
    headers['mcp-session-id'] = sessionId;
  }

  // 2. Call requested tool
  const toolRes = await fetch(MCP_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    })
  });

  const rawText = await toolRes.text();
  const parsed = parseSseJson(rawText);

  if (parsed && parsed.result) {
    // Extract structuredContent or text content from MCP tool response
    if (parsed.result.structuredContent) {
      return parsed.result.structuredContent;
    }
    if (Array.isArray(parsed.result.content)) {
      const textBlocks = parsed.result.content
        .filter((c) => c.type === 'text')
        .map((c) => c.text)
        .join('\n');
      try {
        return JSON.parse(textBlocks);
      } catch (_) {
        return { markdown: textBlocks };
      }
    }
    return parsed.result;
  }
  return { raw: rawText };
}

module.exports = {
  callMcpTool
};

// CLI runner when executed directly
if (require.main === module) {
  const [, , cmd, arg1, arg2] = process.argv;
  (async () => {
    try {
      if (cmd === 'search') {
        const res = await callMcpTool('microsoft_docs_search', { query: arg1 || 'Microsoft Fabric' });
        console.log(JSON.stringify(res, null, 2));
      } else if (cmd === 'code') {
        const params = { query: arg1 || 'DeltaTable merge' };
        if (arg2) params.language = arg2;
        const res = await callMcpTool('microsoft_code_sample_search', params);
        console.log(JSON.stringify(res, null, 2));
      } else if (cmd === 'fetch') {
        const res = await callMcpTool('microsoft_docs_fetch', { url: arg1 });
        console.log(JSON.stringify(res, null, 2));
      } else {
        console.log('Usage: node scripts/mcp-mslearn.js <search|code|fetch> <query_or_url> [language]');
      }
    } catch (err) {
      console.error('MCP Error:', err);
      process.exit(1);
    }
  })();
}
