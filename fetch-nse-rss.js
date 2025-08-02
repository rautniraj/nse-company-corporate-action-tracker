const puppeteer = require('puppeteer');

async function fetchRawNseXml() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Keep the working headers as-is
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  await page.setExtraHTTPHeaders({
    'Referer': 'https://www.nseindia.com/',
    'Accept': 'application/rss+xml,application/xml;q=0.9,*/*;q=0.8'
  });

  const response = await page.goto('https://nsearchives.nseindia.com/content/RSS/Corporate_action.xml', {
    waitUntil: 'networkidle2'
  });

  const xmlData = await response.text();
  await browser.close();
  return xmlData;
}

module.exports = fetchRawNseXml;

// ✅ Test run
if (require.main === module) {
  (async () => {
    const xml = await fetchRawNseXml();
    console.log(xml.slice(0, 2000)); // print part of XML to confirm freshness
  })();
}
