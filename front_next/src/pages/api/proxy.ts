import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const endpoint = "https://obs.itu.edu.tr/public/DersProgram/DersProgramSearch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log("Request Body:", req.body);

      // Make the request to the external API
      const response = await axios.post(
        endpoint, 
        req.body, // Pass the request body directly
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // Add other headers if needed by the external API
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://obs.itu.edu.tr/',
          },
        }
      );

      console.log("External API Response:", response.data);

      // Forward the response to the client
      res.status(200).json(response.data);

    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching data from external API:", error);

      // Send error response
      res.status(500).json({ 
        message: 'Error fetching data', 
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
