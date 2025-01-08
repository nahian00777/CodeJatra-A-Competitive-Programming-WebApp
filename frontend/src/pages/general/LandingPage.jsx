import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/mystyle.css";
import myImage from "../../assets/images/LOGOBRIGHT.jpg";
import group_ from "../../assets/images/group_.jpg";
import heroImage from "../../assets/images/hero-1.jpg";
import counterImage from "../../assets/images/counter.jpg";

const heroStyles = {
  background: `linear-gradient(#00000042, #0000004d), url(${heroImage}) center / cover`,
};
const counterStyles = {
  background: `linear-gradient(#00000042, #0000004d), url(${counterImage}) center / cover`,
};
const ContactStyles = {
  background: `linear-gradient(#00000021,#00000017), url(${counterImage}) center / cover`,
};

export default function LandingPage() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top">
        <div className="container">
          <a className="navbar-brand" href="landingpage.php">
            <img
              src={myImage}
              alt="notfound"
              style={{ maxHeight: "50px", maxWidth: "50px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#hero">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  At a Glance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <a href="LogIn.php" className="btn btn-brand ms-lg-3">
              Join Us
            </a>
          </div>
        </div>
      </nav>
      {/* HOME */}
      <section
        id="hero"
        style={heroStyles}
        class="min-vh-100 d-flex align-items-center text-center"
      >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h1 class="text-white fw-semibold display-1">
                Welcome to CODEJATRA
              </h1>
              <h5 class="text-white mt-3 mb-4">Track Transform Triumph</h5>
              <div>
                <a href="LogIn.php" class="btn btn-brand me-2">
                  GET STARTED
                </a>
                <a href="#services" class="btn btn-light ms-2">
                  Our Services
                </a>
                <a
                  href="#"
                  class="btn btn-brand ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#faqModal"
                >
                  FAQs & Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About */}
      <section id="about" class="section-padding">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="section-title ">
                <h1 class="display-4 fw-semibold">About Us</h1>
                <div class="line"></div>
                <p>
                  We are a community who are trying to help you by tracking your
                  progress in programming and serving you up-to-date news of
                  programming contests
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-6">
              <img src={group_} alt="not found" />
            </div>
            <div class="col-lg-5">
              <h1>About CodeJatra</h1>
              <p class="mt-3 mb-4">
                This platform tries to track your activity and interactions with
                different judges throughout the year
              </p>
              <div class="d-flex pt-4 mb-3">
                <div class="iconbox me-4">
                  <i class="ri-mail-send-fill"></i>
                </div>
                <div>
                  <h5>We are Unstopbble</h5>
                  <p>
                    The more programming contests are held, the more we get
                    stronger
                  </p>
                </div>
              </div>

              <div class="d-flex mb-3">
                <div class="iconbox me-4">
                  <i class="ri-user-5-fill"></i>
                </div>
                <div>
                  <h5>We are invincible</h5>
                  <p>
                    We are alive with the best possible ways of getting
                    info.Updated news comes to us with zero obstacle
                  </p>
                </div>
              </div>

              <div class="d-flex">
                <div class="iconbox me-4">
                  <i class="ri-rocket-2-fill"></i>
                </div>
                <div>
                  <h5>We are the best</h5>
                  <p>
                    In your coding journey we are with you and helping you all
                    the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services */}
      <section id="services" class="section-padding border-top">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="section-title ">
                <h1 class="display-4 fw-semibold">Awesome Services</h1>
                <div class="line"></div>
                <p>
                  We provide almost all possible services to help you with
                  tracking your journey.Let's enjoy the whole process together
                </p>
              </div>
            </div>
          </div>
          <div class="row g-4 text-center">
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">IUPC Update</h5>
                <p>
                  We provide all types of information and updates of upcoming
                  IUPCs.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">Contest Update</h5>
                <p>
                  We provide information of upcoming contest of different online
                  judges
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">Progress tracking</h5>
                <p>
                  We track activity on different judges and notify overall
                  progress of persons
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">Solve trending problem</h5>
                <p>
                  One will get to know which problems are trending in the recent
                  times
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">Favourite problems</h5>
                <p>
                  We provide to-do-list service to save individuals favourite
                  problems or contest
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="service theme-shadow p-lg-5 p-4">
                <div class="iconbox">
                  <i class="ri-stack-fill"></i>
                </div>
                <h5 class="mt-4 mb-2">Up to date</h5>
                <p>
                  Always gets the latest news of contest and all types of
                  updates of contests
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Counter */}
      <section id="counter" style={counterStyles} class="section-padding">
        <div class="container text-center">
          <div class="row g-4">
            <div class="col-lg-3 col-sm-6">
              <h1 class="text-white display-4">1000+</h1>
              <h6 class="text-uppercase mt-3 text-white">Total Users</h6>
            </div>
            <div class="col-lg-3 col-sm-6">
              <h1 class="text-white display-4">10000+</h1>
              <h6 class="text-uppercase mt-3 text-white">Total problems</h6>
            </div>
            <div class="col-lg-3 col-sm-6">
              <h1 class="text-white display-4">29957+</h1>
              <h6 class="text-uppercase mt-3 text-white">Total contest</h6>
            </div>
            <div class="col-lg-3 col-sm-6">
              <h1 class="text-white display-4">3+</h1>
              <h6 class="text-uppercase mt-3 text-white">Team leads</h6>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio */}
      <section id="portfolio" class="section-padding">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="section-title ">
                <h1 class="display-4 fw-semibold">At a Glance</h1>
                <div class="line"></div>
                <p>
                  We are try to track your performance with the help of
                  different online judges where you code.
                </p>
              </div>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="portfolio-item image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-11.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-11.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
              <div class="portfolio-item image-zoom mt-4">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-22.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-22.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
            </div>
            <div class="col-md-4">
              <div class="portfolio-item image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-33.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-33.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
              <div class="portfolio-item image-zoom mt-4">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-44.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-44.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
            </div>
            <div class="col-md-4">
              <div class="portfolio-item image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-55.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-55.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
              <div class="portfolio-item image-zoom mt-4">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/project-66.jpg" alt=""> */}
                </div>
                <a
                  href="./image/project-66.jpg"
                  data-fancybox="gallery"
                  class="iconbox"
                >
                  <i class="ri-search-2-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team */}
      <section id="team" class="section-padding">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="section-title ">
                <h1 class="display-4 fw-semibold">Team Members</h1>
                <div class="line"></div>
                <p>
                  A strong backbone is present in our case.They are the pillars
                  of this community.
                </p>
              </div>
            </div>
          </div>
          <div class="row g-4 text-center">
            <div class="col-md-4">
              <div class="team-member image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/person-1.jpg" alt=""> */}
                </div>
                <div class="team-member-content">
                  <h4 class="text-white">Sojib Bhattacharjee</h4>
                  <p class="mb-0 text-white">
                    A passionate programmer, developer, ML expert.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-member image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/sagor2.jpg" alt=""> */}
                </div>
                <div class="team-member-content">
                  <h4 class="text-white">MD Sagor Chowdhury</h4>
                  <p class="mb-0 text-white">
                    A simple person with a learning desire.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="team-member image-zoom">
                <div class="image-zoom-wrapper">
                  {/* <img src="./image/person-3.jpg" alt=""> */}
                </div>
                <div class="team-member-content">
                  <h4 class="text-white">Adnan Faisal</h4>
                  <p class="mb-0 text-white">
                    The lead of this community with great leadership quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us */}

      <section
        style={ContactStyles}
        class="section-padding bg-light"
        id="contact"
      >
        <div class="container">
          <div class="row">
            <div
              class="col-12 text-center"
              data-aos="fade-down"
              data-aos-delay="150"
            >
              <div class="section-title">
                <h1 class="display-4 text-white fw-semibold">Get in touch</h1>
                <div class="line bg-white"></div>
                <p class="text-white">
                  Let us know what's your thought about us.Help us to grow with
                  your valuable insights and ideas.
                </p>
              </div>
            </div>
          </div>
          <div
            class="row justify-content-center"
            data-aos="fade-down"
            data-aos-delay="250"
          >
            <div class="col-lg-8">
              <form
                id="contactForm"
                method="POST"
                class="row g-3 p-lg-5 p-4 bg-white theme-shadow"
              >
                <div class="form-group col-lg-6">
                  <input
                    type="text"
                    name="Firstname"
                    class="form-control"
                    placeholder="Enter first name"
                  />
                </div>
                <div class="form-group col-lg-6">
                  <input
                    type="text"
                    name="Secondname"
                    class="form-control"
                    placeholder="Enter last name"
                  />
                </div>
                <div class="form-group col-lg-12">
                  <input
                    type="email"
                    name="Email"
                    class="form-control"
                    placeholder="Enter Email address"
                  />
                </div>
                <div class="form-group col-lg-12">
                  <input
                    type="text"
                    name="Subject"
                    class="form-control"
                    placeholder="Enter subject"
                  />
                </div>
                <div class="form-group col-lg-12">
                  <textarea
                    type="text"
                    name="Message"
                    rows="5"
                    class="form-control"
                    placeholder="Enter Message"
                  ></textarea>
                </div>
                <div class="form-group col-lg-12 d-grid">
                  <button class="btn btn-brand" type="submit" name="FORM">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer class="bg-dark">
        <div class="footer-top">
          <div class="container">
            <div class="row gy-5">
              <div class="col-lg-3 col-sm-6">
                {/* <a href="#"><img src="/image/LOGOBRIGHT.jpg" alt="" style="max-height: 50px; max-width: 50px;"></a> */}
                <div class="line"></div>
                <p>Waiting to grow and help individuals to grow</p>
                <div class="social-icons">
                  <a href="#">
                    <i class="ri-twitter-fill"></i>
                  </a>
                  <a href="#">
                    <i class="ri-instagram-fill"></i>
                  </a>
                  <a href="#">
                    <i class="ri-github-fill"></i>
                  </a>
                  <a href="#">
                    <i class="ri-facebook-fill"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <h5 class="mb-0 text-white">SERVICES</h5>
                <div class="line"></div>
                <ul>
                  <li>
                    <a href="#services">Contest Schedules</a>
                  </li>
                  <li>
                    <a href="#services">Progress track</a>
                  </li>
                  <li>
                    <a href="#services">Up to date problems</a>
                  </li>
                  <li>
                    <a href="#services">IUPC's track</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-sm-6">
                <h5 class="mb-0 text-white">ABOUT</h5>
                <div class="line"></div>
                <ul>
                  <li>
                    <a href="#portfolio">At a glance</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#team">Members</a>
                  </li>
                  <li>
                    <a href="#about">Goal</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-sm-6">
                <h5 class="mb-0 text-white">CONTACT</h5>
                <div class="line"></div>
                <ul>
                  <li>Chittagong, ctg 3300</li>
                  <li>(414) 586 - 3017</li>
                  <li>www.codejatra.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="row g-4 justify-content-between">
              <div class="col-auto">
                <p class="mb-0">© Copyright Codejatra. All Rights Reserved</p>
              </div>
              <div class="col-auto">
                <p class="mb-0">
                  Designed with 💜 By <a href="#">Codejatra</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
