const got = require('got');

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'Mozilla/5.0 (X11; Linux x86_64)'
];

const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

async function fetchRawNseXml() {
  try {
    const response = await got('https://nsearchives.nseindia.com/content/RSS/Corporate_action.xml', {
      headers: {
        'User-Agent': ua,
        'Accept': 'application/rss+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://www.nseindia.com/'
      },
      timeout: { request: 10000 }
    });
    return response.body;
  } catch (err) {
    console.error('Error fetching:', err.response?.statusCode, err.message);
    return '';
  }
}

module.exports = fetchRawNseXml;

// ✅ Test run
if (require.main === module) {
  (async () => {
    const xml = await fetchRawNseXml();
    console.log(xml.slice(0, 2000)); // print part of XML to confirm freshness
  })();
}
