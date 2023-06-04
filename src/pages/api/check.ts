import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteerQueue from '@/queues/puppeteer';
import multer, { Multer } from 'multer';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    }
};

const upload: Multer = multer({ storage: multer.memoryStorage() });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 upload.single('file')(req, res, async (err: any) => {
    if (err) {
        res.status(500).json({ error: 'Error while uploading file' });
        return;
    }
    if (!req.file) {
        res.status(400).json({ error: 'No file provided' });
        return;
    }

    const results: Array<String> = [];

    const stream = new Readable();
    const parser = parse({ delimiter: ',' });
    stream.push(req.file.buffer);
    stream.push(null);

    stream.pipe(parser)
     .on('data', async (data) => {
        if (data) {
            results.push(data.toString());
        }
     })
     .on('end', async (foo) => {
        const job = await puppeteerQueue.add({ urls: results });

        res.json({ message: 'Job has been queued', jobId: job.id });
     });
 });
};
