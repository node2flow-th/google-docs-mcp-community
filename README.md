# @node2flow/google-docs-mcp

[![smithery badge](https://smithery.ai/badge/node2flow/google-docs)](https://smithery.ai/server/node2flow/google-docs)
[![npm version](https://img.shields.io/npm/v/@node2flow/google-docs-mcp.svg)](https://www.npmjs.com/package/@node2flow/google-docs-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for **Google Docs** — create, read, edit, format, and manage documents through 26 tools via the Model Context Protocol.

## Quick Start

### Claude Desktop / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "@node2flow/google-docs-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-refresh-token"
      }
    }
  }
}
```

### HTTP Mode

```bash
GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=xxx GOOGLE_REFRESH_TOKEN=xxx npx @node2flow/google-docs-mcp --http
```

MCP endpoint: `http://localhost:3000/mcp`

### Cloudflare Worker

Available at: `https://google-docs-mcp-community.node2flow.net/mcp`

```
POST https://google-docs-mcp-community.node2flow.net/mcp?GOOGLE_CLIENT_ID=xxx&GOOGLE_CLIENT_SECRET=xxx&GOOGLE_REFRESH_TOKEN=xxx
```

---

## Tools (26)

### Document (2)

| Tool | Description |
|------|-------------|
| `gdoc_create` | Create a new document with a title |
| `gdoc_get` | Get document content, structure, headers, footers |

### Content (5)

| Tool | Description |
|------|-------------|
| `gdoc_insert_text` | Insert text at a specific position |
| `gdoc_delete_content` | Delete content in a range |
| `gdoc_replace_all_text` | Find and replace all occurrences |
| `gdoc_insert_inline_image` | Insert image from URL |
| `gdoc_insert_page_break` | Insert a page break |

### Text Formatting (2)

| Tool | Description |
|------|-------------|
| `gdoc_update_text_style` | Bold, italic, underline, font, colors, links |
| `gdoc_update_paragraph_style` | Alignment, spacing, headings, indentation |

### Lists (2)

| Tool | Description |
|------|-------------|
| `gdoc_create_bullets` | Create bulleted or numbered lists |
| `gdoc_delete_bullets` | Remove bullets from paragraphs |

### Tables (7)

| Tool | Description |
|------|-------------|
| `gdoc_insert_table` | Insert a new table |
| `gdoc_insert_table_row` | Add a row to a table |
| `gdoc_insert_table_column` | Add a column to a table |
| `gdoc_delete_table_row` | Remove a table row |
| `gdoc_delete_table_column` | Remove a table column |
| `gdoc_merge_table_cells` | Merge cells in a table |
| `gdoc_unmerge_table_cells` | Unmerge previously merged cells |

### Headers & Footers (4)

| Tool | Description |
|------|-------------|
| `gdoc_create_header` | Create a document header |
| `gdoc_create_footer` | Create a document footer |
| `gdoc_delete_header` | Delete a header |
| `gdoc_delete_footer` | Delete a footer |

### Sections & Named Ranges (3)

| Tool | Description |
|------|-------------|
| `gdoc_insert_section_break` | Insert a section break (next page or continuous) |
| `gdoc_create_named_range` | Create a named range to bookmark content |
| `gdoc_delete_named_range` | Delete a named range (keeps the content) |

### Advanced (1)

| Tool | Description |
|------|-------------|
| `gdoc_batch_update` | Raw batchUpdate for any combination of operations |

---

## Index System

Google Docs uses 0-based character indices:

```
Index 0    → Document root (not usable for content)
Index 1    → Start of body content
Index N    → End of body (from gdoc_get response)
```

**Important**: Always call `gdoc_get` first to find current indices. When making multiple edits, process from **end to start** to avoid index shifts.

---

## Configuration

| Parameter | Required | Description |
|-----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | OAuth 2.0 Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth 2.0 Client Secret |
| `GOOGLE_REFRESH_TOKEN` | Yes | Refresh token (obtained via OAuth consent flow) |

### Getting Your Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Google Docs API**
3. Create **OAuth 2.0 Client ID** (Desktop app type)
4. Use the [OAuth Playground](https://developers.google.com/oauthplayground/) or your app to get a refresh token with scope `https://www.googleapis.com/auth/documents`

### OAuth Scopes

| Scope | Access |
|-------|--------|
| `documents` | Full read/write access |
| `documents.readonly` | Read-only access |

---

## License

MIT
