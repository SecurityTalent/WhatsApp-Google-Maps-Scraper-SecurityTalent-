chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendWhatsApp",
    title: "Send WhatsApp to '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const rawNumber = info.selectionText.trim();
  const formattedNumber = formatNumber(rawNumber);
  if (!formattedNumber) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert("Invalid phone number!")
    });
    return;
  }

  chrome.storage.sync.get("template", (data) => {
    const message = data.template ? encodeURIComponent(data.template) : "";
    const url = `https://wa.me/${formattedNumber}?text=${message}`;
    chrome.tabs.create({ url });
  });
});

function formatNumber(number) {
  number = number.replace(/\D/g, "");
  if (number.length === 10 || number.startsWith("0")) {
    number = "880" + number.replace(/^0+/, "");
  }
  return number.length >= 10 ? number : null;
}
