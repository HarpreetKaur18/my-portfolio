// pages/index.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// Professional animated background component
const AnimatedBackground = ({ isDarkMode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fixed animation values to prevent hydration mismatch
  const animationElements = [
    { width: 200, height: 200, left: 10, top: 20 },
    { width: 300, height: 250, left: 70, top: 40 },
    { width: 250, height: 280, left: 30, top: 70 },
    { width: 180, height: 220, left: 80, top: 10 },
    { width: 320, height: 200, left: 50, top: 80 },
    { width: 160, height: 240, left: 20, top: 50 }
  ];

  if (!isClient) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className={`absolute inset-0 transition-colors duration-300 ${isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
          }`}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Clean gradient background */}
      <div className={`absolute inset-0 transition-colors duration-300 ${isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}></div>

      {/* Subtle animated elements */}
      <div className="absolute inset-0">
        {animationElements.map((element, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full transition-colors duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-blue-800/20 to-indigo-800/20'
              : 'bg-gradient-to-r from-blue-100/30 to-indigo-100/30'
              }`}
            style={{
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'education', 'projects', 'certifications', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Navigation links
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Tech Stack", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Experience data
  const experiences = [
    {
      role: "Software Quality Analyst",
      company: "Open Access Technology, India",
      duration: "May 2021 - July 2023",
      description: [
        "Worked on various ETRM/CTRM related applications for Power, Gas, and Emission",
        "Conducted multi-phase testing - Unit, Regression, Functional, Smoke, Sanity and Display for mission-critical energy trading platforms, ensuring high-quality releases across unit, pre-release (clone), and beta environments.",
        "Created 200+ problems with detailed test plans, test cases, along with functional test plans.",
        "Well-versed with QA processes, writing test cases, test scripts, defect management, and reporting to the Product Development Team, Product Owner, and Product Manager.",
        "Led knowledge transfer sessions on QA methodologies, increasing team competency by 25%."
      ],
      achievements: [
        "Provided Knowledge Transfer Session and assistance to more than 7 employees in their on boarding process.",
        "Nominated as Best Quality Tester in just 4th month of service."
      ]
    }
  ];

  // Projects array
  const projects = [
    {
      title: "Generative AI Content Platform",
      description: "Developed an automated content-generation platform, reducing content creation time by 90%. Integrated advanced AI models to consistently deliver high-quality, tailored content, significantly improving user engagement. Designed an intuitive analytics dashboard enabling users to manage workflows and track real-time performance metrics.",
      github: "https://github.com/harpreetkaur18/generative-ai-platform",
      imageSrc: "/videos/ai-diffusion-animation.gif",
      tags: ["Next.js", "Hugging Face", "AWS", "MongoDB", "Vercel"]
    },
    {
      title: "Computer Vision Object Detection System",
      description: "Built a real-time object detection system that achieved 88% accuracy across diverse environments. Enabled instant visual recognition, substantially reducing manual analysis and increasing operational efficiency. Delivered a scalable and user-friendly web interface, making reliable object detection widely accessible online.",
      github: "https://github.com/harpreetkaur18/yolov5-object-detection",
      imageSrc: "/videos/laser-head-scan.gif",
      tags: ["Python", "TensorFlow", "OpenCV", "Flask", "Hugging Face"]
    },
    {
      title: "Automated Resume Screening System",
      description: "Developed an AI-powered resume parser, reduced resume screening time by 40%. Utilized NLP-driven skill extraction to accurately match candidate profiles to job requirements, clearly highlighting skill gaps. Built a responsive dashboard offering real-time analytics, streamlining HR decision-making.",
      github: "https://github.com/harpreetkaur18/resume-screening",
      imageSrc: "/videos/resume-document-scan.gif",
      tags: ["Python", "NLP", "spaCy", "React", "MongoDB"]
    },
    {
      title: "Interview Practice Simulator",
      description: "Engineered an interactive practice tool, improving candidate preparedness by 30%. Implemented realistic interview conditions with features such as audio recording and dynamic timers. Provided personalized feedback and structured question analysis to systematically enhance interview performance.",
      github: "https://github.com/harpreetkaur18/Interview-Simulator",
      imageSrc: "/videos/interview-practice.gif",
      tags: ["React", "Tailwind CSS", "Audio Recording", "Timer"]
    }
  ];

  // Education data
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "California State University - Los Angeles",
      duration: "2023 - 2025",
      coursework: "Software Engineering, Artificial Intelligence, Data Science, Data Visualization, Web Programming using JavaScript",
      GPA: "3.76 / 4"
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "MRS Punjab Technical University - India",
      duration: "2016 - 2020",
      coursework: "Data Structures and Algorithms, Database Management, Object Oriented Programming, Computer Security",
      GPA: "3.35 / 4"
    }
  ];

  // Certification data
  const certifications = [
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2025",
      credentialId: "https://www.freecodecamp.org/certification/Harpreet-Kaur/javascript-algorithms-and-data-structures-v8"
    },
    {
      title: "Python Certification",
      issuer: "HackerRank",
      date: "2025",
      credentialId: "https://www.hackerrank.com/certificates/iframe/581b752e0170"
    },
    {
      title: "Azure AI Fundamentals - (Badge)",
      issuer: "Microsoft",
      date: "2025",
      credentialId: "https://learn.microsoft.com/en-us/users/harpreetkaur-4127/achievements/9y84etqu?ref=https%3A%2F%2Fwww.linkedin.com%2F&source=docs"
    },
    {
      title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
      issuer: "Oracle",
      date: "2025",
      credentialId: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0542F8F22A721D09B2E0C2BE24E67B5E2B9C83526D9BEBEE8E05A285F1A3573E"
    },
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services(AWS)",
      date: "2025",
      credentialId: ""
    },
    {
      title: "ChatGPT prompt engineering for developers",
      issuer: "OpenAI",
      date: "2025",
      credentialId: "https://learn.deeplearning.ai/accomplishments/c3f7d167-6525-49cf-a0d0-ab6f7181b026?usp=sharing"
    },
    {
      title: "Snowflake Dev Day Gen AI Bootcamp 2025",
      issuer: "Snowflake",
      date: "2025",
      credentialId: "https://developerbadges.snowflake.com/2b19f224-e97b-4192-a9f9-bcab9be2a66b#acc.wcK497Mh"
    }
  ];
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated Background */}
      <AnimatedBackground isDarkMode={isDarkMode} />
     
      {/* Professional Navigation */}
      <nav className={`fixed top-0 left-0 right-0 backdrop-blur-md border-b shadow-sm z-50 transition-all duration-300 ${isDarkMode
        ? 'bg-gray-900/95 border-gray-700'
        : 'bg-white/95 border-gray-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#about">
              <motion.div
                className={`text-2xl font-bold cursor-pointer transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-blue-600'
                  }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                HK
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <motion.span
                      className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 ${activeSection === link.href.substring(1)
                        ? isDarkMode
                          ? 'text-blue-400 bg-blue-900/50'
                          : 'text-blue-600 bg-blue-50'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                ))}

                {/* Dark Mode Toggle Button */}
                <motion.button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isNavOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <motion.div
            className={`md:hidden border-t transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link href={link.href} key={index}>
                  <motion.div
                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-300 ${isDarkMode
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsNavOpen(false)}
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}

              {/* Mobile Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                whileHover={{ x: 4 }}
              >
                {isDarkMode ? (
                  <>
                    <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-gray-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    Dark Mode
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Harpreet Kaur
                </span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Software Engineer | Software Quality Analyst | MS CS Graduate – CSULA
              </motion.p>

              <motion.p
                className="text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I'm a passionate Software Engineer with a Master's in Computer Science from CSULA and over 2 years of experience in software quality assurance. I specialize in full-stack development and Generative/Agentic AI applications, using tools like Python, JavaScript, and cloud platforms to create scalable, user-focused solutions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="#projects">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                </Link>
                <Link href="#contact">
                  <motion.button
                    className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Professional Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/videos/programmer-avatar.png"
                    alt="Harpreet Kaur"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💻
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  🚀
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </motion.div>
         
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                      <h4 className="text-xl font-semibold text-blue-600 mb-2">{exp.company}</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities:</h5>
                    <ul className="space-y-3">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                          <p className="text-gray-700 leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {exp.achievements && (
                    <div className="border-t border-gray-200 pt-6">
                      <h5 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start p-4 bg-green-50 rounded-lg">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
     
      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  {/* Header with icon */}
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{edu.institution}</p>
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {edu.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Relevant Coursework:</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{edu.coursework}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900 mr-2">GPA:</span>
                        <span className="text-sm text-gray-700">{edu.GPA}</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills in full-stack development, AI/ML, and software engineering.
            </p>
          </motion.div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Project Image/GIF */}
                <div className="lg:w-1/2 relative overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 lg:aspect-none lg:h-full">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
                    whileHover={{ color: "#2563eb" }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {cert.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Issued by:</span> {cert.issuer}
                  </p>

                  {/* Action */}
                  <div className="pt-4 border-t border-gray-200">
                    <a
                      href={cert.credentialId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Certificate
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Stack</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>
         
          {/* Languages */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Programming Languages
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {[
                { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-500' },
                { name: 'JavaScript', icon: '📜', color: 'from-yellow-400 to-orange-500' },
                { name: 'Java', icon: '☕', color: 'from-red-500 to-orange-600' },
                { name: 'C', icon: '©️', color: 'from-blue-500 to-purple-600' },
                { name: 'C++', icon: '⚙️', color: 'from-blue-600 to-indigo-600' }
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Web & Mobile */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Web & Mobile Development
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { name: 'React.js', icon: '⚛️', color: 'from-blue-400 to-cyan-500' },
                { name: 'HTML', icon: '📄', color: 'from-orange-400 to-red-500' },
                { name: 'CSS', icon: '🎨', color: 'from-blue-500 to-purple-600' },
                { name: 'Bootstrap', icon: '🅱️', color: 'from-purple-500 to-indigo-600' }
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Cloud & DevOps
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-yellow-500' },
                { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-600' },
                { name: 'GitHub Actions', icon: '🔄', color: 'from-gray-700 to-black' },
                { name: 'CI/CD', icon: '♾️', color: 'from-green-500 to-teal-600' }
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data & AI/ML */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Data Science & AI/ML
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {[
                { name: 'Generative AI', icon: '🎭', color: 'from-purple-500 to-indigo-600' },
                { name: 'PyTorch', icon: '🔥', color: 'from-red-500 to-pink-600' },
                { name: 'LangChain', icon: '🔗', color: 'from-green-500 to-teal-600' },
                { name: 'Tableau', icon: '📊', color: 'from-blue-500 to-teal-600' }
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Databases & Testing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Databases */}
            <div>
              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Databases
              </motion.h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
                  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-blue-700' },
                  { name: 'MySQL', icon: '🐬', color: 'from-blue-400 to-blue-600' },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div>
              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Testing & QA
              </motion.h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Selenium', icon: '🧪', color: 'from-green-500 to-teal-600' },
                  { name: 'Postman', icon: '📮', color: 'from-orange-500 to-red-600' },
                  { name: 'SoapUI', icon: '🧼', color: 'from-blue-500 to-indigo-600' },
                  { name: 'Automation', icon: '🤖', color: 'from-purple-500 to-pink-600' }
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I'm always interested in new opportunities and collaborations. Let's connect!
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
               
                <form className="space-y-6" action="https://formspree.io/f/mwpovrln" method="POST">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                      onInvalid={(e) => {
                        e.target.setCustomValidity('Please enter a valid email address (e.g., name@example.com)');
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity('');
                      }}
                    />
                    <p className="email-helper">
                      Please enter a valid email address (e.g., name@example.com)
                    </p>
                    <p className="email-error" style={{ display: 'none' }}>
                      ❌ Invalid email format. Please use format: name@example.com
                    </p>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                  </div>
                 
                  <input type="hidden" name="_subject" value="New message from portfolio website" />
                 
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
             
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
               
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      <a href="mailto:harpreetgill325@gmail.com" className="text-blue-100 hover:text-white transition-colors duration-300">
                        harpreetgill325@gmail.com
                      </a>
                    </div>
                  </div>
                 
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Location</h4>
                      <p className="text-blue-100">Los Angeles, California</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Availability</h4>
                      <p className="text-blue-100">Open to new opportunities</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <h4 className="text-lg font-semibold mb-6">Connect With Me</h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        name: "LinkedIn",
                        url: "https://www.linkedin.com/in/harpreet-kaur005",
                        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      },
                      {
                        name: "GitHub",
                        url: "https://github.com/HarpreetKaur18",
                        icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      },
                      {
                        name: "Email",
                        url: "mailto:harpreetgill325@gmail.com",
                        icon: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                      }
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="#about">
                <div className="text-2xl font-bold text-white mb-4 cursor-pointer">
                  Harpreet Kaur
                </div>
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Software Engineer passionate about creating innovative solutions with modern technologies.
                Always excited to take on new challenges and collaborate on meaningful projects.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/harpreet-kaur005",
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  },
                  {
                    name: "GitHub",
                    url: "https://github.com/HarpreetKaur18",
                    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  },
                  {
                    name: "Email",
                    url: "mailto:harpreetgill325@gmail.com",
                    icon: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                  }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
           
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
           
            {/* More Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">More</h3>
              <ul className="space-y-2">
                {navLinks.slice(4).map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-sm mb-4">
              &copy; {new Date().getFullYear()} Harpreet Kaur. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}