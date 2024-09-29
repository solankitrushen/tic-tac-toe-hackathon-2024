import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetchAndStream(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      // Use a base URL from environment variable
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; // Fallback for local development

      // Step 1: Fetch parsed PDF data
      const pdfResponse = await fetch(`${baseURL}/api/parse`);
      if (!pdfResponse.ok) {
        throw new Error('Failed to fetch parsed PDF data');
      }

      const parsedDocuments = await pdfResponse.json();

      // Step 2: Prepare messages based on parsed content
      const messages = parsedDocuments.map((doc: { content: string }) => ({
        role: 'user',
        content: doc.content,
      }));
      console.log(messages)
      // Step 3: Send messages to flashcards API
      const flashcardsResponse = await fetch(`${baseURL}/api/flashcards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      // Log the response status and body for debugging
      console.log('Flashcards API Response:', flashcardsResponse.status);
      const responseBody = await flashcardsResponse.json();
      console.log('Response Body:', responseBody);

      if (!flashcardsResponse.ok) {
        throw new Error(`Failed to send messages to flashcards API: ${responseBody.error || 'Unknown error'}`);
      }

      res.status(200).json(responseBody); // Respond with the result from flashcards API
    } catch (error) {
      console.error('Error in fetchAndStream:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
