// name: Tab Refresher Pro

////////////////////////////////////////////////
import browser from "webextension-polyfill";

export const getMiliSecond = async (): Promise<number> => {
  const res = await browser.storage.local.get("second");
  return res.second;
};

browser.contextMenus.create({
  id: "fucking-reload",
  title: "context menu",
  contexts: ["all"],
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const second = await getMiliSecond();

  setInterval(() => {
    browser.tabs.reload(tab?.id);
  }, second);
});

// import { status } from "./libs";

// background.ts

// Event listener for messages from popup.js
// browser.runtime.onMessage.addListener(function (
//   request,
//   sender,
//   sendResponse: any
// ) {
//   console.log("sender", sender);
//   if (request.greeting === "hello") {
//     // Process the message and send a response back to popup.js
//     const responseMessage = "Hello from background.js!";
//     sendResponse({ message: responseMessage });
//   }
// });

// let index: number = 0;
// browser.alarms.create("example", {
//   periodInMinutes: 1 / 100,
// });

// browser.alarms.onAlarm.addListener(async (name) => {
//   // console.log("name", name);
//   index++;
//   if (index === 5) {
//     await browser.alarms.clear("exmaple");
//   }
//   console.log(index);
// });

// /** set extension initial status */
// status("OFF");
// /** status defining done */

// /** Map to store tab intervals */
// const tabIntervals = new Map<number, string>();
// const refreshInterval = 5;

// /** auto reloading functions */
// browser.storage.onChanged.addListener((changes) => {
//   console.log(changes);
// });

// /** refresh tab based on tab ID */
// const refreshTab = (tabId: number) => browser.tabs.reload(tabId);

// /** Function to start the refresh interval for a specific tab */
// const startRefreshInterval = (tabId: number) => {
//   if (!tabIntervals.has(tabId)) {
//     const alarmName = `refreshAlarm_${tabId}`;
//     browser.alarms.create(alarmName, {
//       periodInMinutes: 1, // need to change
//     });
//     tabIntervals.set(tabId, alarmName);
//   }
// };

// /** Function to stop the refresh interval for a specific tab */
// const stopRefreshInterval = (tabId: number) => {
//   const alarmName = tabIntervals.get(tabId);
//   if (alarmName) {
//     browser.alarms.clear(alarmName);
//     tabIntervals.delete(tabId);
//   }
// };

// /** Event listener for when the alarm is triggered */
// browser.alarms.onAlarm.addListener(({ name }) => {
//   console.log("alram name: ", name);
//   const tabId = parseInt(name.split("_")[1], 10);
//   refreshTab(tabId);
// });
// // let tabIdList: any = [];

// // browser.tabs.onUpdated.addListener(
// //   (tabId: number, changeInfo: browser.Tabs.OnUpdatedChangeInfoType) => {
// //     tabIdList = [...tabIdList, tabId];
// //     // console.log("tab id: ", tabId);
// //     console.log("list of tabs...: ", tabIdList);
// //   }
// // );
// // console.log("list of tab: ", tabIdList);

// // // **** Create Tab Reload *** //
// // const createReload = async () => {
// //   const tabs = await browser.tabs.query({
// //     active: true,
// //     currentWindow: true,
// //     windowType: "normal",
// //   });
// //   console.log("Tabs: ", tabs);
// // };

// // createReload();
