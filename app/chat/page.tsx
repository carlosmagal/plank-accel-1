'use client';

import { Chat } from '@/components/Chat';

export default function ChatPage() {
  return (
    <main className="h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Chat</h1>
        <Chat />
      </div>
    </main>
  );
}
