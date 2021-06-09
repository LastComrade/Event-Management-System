// AOS Init
AOS.init();

// Contact Form
const contactButton = document.getElementById("contact-modal");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactMessage = document.querySelector("#contact-message");
const contactConf = document.querySelector("#contact-conf");

const sendContactData = async () => {
    const contact = {
        name: contactName.value,
        email: contactEmail.value,
        message: contactMessage.value,
    };
    const contactData = {
        contact,
    };
    await fetch("/", {      
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    })
        .then(async (res) => {
            const data = await res.json();
            if (data.message) {
                setTimeout(() => {
                    contactConf.classList.value = "text-green-700";
                    contactConf.firstElementChild.innerText = data.message;
                }, 3000);
                contactConf.classList.value = "hidden";
            } else {
                setTimeout(() => {
                    contactConf.classList.value = "text-red-700";
                    contactConf.firstElementChild.innerText =
                        data.error.message;
                }, 3000);
                contactConf.classList.value = "hidden";
            }
        })
        .catch((err) => {
            setTimeout(() => {
                contactConf.classList.value = "text-red-700";
                contactConf.firstElementChild.innerText =
                    "An unexpected error has accured. Please try again later";
            }, 3000);
            contactConf.classList.value = "hidden";
        });
};

const newsLetterInp = document.querySelector("#newsletter-input");
const newsLetterButton = document.querySelector("#newsletter-button");

const sendNewsletterEmail = async () => {
    const data = {
        newsletter: {
            email: newsLetterInp.value,
        },
    };
    await fetch("/newsletter-sub", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(async (res) => {
            const data = await res.json();
            console.log(data);  
            // if (data.message) {
            //     setTimeout(() => {
            //         contactConf.classList.value = "text-green-700";
            //         contactConf.firstElementChild.innerText = data.message;
            //     }, 3000);
            //     contactConf.classList.value = "hidden";
            // } else {
            //     setTimeout(() => {
            //         contactConf.classList.value = "text-red-700";
            //         contactConf.firstElementChild.innerText =
            //             data.error.message;
            //     }, 3000);
            //     contactConf.classList.value = "hidden";
            // }
        })
        .catch((err) => {
            console.log(err);
            // setTimeout(() => {
            //     contactConf.classList.value = "text-red-700";
            //     contactConf.firstElementChild.innerText =
            //         "An unexpected error has accured. Please try again later";
            // }, 3000);
            // contactConf.classList.value = "hidden";
        });
};

contactButton.addEventListener("click", async (e) => {
    e.preventDefault();
    sendContactData();
});

newsLetterButton.addEventListener("click", async (e) => {
    e.preventDefault();
    sendNewsletterEmail();
});
