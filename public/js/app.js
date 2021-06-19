// AOS Init
AOS.init();

// // Contact Form
// const contactButton = document.getElementById("contact-button");
// const contactName = document.querySelector("#contact-name");
// const contactEmail = document.querySelector("#contact-email");
// const contactMessage = document.querySelector("#contact-message");
// const contactConf = document.querySelector("#contact-conf");
// const contactSubmitSpan = document.querySelector("#submit-span");
// const contactSpinner = document.querySelector("#contact-spinner");

// const sendContactData = async () => {
//     // contactSubmitSpan.classList.toggle("hidden");
//     // contactSpinner.classList.toggle("hidden");
//     // const contact = {
//     //     name: contactName.value,
//     //     email: contactEmail.value,
//     //     message: contactMessage.value,
//     // };
//     // const contactData = {
//     //     contact,
//     // };
//     // await fetch("/", {
//     //     method: "POST",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(contactData),
//     // })
//     //     .then(async (res) => {
//     //         const data = await res.json();
//     //         if (data.message) {
//     //             setTimeout(() => {
//     //                 contactSubmitSpan.classList.toggle("hidden");
//     //                 contactSpinner.classList.toggle("hidden");
//     //                 contactConf.classList.value = "text-green-700";
//     //                 contactConf.firstElementChild.innerText = data.message;
//     //             }, 3000);
//     //             contactConf.classList.value = "hidden";
//     //         } else {
//     //             setTimeout(() => {
//     //                 contactSubmitSpan.classList.toggle("hidden");
//     //                 contactSpinner.classList.toggle("hidden");
//     //                 contactConf.classList.value = "text-red-700";
//     //                 contactConf.firstElementChild.innerText =
//     //                     data.error.message;
//     //             }, 3000);
//     //             contactConf.classList.value = "hidden";
//     //         }
//     //     })
//     //     .catch((err) => {
//     //         setTimeout(() => {
//     //             contactSubmitSpan.classList.toggle("hidden");
//     //             contactSpinner.classList.toggle("hidden");
//     //             contactConf.classList.value = "text-red-700";
//     //             contactConf.firstElementChild.innerText =
//     //                 "An unexpected error has accured. Please try again later";
//     //         }, 3000);
//     //         contactConf.classList.value = "hidden";
//     //     });
    
// };

// const newsLetterInp = document.querySelector("#newsletter-input");
// const newsLetterButton = document.querySelector("#newsletter-button");

// const sendNewsletterEmail = async () => {
//     const data = {
//         newsletter: {
//             email: newsLetterInp.value,
//         },
//     };
//     await fetch("/newsletter-sub", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then(async (res) => {
//             const data = await res.json();
//             console.log(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// // contactButton.addEventListener("click", async (e) => {
// //     e.preventDefault();
// //     sendContactData();
// // });

// newsLetterButton.addEventListener("click", async (e) => {
//     e.preventDefault();
//     sendNewsletterEmail();
// });

// contactButton.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("HHA")
//     var serializeForm = function (form) {
//         var obj = {};
//         var formData = new FormData(form);
//         for (var key of formData.keys()) {
//             obj[key] = formData.get(key);
//         }
//         return obj;
//     };
//     console.log(serializeForm);
//     console.log(event);
//     fetch("/", {
//         method: "POST",
//         body: JSON.stringify(serializeForm(new FormData(event.target))),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
// });
