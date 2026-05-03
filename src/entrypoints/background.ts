import { countdown } from "@/utils/countdown";

export let timerType: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK" = "POMODORO";
export let completedSessions = {
  completedPomodoros: 0,
  completedShortBreaks: 0,
  completedLongBreaks: 0,
};

let interval: NodeJS.Timeout | null = null;
let timeBetween: number;

export default defineBackground(async () => {
  console.log("info> started StudyMate", { id: browser.runtime.id });

  try {
    const exists = await browser.offscreen.hasDocument();
    console.log("offscreen document exists:", exists);
    if (!exists) {
      await browser.offscreen.createDocument({
        url: "/offscreen.html",
        reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
        justification: "to play time up sound when timer ends",
      });
    }
  } catch (e) {
    console.error("offscreen error:", e);
  }

  const playTimer = (time: number) => {
    interval = countdown(
      time,
      (remainingTime) => {
        timeBetween = remainingTime;
        browser.runtime.sendMessage({
          type: "UPDATE_TIMER",
          timeValue: remainingTime,
        });
      },
      () => {
        if (timerType === "POMODORO") {
          completedSessions.completedPomodoros += 1;
        } else if (timerType === "SHORT_BREAK") {
          completedSessions.completedShortBreaks += 1;
        } else if (timerType === "LONG_BREAK") {
          completedSessions.completedLongBreaks += 1;
        }

        browser.runtime.sendMessage({
          type: "RESET_TIMER",
          completedSessions: completedSessions,
        });
      },
    );
  };

  const pauseTimer = () => {
    if (interval !== null) clearInterval(interval);
  };

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_STATE") {
      sendResponse({ timerType, completedSessions });
    } else if (message.type === "START_TIMER") {
      playTimer(message.time);
      sendResponse({ status: "timerStarted", time: message.time });
    } else if (message.type === "PAUSE_TIMER") {
      pauseTimer();
      sendResponse({ status: "timerPaused", time: message.time });
    } else if (message.type === "INIT_TIMER") {
      timerType = message.timerType;
      browser.runtime.sendMessage({
        type: "INIT_TIMER",
        timerType: message.timerType,
      });
    }

    return true;
  });
});
