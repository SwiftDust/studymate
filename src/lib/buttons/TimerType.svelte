<script lang="ts">
    import './timertype.css';
    import './Start.svelte';

    interface Props {
        timerType?: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
        buttonState?: "START" | "PAUSE";
        completedSessions?: any;
    }

    let { 
        timerType = $bindable("POMODORO"), 
        buttonState = $bindable("START"), 
        completedSessions = $bindable({
        completedPomodoros: 0,
        completedShortBreaks: 0,
        completedLongBreaks: 0
        }) 
    }: Props = $props();

    $effect(() => {
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "RESET_TIMER" && message.completedSessions) {
                completedSessions = { ...message.completedSessions };
            }
        });
    });

    const timerOptions = [
        { 
            id: "pomodoro", 
            dataId: "1", 
            value: "POMODORO", 
            label: "Pomodoro", 
            completedKey: "completedPomodoros",
            checked: true
        },
        { 
            id: "shortBreak", 
            dataId: "2", 
            value: "SHORT_BREAK", 
            label: "Short Break", 
            completedKey: "completedShortBreaks",
            checked: false
        },
        { 
            id: "longBreak", 
            dataId: "3", 
            value: "LONG_BREAK", 
            label: "Long Break", 
            completedKey: "completedLongBreaks",
            checked: false
        }
    ];

    const handleClick = () => {
        const pomodoro = document.getElementById('pomodoro') as HTMLInputElement;
        const shortBreak = document.getElementById('shortBreak') as HTMLInputElement;
        const longBreak = document.getElementById('longBreak') as HTMLInputElement;

        if (pomodoro.checked) {
            timerType = "POMODORO";
        } else if (shortBreak.checked) {
            timerType = "SHORT_BREAK";
        } else if (longBreak.checked) {
            timerType = "LONG_BREAK";
        }

        browser.runtime.sendMessage({ type: "INIT_TIMER", timerType });
    }
</script>

<div class="timer-type" data-is="multiswitch">
    <form>
        {#each timerOptions as option}
        <label>
            <input 
                type="radio" 
                id={option.id} 
                data-id={option.dataId} 
                name="timerType" 
                checked={option.checked} 
                onclick={handleClick} 
                disabled={buttonState === "PAUSE"}>
            <span>
                {option.label} 
                {#if completedSessions[option.completedKey] > 0}
                    {#key completedSessions[option.completedKey]}
                        <strong style="font-family: 'Manrope'; line-height: 1;">({completedSessions[option.completedKey]})</strong>
                    {/key}
                {/if}
            </span>
        </label>
        {/each}
        <div id="indicator"></div>
    </form>
</div>
