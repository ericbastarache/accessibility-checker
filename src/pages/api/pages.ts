// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Pages from '@/src/types/pages';
import pages from '@/mock-data/pages/pages.json';

type Data = {
  data: {
    pages: Array<Pages>
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(pages)
}
