import { useState } from "react";
import { storageAPI } from "../service/storageService";
import { sendRequestToTab } from "../plugin/tabPlugin";
import Browser from "webextension-polyfill";
import { RefresherState } from "../@types/storage";

const App = () => {
  const [interval, setInterval] = useState("5");
  const [isEnabled, setIsEnabled] = useState(false);

  const handleApply = async () => {
    // Here you would typically send a message to your background script
    const [tabs] = await Browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    sendRequestToTab<RefresherState>({
      type: "TAB_REFRESH",
      payload: {
        tabId: String(tabs.id),
        tab: {
          random: false,
          time: {
            time_second: +interval,
          },
          tabId: String(tabs.id),
          tab_info: {
            path_name: "",
            full_url: "",
          },
        },
      },
    });
  };

  return (
    <div className="w-64 p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h1 className="text-xl font-bold mb-4">Tab Refresher</h1>

      <div className="mb-4">
        <label htmlFor="interval" className="block mb-2 text-sm font-medium">
          Refresh Interval (seconds)
        </label>
        <input
          type="number"
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggle"
              className="sr-only"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div
              className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
                isEnabled ? "bg-blue-500" : ""
              }`}
            ></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${
                isEnabled ? "transform translate-x-full" : ""
              }`}
            ></div>
          </div>
          <div className="ml-3 text-sm font-medium">
            {isEnabled ? "Enabled" : "Disabled"}
          </div>
        </label>
      </div>

      <button
        onClick={handleApply}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Apply Settings
      </button>
    </div>
  );
};
export default App;
