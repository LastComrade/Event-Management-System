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

// AOS Init
AOS.init();

// Adding departments when view more button is clicked
const deptButton = document.querySelector("#dept_button");
const deptDiv = document.querySelector("#dept_div");

// To show other 6 departments by filling the innerHtml of the parent tag
function showAllDepartments() {
    deptButton.remove();
    deptDiv.innerHTML = `
    <div class="container mx-auto mt-10 px-5 grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div class="rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5">
                <i class="fas fa-chart-line"></i>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Analytical & Research</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <i class="fas fa-laptop-code"></i>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Technical</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <i class="fas fa-pencil-ruler"></i>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Creative Designing</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Content Writing</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Database Management</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Event Management</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Public Relation</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Social Media Marketing</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
        <div class="animate__animated animate__fadeInUp rounded-xl shadow-lg bg-gray-800 hover:bg-black transition ease-in flex flex-col p-8">
            <div
                class="w-16 h-16 inline-flex items-center mx-auto justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0 p-4">
                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg>
            </div>
            <div class="flex-grow text-white">
                <h2 class="text-xl title-font font-medium mb-3 text-center">Stategic Planning</h2>
                <p class="leading-relaxed text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur necessitatibus at
                    nihil! Facilis ratione eius mollitia laboriosam cum eaque, minus reiciendis explicabo fuga,
                    nihil at enim. Perspiciatis, dolore explicabo.
                </p>
            </div>
        </div>
    </div>
    <div class="flex justify-center mr-2 pt-8 lg:mt-2">
        <a type="button" href="https://google.com/" class="focus:outline-none text-white  font-semibold text-sm py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-gray-900 dark:hover:bg-indigo-900 dark:hover:text-white duration-200">Join Us</a>
    </div>
`;
}

// Contact Form
const contactButton = document.getElementById("contact-modal");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactMessage = document.querySelector("#contact-message");
const contactConfGood = document.querySelector("#contact-conf-good");
const contactConfBad = document.querySelector("#contact-conf-bad");
const contactConfServer = document.querySelector("#contact-conf-server");

const sendContactData = async () => {
    const contact = {
        name: contactName.value,
        email: contactEmail.value,
        message: contactMessage.value,
    };
    const contactData = {
        contact,
    };
    if (contact.name === "" || contact.email === "" || contact.message === "") {
        contactConfGood.classList.value = "hidden";
        contactConfServer.classList.value = "hidden";
        contactConfBad.classList.value = "";

        setTimeout(() => {
            contactConfBad.classList.value = "hidden";
        }, 3000);

        return;
    }
    await fetch("https://glacial-journey-62719.herokuapp.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    })
        .then((res) => {
            if (res.status === 200) {
                contactConfBad.classList.value = "hidden";
                contactConfServer.classList.value = "hidden";
                contactConfGood.classList.value = "";
                setTimeout(() => {
                    contactConfGood.classList.value = "hidden";
                }, 3000);
                contactName.value = "";
                contactEmail.value = "";
                contactMessage.value = "";
            } else {
                contactConfBad.classList.value = "hidden";
                contactConfGood.classList.value = "hidden";
                if (contactConfGood.classList.value === "hidden")
                    contactConfGood.classList.toggle("hidden");
                setTimeout(() => {
                    contactConfGood.classList.value = "hidden";
                }, 3000);
            }
        })
        .catch((err) => {
            contactConfBad.classList.value = "hidden";
            contactConfGood.classList.value = "hidden";
            if (contactConfGood.classList.value === "hidden")
                contactConfGood.classList.toggle("hidden");
            setTimeout(() => {
                contactConfGood.classList.value = "hidden";
            }, 3000);
        });
};

contactButton.addEventListener("click", async (e) => {
    e.preventDefault();
    sendContactData();
});
