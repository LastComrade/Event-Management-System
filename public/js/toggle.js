// Dark mode toggle algorithm and JS Code
const switchToggle = document.querySelector("#switch-toggle"); // Selecting the toggle switch button to make changes to it
let isDarkmode = false; // Initializing a variable to store it in the dark mode

// Constant variable containing html code for dark icon of the toggler
const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>`;

// Constant variable containing html code for light icon of the toggler
const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>`;

const body = document.querySelector("body"); // to select the body tag

// To toggle the value of dark mode and setting it in the local storage
function toggleTheme() {
    isDarkmode = !isDarkmode;
    localStorage.setItem("isDarkmode", isDarkmode);
    switchTheme();
}

// To switch the theme of the website from dark to light or vice - versa
function switchTheme() {
    if (JSON.parse(localStorage.getItem("isDarkmode"))) {
        switchToggle.classList.remove("bg-yellow-500", "-translate-x-2");
        switchToggle.classList.add("bg-gray-700", "translate-x-full");
        setTimeout(() => {
            switchToggle.innerHTML = darkIcon;
        }, 250);
        body.classList.add("dark");
    } else {
        switchToggle.classList.add("bg-yellow-500", "-translate-x-2");
        switchToggle.classList.remove("bg-gray-700", "translate-x-full");
        setTimeout(() => {
            switchToggle.innerHTML = lightIcon;
        }, 250);
        body.classList.remove("dark");
    }
}
switchTheme();