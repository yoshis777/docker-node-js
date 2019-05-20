/* twitterにログインする */
const puppeteer = require('puppeteer');
const delay = require('delay');

//環境変数情報（.envファイルを用意して記載）をの読み込み
require('dotenv').config();

const USER_ID = process.env.MY_USER_ID;
const PASSWORD = process.env.MY_PASSWORD;

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 800
    });

    await page.goto('https://twitter.com/login');

    await page.type('input.js-username-field', USER_ID);
    await page.type('input.js-password-field', PASSWORD);

    await page.click('button[type="submit"]');

    await delay(3000);
    await browser.close();

})();
