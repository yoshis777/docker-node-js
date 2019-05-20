const puppeteer = require('puppeteer');
const delay = require('delay');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 50
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 800
    });

    console.log('-- goto --');
    await page.goto('https://www.yahoo.co.jp');
    await delay(1000);

    console.log('-- wait and click --');
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),//次のページ遷移まで待つ
        page.click('#topicsfb .topicsindex ul.emphasis li:nth-child(1) a'),
    ]);

    console.log('-- evaluate --');
    const h2Title = await page.evaluate(() =>
        document.querySelector('h2.tpcNews_title').textContent
    );
    console.log(h2Title);

    console.log('-- close --');
    await browser.close();
})();