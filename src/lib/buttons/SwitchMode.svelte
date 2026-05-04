<script lang="ts">
    import "./switchmode.css";
    import night from "../../assets/icon/night.svg";

    let isDark = $state(
        document.documentElement.getAttribute("data-theme") === "dark",
    );

    $effect(() => {
        const theme = isDark ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    });
</script>

<label id="theme-switch" for="checkbox_theme">
    <div class="content">
        <img src={night} alt="night" />
        <div class="switch">
            <input type="checkbox" id="checkbox_theme" bind:checked={isDark} />
            <span class="slider"></span>
        </div>
    </div>
</label>
