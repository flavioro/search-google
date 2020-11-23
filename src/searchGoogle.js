const puppeteer = require('puppeteer');

 const searchGoogle = async (searchQuery) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://google.com');

  //Finds input element with name attribue 'q' and types searchQuery
  await page.type('input[name="q"]', searchQuery);

  await browser.close();
};

module.exports = searchGoogle