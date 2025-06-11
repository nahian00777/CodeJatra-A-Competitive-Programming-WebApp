import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  Trophy,
  TrendingUp,
  Heart,
  Bell,
  Users,
  MapPin,
  Phone,
  Globe,
  Twitter,
  Instagram,
  Github,
  Facebook,
  Send,
  Rocket,
  User,
  Shield,
  Code,
} from "lucide-react";
import myImage from "../../assets/images/LOGOBRIGHT.jpg";
import group_ from "../../assets/images/group_.jpg";
import bodda from "../../assets/images/bodda.png";
import nahian from "../../assets/images/nahian.png";
import sojib from "../../assets/images/sojib.png";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={myImage}
                  alt="CODEJATRA Logo"
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  CODEJATRA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#hero"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  About
                </a>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Services
                </a>
                <a
                  href="#team"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Team
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Contact
                </a>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Join Us
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-800/95 backdrop-blur-lg rounded-xl mt-2 p-4 border border-gray-700">
              <div className="space-y-2">
                <a
                  href="#hero"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  About
                </a>
                <a
                  href="#services"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Services
                </a>
                <a
                  href="#team"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Team
                </a>
                <a
                  href="#contact"
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Contact
                </a>
                <Link
                  to="/register"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg text-center"
                >
                  Join Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen w-full flex items-center relative overflow-hidden bg-gray-900"
      >
        {/* Background Gradient Shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-indigo-600/30 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-tight">
                Welcome to CODEJATRA
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                The ultimate platform for competitive programmers. Hone your
                skills, challenge peers in real-time coding duels, and climb the
                leaderboards.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/login"
                  className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 transform hover:scale-105 flex items-center"
                >
                  GET STARTED
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Element (Code Block) */}
            <div className="hidden lg:block">
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-sm p-4 animate-pulse-slow">
                {/* Fake Window Controls */}
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                {/* Fake Code */}
                <pre>
                  <code className="language-javascript text-sm">
                    <span className="text-purple-400">class</span>{" "}
                    <span className="text-green-400">Player</span> {"{"}
                    {"\n"}
                    {"  "}
                    <span className="text-purple-400">constructor</span>(
                    <span className="text-orange-400">name</span>,{" "}
                    <span className="text-orange-400">rank</span>) {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">this</span>.name = name;
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">this</span>.rank = rank;
                    {"\n"}
                    {"  "}
                    {"}"}
                    {"\n"}
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">challenge</span>(
                    <span className="text-orange-400">opponent</span>) {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-gray-500">
                      // Initiate the coding duel...
                    </span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">console</span>.
                    <span className="text-yellow-400">log</span>(
                    <span className="text-teal-300">
                      `Duel started: ${"{"}
                      <span className="text-blue-400">this</span>.name{"}"} vs $
                      {"{"}
                      <span className="text-orange-400">opponent</span>.name
                      {"}"}`
                    </span>
                    );
                    {"\n"}
                    {"  "}
                    {"}"}
                    {"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are a community who are trying to help you by tracking your
              progress in programming and serving you up-to-date news of
              programming contests
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <img
                src={group_}
                alt="A group of people collaborating"
                className="rounded-xl w-full h-auto"
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white">About CodeJatra</h3>
              <p className="text-gray-300 text-lg">
                This platform tries to track your activity and interactions with
                different judges throughout the year
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      We are Unstoppable
                    </h4>
                    <p className="text-gray-400">
                      The more programming contests are held, the more we get
                      stronger
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-15 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-12 h-11 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      We are Invincible
                    </h4>
                    <p className="text-gray-400">
                      We are alive with the best possible ways of getting info.
                      Updated news comes to us with zero obstacle
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      We are the Best
                    </h4>
                    <p className="text-gray-400">
                      In your coding journey we are with you and helping you all
                      the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Awesome Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide almost all possible services to help you with tracking
              your journey. Let's enjoy the whole process together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "IUPC Update",
                desc: "We provide all types of information and updates of upcoming IUPCs.",
              },
              {
                icon: Bell,
                title: "Contest Update",
                desc: "We provide information of upcoming contest of different online judges",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                desc: "We track activity on different judges and notify overall progress of persons",
              },
              {
                icon: Code,
                title: "Solve Trending Problem",
                desc: "One will get to know which problems are trending in the recent times",
              },
              {
                icon: Heart,
                title: "Favourite Problems",
                desc: "We provide to-do-list service to save individuals favourite problems or contest",
              },
              {
                icon: Bell,
                title: "Up to Date",
                desc: "Always gets the latest news of contest and all types of updates of contests",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Total Users" },
              { number: "10000+", label: "Total Problems" },
              { number: "29957+", label: "Total Contest" },
              { number: "3+", label: "Team Leads" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/30"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.number}
                </h3>
                <p className="text-gray-300 uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Team Members
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A strong backbone is present in our case. They are the pillars of
              this community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sajib Bhattacharjee",
                role: "A passionate programmer, developer, ML expert.",
                image: sojib,
              },
              {
                name: "MD Sagor Chowdhury",
                role: "A simple person with a learning desire.",
                image: bodda,
              },
              {
                name: "Nahian Chowdhury",
                role: "The lead of this community with great leadership quality",
                image: nahian,
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-105 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg object-cover"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Redesigned */}
      <section id="contact" className="py-24 bg-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
            <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mt-6">
              Have a question, a suggestion, or just want to say hello? We'd
              love to hear from you.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-x-12 items-center bg-gray-800/40 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
            {/* Left Column: Contact Info */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-gray-400 mb-8">
                Fill out the form, or reach us directly through one of the
                channels below during standard business hours.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg text-white font-semibold">
                      Our Location
                    </h4>
                    <span className="text-gray-400">
                      Chittagong, CTG 4000, Bangladesh
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg text-white font-semibold">
                      Phone Number
                    </h4>
                    <span className="text-gray-400">(+880) 123-456-7890</span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Globe className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg text-white font-semibold">
                      Website
                    </h4>
                    <span className="text-gray-400">www.codejatra.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <form className="mt-10 lg:mt-0">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 resize-none transition-colors"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-indigo-500/40 transform hover:scale-105 flex items-center justify-center"
                >
                  Send Message <Send className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <img
                  src={myImage}
                  alt="CODEJATRA Logo"
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  CODEJATRA
                </span>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"></div>
              <p className="text-gray-400 mb-6">
                Waiting to grow and help individuals to grow
              </p>
              <div className="flex space-x-4">
                {[Twitter, Instagram, Github, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-gray-700/50 transition-colors border border-gray-700"
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">SERVICES</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"></div>
              <ul className="space-y-3">
                {[
                  "Contest Schedules",
                  "Progress track",
                  "Up to date problems",
                  "IUPC's track",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">ABOUT</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"></div>
              <ul className="space-y-3">
                {["Services", "Members", "Goal"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">CONTACT</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"></div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">Chittagong, ctg 3300</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">(414) 586 - 3017</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">www.codejatra.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © Copyright Codejatra. All Rights Reserved
              </p>
              <p className="text-gray-400 text-sm">
                Designed with 💜 By{" "}
                <a
                  href="#"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Codejatra
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
