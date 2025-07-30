import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import AdminPanel from "./pages/AdminPanel";

import ScrollToTop from "./utils/ScrollToTop";
function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/project/create" element={<CreateProject />} />
          <Route path="/admin/project/edit/:id" element={<EditProject />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
