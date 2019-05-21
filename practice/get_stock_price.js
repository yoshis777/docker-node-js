const puppeteer = require('puppeteer');
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
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

    //csv出力
    const weathers = [];
    const stocks = [];
    stocks.push(['銘柄コード', '銘柄名', '株価']);
    stocks.push([stockCode, stockName, stockPrice]);

    stringify(stocks, (error, stocksString) => {
       const writableStream = fs.createWriteStream(
           path.join(__dirname, 'stock.csv')
       );
       writableStream.write(iconv.encode(stocksString, 'Shift_JIS'));

    });

    browser.close();

})();