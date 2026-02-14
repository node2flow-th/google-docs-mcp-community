/**
 * Shared MCP Server — used by both Node.js (index.ts) and CF Worker (worker.ts)
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { DocsClient } from './docs-client.js';
import { TOOLS } from './tools.js';

export interface DocsMcpConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
  client: DocsClient
) {
  switch (toolName) {
    // ========== Document ==========
    case 'gdoc_create':
      return client.createDocument({
        title: args.title as string,
      });
    case 'gdoc_get':
      return client.getDocument({
        documentId: args.document_id as string,
        suggestionsViewMode: args.suggestions_view_mode as string | undefined,
      });

    // ========== Content ==========
    case 'gdoc_insert_text':
      return client.insertText({
        documentId: args.document_id as string,
        text: args.text as string,
        index: args.index as number,
        segmentId: args.segment_id as string | undefined,
      });
    case 'gdoc_delete_content':
      return client.deleteContent({
        documentId: args.document_id as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
      });
    case 'gdoc_replace_all_text':
      return client.replaceAllText({
        documentId: args.document_id as string,
        searchText: args.search_text as string,
        replaceText: args.replace_text as string,
        matchCase: args.match_case as boolean | undefined,
      });
    case 'gdoc_insert_inline_image':
      return client.insertInlineImage({
        documentId: args.document_id as string,
        uri: args.uri as string,
        index: args.index as number,
        segmentId: args.segment_id as string | undefined,
        widthMagnitude: args.width_magnitude as number | undefined,
        heightMagnitude: args.height_magnitude as number | undefined,
        widthUnit: args.width_unit as string | undefined,
        heightUnit: args.height_unit as string | undefined,
      });
    case 'gdoc_insert_page_break':
      return client.insertPageBreak({
        documentId: args.document_id as string,
        index: args.index as number,
        segmentId: args.segment_id as string | undefined,
      });

    // ========== Text Formatting ==========
    case 'gdoc_update_text_style':
      return client.updateTextStyle({
        documentId: args.document_id as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
        bold: args.bold as boolean | undefined,
        italic: args.italic as boolean | undefined,
        underline: args.underline as boolean | undefined,
        strikethrough: args.strikethrough as boolean | undefined,
        fontSize: args.font_size as number | undefined,
        fontFamily: args.font_family as string | undefined,
        foregroundColorRed: args.foreground_color_red as number | undefined,
        foregroundColorGreen: args.foreground_color_green as number | undefined,
        foregroundColorBlue: args.foreground_color_blue as number | undefined,
        backgroundColorRed: args.background_color_red as number | undefined,
        backgroundColorGreen: args.background_color_green as number | undefined,
        backgroundColorBlue: args.background_color_blue as number | undefined,
        linkUrl: args.link_url as string | undefined,
        baselineOffset: args.baseline_offset as string | undefined,
        smallCaps: args.small_caps as boolean | undefined,
      });
    case 'gdoc_update_paragraph_style':
      return client.updateParagraphStyle({
        documentId: args.document_id as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
        namedStyleType: args.named_style_type as string | undefined,
        alignment: args.alignment as string | undefined,
        lineSpacing: args.line_spacing as number | undefined,
        spaceAboveMagnitude: args.space_above_magnitude as number | undefined,
        spaceBelowMagnitude: args.space_below_magnitude as number | undefined,
        indentFirstLineMagnitude: args.indent_first_line_magnitude as number | undefined,
        indentStartMagnitude: args.indent_start_magnitude as number | undefined,
        indentEndMagnitude: args.indent_end_magnitude as number | undefined,
        direction: args.direction as string | undefined,
        headingId: args.heading_id as string | undefined,
      });

    // ========== Lists ==========
    case 'gdoc_create_bullets':
      return client.createBullets({
        documentId: args.document_id as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
        bulletPreset: args.bullet_preset as string,
      });
    case 'gdoc_delete_bullets':
      return client.deleteBullets({
        documentId: args.document_id as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
      });

    // ========== Tables ==========
    case 'gdoc_insert_table':
      return client.insertTable({
        documentId: args.document_id as string,
        rows: args.rows as number,
        columns: args.columns as number,
        index: args.index as number,
        segmentId: args.segment_id as string | undefined,
      });
    case 'gdoc_insert_table_row':
      return client.insertTableRow({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
        insertBelow: args.insert_below as boolean,
      });
    case 'gdoc_insert_table_column':
      return client.insertTableColumn({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
        insertRight: args.insert_right as boolean,
      });
    case 'gdoc_delete_table_row':
      return client.deleteTableRow({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
      });
    case 'gdoc_delete_table_column':
      return client.deleteTableColumn({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
      });
    case 'gdoc_merge_table_cells':
      return client.mergeTableCells({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
        rowSpan: args.row_span as number,
        columnSpan: args.column_span as number,
      });
    case 'gdoc_unmerge_table_cells':
      return client.unmergeTableCells({
        documentId: args.document_id as string,
        tableStartIndex: args.table_start_index as number,
        rowIndex: args.row_index as number,
        columnIndex: args.column_index as number,
        rowSpan: args.row_span as number,
        columnSpan: args.column_span as number,
      });

    // ========== Headers & Footers ==========
    case 'gdoc_create_header':
      return client.createHeader({
        documentId: args.document_id as string,
        type: args.type as string,
        sectionBreakIndex: args.section_break_index as number | undefined,
      });
    case 'gdoc_create_footer':
      return client.createFooter({
        documentId: args.document_id as string,
        type: args.type as string,
        sectionBreakIndex: args.section_break_index as number | undefined,
      });
    case 'gdoc_delete_header':
      return client.deleteHeader({
        documentId: args.document_id as string,
        headerId: args.header_id as string,
      });
    case 'gdoc_delete_footer':
      return client.deleteFooter({
        documentId: args.document_id as string,
        footerId: args.footer_id as string,
      });

    // ========== Sections & Named Ranges ==========
    case 'gdoc_insert_section_break':
      return client.insertSectionBreak({
        documentId: args.document_id as string,
        index: args.index as number,
        sectionType: args.section_type as string,
        segmentId: args.segment_id as string | undefined,
      });
    case 'gdoc_create_named_range':
      return client.createNamedRange({
        documentId: args.document_id as string,
        name: args.name as string,
        startIndex: args.start_index as number,
        endIndex: args.end_index as number,
        segmentId: args.segment_id as string | undefined,
      });
    case 'gdoc_delete_named_range':
      return client.deleteNamedRange({
        documentId: args.document_id as string,
        namedRangeId: args.named_range_id as string | undefined,
        name: args.name as string | undefined,
      });

    // ========== Advanced ==========
    case 'gdoc_batch_update':
      return client.batchUpdate({
        documentId: args.document_id as string,
        requests: args.requests as Record<string, unknown>[],
      });

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

export function createServer(config?: DocsMcpConfig) {
  const server = new McpServer({
    name: 'google-docs-mcp',
    version: '1.0.0',
  });

  let client: DocsClient | null = null;

  for (const tool of TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema as any,
        annotations: tool.annotations,
      },
      async (args: Record<string, unknown>) => {
        const clientId =
          config?.clientId ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_ID as string;
        const clientSecret =
          config?.clientSecret ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_SECRET as string;
        const refreshToken =
          config?.refreshToken ||
          (args as Record<string, unknown>).GOOGLE_REFRESH_TOKEN as string;

        if (!clientId || !clientSecret || !refreshToken) {
          return {
            content: [{ type: 'text' as const, text: 'Error: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are all required.' }],
            isError: true,
          };
        }

        if (!client || config?.clientId !== clientId) {
          client = new DocsClient({ clientId, clientSecret, refreshToken });
        }

        try {
          const result = await handleToolCall(tool.name, args, client);
          return {
            content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
            isError: false,
          };
        } catch (error) {
          return {
            content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
          };
        }
      }
    );
  }

  // Register prompts
  server.prompt(
    'read-and-navigate',
    'Guide for reading document content and navigating the structure',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Docs content assistant.',
            '',
            'Reading documents:',
            '1. **Get document** — gdoc_get returns full content structure with indices',
            '2. **Body content** — document.body.content contains paragraphs, tables, sections',
            '3. **Text** — paragraph.elements[].textRun.content has the actual text',
            '4. **Headers/Footers** — document.headers/footers keyed by ID',
            '5. **Named ranges** — document.namedRanges for bookmarked sections',
            '',
            'Index system:',
            '- Every character has an index position (0-based)',
            '- Body content starts at index 1',
            '- Use gdoc_get to find exact indices before editing',
            '- Indices change after insertions/deletions',
            '',
            'Tips:',
            '- Always gdoc_get first to get current indices',
            '- When making multiple edits, work from end to start (higher indices first)',
            '- Use segment_id to target headers/footers instead of body',
          ].join('\n'),
        },
      }],
    }),
  );

  server.prompt(
    'write-and-format',
    'Guide for writing content, formatting text, and managing document structure',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Docs formatting assistant.',
            '',
            'Writing content:',
            '1. **Insert text** — gdoc_insert_text at a specific index',
            '2. **Delete content** — gdoc_delete_content with start/end indices',
            '3. **Replace text** — gdoc_replace_all_text for find & replace',
            '4. **Insert image** — gdoc_insert_inline_image with a public URL',
            '5. **Page breaks** — gdoc_insert_page_break',
            '',
            'Formatting:',
            '1. **Text style** — gdoc_update_text_style: bold, italic, font, colors, links',
            '2. **Paragraph style** — gdoc_update_paragraph_style: alignment, spacing, headings',
            '3. **Lists** — gdoc_create_bullets / gdoc_delete_bullets',
            '',
            'Document structure:',
            '1. **Tables** — gdoc_insert_table, then add/delete rows and columns',
            '2. **Headers/Footers** — gdoc_create_header/footer, then insert text with segment_id',
            '3. **Sections** — gdoc_insert_section_break for multi-section layouts',
            '4. **Named ranges** — gdoc_create_named_range to bookmark content',
            '',
            'Important: When editing, process changes from END to START of document.',
            'This prevents index shifts from invalidating subsequent operations.',
          ].join('\n'),
        },
      }],
    }),
  );

  // Register resource
  server.resource(
    'server-info',
    'google-docs://server-info',
    {
      description: 'Connection status and available tools for this Google Docs MCP server',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [{
        uri: 'google-docs://server-info',
        mimeType: 'application/json',
        text: JSON.stringify({
          name: 'google-docs-mcp',
          version: '1.0.0',
          connected: !!config,
          has_oauth: !!(config?.clientId),
          tools_available: TOOLS.length,
          tool_categories: {
            document: 2,
            content: 5,
            text_formatting: 2,
            lists: 2,
            tables: 7,
            headers_footers: 4,
            sections_named_ranges: 3,
            advanced: 1,
          },
        }, null, 2),
      }],
    }),
  );

  // Override tools/list handler to return raw JSON Schema with property descriptions
  (server as any).server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: TOOLS.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
    })),
  }));

  return server;
}
