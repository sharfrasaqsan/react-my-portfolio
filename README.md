# React My Portfolio

[![Live Demo](https://img.icons8.com/?size=100&id=UyjPlooIqDBC&format=png&color=000000)](https://sharfrasaqsan.vercel.app/) 

This repository contains the source code for my personal portfolio website, built using React. It showcases my skills, projects, and blog posts, and provides a way for visitors to contact me.

## Features and Functionality

*   **Homepage:** Introduces myself and provides links to key sections of the portfolio.
*   **About:** Provides detailed information about my background, career goals, and experience. Includes a downloadable resume.
*   **Skills:**  Displays my skills across different categories (Frontend, Backend, Tools & Frameworks, Soft Skills) using progress bars. Also includes certifications.
*   **Projects:** Showcases my projects with descriptions, technologies used, live links, and source code links. Includes search functionality for filtering projects.
*   **Blogs:** Displays blog posts with titles and excerpts. Users can click on a blog card to view the full blog details.
*   **Contact:** Allows visitors to send me messages via a contact form.
*   **Admin Panel:**  Allows authorized users to manage projects and blog posts. This section is protected by authentication. Includes functionalities to create, edit and delete projects and blogs.
*   **Dark Mode:**  Allows users to toggle between light and dark themes, with preference saved in local storage.
*   **Responsive Design:**  The website is designed to be responsive and accessible across different devices.
*   **Scroll to Top:** Automatically scrolls to the top of the page when navigating to a new route.

## Technology Stack

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For handling navigation between different pages.
*   **Firebase:** Used for authentication and storing project and blog data.
*   **React Toastify:**  For displaying toast notifications.
*   **Date-fns:** For formatting dates.
*   **Cloudinary:** For image storage.
*   **CSS:** For styling the website. Custom CSS files are located in the `src/styles` directory.
*   **JavaScript (ES6+)**
*   **HTML5**

## Prerequisites

Before running this project, you need to have the following installed:

*   **Node.js:**  (version 16 or higher)
*   **npm** or **yarn:** Package managers for JavaScript.

You also need a Firebase project set up with:

*   **Authentication** enabled (Email/Password sign-in method)
*   **Firestore** database created.
*   Cloudinary account setup to upload project screenshots.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sharfrasaqsan/react-my-portfolio.git
    cd react-my-portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure Firebase:**

    *   Create a `.env` file in the root directory of the project.
    *   Add your Firebase configuration details to the `.env` file.  You can find these in your Firebase project settings. Also add your Cloudinary API Key. The `.env` should look like this. 

    ```
    REACT_APP_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
    REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
    REACT_APP_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
    REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
    REACT_APP_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
    REACT_APP_FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID"
    REACT_APP_CLOUDINARY_URL="YOUR_CLOUDINARY_URL"
    ```

    *   Update `src/firebase.js` with your Firebase configuration: Note that the API key here is just a placeholder and should be replaced with a live value from your environment.

    ```javascript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);

    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

4.  **Set up Admin User:**
    *   Create an admin user in your Firebase Authentication console.
    *   Add the admin user's document to the `admin` collection in the Firestore database. The document ID should be the user's UID from Firebase Authentication. The document should contain at least the admin's email.

## Usage Guide

1.  **Start the development server:**

    ```bash
    npm start # or yarn start
    ```

2.  **Open the website in your browser:**

    Go to `http://localhost:3000` (or the port specified by the development server).

**Admin Panel:**

*   To access the admin panel, navigate to `/admin`.
*   You will be redirected to the login page (`/login`) if you are not authenticated.
*   Use the credentials of the admin user you created in Firebase to log in.
*   Once logged in, you can create, edit, and delete projects and blogs.

**Creating a New Project:**

*   Navigate to `/admin/project/create`.
*   Fill out the project details, including:
    *   Title
    *   Short Description
    *   Description
    *   Technologies (comma-separated)
    *   Screenshot (upload an image)
    *   Live Link (optional)
    *   Repository Link (optional)

**Editing an Existing Project:**

*   Go to the admin panel at `/admin`.
*   Click the "Edit" button next to the project you want to modify.
*   Update the project details and click "Update Project".

**Creating a New Blog Post:**

*   Navigate to `/admin/blog/create`.
*   Enter the blog title and content.

**Editing a Blog Post:**

*   Navigate to `/blogs` then click on any blog post.
*   If logged in as an Admin, an "Edit" button should be visible which redirects to the edit page.

**Contact Form:**

*   The contact form in the `/contact` route sends emails to a backend server.
*   The current implementation utilizes a Node.js server hosted on Vercel (`https://node-portfolio-contact-server.vercel.app/send`).  You may need to deploy your own server or configure a different email sending service.

## API Documentation (Contact Form)

The contact form uses an external API endpoint to send emails.

*   **Endpoint:** `https://node-portfolio-contact-server.vercel.app/send`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Body:**

    ```json
    {
      "name": "Your Name",
      "email": "your@email.com",
      "message": "Your message"
    }
    ```

*   **Response:**

    *   **Success (200 OK):**  Returns a JSON object indicating success.
    *   **Error (500 Internal Server Error):** Returns a JSON object with an error message.

## Contributing Guidelines

Contributions are welcome! To contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request to the `main` branch.

## License Information

This project does not have a specified license. All rights are reserved by the owner.

## Contact/Support Information

If you have any questions or need support, you can contact me through:

*   **Email:**  sharfrasaqsan@gmail.com
*   **GitHub:** [https://github.com/sharfrasaqsan](https://github.com/sharfrasaqsan)
*   **LinkedIn:** [https://www.linkedin.com/in/sharfiras/](https://www.linkedin.com/in/sharfiras/)
*   **Facebook:** [https://facebook.com/sharfras.aqsan97/](https://facebook.com/sharfras.aqsan97/)