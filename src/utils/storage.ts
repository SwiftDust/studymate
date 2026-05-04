/**
 * @description This file contains the storage items for the extension.
 * @exports CompletedSessions - The type for the completed sessions.
 * @exports completedSessionsStorage - The storage item for the completed sessions.
 * @exports sessionsLastUpdated - The storage item for the last updated time.
 */

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

export const sessionsLastUpdated = storage.defineItem<Date>(
  "sync:sessionsLastUpdated",
  {
    defaultValue: new Date(0),
  },
);
