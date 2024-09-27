import { TTab } from "../@types/tab";
import { StorageService } from "./storageService";

export class TabService extends StorageService<TTab[]> {
  private readonly _tabId: string;

  constructor(tabId: string) {
    super(tabId, []);
    this._tabId = tabId;
  }

  getTabId = (): string => this._tabId;

  //   getInformation = async () => (await this.value()) ?? [];
}
