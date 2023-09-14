// pages/api/checkPage.ts
import { NextApiRequest, NextApiResponse } from "next";
// import { fetchPageInfo } from '../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      const data = await fetchPageInfo(url);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end();
  }
}
