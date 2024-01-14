import browser from "webextension-polyfill";
import { useEffect, useState } from "react";
import "./Popup.css";
import { getMiliSecond } from "../background";

export default function Popup() {
  const [second, setSecond] = useState<number>(0);

  const click = async () => {
    const mili = Number(second) * 1000;
    browser.storage.local.set({
      second: mili,
    });
  };

  useEffect(() => {
    const getSecond = async () => {
      try {
        const res = await getMiliSecond();
        setSecond(res);
      } catch (err) {
        console.log(err);
      }
    };

    getSecond();
  }, [second]);
  return (
    <div>
      <input
        type="number"
        onChange={(e) => setSecond(Number(e.target.value))}
        placeholder="enter second"
        value={second}
      />
      <button onClick={click}>click me</button>
    </div>
  );
}
