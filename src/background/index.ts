import Browser from "webextension-polyfill";

class TabRefresher {
  private tabTimers: { [key: number]: number } = {}; // Store interval timers by tabId

  // Start refreshing a specific tab based on its tabId
  startTabRefresh(tabId: number, time: number): void {
    if (this.tabTimers[tabId]) {
      console.log(`Tab ${tabId} is already being refreshed.`);
      return;
    }

    let count = 0;
    let intervalId = setInterval(() => {
      count = (count % time) + 1;
      this.updateBadge(count); // Update badge with current count

      if (count === time) {
        this.refreshTab(tabId); // Refresh the tab when count reaches 30
      }
    }, 1000) as unknown as number; // Explicitly cast the result to number

    this.tabTimers[tabId] = intervalId;
  }

  // Stop refreshing the tab
  stopTabRefresh(tabId: number): void {
    clearInterval(this.tabTimers[tabId]);
    delete this.tabTimers[tabId];
  }

  // Refresh the tab
  private refreshTab(tabId: number): void {
    Browser.tabs.reload(tabId, { bypassCache: true });
  }

  // Update badge text with the count
  private updateBadge(count: number): void {
    Browser.action.setBadgeText({ text: count.toString() });
  }
}

// Initialize the TabRefresher class
const tabRefresher = new TabRefresher();

// Handle messages from the popup or other parts of the extension
Browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, tabId, time } = message;

  if (action === "start") {
    tabRefresher.startTabRefresh(tabId, time);
  } else if (action === "stop") {
    tabRefresher.stopTabRefresh(tabId);
  }
});
