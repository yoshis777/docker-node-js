const puppeteer = require('puppeteer');
// const stringify = require('csv-sgringify');
// const iconv = require('iconv-lite');
// const fs = require('fs');
// const path = require('path');

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

    const stockCode = 6670;

    await page.goto(`https://www.nikkei.com/nkd/company/?scode=${stockCode}`);

    //銘柄
    const stockName = await page.evaluate(() =>
        document.querySelector('h1.m-headlineLarge_text').textContent
    );

    //株価
    const stockPrice = await page.evaluate(() =>
        document.querySelector('.m-stockPriceElm_value.now').textContent
    );

    //結果の取得
    console.log(`銘柄コード ${stockCode} (${stockName}) の株価は ${stockPrice} です。`);

    //TODO: csvにする処理

    browser.close();

})();