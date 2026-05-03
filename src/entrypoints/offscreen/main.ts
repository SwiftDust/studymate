import timeUp from "~/assets/sound/time-up.wav";
const timeUpSound = new Audio(timeUp);

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "RESET_TIMER") {
    timeUpSound.play();
    console.log("time up sound played");
  }
});
