import { z } from "zod"

export async function POST(req: Request) {
  const { messageId, model } = await req.json()

  // Mock message data
  const message = {
    id: messageId,
    chatId: "mock-chat-id",
    position: 1,
    role: "user",
    content: "Hello, how can I help you with Algorand development?",
  }

  // Mock messages for the chat
  const messagesRes = [
    {
      role: "system",
      content: "You are a helpful assistant for Algorand developers.",
    },
    {
      role: "user",
      content: "How can I create a smart contract on Algorand?",
    },
    message,
  ]

  let messages = z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      }),
    )
    .parse(messagesRes)

  if (messages.length > 10) {
    messages = [messages[0], messages[1], messages[2], ...messages.slice(-7)]
  }

  // Create a mock readable stream
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      const mockResponse =
        "I'm a mock response for UI demonstration purposes. This simulates a streaming response from an AI model without requiring actual API keys or backend services."

      // Send the response in chunks to simulate streaming
      const chunks = mockResponse.split(" ")
      let i = 0

      const interval = setInterval(() => {
        if (i >= chunks.length) {
          clearInterval(interval)
          controller.close()
          return
        }

        const chunk = {
          choices: [
            {
              delta: { content: chunks[i] + " " },
              index: 0,
            },
          ],
        }

        controller.enqueue(encoder.encode(JSON.stringify(chunk) + "\n"))
        i++
      }, 100)
    },
  })

  return new Response(stream)
}

export const runtime = "edge"
export const maxDuration = 30
