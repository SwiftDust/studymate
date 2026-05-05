import { completedSessionsStorage, sessionsLastUpdated } from "@/utils/storage";

import timeUp from "~/assets/sound/time-up.wav";
const timeUpSound = new Audio(timeUp);

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "RESET_TIMER") {
    timeUpSound.play();
    console.log("time up sound played");
  }
});
