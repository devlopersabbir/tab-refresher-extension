// name: Tab Refresher Pro

////////////////////////////////////////////////
import Browser from "webextension-polyfill";
let count = 0;
let intervalId: number | null = null;
let currentTabId: number = 0;
let tabTimes: number = 0;

Browser.runtime.onMessage.addListener(({ tabId, start, time }) => {
  if (start) {
    count = 0;
    tabTimes = time;
    createInterval();
    createAlerm(time);
    currentTabId = tabId;
  } else {
    clearInterval(intervalId!);
    intervalId = null;
  }
});

const createInterval = () => {
  if (intervalId === null) {
    intervalId = setInterval(() => {
      count++;
      if (count === tabTimes) return (count = 0);
      Browser.action.setBadgeText({
        tabId: currentTabId,
        text: `${count}`,
      });
    }, 1000); // Increase count every second
  }
};

const createAlerm = (time: number) => {
  Browser.alarms.create({
    delayInMinutes: time / 60,
    periodInMinutes: time / 60,
  });
};

if (currentTabId === 0) {
  Browser.alarms.clearAll();
}

Browser.alarms.onAlarm.addListener(async () => {
  Browser.tabs.reload(currentTabId, {
    bypassCache: true,
  });
});
