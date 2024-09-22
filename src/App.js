import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPost from "./components/BlogPost";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectPage from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";

function App() {
  const [posts] = useState([
    {
      id: 1,
      title: "The Evolution of Web Design: From Static to Dynamic",
      date: "September 20, 2024",
      body: `
        <p>Web design has come a long way since the early days of the internet. From simple static pages to complex, interactive web applications, the evolution of web design reflects advancements in technology and changes in user expectations. In this blog post, we’ll explore the major milestones in web design, the technologies that have shaped the industry, and how modern practices are transforming user experiences.</p>
        <br />
        <h3>The Early Days: Static Web Pages</h3>
        <p>In the early 1990s, the web was a static place. Websites were composed of HTML files that presented information in a linear format. These early sites were often basic, with limited styling and no interactivity. The design was primarily focused on delivering content rather than engaging users. Simple text-based pages and basic images characterized this era, with design flexibility limited by the capabilities of HTML and early CSS.</p>
        <br />
        <h3>The Rise of CSS and Web Standards</h3>
        <p>The introduction of Cascading Style Sheets (CSS) in 1996 marked a significant shift in web design. CSS allowed designers to separate content from presentation, making it easier to create visually appealing layouts and maintain consistency across multiple pages. Web standards became a crucial aspect of web design, promoting cross-browser compatibility and accessibility. Designers could now experiment with colors, fonts, and layouts, creating more dynamic and engaging web experiences.</p>
        <br />
        <h3>The Age of Interactivity: JavaScript and AJAX</h3>
        <p>The early 2000s saw the rise of JavaScript, a programming language that brought interactivity to websites. With the introduction of AJAX (Asynchronous JavaScript and XML), developers could create web applications that updated content dynamically without requiring a full page reload. This innovation enabled features like real-time form validation, dynamic content loading, and interactive user interfaces. Websites became more responsive and user-friendly, paving the way for modern web applications.</p>
        <br />
        <h3>The Mobile Revolution and Responsive Design</h3>
        <p>As smartphones and tablets gained popularity, web design had to adapt to different screen sizes and orientations. Responsive web design, introduced by Ethan Marcotte in 2010, allowed websites to adjust their layouts based on the device’s screen size. This approach ensured that users had a consistent experience regardless of whether they were using a desktop, tablet, or smartphone. Media queries and fluid grids became essential tools for creating flexible and adaptive designs.</p>
        <br />
        <h3>The Modern Web: Progressive Web Apps and Beyond</h3>
        <p>Today, web design continues to evolve with the advent of progressive web apps (PWAs) and other modern technologies. PWAs combine the best of web and mobile app experiences, offering offline capabilities, push notifications, and fast loading times. WebAssembly (Wasm) allows developers to run code written in languages other than JavaScript, enhancing performance and enabling more complex applications. The focus is on creating immersive, high-performance experiences that bridge the gap between web and native applications.</p>
        <br />
        <h3>Conclusion</h3>
        <p>The evolution of web design reflects the rapid advancements in technology and changes in user expectations. From static HTML pages to dynamic, responsive web applications, the journey has been marked by significant milestones. As technology continues to advance, web design will undoubtedly continue to evolve, pushing the boundaries of what is possible and creating new opportunities for innovation and creativity.</p>
      `,
    },
    {
      id: 2,
      title: "Understanding JavaScript: The Language of the Web",
      date: "October 5, 2024",
      body: `
        <p>JavaScript has become one of the most essential languages for modern web development. It powers nearly all interactive elements on the web, enabling dynamic content and enhancing user experiences. In this blog post, we’ll take a look at the journey of JavaScript, its key features, and how it's used in modern web development.</p>
        <br />
        <h3>The Origins of JavaScript</h3>
        <p>JavaScript was first introduced in 1995 by Brendan Eich while he was working at Netscape. Originally developed in just 10 days, it was designed to create interactive effects within web browsers. Over time, JavaScript evolved from a simple client-side scripting language into a fully-fledged programming language, integral to front-end and back-end development alike.</p>
        <br />
        <h3>Core Features of JavaScript</h3>
        <p>JavaScript is known for its versatility, offering asynchronous programming, event-driven capabilities, and dynamic typing. It integrates seamlessly with HTML and CSS, allowing developers to create interactive web pages. Additionally, JavaScript features like closures, promises, and arrow functions have made it more efficient for developers to write cleaner, more maintainable code.</p>
        <br />
        <h3>Frameworks and Libraries</h3>
        <p>One of the biggest reasons for JavaScript’s success is the growth of frameworks and libraries that make development faster and more scalable. Libraries like React, Vue.js, and Angular allow developers to build complex, single-page applications with ease. Each of these tools enhances productivity and ensures that developers can create responsive, efficient, and highly interactive web apps.</p>
        <br />
        <h3>JavaScript Beyond the Browser</h3>
        <p>JavaScript is no longer limited to client-side development. With the introduction of Node.js, JavaScript can now be used on the server side as well. This has enabled full-stack JavaScript development, where developers can write both the client-side and server-side code using the same language. This versatility makes JavaScript a powerful tool for developers across the stack.</p>
        <br />
        <h3>The Future of JavaScript</h3>
        <p>JavaScript is constantly evolving, with new features and updates being added to the language each year. ECMAScript 2023, the latest version, includes new features like private methods and improved error handling, making the language even more robust. As JavaScript continues to evolve, its importance in web development is only set to grow, cementing its place as the dominant language of the web.</p>
        <br />
        <h3>Conclusion</h3>
        <p>JavaScript has revolutionized web development, offering a wide range of tools and capabilities for creating dynamic, interactive, and scalable web applications. With its constant evolution and the development of powerful frameworks and libraries, JavaScript will continue to be a driving force in the future of the web.</p>
      `,
    },
    {
      id: 3,
      title: "Responsive Web Design: Adapting to All Devices",
      date: "October 15, 2024",
      body: `
        <p>With the proliferation of devices ranging from smartphones to tablets and desktops, ensuring that your website looks great on all screen sizes has never been more important. Responsive web design (RWD) is the solution, allowing websites to automatically adjust their layout to fit the user’s device. In this post, we’ll explore the principles of responsive web design and how to implement them.</p>
        <br />
        <h3>What is Responsive Web Design?</h3>
        <p>Responsive web design is a web development technique that allows web pages to render well on a variety of devices and screen sizes. Instead of building separate sites for mobile, tablet, and desktop, responsive design ensures that a single site works across all platforms. This is achieved by using fluid grids, flexible images, and media queries in CSS.</p>
        <br />
        <h3>The Importance of Media Queries</h3>
        <p>Media queries are a crucial part of responsive web design. They allow developers to specify different styles based on the device’s characteristics, such as screen width, height, and orientation. For example, you can use a media query to adjust the font size or change the layout when a user switches from landscape to portrait mode on a tablet.</p>
        <br />
        <h3>Fluid Grids and Flexbox</h3>
        <p>Gone are the days of fixed layouts. Responsive design relies on fluid grids that scale content proportionally based on the screen size. Tools like CSS Flexbox and Grid Layout make it easy to create flexible layouts that automatically adjust to fit the available space. Flexbox simplifies aligning elements vertically and horizontally within a container, while CSS Grid offers even more control over complex grid-based layouts.</p>
        <br />
        <h3>Optimizing for Performance</h3>
        <p>Responsive design is not just about visual adjustments; performance is a key factor. Ensuring that images and videos are appropriately sized for different devices can reduce load times and improve the user experience. Tools like srcset and picture in HTML allow developers to serve different images based on the screen size, reducing unnecessary bandwidth usage.</p>
        <br />
        <h3>Conclusion</h3>
        <p>Responsive web design has become a standard practice in modern web development. By using media queries, flexible grids, and optimizing assets for performance, developers can ensure that their websites provide a great user experience on any device. As the number of devices continues to grow, responsive design will remain a fundamental technique in the web development toolkit.</p>
      `,
    },
    {
      id: 4,
      title: "The Role of SEO in Modern Web Design",
      date: "November 5, 2024",
      body: `
        <p>Search Engine Optimization (SEO) plays a crucial role in driving traffic to websites. With billions of websites competing for attention, SEO ensures that your website ranks higher in search engine results pages (SERPs), increasing visibility and attracting more users. In this blog post, we’ll discuss the relationship between web design and SEO, and how to optimize your website for search engines.</p>
        <br />
        <h3>The Importance of SEO in Web Design</h3>
        <p>SEO is not just about adding keywords to your content. It's about creating a website structure, design, and user experience that search engines can easily index and rank. Good web design practices, such as mobile responsiveness, fast loading times, and clear navigation, directly impact SEO performance.</p>
        <br />
        <h3>Mobile-First Design and SEO</h3>
        <p>With Google’s mobile-first indexing, ensuring that your website is mobile-friendly is more important than ever. A responsive, mobile-first design ensures that your website provides a seamless experience across all devices, which search engines reward with higher rankings. Failing to optimize for mobile can result in lower visibility in search results.</p>
        <br />
        <h3>Page Speed and Performance</h3>
        <p>Page speed is a critical ranking factor for SEO. Websites that load slowly can frustrate users and cause them to leave, resulting in higher bounce rates. Tools like Google PageSpeed Insights can help you identify areas for improvement, such as optimizing images, minifying CSS and JavaScript, and leveraging browser caching to enhance loading times.</p>
        <br />
        <h3>Structured Data and Rich Snippets</h3>
        <p>Implementing structured data on your website can help search engines understand your content better. Rich snippets, such as review stars, product information, and event details, can increase your website’s click-through rate by providing additional information directly on the SERP. By adding structured data to your site, you improve its chances of appearing in rich results.</p>
        <br />
        <h3>Conclusion</h3>
        <p>SEO and web design go hand in hand. A well-designed website that prioritizes mobile responsiveness, fast load times, and a clear structure will perform better in search engine rankings. By integrating SEO best practices into your web design process, you can enhance your website’s visibility and attract more organic traffic.</p>
      `,
    },
    {
      id: 5,
      title: "Web Accessibility: Making Your Website Inclusive for All Users",
      date: "December 1, 2024",
      body: `
        <p>Web accessibility ensures that everyone, including individuals with disabilities, can access and use websites effectively. As web developers, it's our responsibility to create inclusive online experiences. In this post, we will explore the importance of web accessibility, the guidelines that govern it, and practical tips to improve accessibility on your website.</p>
        <br />
        <h3>Why Web Accessibility Matters</h3>
        <p>Web accessibility is essential for creating an equitable internet where all users, regardless of their abilities, can interact with digital content. By making websites accessible, businesses can reach a wider audience and improve user satisfaction, while also complying with legal requirements in some regions.</p>
        <br />
        <h3>Key Web Accessibility Guidelines</h3>
        <p>The Web Content Accessibility Guidelines (WCAG) provide a global standard for ensuring web accessibility. These guidelines focus on making web content perceivable, operable, understandable, and robust. Following these principles helps ensure that users with disabilities can navigate and engage with a website.</p>
        <br />
        <h3>Practical Tips for Web Accessibility</h3>
        <ul>
          <li>Provide alternative text (alt text) for images so screen readers can describe them to visually impaired users.</li>
          <li>Ensure that your website is keyboard-navigable, allowing users to interact without a mouse.</li>
          <li>Use proper heading structure (H1, H2, H3) to create clear content hierarchy, which benefits both users and search engines.</li>
          <li>Ensure color contrast meets WCAG standards to make text readable for users with low vision.</li>
        </ul>
        <br />
        <h3>Conclusion</h3>
        <p>Building accessible websites is not just a best practice; it's a necessity. By following accessibility guidelines and implementing inclusive design techniques, you can provide a better experience for all users, fostering inclusivity and expanding your reach.</p>
      `,
    },
    {
      id: 6,
      title:
        "The Rise of Progressive Web Apps (PWAs) in Modern Web Development",
      date: "December 10, 2024",
      body: `
        <p>Progressive Web Apps (PWAs) are changing the landscape of web development by offering a mobile app-like experience within the browser. PWAs combine the best of both web and mobile applications, providing users with fast, reliable, and engaging experiences. In this blog, we’ll explore what PWAs are, their benefits, and why they are becoming increasingly popular in modern web development.</p>
        <br />
        <h3>What Are Progressive Web Apps?</h3>
        <p>PWAs are web applications that leverage modern web technologies to deliver app-like experiences. They are built using HTML, CSS, and JavaScript, but with added features like offline functionality, push notifications, and home screen installation, traditionally found in native apps.</p>
        <br />
        <h3>Benefits of PWAs</h3>
        <ul>
          <li>Offline Access: PWAs use service workers to cache content, allowing users to access your website even when they're offline.</li>
          <li>Improved Performance: PWAs load faster by caching resources, which enhances the user experience, particularly on mobile devices.</li>
          <li>Cross-Platform Compatibility: PWAs work on any device with a browser, eliminating the need for separate native apps for iOS, Android, and desktop.</li>
          <li>Lower Development Costs: Since PWAs are built using web technologies, businesses can reduce development costs by building a single app that works across all platforms.</li>
        </ul>
        <br />
        <h3>Why PWAs Are the Future of Web Development</h3>
        <p>As more users access the internet via mobile devices, PWAs offer a solution that bridges the gap between mobile websites and native apps. With their ability to provide a seamless, fast, and engaging user experience, PWAs are expected to become a standard in web development.</p>
        <br />
        <h3>Conclusion</h3>
        <p>Progressive Web Apps offer numerous advantages for businesses and developers. By adopting PWA technology, you can provide users with a superior experience, boost engagement, and streamline development processes, making it a future-proof choice in modern web development.</p>
      `,
    },
  ]);

  return (
    <div className="App">
      <BlogProvider value={posts}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs">
            <Route index element={<BlogsPage posts={posts} />} />
            <Route path=":id" element={<BlogPost />} />
          </Route>
        </Routes>
        <Footer />
      </BlogProvider>
    </div>
  );
}

export default App;
