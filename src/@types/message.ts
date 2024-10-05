export type UIStateMessageType =
  | {
      type: "ON_PAGE_LOAD";
      payload: {
        tabId: number;
      };
    }
  | {
      type: "ERROR";
      payload: {
        tabId: number;
        error: string;
      };
    };
