// name: Tab Refresher Pro
////////////////////////////////////////////////
import Browser from "webextension-polyfill";
import { RefresherState } from "../@types/storage";
// import { sendRequestToTab } from "../plugin/tabPlugin";

Browser.tabs.onUpdated.addListener((tabId, _, tab) => {
  const url = tab.url;
  console.log(url);
  console.log(tabId);

  // setTimeout(() => {
  //   Browser.tabs.reload(tabId, {
  //     bypassCache: true,
  //   });
  // }, 10000);
});

Browser.runtime.onMessage.addListener((message: RefresherState) => {
  if (message.type === "TAB_REFRESH") {
    // do something
    setInterval(() => {
      Browser.tabs.reload(Number(message.payload.tabId));
    }, message.payload.tab.time.time_second);
  }
});
