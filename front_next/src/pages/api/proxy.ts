// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// ⬇️ Use named imports for runtime values
import { load, type CheerioAPI } from "cheerio";
// ⬇️ Import node types from domhandler (not from cheerio)
import type { Element } from "domhandler";

const endpoint =
  "https://obs.itu.edu.tr/public/DersProgram/DersProgramSearch";

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
  capacity: number;
  enrolled: number;
};

function cellTextWithSpaces($: CheerioAPI, el: Element) {
  const $clone = $(el).clone();
  $clone.find("br").replaceWith(" ");
  return $clone.text().replace(/\s+/g, " ").trim();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { ProgramSeviyeTipiAnahtari = "LS", dersBransKoduId } = req.query;
    if (!dersBransKoduId) return res.status(400).json({ message: "Missing dersBransKoduId" });

    const { data } = await axios.get(endpoint, {
      params: { ProgramSeviyeTipiAnahtari, dersBransKoduId },
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://obs.itu.edu.tr/",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      responseType: "text",
    });

    const $ = load(data);
    const rows: CourseRow[] = [];

    $("#dersProgramContainer tbody tr").each((_, tr) => {
      const tds = $(tr).find("td").toArray() as Element[];

      const crn         = cellTextWithSpaces($, tds[0]);
      const code        = cellTextWithSpaces($, tds[1]);
      const name        = cellTextWithSpaces($, tds[2]);
      const method      = cellTextWithSpaces($, tds[3]);
      const instructor  = cellTextWithSpaces($, tds[4]);
      const building    = cellTextWithSpaces($, tds[5]);
      const day         = cellTextWithSpaces($, tds[6]);
      const time        = cellTextWithSpaces($, tds[7]);
      const room        = cellTextWithSpaces($, tds[8]);
      const capacityStr = cellTextWithSpaces($, tds[9]);
      const enrolledStr = cellTextWithSpaces($, tds[10]);

      rows.push({
        crn: String(crn),
        code,
        name,
        method,
        instructor,
        building,
        day,
        time,
        room,
        capacity: parseInt(capacityStr || "0", 10),
        enrolled: parseInt(enrolledStr || "0", 10),
      });
    });

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching or parsing data:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
}
