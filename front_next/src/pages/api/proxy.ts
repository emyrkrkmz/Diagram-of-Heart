import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const endpoint = "https://obs.itu.edu.tr/public/DersProgram/DersProgramSearch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Extract the query parameters
      const { ProgramSeviyeTipiAnahtari, dersBransKoduId, __RequestVerificationToken } = req.query;

      // Make the GET request to the external API with the query parameters
      const response = await axios.get(endpoint, {
        params: {
          ProgramSeviyeTipiAnahtari,
          dersBransKoduId,
          __RequestVerificationToken,
        },
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://obs.itu.edu.tr/',
        },
      });

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
