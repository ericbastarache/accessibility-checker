import puppeteer from 'puppeteer';
import Queue from 'bull';

const puppeteerQueue = new Queue('puppeteer', { redis: { port: 6379, host: '127.0.0.1' } });

puppeteerQueue.process(async (job) => {
    const { urls } = job.data;

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        product: 'chrome',
        ignoreDefaultArgs: ['--disable-extensions'],
        defaultViewport: null,
    });
    const page = await browser.newPage();

    for (const url of urls) {
        await page.goto(url);

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
        await page.screenshot({
          path: `./${url}-image.png`,
          fullPage: true,
        });
        await browser.close();
      }, 12000);
    }
});

export default puppeteerQueue;


/*
 
  */