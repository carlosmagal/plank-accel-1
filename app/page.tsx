import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Chat } from '@/components/Chat';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // Server components can't set cookies directly
        },
        remove(name: string, options: any) {
          // Server components can't remove cookies directly
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return null; // The middleware will handle the redirect
  }

  return (
    <main className="min-h-screen bg-white">
      <Chat />
    </main>
  );
}
