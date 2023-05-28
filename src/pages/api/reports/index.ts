// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Report } from '@/types/reports';
import reports from '@/mock-data/reports/reports.json';

type Data = {
  data: {
    reports: Array<Report>
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(reports)
}
