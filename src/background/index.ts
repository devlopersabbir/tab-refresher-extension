// name: Tab Refresher Pro
console.log("hello");

////////////////////////////////////////////////
import Browser from "webextension-polyfill";
import { sendRequestToTab } from "../plugin/tabPlugin";

Browser.tabs.onUpdated.addListener((tabId, _, tab) => {
  const url = tab.url;
  if (url) {
    sendRequestToTab({
      type: "TAB_ID",
      payload: {
        tabId,
      },
    });
  }
});
