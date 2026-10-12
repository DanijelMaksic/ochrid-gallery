import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // prevent caching, so the DB is hit every time

async function check() {
   const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY, // server-side only, never expose to the client
   );

   // Replace "products" with any real table in your DB
   const { error } = await supabase
      .from('items')
      .select('id', { head: true, count: 'exact' })
      .limit(1);

   return !error;
}

export async function GET() {
   const ok = await check();
   return Response.json(
      { status: ok ? 'ok' : 'error' },
      { status: ok ? 200 : 503 },
   );
}

// UptimeRobot's free plan may send HEAD requests, so handle those too
export async function HEAD() {
   const ok = await check();
   return new Response(null, { status: ok ? 200 : 503 });
}
