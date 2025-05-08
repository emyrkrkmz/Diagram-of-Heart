  import type { NextApiRequest, NextApiResponse } from 'next';
  import axios from 'axios';
  import * as cheerio from 'cheerio';

  const endpoint = "https://obs.itu.edu.tr/public/DersProgram/DersProgramSearch";

  type CourseRow = {
    crn: string;
    code: string;
    name: string;
    method: string;
    instructor: string;
    building: string;
    day: string;
    time: string;
    room: string;
    capacity: string;
    enrolled: string;
  };
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      try {
        const { ProgramSeviyeTipiAnahtari, dersBransKoduId } = req.query;

        const response = await axios.get(endpoint, {
          params: {
            ProgramSeviyeTipiAnahtari,
            dersBransKoduId,
          },
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://obs.itu.edu.tr/',
          },
          responseType: 'text',
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const rows: CourseRow[] = [];

        $('#dersProgramContainer tbody tr').each((_: number, tr: any) => {
          const columns = $(tr).find('td');
          rows.push({
            crn: $(columns[0]).text().trim(),
            code: $(columns[1]).text().trim(),
            name: $(columns[2]).text().trim(),
            method: $(columns[3]).text().trim(),
            instructor: $(columns[4]).text().trim(),
            building: $(columns[5]).text().trim(),
            day: $(columns[6]).text().trim(),
            time: $(columns[7]).text().trim(),
            room: $(columns[8]).text().trim(),
            capacity: $(columns[9]).text().trim(),
            enrolled: $(columns[10]).text().trim(),
          });
        });

        res.status(200).json(rows);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        res.status(500).json({ message: 'Error fetching data' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
