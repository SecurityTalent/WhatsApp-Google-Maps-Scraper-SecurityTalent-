# 🧠 WhatsApp + Google Maps Scraper Chrome Extension

This Chrome Extension allows you to:
- 📞 Extract business data directly from **Google Maps**
- 💬 Send **WhatsApp messages** without saving numbers
- 💾 Export scraped data to **CSV format**
- 🧹 Clear previous scraped data instantly

---

## 📊 Example Output (JSON)

Below is an example of the data you can scrape from a Google Maps business page:

```json
{
  "Name": "securitytalent",
  "Phone Number": "+88 0********",
  "Website": "http://www.securitytalent.net/",
  "Address": "Unit A5 Precision Business Park, 100 Masons Rd, Stratford-upon-Avon CV37 9BY, United Kingdom",
  "Business Status": "Closed ⋅ Opens 8 AM",
  "Hours": "Wednesday: 8 AM–6 PM | Thursday: 8 AM–6 PM | Friday: 8 AM–6 PM | Saturday: 9 AM–5 PM | Sunday: Closed",
  "Google Maps URL": "https://www.google.com/maps/place/securitytalent.net"
}
```

## ⚙️ Features

✅ WhatsApp Integration
- Send messages directly using https://wa.me/<number>
- Auto-append your saved message template

✅ Google Maps Scraper
- Scrapes: Name, Phone, Website, Email, Address, Rating, Total Reviews, Hours, Booking Links, Business Status, etc.

✅ Data Export
- Save data as .csv
- Clear old records instantly


## 🚀 Installation

1. **Download or clone this repository**
   ```bash
   git clone https://github.com/SecurityTalent/WhatsApp-Google-Maps-Scraper-SecurityTalent-.git

2. **Open Chrome Extensions Manager**
- Go to: chrome://extensions/

3. **Enable Developer Mode**
- Toggle the switch in the top-right corner.

4. **Load the Extension**
- Click “Load unpacked”
- Select your project folder: `WhatsApp-Google-Maps-Scraper-SecurityTalent-`

5. **Done! 🎉**
- You’ll now see the SecurityTalent WhatsApp + Google Maps Scraper extension active in your Chrome toolbar.





## 🧩 Folder Structure
```bash
S3/
│
├── background.js
├── popup.js
├── popup.html
├── manifest.json
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── securitytalent.jpg
└── README.md

```

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <b>Extension Popup</b><br/>
      <img src="POC/Screenshot.png" alt="Extension Popup" width="200"/>
    </td>
    <td align="center">
      <b>Send WhatsApp messages without saving numbers</b><br/>
      <img src="POC/Screenshot 02.jpg" alt="WhatsApp Template" width="130"/>
    </td>
  </tr>
</table>

