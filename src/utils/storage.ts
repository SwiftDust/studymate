import { storage } from "wxt/storage";

export type CompletedSessions = {
  completedPomodoros: number;
  completedShortBreaks: number;
  completedLongBreaks: number;
};

export const completedSessionsStorage = storage.defineItem<CompletedSessions>(
  "sync:completedSessions",
  {
    defaultValue: {
      completedPomodoros: 0,
      completedShortBreaks: 0,
      completedLongBreaks: 0,
    },
  },
);
