/* 新刊部分のdomツリーを取得し、画像のURLを抜き出す */
const puppeteer = require('puppeteer');

(async () => {

    //puppeteerの起動
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 50
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 800
    });

    await page.goto('https://www.shuwasystem.co.jp/');
    const newbookImages = await page.$$('.listType1 img');

    for (imgTag of newbookImages) {
        const prop = await imgTag.getProperty('src');
        const src = await prop.jsonValue();

        console.log(src);
    }

    await browser.close();
})();