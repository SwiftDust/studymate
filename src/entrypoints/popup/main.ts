import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

function detectColorScheme() {
  var theme = "light";

  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      theme = "dark";
    }
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }

  if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
detectColorScheme();

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
