// import { createOpenAI as createGroq } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export const maxDuration = 30;

// const groq = createGroq({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

// export async function POST(req: Request) {
//   if (req.method === 'POST') {
//     try {
//       const { messages, model = "llama-3.1-70b-versatile", temperature = 0.5 } = await req.json();
  
//       const result = await streamText({
//         model: groq(model),
//         messages,
//         temperature,
//       });
  
//       return result.toAIStreamResponse();
//     } catch (error) {
//       console.error('Error in POST request:', error);
//       return new Response('Internal Server Error', { status: 500 });
//     }
//   } else {
//     return new Response('Method Not Allowed', { status: 405 });
//   }
// }

// pages/api/chatCompletion.js

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const chatCompletion = await getGroqChatCompletion();
      // Send the completion back as a JSON response
      res.status(200).json({ response: chatCompletion.choices[0]?.message?.content || "" });
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      res.status(500).json({ error: "Failed to fetch chat completion" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Function to get chat completion
async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama3-8b-8192",
  });
}
