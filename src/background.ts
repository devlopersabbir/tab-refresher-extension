import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

let tabIdList: any = [];

browser.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: browser.Tabs.OnUpdatedChangeInfoType) => {
    tabIdList = [...tabIdList, tabId];
    // console.log("tab id: ", tabId);
    console.log("list of tab: ", tabIdList);
  }
);
console.log("list of tab: ", tabIdList);

// **** Create Tab Reload *** //
const createReload = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
    windowType: "normal",
  });
  console.log(tabs);
};
