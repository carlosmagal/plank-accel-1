import { ChatAgent } from '@/lib/chat-agent';

const agent = new ChatAgent();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // Convert messages to the format expected by ChatAgent
  const state = {
    messages: messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })),
  };

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const newState = await agent.sendMessage(lastMessage.content, state);
        const response = newState.messages[newState.messages.length - 1].content;

        // Send the response as a data event
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: response })}\n\n`));
        controller.close();
      } catch (error) {
        // Send error as a data event
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
