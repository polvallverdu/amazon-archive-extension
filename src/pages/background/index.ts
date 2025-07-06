// Background script for Amazon Archive Extension

// Function to check if URL is an Amazon site with orderID parameter
function isAmazonWithOrderId(url: string): {
  isAmazon: boolean;
  orderID: string | null;
  tld: string | null;
} {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if it's an Amazon domain
    const amazonPattern =
      /^(www\.)?amazon\.(com|co\.uk|ca|de|fr|it|es|com\.au|co\.jp|in)$/;
    const match = hostname.match(amazonPattern);

    if (!match) {
      return { isAmazon: false, orderID: null, tld: null };
    }

    // Extract TLD
    const tld = match[2];

    // Check for orderID parameter (both orderID and orderId)
    const urlParams = new URLSearchParams(urlObj.search);
    const orderID = urlParams.get("orderID") || urlParams.get("orderId");

    return {
      isAmazon: true,
      orderID,
      tld,
    };
  } catch (error) {
    return { isAmazon: false, orderID: null, tld: null };
  }
}

// Function to update icon state
async function updateIcon(tabId: number, enabled: boolean) {
  try {
    if (enabled) {
      // Set colored icon (enabled state)
      await chrome.action.setIcon({
        tabId,
        path: {
          32: "icon-32.png",
          128: "icon-128.png",
        },
      });
      await chrome.action.setTitle({
        tabId,
        title: "Amazon Archive Extension - Click to view order archive",
      });
    } else {
      // Set grayed out icon (disabled state)
      await chrome.action.setIcon({
        tabId,
        path: {
          32: "icon-32-gray.png",
          128: "icon-128-gray.png",
        },
      });
      await chrome.action.setTitle({
        tabId,
        title:
          "Amazon Archive Extension - Not available (need Amazon site with orderID parameter)",
      });
    }
  } catch (error) {
    console.error("Error updating icon:", error);
  }
}

// Function to handle tab updates
async function handleTabUpdate(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) {
  if (changeInfo.url || changeInfo.status === "complete") {
    const url = tab.url;
    if (!url) return;

    const { isAmazon, orderID } = isAmazonWithOrderId(url);
    const enabled = isAmazon && orderID !== null;

    await updateIcon(tabId, enabled);
  }
}

// Function to handle extension icon clicks
async function handleActionClick(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.id) return;

  const { isAmazon, orderID, tld } = isAmazonWithOrderId(tab.url);

  if (isAmazon && orderID && tld) {
    const archiveUrl = `https://www.amazon.${tld}/gp/css/order-history/archive/archiveModal.html?orderId=${orderID}`;

    try {
      await chrome.tabs.update(tab.id, { url: archiveUrl });
    } catch (error) {
      console.error("Error redirecting to archive:", error);
    }
  }
}

// Set up event listeners
chrome.tabs.onUpdated.addListener(handleTabUpdate);
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
      const { isAmazon, orderID } = isAmazonWithOrderId(tab.url);
      const enabled = isAmazon && orderID !== null;
      await updateIcon(activeInfo.tabId, enabled);
    }
  } catch (error) {
    console.error("Error handling tab activation:", error);
  }
});

chrome.action.onClicked.addListener(handleActionClick);

console.log("Amazon Archive Extension: Background script loaded");
