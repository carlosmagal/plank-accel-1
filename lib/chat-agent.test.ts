import { ChatAgent } from './chat-agent';

async function main() {
  const agent = new ChatAgent();

  try {
    // Send a message and get the response
    const response = await agent.sendMessage('Hello! How are you today?');
    console.log('Assistant:', response);

    // Send a follow-up message
    const followUpResponse = await agent.sendMessage('What can you help me with?');
    console.log('Assistant:', followUpResponse);

    // Get the full conversation history
    const history = agent.getHistory();
    console.log('\nFull conversation history:');
    history.forEach((msg) => {
      console.log(`${msg.role}: ${msg.content}`);
    });

    // Clear the history
    agent.clearHistory();
    console.log('\nHistory cleared!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
