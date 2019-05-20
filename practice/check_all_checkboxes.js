const puppeteer = require('puppeteer');
const delay = require('delay');

//全てのチェックボックスをチェックする。
const checkAllVegetableScript = `
    const vegetables = document.querySelectorAll('[name="vegetable[]"]');
    vegetables.forEach(vegetable => {
        vegetable.checked = true;
        vegetable.parentNode.className = 'cbxbd c_on';
    });
`;

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

    await page.goto('http://3min.ntv.co.jp/3min/search_option');

    await page.addScriptTag({ content: checkAllVegetableScript });

    await delay(3000);
    await browser.close();

})();