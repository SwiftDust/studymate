## Changelog for v0.1.7
- Added a "reset timers" link

### Minor changes
- Fix an issue in ci/cd that prevents autotriggering the release build

<details>
<summary>Looking for older changelogs? Click here!</summary>
## Changelog for v0.1.6
- Added a timer ring component

### Minor changes
- Wrote some unit tests
- Added unit tests to CI/CD
- Added a planning document

### Bug fixes
- Fixed an issue where the timer count wouldn't reset correctly. This issue was introduced in v0.1.5

## Changelog for v0.1.5

- Added a switch where you can switch to light and dark mode, and auto-syncing with device theme to select the default one.
- Made finished timers persist in `localstorage`, and reset after midnight in your local timezone

### Minor changes

- Fixed refresh (issue #1) so the extension can be kept open all the time without any problems
- Upgraded to Svelte 5
- Change GitHub action worker to Bun
  
## Changelog for v0.1.4

- Added a huge service worker which now runs almost all progresses in the background so your timer will stay up and running when you close the pop-up window
- The timer selector now looks way cooler

### Minor changes

- Light mode is fully supported now

### Known Issues

- Certain parts of the popup only updates on refresh (BOUNTY! See issue [#1](https://github.com/ThatFrogDev/studymate/issues/1) for more information.)
- If you don't have the extension open it won't notify you when time's up.

## Changelog for v0.1.3

First release on GitHub. What came before this release: a simple timer, timer chooser, pixel art font, a sound effect and finished timer count.

### Minor changes

- Added GitHub Actions
- Added a pixel art background
- Added a play/pause icon instead of text
</details>
