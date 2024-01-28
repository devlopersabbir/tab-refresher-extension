const btn = document.querySelector("#btn");
const time = document.querySelector("#times");

btn.addEventListener("click", async () => {
  if (time.value) {
    console.log("time:", time.value);
    try {
      // send message & storage times
      const [tab] = await chrome.tabs.query({
        currentWindow: true,
        active: true,
      });
      if (tab.id) {
        await chrome.runtime.sendMessage({
          time: time.value,
          tabId: tab.id,
          start: true,
        });
        console.log("sended!");
      }
    } catch (err) {
      console.log(err);
    }
  }
});
