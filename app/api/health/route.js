import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

async function check() {
   try {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SECRET;
      if (!url || !key) return { ok: false, reason: 'missing env vars' };

      const supabase = createClient(url, key);
      const { error } = await supabase.from('products').select('id').limit(1);
      if (error) return { ok: false, reason: error.message };

      return { ok: true };
   } catch (e) {
      return {
         ok: false,
         reason: e instanceof Error ? e.message : 'unknown error',
      };
   }
}

export async function GET() {
   const result = await check();
   return Response.json(result, { status: result.ok ? 200 : 503 });
}

export async function HEAD() {
   const result = await check();
   return new Response(null, { status: result.ok ? 200 : 503 });
}
