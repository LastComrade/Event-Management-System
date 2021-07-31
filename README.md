# Events-based-organizational-website

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

The official codebase for college-based (event managing) organizations. FOUR-LEVEL Authorization system and scalable. All the necessary commands and software required for the installation of this project locally are listed below.

**Demo Link** - [Click Here](https://events-based-org.herokuapp.com/) *(Opens a link of Heroku deployment in the new tab)*

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#1-cloning-the-repository">Cloning the repository</a></li>
        <li>
        <a href="#2-installing-all-the-necessary-npm-packages">Installing all the necessary NPM packages</a>
        </li>
        <li>
        <a href="#3-setup-the-environment-variables">Setup the environment variables</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#project">Project</a>
      <ul>
        <li><a href="#1-routes-get">Routes (GET)</a></li>
        <li><a href="#2-front-end">Front-End</a></li>
        <li><a href="#3-back-end">Back-End</a></li>
        <li><a href="#4-seeds">Seeds</a></li>
        <li><a href="#5-apis">APIs</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Installation

---

### 1. Cloning the repository

Run the ```git clone``` command to clone this repository locally in your machine. You can run this command in CMD, GIT Bash, and obviously in the terminal (For macOS and Linux machines)

```bash
git clone https://github.com/LastComrade/Events-based-organizational-website.git
```

### 2. Installing all the necessary NPM packages

Software required -

1. [NodeJS](https://nodejs.org/en/) (LTS version is preferred)
2. [GIT](https://git-scm.com/)
3. [MongoDB](https://www.mongodb.com/try/download/community) (Stable version is preferred)

Run the ```npm install``` command to install all the necessary dependencies for this project.

```bash
npm install
```

### 3. Setup the environment variables

For reference take the help of the [.env.example](https://github.com/LastComrade/Events-based-organizational-website/blob/main/.env.example) file.

## Usage

---

1. After the successful installation of the MongoDB. Run this command to run the database server locally in your machine

```bash
mongod
```

2. Now, run the ```npm run dev``` command to start the server with the ```port 3000```

```bash
npm run dev
```

3. Configure your environment variables.

> Project should be up and running with the URL - ```http://localhost:3000``` locally.

## Project

> For front-end Tailwind CSS and EJS templating engine is used and for back-end Express (NodeJS Framework) is used. MongoDB is used as the database.

### 1. Routes (GET)

>#### Home Routes

- **/ -** Home page.
- **/credits -** Credits page.

>#### Event Routes

- **/events -** List the latest top 4 events from available categories.
- **/events/{name_of_the_event} -** Dedicated event page.
- **/events/live/all -** List all the live events (webninars or events/content that are streamed live).

---

- **/events/upcoming/all -** List all the upcoming events.
- **/events/ongoing/all -** List all the ongoing events.
- **/events/archived/all -** List all the archived events.

>#### Department Routes

- **/departments -** List all the departments with their name, image, and description.
- **/departments/{name_of_the_department} -** Dedicated department page.

>#### Authentication Routes

- **/staff-register -** Registration route for staff member.
- **/staff-login -** Login route for staff member.
- **/staff-logout -** Logout route for staff member.
- **/forgot-password -** Forgot password route renders a page asking for the email to verify.

>#### Dashboard Routes

- **/dashboard -** Render the dashboard page.
- **/dashboard/board -** List all the staff members account and their details in a table.
- **/dashboard/contact-messages -** List 15 latest contact message notifications.

---

- **/dashboard/contact-messages/all -** List all the contact message notifications.
- **/dashboard/contact-messages/{ID_of_the_contact_message} -** Contact message.
- **/dashboard/department -** Renders a form to edit the department information.

---

- **/dashboard/events -** Index all the events in a table with all their necessary information.
- **/dashboard/event-create -** Form to create a new event.
- **/dashboard/events/{name_of_the_event}/participants/ -** List all the participants that registered for that particular event.
- **/dashboard/events/{ID_of_the_event}/edit -** Form to edit an existing event.

---

- **/dashboard/internship-applications -** List 15 latest internship application notifications.
- **/dashboard/internship-applications/all -** List all internship applicatin notifications.
- **/dashboard/internship-applications/{ID_of_the_internship_application} -** Internship application.

---

- **/dashboard/generate-key -** Generate a key, which is used when a user tries to register as a staff member.
- **/dashboard/magazine-subscribers -** List all the subscribers, who have subscribed to the magazine.

---

- **/dashboard/participants -** List all the participants, who have recently registered for any event.
- **/dashboard/participants/{ID_of_the_participant} -** List all the events that are registered by that particular participant.
- **/dashboard/profile -** Index the profile edit form.

### 2. Front-End

- **Public Folder -** Folder contains all the static files like CSS, JS scripts, and third party libraries files.
- **Views Folder -** Folder that contains all the EJS files. It's divided into three sections
  - *Home* - EJS files for home routes
  - *Auth* - EJS files for authentication routes
  - *Dashboard* - EJS files for dashboard routes
  - *Archive* - Archived EJS files that are not used in the main branch

> Note: Every above folder has a sub-folder named sections to organize different sections of pages.

### 3. Back-End

- **Controllers -** All the core functionality in the form of functions
  - *DashboardCont -* Controller for dashboard functionality
  - *DeptCont -* Controller for department functionality
  - *EventCont -* Controller for event functionality
  - *HomeCont -* Controller for home functionality
  - *StaffCont -* Controller for staff authentication functionality
- **Middlewares -** All the request-based functions. For validation of form data, authentication, and authorization.
  - *Auth* - Middleware for authentication and authorization
  - *Validation* - Middleware for validation of different forms data
- **Models -** Mongoose used as the ODM for MongoDB.

### 4. Seeds

- For testing purposes, seeds are used to seed the DB with staff, departments, events, and participants data.

### 5. APIs

- Google Sheets API is used to store the information of the event participants and magazine subscribers.
- Gmail API is used to send E-Mails.

## Contributing

---

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

---

[MIT](https://choosealicense.com/licenses/mit/) |
Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Konark Lohat - [@konarklohat](https://www.instagram.com/konarklohat/) - konarklohat123456@gmail.com

Project Link: [https://github.com/LastComrade/Events-based-organizational-website](https://github.com/LastComrade/Events-based-organizational-website)

[contributors-shield]: https://img.shields.io/github/contributors/LastComrade/Events-based-organizational-website.svg?style=for-the-badge
[contributors-url]: https://github.com/LastComrade/Events-based-organizational-website/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LastComrade/Events-based-organizational-website.svg?style=for-the-badge
[forks-url]: https://github.com/LastComrade/Events-based-organizational-website/network/members
[stars-shield]: https://img.shields.io/github/stars/LastComrade/Events-based-organizational-website.svg?style=for-the-badge
[stars-url]: https://github.com/LastComrade/Events-based-organizational-website/stargazers
[issues-shield]: https://img.shields.io/github/issues/LastComrade/Events-based-organizational-website.svg?style=for-the-badge
[issues-url]: https://github.com/LastComrade/Events-based-organizational-website/issues
[license-shield]: https://img.shields.io/github/license/LastComrade/Events-based-organizational-website.svg?style=for-the-badge
[license-url]: https://github.com/LastComrade/Events-based-organizational-website/blob/c2693deb214f7c46411053cfbc5e5ad9573a7b7c/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/konark-lohat/
