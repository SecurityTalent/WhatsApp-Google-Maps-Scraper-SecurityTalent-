// --- WhatsApp Template ---
chrome.storage.sync.get("template", (data) => {
  if (data.template) document.getElementById("templateInput").value = data.template;
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const template = document.getElementById("templateInput").value.trim();
  chrome.storage.sync.set({ template }, () => {
    showStatus("✅ Template saved!");
  });
});

// --- Google Maps Scraper ---
document.getElementById("scrapeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.url.includes("google.com/maps")) {
    showStatus("⚠️ Please open a Google Maps business page.");
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeBusinessData
  }, (results) => {
    const data = results[0]?.result;
    if (!data) return showStatus("❌ Could not scrape data.");

    chrome.storage.local.get({ scraped: [] }, (store) => {
      store.scraped.push(data);
      chrome.storage.local.set({ scraped: store.scraped }, () => {
        showStatus("✅ Data scraped & saved!");
      });
    });
  });
});

// --- Clear Previous Data ---
document.getElementById("clearBtn").addEventListener("click", () => {
  chrome.storage.local.remove("scraped", () => {
    showStatus("🧹 All previous data cleared!");
  });
});

// --- Download CSV ---
document.getElementById("downloadBtn").addEventListener("click", () => {
  chrome.storage.local.get("scraped", (store) => {
    if (!store.scraped || store.scraped.length === 0) {
      showStatus("⚠️ No data to export.");
      return;
    }

    const headers = [
      "Category", "Name", "Phone Number", "Google Maps URL", "Website",
      "Email", "Address", "Total Reviews", "Rating", "Business Status", "Booking Links", "Hours"
    ];

    const csvRows = [headers.join(",")];
    for (const d of store.scraped) {
      const row = headers.map(h => `"${(d[h] || "").replace(/"/g, '""')}"`);
      csvRows.push(row.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: "maps_data.csv" });
  });
});

// --- Helper functions ---
function showStatus(msg) {
  const s = document.getElementById("status");
  s.textContent = msg;
  setTimeout(() => (s.textContent = ""), 3000);
}

function scrapeBusinessData() {
  const getText = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.textContent.trim() : "";
  };

  const getAttr = (selector, attr) => {
    const el = document.querySelector(selector);
    return el ? el.getAttribute(attr) : "";
  };

  const findLink = (keyword) => {
    const el = [...document.querySelectorAll("a")].find(a =>
      a.href && a.href.toLowerCase().includes(keyword)
    );
    return el ? el.href : "";
  };

  // 🧩 New DOM structure - robust selectors
  const data = {
    "Name": getText('h1[class*="DUwDvf"]') || getText('h1'),
    "Category": getText('[class*="DkEaL"]') || getText('[class*="Yr7JMd"]'),

    // ✅ Phone
    "Phone Number":
      getText('button[data-item-id^="phone:tel:"] .Io6YTe') ||
      getText('a[href^="tel:"] .Io6YTe') ||
      getText('.AeaXub .Io6YTe') ||
      "",

    // ✅ Website
    "Website":
      getAttr('a[data-item-id="authority"]', "href") ||
      findLink("http") ||
      "",

    // ✅ Email (usually hidden, may appear later)
    "Email": "",

    // ✅ Address
    "Address":
      getText('button[data-item-id="address"] .Io6YTe') ||
      getText('[aria-label*="Address:"]') ||
      "",

    // ✅ Rating & Reviews
    "Rating":
      getText('span[aria-label*="stars"]') ||
      getText('[class*="MW4etd"]') ||
      "",
    "Total Reviews":
      getText('span[aria-label*="reviews"]') ||
      getText('[class*="fontBodySmall"] span') ||
      getText('[class*="HHrUdb"]') ||
      "",

    // ✅ Business Status (Open / Closed)
    "Business Status":
      getText('[class*="OqCZI"] .ZDu9vd') ||
      getText('[aria-label*="Open"]') ||
      getText('[aria-label*="Closed"]') ||
      "",

    // ✅ Hours
    "Hours": (() => {
      const rows = [...document.querySelectorAll('.eK4R0e tr')];
      if (rows.length === 0) return "";
      return rows.map(r => {
        const day = r.querySelector("td:first-child div")?.textContent?.trim();
        const time = r.querySelector("td:nth-child(2) li")?.textContent?.trim();
        return `${day}: ${time}`;
      }).join(" | ");
    })(),

    // ✅ Booking Links (reserve / appointment)
    "Booking Links":
      findLink("booking") ||
      findLink("reserve") ||
      findLink("appointment") ||
      "",

    // ✅ Google Maps URL
    "Google Maps URL": location.href
  };

  return data;
}

