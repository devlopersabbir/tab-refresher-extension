import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

const tabIdList: any = {};
