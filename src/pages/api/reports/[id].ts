// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Report } from '@/types/reports';
import reportId from '@/mock-data/reports/reportId.json';

type Data = {
  data: {
    report: Report
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(reportId)
}
