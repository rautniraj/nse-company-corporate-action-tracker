const { XMLParser } = require('fast-xml-parser');

function parseNseRss(xmlData) {
  const parser = new XMLParser();
  const parsed = parser.parse(xmlData);

  const items = parsed.rss?.channel?.item || [];

  const result = items.map(item => ({
    title: item.title,
    description: item.description
  }));

  return result;
}

module.exports = parseNseRss;

// ✅ Test this module standalone
if (require.main === module) {
  const fetchRawNseXml = require('./fetch-nse-rss');

  (async () => {
    const xml = await fetchRawNseXml();
    const parsedItems = parseNseRss(xml);

    console.log(`Parsed ${parsedItems.length} items`);
    console.log(parsedItems.slice(0, 5)); // Preview first 5 items
  })();
}
