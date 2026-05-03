<script lang="ts">
    import {
        POMODORO as pomodoro,
        SHORT_BREAK as shortBreak,
        LONG_BREAK as longBreak,
    } from "@/utils/constants";
    import pauseIcon from "~/assets/icon/pause.png";
    import playIcon from "~/assets/icon/play.png";
    import timeUp from "~/assets/sound/time-up.wav";
    import { onMount } from "svelte";
    import { updateTime } from "../state.svelte";

    const timeUpSound = new Audio(timeUp);

    interface Props {
        buttonState?: "START" | "PAUSE";
        timer?: HTMLElement | null;
        timerType?: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
        completedSessions?: any;
    }

    let {
        buttonState = $bindable("START"),
        timerType = $bindable("POMODORO"),
        completedSessions = $bindable({
            completedPomodoros: 0,
            completedShortBreaks: 0,
            completedLongBreaks: 0,
        }),
    }: Props = $props();

    let timeBetween: number = $state(0);

    onMount(async () => {
        const state = await browser.runtime.sendMessage({ type: "GET_STATE" });
        if (state) {
            timerType = state.timerType;
            completedSessions = state.completedSessions;
        }
        initializeTimer(timerType);
    });

    const getMinutesSeconds = (time: number) => ({
        minutes: String(Math.floor((time / 60000) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((time / 1000) % 60)).padStart(2, "0"),
    });

    const initializeTimer = (
        timerType: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK",
    ) => {
        switch (timerType) {
            case "POMODORO":
                timeBetween = Number(pomodoro);
                break;
            case "SHORT_BREAK":
                timeBetween = Number(shortBreak);
                break;
            case "LONG_BREAK":
                timeBetween = Number(longBreak);
                break;
        }

        const { minutes, seconds } = getMinutesSeconds(timeBetween);
        updateTime(minutes, seconds);
    };

    const resetTimer = () => {
        initializeTimer(timerType);
        buttonState = "START";
    };

    initializeTimer(timerType);

    $effect(() => {
        browser.runtime.onMessage.addListener((message) => {
            if (message.type === "RESET_TIMER") {
                completedSessions = message.completedSessions;
                resetTimer();
            } else if (message.type === "INIT_TIMER") {
                initializeTimer(message.timerType);
            } else if (message.type === "UPDATE_TIMER") {
                if (message.time) {
                    timeBetween = message.time
                        .split(":")
                        .reduce((acc: number, time: string, index: number) => {
                            if (index === 0) {
                                return acc + Number(time) * 60000;
                            } else {
                                return acc + Number(time) * 1000;
                            }
                        }, 0);
                } else if (message.timeValue) {
                    timeBetween = message.timeValue;
                    const { minutes, seconds } = getMinutesSeconds(timeBetween);
                    updateTime(minutes, seconds);
                }
            }
        });
    });

    $effect(() => {
        const { minutes, seconds } = getMinutesSeconds(timeBetween);
        updateTime(minutes, seconds);
    });

    const handleClick = async () => {
        buttonState = buttonState === "START" ? "PAUSE" : "START";

        if (buttonState === "PAUSE") {
            await browser.runtime.sendMessage({
                type: "START_TIMER",
                time: timeBetween,
            });
        } else {
            const response = await browser.runtime.sendMessage({
                type: "PAUSE_TIMER",
                time: timeBetween,
            });
            if (response && response.time) {
                timeBetween = response.time;
            }
        }
    };
</script>

<button id="timerButton" onclick={handleClick}>
    {#if buttonState === "START"}
        <img src={playIcon} width="12" alt="Play" />
    {:else}
        <img src={pauseIcon} width="12" alt="Pause" />
    {/if}
</button>
