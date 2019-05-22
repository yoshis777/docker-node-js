/* ブログの個々のページ毎にpdfを取得する */
const puppeteer = require('puppeteer');
const delay = require('delay');
const converter = require('convert-filename-ja');
const path = require('path');

(async() => {
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
    await page.goto('http://ryoichi0102.hatenablog.com/');
    await delay(1000);

    console.log('-- goto --');
    const firstPage = await page.evaluate(() =>
        document.querySelector('#main article:nth-child(1) h1.entry-title a').href
    );

    await page.goto(firstPage);
    await delay(1000);

    do {
        console.log('-- do --');
        const entryDate = await page.evaluate(() =>
            document.querySelector('.entry-date').textContent.trim()
        );
        const titleText = await page.evaluate(() =>
            document.querySelector('.entry-title').textContent
        );

        const filename = converter.convert(`${entryDate}-${titleText}`);
        console.log(filename);

        const filepath = path.join(__dirname, filename);
        await page.pdf({
            path: `${filepath}.pdf`,
            format: 'A4'
        })

        const next = await page.evaluate(() =>
            document.querySelector('a[rel="next"]')
        );
        if (next === null){
            break;
        }

        console.log('-- next --');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }),
            page.click('a[rel="next"]')
        ]);

        await delay(1000);
    } while (true);

    console.log('-- close --');
    await browser.close();

})();