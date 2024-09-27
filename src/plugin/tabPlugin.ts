import Browser from "webextension-polyfill";
import { RequestType } from "../@types";

export async function sendRequestToTab<RQST extends RequestType, RSP = unknown>(
  message: RQST
): Promise<RSP> {
  const response = await Browser.runtime.sendMessage(message);
  return response as RSP;
}
