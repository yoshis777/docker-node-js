const puppeteer = require('puppeteer');
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
let { Client } = require('pg');
require('dotenv').config();

//DB接続用クライアント
const createClientToDb = () => {
    let client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    client.connect();

    return client;
};

const executeQuery = (client, query, closeMode) => {
    client.query(query)
        .then(res => {
            console.log(res);
            if (closeMode) client.end(console.log('Closed client connection'));
        })
        .catch(err => {
            console.error(err.stack);
            if (closeMode) client.end(console.log('Closed client connection'));
        });
};

(async() => {

    let stockCode = 6670;
    let stockName;
    let stockPrice;
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 50
    });

    try{

        const page = await browser.newPage();

        await page.setViewport({
            width: 1200,
            height: 800
        });

        await page.goto(`https://www.nikkei.com/nkd/company/?scode=${stockCode}`);

        //銘柄
        stockName = await page.evaluate(() =>
            document.querySelector('h1.m-headlineLarge_text').textContent
        );

        //株価
        stockPrice = await page.evaluate(() =>
            document.querySelector('.m-stockPriceElm_value.now').textContent
        );

        //結果の取得
        stockPrice = stockPrice.replace(/[^0-9]/g, '');
        console.log(`銘柄コード ${stockCode} (${stockName}) の株価は ${stockPrice} です。`);

        browser.close();

    } catch (e) {
        //エラーが起きたら、DB格納しない
        console.error(e);
        browser.close();
        return;
    }

    //DB接続
    try {
        let client = createClientToDb();

        const query = {
            text: 'INSERT INTO "public"."tests" ("code", "name", "price") VALUES ($1, $2, $3)',
            values: [stockCode, stockName, stockPrice]
        };

        executeQuery(client, query, true);
    } catch (e) {
        console.error(e);
    }

})();

