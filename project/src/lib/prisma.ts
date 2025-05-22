// Mock Prisma client for UI demonstration
export const getPrisma = () => ({
  message: {
    findUnique: ({ where }: any) =>
      Promise.resolve({
        id: where.id || "mock-message-id",
        content: "This is a mock message content for UI demonstration",
        position: 1,
        chatId: "mock-chat-id",
        role: "user",
      }),
    findMany: ({ where, orderBy }: any) =>
      Promise.resolve([
        {
          id: "mock-message-1",
          content: "Hello, how can I help you today?",
          position: 1,
          chatId: where.chatId,
          role: "system",
        },
        {
          id: "mock-message-2",
          content: "I need help with my Algorand project",
          position: 2,
          chatId: where.chatId,
          role: "user",
        },
      ]),
  },
  generatedApp: {
    findUnique: ({ where }: any) =>
      Promise.resolve({
        id: where.id || "mock-app-id",
        prompt: "Create a calculator app",
        code: "export default function Calculator() { return <div>Calculator App</div> }",
        created_at: new Date().toISOString(),
      }),
  },
  chat: {
    findUnique: ({ where }: any) =>
      Promise.resolve({
        id: where.id || "mock-chat-id",
        title: "Mock Chat Session",
      }),
  },
})
