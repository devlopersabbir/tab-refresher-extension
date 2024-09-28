// name: Tab Refresher Pro
////////////////////////////////////////////////
import Browser from "webextension-polyfill";
import { RefresherState } from "../@types/storage";
import { storageAPI } from "../service/storageService";
// import { sendRequestToTab } from "../plugin/tabPlugin";

// state
let count = 0;
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

storageAPI.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "refresh") {
      // page reloading
      function reloadPage() {
        Browser.tabs.reload(Number(newValue.tabId), {
          bypassCache: true,
        });
        count++;
      }
      // create interval
      const interval = setInterval(reloadPage, Number(newValue.time) * 1000);
      // remove interval if isEnabled is false
      if (!newValue.isEnabled) {
        clearInterval(interval);
        count = 0;
      }
    }
  }
});

// Browser.runtime.onMessage.addListener((message: RefresherState) => {
//   if (message.type === "TAB_REFRESH") {
//     // do something
//     setInterval(() => {
//       Browser.tabs.reload(Number(message.payload.tabId));
//     }, message.payload.tab.time.time_second);
//   }
// });
