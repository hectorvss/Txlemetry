export const MCP_INSTALL_COMMAND = `claude mcp add --transport http txlemetry ${typeof window !== 'undefined' ? window.location.origin : 'https://app.txlemetry.com'}/mcp`
