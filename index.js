const fetchRawNseXml = require('./fetch-nse-rss');
const parseNseRss = require('./parse-nse-rss');
const normalizeCompanyName = require('./utils.js');
const getCompanyList = require('./extract-company-list');
const sendNtfyNotification = require('./ntfy');
const stringSimilarity = require('string-similarity');
require('dotenv').config();

const KEYWORDS     = process.env.KEYWORDS.split(',');
const NTFY_TOPIC   = process.env.NTFY_TOPIC;
const MATCH_PERCENT = Number(process.env.MATCH_PERCENT);

(async () => {
    try {
        console.log("1.> Fetching NSE RSS feed...");
        const rawXml = await fetchRawNseXml();

        console.log("2.> Parsing feed...");
        const items = parseNseRss(rawXml);

        console.log(`3.> Parsed ${items.length} items`);
        console.log("Showing first 3 for verification ...")
        console.log(items.slice(0, 3));

        console.log("4.> Loading invested companies list...");
        const companyList = getCompanyList();

        console.log("5.> Filtering relevant actions...");

        const matchedItems = [];

        for (const { title, description } of items) {
            const descriptionUpper = description.toUpperCase();
            const isRelevant = KEYWORDS.some(keyword => descriptionUpper.includes(keyword));
            if (!isRelevant) continue;

            const normalizedTitle = normalizeCompanyName(title.split('-')[0]);
            const normalizedCompanyList = companyList.map(normalizeCompanyName);
            const { bestMatch } = stringSimilarity.findBestMatch(normalizedTitle, normalizedCompanyList);

            if (bestMatch.rating >= MATCH_PERCENT) {
                console.log(`Match Found → ${bestMatch.target} → ${title}`);
                matchedItems.push({ title, description });
            }
        }

        // ✅ Send one summary notification
        if (matchedItems.length > 0) {
            const title = `${matchedItems.length} Corporate Actions Matched`;
            const message = matchedItems.map(item =>
                `🔸 ${item.title}\n${item.description}`
            ).join('\n\n');

            await sendNtfyNotification(NTFY_TOPIC, title, message);
        } else {
            console.log(" No matches found.");
        }


        console.log('6.> Done checking corporate actions.');
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
