import Browser from "webextension-polyfill";
import { CreateMessageResolver } from "../resolvers";
import { UIStateMessageType } from "../@types";

// ==========================all resolver============================= //
const { addResolver, removeResolver } =
  CreateMessageResolver<UIStateMessageType>();

addResolver("ON_PAGE_LOAD", (payload, sender) => {
  console.log("payload", payload);
  console.log("sender", sender);
});
class TabRefresher {
  public start = (tabId: number, time: number) => {};

  private refreshTab = (tabId: number, bypassCache: boolean = true) => {
    Browser.tabs.reload(tabId, {
      bypassCache,
    });
  };
  private intervalMethod = (time: number, tabId: number) => {};
  public stop = (tabId: number) => {};
}

const tabRefresher = new TabRefresher();

Browser.runtime.onMessage.addListener((message) => {
  const { action, tabId, time } = message;

  if (action === "start") {
    tabRefresher.start(tabId, time);
  } else if (action === "stop") {
    tabRefresher.stop(tabId);
  }
});
