import puppeteer from 'puppeteer';
import Queue from 'bull';

const puppeteerQueue = new Queue('puppeteer', { redis: { port: 6379, host: '127.0.0.1' } });


function sanitizeUrl(url) {
    url = url.trim();

    url = url.replace(/[\u200B-\u200D\uFEFF]/g, '');


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

            /*
            await page.addScriptTag({ path: 'js/utilities/headings.js' });
            await page.addScriptTag({ path: 'js/utilities/text-size.js' });
            await page.addScriptTag({ path: 'js/utilities/connected-error-message.js' });
            await page.addScriptTag({ path: 'js/utilities/check-dynamic-content.js' });

            await page.waitForFunction(() => typeof checkHeadingStructure === 'function');
            await page.waitForFunction(() => typeof sizeOfText === 'function');
            await page.waitForFunction(() => typeof checkConnectedErrorMessages === 'function');
            await page.waitForFunction(() => typeof checkDynamicContent === 'function');
            */
           await page.evaluate(() => {
            // do some checks here
           });

           setTimeout(async () => {
            let fileName = sanitizedUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            fileName = `${fileName}.png`;

            await page.screenshot({
              path: `./${fileName}`,
              fullPage: true,
            });
            await browser.close();

          }, 12000);
        } catch (err) {
            console.log(err);
        }
    }
});

export default puppeteerQueue;

