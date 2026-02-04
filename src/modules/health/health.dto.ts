import z from '../../shared/libs/zod.lib.js';

export const healthResponseDTO = z
  .object({
    uptime: z.number().describe('Uptime of the server in seconds'),

    database: z.enum(['connected', 'disconnected']).describe('Database connection status'),

    version: z.string().describe('Node.js version'),
  })
  .describe('CheckHealthResponseDTO');
