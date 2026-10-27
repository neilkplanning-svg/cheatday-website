/** Local preview of the built site: `npm run serve` → http://localhost:5173 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './lib/static-server.mjs';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 5173);
await serve(dist, port);
console.log(`CheatDay → http://localhost:${port}`);
