# 📡 NSE Corporate Action Watcher

This project monitors the **Corporate Action RSS Feed** from the [NSE (National Stock Exchange of India)](https://www.nseindia.com/), detects announcements like **BONUS**, **SPLIT**, or **DIVIDEND**, matches them against your personal list of invested companies, and sends you **real-time push notifications** via [ntfy.sh](https://ntfy.sh).

> Built using Node.js, Puppeteer, and fuzzy string matching. Developed end-to-end by Niraj Raut.

---

## 🚀 Features

- ✅ Fetches the **latest RSS feed** directly using Puppeteer (bypasses stale cached data)
- 🧠 Parses XML into structured data
- 🔍 Filters announcements using **keywords** (like `BONUS`, `SPLIT`, etc.)
- 🏦 Matches announcement titles against your invested company list from Excel
- 🤖 Uses **fuzzy matching** to handle minor variations (e.g., "Ltd." vs "Limited")
- 🔔 Sends a **single combined push notification** via `ntfy.sh`
- 📄 Secure configuration via `.env`
- 📦 Modular design: separate files for fetch, parse, matching, notifications

---

## 📦 Node Modules Used

| Module              | Purpose |
|---------------------|---------|
| **puppeteer**       | Fetches live XML from NSE with proper headers (bypassing CDN cache) |
| **xlsx**            | Parses `.xlsx` Excel files to load your list of invested companies |
| **string-similarity** | Performs fuzzy matching of company names |
| **axios**           | Sends HTTP POST requests to `ntfy.sh` |
| **dotenv**          | Loads environment variables from `.env` securely |

Install them using:

```bash
npm install puppeteer xlsx string-similarity axios dotenv
```

---

## 🔧 Requirements

- Node.js v16 or above
- A Linux/macOS/WSL environment (for Puppeteer dependencies)
- Internet connection (to fetch data and send notifications)
- An ntfy.sh topic (free and anonymous)

**System Dependencies (for Puppeteer):**

```bash
sudo apt install -y libx11-dev libxkbcommon-x11-0 libatk-bridge2.0-0 libgtk-3-0 libnss3 libxss1 libasound2
```

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/nse-corporate-watcher.git
cd nse-corporate-watcher
```

2. **Install Node modules**

```bash
npm install
```

3. **Configure `.env`**

Create a `.env` file in the root directory:

```env
NTFY_TOPIC=your-topic-id
MATCH_PERCENT=0.85
KEYWORDS=BONUS,SPLIT,DIVIDEND
```

> You can get a topic ID from [ntfy.sh](https://ntfy.sh). It's anonymous and instant.

4. **Add your invested companies list**

Create an Excel file named `company_invested.xlsx` in the project root. It should have:

- A single column
- One company name per row
- sample file added

**Example:**

```
Infosys
HDFC Bank Limited
Tata Consultancy Services
...
```

---

## ▶️ Running the App

```bash
node index.js
```

On success, you'll get logs like:

```
📥 Fetching NSE RSS feed...
🧹 Parsing feed...
📂 Loading invested companies list...
🔍 Filtering relevant actions...
✅ Match Found → HDFC Bank Limited → HDFC Bank Ltd - Ex-Date: 05-Aug-2025
✅ Match Found → Infosys Ltd → Infosys - Ex-Date: 05-Aug-2025
📣 Notification sent via ntfy
```

And you'll receive a single push notification with all matches for the day.

---

## 🔍 Example Notification

```
📢 2 Corporate Actions Matched

🔸 Infosys Ltd - Ex-Date: 05-Aug-2025
SERIES:EQ | PURPOSE: BONUS 1:1 | RECORD DATE: 05-Aug-2025

🔸 HDFC Bank Ltd - Ex-Date: 06-Aug-2025
SERIES:EQ | PURPOSE: SPLIT 10 TO 5 | RECORD DATE: 06-Aug-2025
```

---

## 🧠 How It Works (Detailed Flow)

- `fetch-nse-rss.js` uses Puppeteer to load the XML feed from:
  ```
  https://nsearchives.nseindia.com/content/RSS/Corporate_action.xml
  ```
- `parse-nse-rss.js` parses the XML into an array of `<item>` objects with title and description.
- `extract-company-list.js` reads your `.xlsx` file and returns an array of normalized company names.
- `index.js`:
  - Filters items using keywords like "BONUS"
  - Matches company names using fuzzy logic (≥ `MATCH_PERCENT`)
  - Pushes one notification with all relevant actions

---

## 📁 Project Structure

```
.
├── index.js                   # Main entry point
├── fetch-nse-rss.js          # Fetches XML from NSE
├── parse-nse-rss.js          # Parses the XML feed
├── extract-company-list.js   # Reads company names from Excel
├── ntfy.js                   # Push notification helper
├── company_invested.xlsx     # Your investment list
├── .env                      # Secure config
├── package.json
└── README.md
```

---

## 🌱 Future Ideas

- Add support for EMAIL or Telegram alerts
- Filter based on RECORD DATE or EX-DATE
- Save a local history of previous matches
- Simple web interface for easier control

---

## 📄 License

MIT - free to use, fork, modify, or share. Just give credit 🙏

---

## 🙌 Credits

Built by Niraj Raut with support from ChatGPT.