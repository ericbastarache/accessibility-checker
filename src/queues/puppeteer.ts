import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Queue from 'bull';

const puppeteerQueue = new Queue('puppeteer', { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST } });


function sanitizeUrl(url: string): string {
    return encodeURI(url.trim().replace(/[\u200B-\u200D\uFEFF]/g, ''));
}

puppeteerQueue.process(async (job) => {
    const { urls } = job.data;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        product: 'chrome',
        ignoreDefaultArgs: ['--disable-extensions'],
        defaultViewport: null,
    });
    const page = await browser.newPage();

    for (let url of urls) {
        const sanitizedUrl = sanitizeUrl(url);
        try {
           await page.goto(`${sanitizedUrl}`);
           const scriptContent = await fs.promises.readFile('./dist/bundle.js', 'utf8');
           await page.addScriptTag({ content: scriptContent });

           await page.evaluate(() => {
                window.sizeOfText();
                window.checkLabelledBy();
                window.checkHeadingStructure();
                window.inputsWithName();
                window.checkLandmarkRoles();
                window.checkObjects();
                window.checkAnchorElements();
           });

          await page.waitForTimeout(10000);

          let fileName = sanitizedUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          fileName = `${fileName}.png`;

          await page.screenshot({
            path: `./${fileName}`,
            fullPage: true,
          });

        } catch (err) {
            console.log(err);
        }
    }
    await browser.close();
});

export default puppeteerQueue;

