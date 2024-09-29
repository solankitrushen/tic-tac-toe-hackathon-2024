// pages/api/flashcards.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { LlamaParseReader } from 'llamaindex';
import path from 'path';
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { streamText } from "ai";

// Define the response type for parsed documents
interface ParsedDocument {
  content: string;
  metadata?: Record<string, any>; // Optional metadata
}

// Function to handle the PDF parsing
async function parsePdf(filePath: string): Promise<ParsedDocument[]> {
  const reader = new LlamaParseReader({
    resultType: 'markdown',
    apiKey: process.env.LLAMA_CLOUD_API_KEY, // Include the API key here
  });

  // Parse the document
  const documents = await reader.loadData(filePath);
      //@ts-ignore

  return documents;
}
async function generateFlashcards(parsedContent: string): Promise<string> {
  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const messages = [
    {
      role: "user",
      content: `Generate flashcards based on the following content:\n\n${parsedContent}`,
    },
  ];

  // Make the API call
  const result = await streamText({
    model: groq("llama3-8b-8192"),
    //@ts-ignore
    messages,
    temperature: 0.5,
  });

  // Log the result to check its structure
  console.log(result); 

  // Check if the response includes the necessary properties
  try {
    // Await the promise properties
    const text = await result.text; // Await the text property
    const finishReason = await result.finishReason; // Await the finishReason property

    // Ensure you have valid text
    if (!text) {
      throw new Error("No response text found from the Groq API.");
    }

    // You can also check the finishReason if needed
    console.log("Finish Reason:", finishReason);

    return text; // Return the complete text
  } catch (error) {
    console.error("Error processing Groq API response:", error);
    throw new Error("Failed to generate flashcards.");
  }
}


// API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    // Define the path to the PDF file
    const filePath: string = path.join(process.cwd(), 'FIOT.pdf'); // Adjust the path as necessary
    
    try {
      // Parse the PDF file
      const documents: ParsedDocument[] = await parsePdf(filePath);
      
      // Combine content from all parsed documents
      const combinedContent = documents.map(doc => doc.content).join("\n");

      // Generate flashcards using the combined content
      const flashcards = await generateFlashcards(combinedContent);
      
      // Log and return flashcards as the response
      console.log(flashcards);
      res.status(200).json({ flashcards });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to process the PDF file and generate flashcards' });
    }
  } else {
    // Handle unsupported request methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
