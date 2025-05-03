// pages/index.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// StarryBackground component
const StarryBackground = ({ scrollY = 0 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial size
    setCanvasSize();
    
    // Handle window resize
    window.addEventListener('resize', setCanvasSize);
    
    // Star properties - increased count and more varied sizes
    const stars = [];
    const starCount = 300; // Adjust star count
    
    // Create stars with improved blinking properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3, // For parallax effect
        // More varied star sizes for depth effect
        radius: Math.random() < 0.8 ? Math.random() * 1 + 0.3 : Math.random() * 2 + 1,
        // Initial opacity
        opacity: Math.random() * 0.7 + 0.3, 
        // Faster flicker speed for more noticeable blinking
        flickerSpeed: Math.random() * 0.04 + 0.01,
        flickerDirection: Math.random() > 0.5 ? 1 : -1,
        // Some stars blink slower, some faster
        blinkInterval: Math.random() * 3000 + 1000,
        lastBlink: 0
      });
    }
    
    // Track time for animations
    let lastTime = 0;
    
    // Animation function
    const animate = (timestamp) => {
      // Calculate time delta
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scroll offset for parallax
      // Limit the parallax effect to avoid stars moving too far
      const scrollOffset = Math.min(scrollY * 0.1, 1000);
      
      // Draw each star
      stars.forEach(star => {
        // Update star opacity for twinkling effect
        star.opacity += star.flickerSpeed * star.flickerDirection * (deltaTime / 100);
        
        // Change direction if opacity limits reached
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.flickerDirection *= -1;
        }
        
        // Occasional rapid blink for random stars
        star.lastBlink += deltaTime;
        if (star.lastBlink > star.blinkInterval) {
          star.opacity = Math.random() * 0.5 + 0.1; // Flash to random brightness
          star.lastBlink = 0;
        }
        
        // Add parallax effect based on star depth
        const y = (star.y - scrollOffset * star.z) % canvas.height;
        
        // Draw star with enhanced glow
        ctx.beginPath();
        
        // Main star
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        // Brighter white color for stars
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Subtle pink glow for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 240, ${star.opacity * 0.2})`;
          ctx.fill();
        }
      });
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [scrollY]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'lighten', zIndex: 1 }} // Better blending with pink background
    />
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for parallax effects with debounce
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 10); // Small delay to reduce update frequency
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Refs for sections
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);

  // Navigation links - Reordered based on specified sequence
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
        "Architected automated testing pipeline using Selenium & Jenkins, reducing testing time by 40%.",
        "Developed API testing strategy for microservices, improving data validation by 35%.",
        "Executed regression and performance testing for web applications, reducing transaction errors by 20%.",
        "Improved test case creation and bug tracking, boosting QA team efficiency by 15%.",
        "Led knowledge transfer sessions on QA methodologies, increasing team competency by 25%."
      ],
      achievements: [
        "Well-versed with QA processes, writing test cases, test scripts, defect management, and reporting to the Product Development Team, Product Owner, and Product Manager.",
        "Conducted various Knowledge Transfer sessions (KTs) for commodities like Power, Gas, and Emission.",
        "Nominated as Best Quality Tester in the probation period itself."
      ]
    }
  ];
  

  // Projects array with GIF paths
  const projects = [
    {
      title: "Generative AI Content Platform",
      description: "Developed an automated content-generation platform, reducing content creation time by.90%. Integrated advanced AI models to consistently deliver high-quality, tailored content, significantly improving user engagement. Designed an intuitive analytics dashboard enabling users to manage workflows and track real-time performance metrics.",
      github: "https://github.com/harpreetkaur/genai-platform",
      imageSrc: "/videos/ai-diffusion-animation.gif", // Path to your GIF file
      tags: ["Next.js", "Hugging Face", "AWS", "MongoDB", "Vercel"]
    },
    {
      title: "Computer Vision Object Detection System",
      description: "Built a real-time object detection system that achieved 88% accuracy across diverse environments. Enabled instant visual recognition, substantially reducing manual analysis and increasing operational efficiency. Delivered a scalable and user-friendly web interface, making reliable object detection widely accessible online.",
      github: "https://github.com/harpreetkaur/object-detection",
      imageSrc: "/videos/laser-head-scan.gif", // Path to your GIF file
      tags: ["Python", "TensorFlow", "OpenCV", "Flask", "Hugging Face"]
    },
    {
      title: "Automated Resume Screening System",
      description: "Developed an AI-powered resume parser, reduced resume screening time by 40%. Utilized NLP-driven skill extraction to accurately match candidate profiles to job requirements, clearly highlighting skill gaps. Built a responsive dashboard offering real-time analytics, streamlining HR decision-making.",
      github: "https://github.com/harpreetkaur/resume-screener",
      imageSrc: "/videos/resume-document-scan.gif", // Path to your GIF file
      tags: ["Python", "NLP", "spaCy", "React", "MongoDB"]
    },
    {
      title: "Interview Practice Simulator",
      description: "Engineered an interactive practice tool, improving candidate preparedness by 30%. Implemented realistic interview conditions with features such as audio recording and dynamic timers. Provided personalized feedback and structured question analysis to systematically enhance interview performance.",
      github: "https://github.com/harpreetkaur/interview-simulator",
      imageSrc: "/videos/interview-practice.gif", // Path to your GIF file
      tags: ["React", "Tailwind CSS", "Audio Recording", "Timer"]
    }
  ];

  // Simple ProjectsSection with GIFs for maximum performance
  const ProjectsSection = () => {
    return (
      <section id="projects" className="pt-2 py-20 px-8 max-w-4xl mx-auto">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Projects</h2>
          
          {/* Single column layout for better organization */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div key={index} className="relative">
                {/* Alternating layout - odd projects on left, even on right */}
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white/80 backdrop-filter backdrop-blur-sm border border-[#ff3e81]/30 rounded-lg overflow-hidden shadow-xl`}>
                  
                  {/* GIF side - fixed at 50% on desktop */}
                  <div 
                    className="md:w-1/2 relative overflow-hidden"
                    style={{ minHeight: "300px" }}
                  >
                    {/* Simple image tag for GIF */}
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0
                      }}
                      loading="eager" // Load immediately, no lazy loading
                    />
                    
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff3e81]/30 to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Content side */}
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-[#ff3e81] mb-4">{project.title}</h3>
                    
                    <p className="text-[#ff5c8d] mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-[#ff3e81]/10 text-[#ff3e81] px-2 py-1 rounded-md border border-[#ff3e81]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#ff3e81] text-white rounded-md text-sm font-medium hover:bg-[#ff3e81]/90 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Education data
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "California State University - Los Angeles",
      duration: "2023 - 2025",
      coursework: "Software Engineering, Artificial Intelligence, Data Science, Data Visualization, Web Programming using JavaScript",
      GPA:"3.76 / 4"
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Maharaja Ranjit Singh Punjab Technical University - India",
      duration: "2016 - 2020",
      coursework: "Data Structures and Algorithms, Database Management, Object Oriented Programming, Computer Security",
      GPA:"3.35 / 4"
    
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
    }
  ];

  // Add custom CSS to ensure proper z-index and overflow behavior
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Fix for main container to allow scrolling */
      .min-h-screen.relative.overflow-hidden {
        overflow-y: auto !important;
        overflow-x: hidden;
      }
      
      /* Fix for sections to ensure they're above background */
      section {
        position: relative;
        z-index: 10;
      }
      
      /* Fix for background containers */
      .fixed.top-0.left-0.w-full.h-full.overflow-hidden {
        z-index: 0;
        pointer-events: none;
      }
      
      /* Fix for nav bar to stay on top */
      nav.fixed {
        z-index: 50;
      }
      
      /* Welcome message animation */
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
      }
      
      .welcome-message {
        animation: fadeInOut 5s forwards;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden text-[#ff3e81]">
      {/* Welcome Message - New addition */}
      {showWelcome && (
        <div className="fixed top-20 left-0 right-0 flex justify-center items-center z-50 welcome-message">
          <div className="bg-white/80 backdrop-filter backdrop-blur-sm border border-[#ff3e81]/30 rounded-lg px-6 py-3 shadow-xl">
            <p className="text-[#ff3e81] text-lg font-medium text-center">
              ✨ Welcome to my creative universe! Let's build something amazing together! ✨
            </p>
          </div>
        </div>
      )}
      
      {/* Light Pink Background with Stars */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
        {/* Single solid light pink background instead of gradient */}
        <div className="absolute inset-0 bg-[#ffd1dc]"></div>
        
        {/* Light consistent overlay for depth */}
        <div className="absolute inset-0 bg-[#ffecf0]/10"></div>
        
        {/* Keep the blur elements for depth */}
        <div className="absolute w-96 h-96 bg-[#ffb3c6] rounded-full filter blur-3xl opacity-20 -top-20 -left-20 animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute w-96 h-96 bg-[#ffb3c6] rounded-full filter blur-3xl opacity-20 top-1/3 right-0 animate-pulse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute w-96 h-96 bg-[#ffb3c6] rounded-full filter blur-3xl opacity-20 bottom-0 left-1/4 animate-pulse" style={{ animationDuration: '25s' }}></div>
      </div>
      
      {/* Starry Background */}
      <StarryBackground scrollY={scrollY} />
      
      {/* Updated Navigation Bar with brighter pink colors */}
<nav className="fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-md bg-[#ffd1dc]/70 border-b border-[#ff80ab]/20 shadow-lg transition-all duration-300" style={{ zIndex: 50 }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo - Updated to link to About section */}
      <div className="flex-shrink-0">
        <Link href="#about" legacyBehavior>
          <motion.a 
            className="text-xl font-bold text-[#ff3e81] cursor-pointer"
            whileHover={{ 
              textShadow: "0 0 8px rgba(255, 62, 129, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            HK
          </motion.a>
        </Link>
      </div>
      
      {/* Desktop Nav Links - MODERN APPROACH */}
<div className="hidden md:block">
  <div className="ml-10 flex items-center space-x-4">
    {navLinks.map((link, index) => (
      <Link 
        key={index}
        href={link.href}
        className="text-[#ff3e81] px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300 hover:text-[#ff80ab] hover:text-shadow-pink"
      >
        {link.name}
      </Link>
    ))}
  </div>
</div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-[#ff3e81] hover:text-[#ff80ab] focus:outline-none"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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

  {/* Mobile Nav Links - FIXED */}
  {isNavOpen && (
    <motion.div 
      className="md:hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-filter backdrop-blur-lg bg-[#ffd1dc]/80">
        {navLinks.map((link, index) => (
          <Link href={link.href} key={index} legacyBehavior>
            <motion.a 
              className="text-[#ff3e81] hover:text-[#ff80ab] block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              onClick={() => setIsNavOpen(false)}
              whileHover={{ 
                textShadow: "0 0 8px rgba(255, 62, 129, 0.5)"
              }}
            >
              {link.name}
            </motion.a>
          </Link>
        ))}
      </div>
    </motion.div>
  )}
</nav>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative pt-20" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
          style={{
            // Limit the transform to prevent moving content too far
            transform: `translateY(${Math.min(scrollY * 0.3, 200)}px)`,
          }}
        >
          <div className="relative">
            {/* This is the enhanced glowing border effect with more vibrant pink */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#ff1a75] to-[#c4024f] rounded-lg blur-md opacity-90"
              animate={{ 
                opacity: [0.7, 0.9, 0.7],
                rotate: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            {/* Main content card */}
<div className="relative px-12 py-10 bg-[#fff5f8]/90 backdrop-filter backdrop-blur-sm rounded-lg shadow-xl z-10">
  <h1 className="text-xl md:text-6xl font-bold mb-2 text-[#ff1a75]">
    Hi, I'm <span className="text-[#ff1a75]">Harpreet Kaur</span>
  </h1>
  <p className="text-xl text-[#ff1a75] mb-8">
    Software Engineer | Software Quality Analyst | MS CS Graduate – CSULA
  </p>
  <p className="text-sm md:text-base text-[#ff1a75] leading-relaxed">
    I'm a passionate Software Engineer with a Master's in Computer Science from CSULA and over 2 years of experience in software quality assurance. I specialize in full-stack development and AI/ML applications, leveraging tools like Python, JavaScript, and cloud platforms to build scalable, user-focused solutions. I'm currently seeking opportunities to contribute to innovative engineering teams and impactful products.
  </p>
              
              <Link href="#projects">
                <button className="mt-6 px-10 py-4 bg-[#ff1a75] rounded-md text-white font-semibold transition-all hover:brightness-110 shadow-lg shadow-[#c4024f]">
                  View My Work
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-6 h-10 text-[#ff1a75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8 max-w-6xl mx-auto relative z-10" ref={experienceRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Experience</h2>
          
          <div className="grid grid-cols-1 gap-10">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white/80 backdrop-filter backdrop-blur-sm border border-[#ff3e81]/30 rounded-lg overflow-hidden shadow-xl relative"
                >
                  <div className="p-8 relative">
                    {/* Experience header with role and company */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-[#ff3e81] mb-1">{exp.role}</h3>
                        <h4 className="text-xl font-semibold text-[#ff3e81]">{exp.company}</h4>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-block bg-[#ff3e81]/10 text-[#ff3e81] text-lg font-medium px-4 py-1 rounded-full">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <ul className="list-disc pl-5 text-[#ff5c8d] text-lg mb-5 space-y-2">
  {exp.description.map((point, idx) => (
    <li key={idx}>{point}</li>
  ))}
</ul>
                    
                    {/* Achievements */}
                    {exp.achievements && (
                      <div>
                        <h5 className="font-semibold text-[#ff3e81] text-lg mb-3">Key Achievements:</h5>
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start">
                              <span className="text-[#ff3e81] mr-2 mt-1">★</span>
                              <p className="text-[#ff5c8d]">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Education Section */}
<section id="education" className="pt-2 py-20 px-8 max-w-6xl mx-auto" ref={educationRef}>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative z-10"
  >
    <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Education</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {education.map((edu, idx) => (
        <div key={idx}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-filter backdrop-blur-sm border border-[#ff80ab]/30 rounded-lg p-8 shadow-xl relative overflow-hidden h-full"
          >
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ff3e81] to-[#ff80ab]"></div>
            
            <div className="flex items-center mb-5">
              <div className="bg-[#ff3e81] rounded-full w-14 h-14 flex items-center justify-center text-white mr-4 flex-shrink-0 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#ff3e81]">{edu.degree}</h3>
                <p className="text-[#ff80ab] font-medium">{edu.institution}</p>
              </div>
            </div>
            
            <div className="mb-4 pb-4 border-b border-[#ff80ab]/20">
              <span className="inline-block bg-[#ff80ab]/10 text-[#ff3e81] px-3 py-1 rounded-full text-sm font-medium">
                {edu.duration}
              </span>
            </div>
            
            <p className="text-[#ff5c8d] mb-4">Relevant coursework: {edu.coursework}</p>
            
            <div>
              <p className="text-[#ff5c8d]"><span className="font-semibold text-[#ff3e81]">GPA: </span>{edu.GPA}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Certifications Section */}
      <section id="certifications" className="pt-2 py-20 px-8 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <div key={idx} className="relative h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/80 backdrop-filter backdrop-blur-sm border border-[#ff3e81]/30 rounded-lg p-6 relative overflow-hidden shadow-lg h-full flex flex-col"
              >
                <div className="bg-[#ff3e81]/20 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                  <span className="text-[#ff3e81] text-xl font-bold">{cert.date}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#ff3e81] mb-2">{cert.title}</h3>
                  <p className="text-[#ff5c8d] mb-1">
                    <span className="font-medium">Issuer:</span> {cert.issuer}
                  </p>
                  <p className="text-[#ff5c8d]/80 text-sm">
                    <span className="font-medium">Credential ID:</span>{" "}
                    <a 
                      href={cert.credentialId} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#ff3e81] hover:text-[#ff5c8d] underline"
                    >
                      View Certificate
                    </a>
                  </p>
                </div>
                
                {/* Add a badge/icon */}
                <div className="mt-auto pt-4">
                  <span className="inline-block bg-[#ff3e81]/10 text-[#ff3e81] text-sm px-3 py-1 rounded-full">
                    Verified ✓
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

      {/* Tech Stack Section */}
      <section id="skills" className="pt-2 py-20 px-8 max-w-6xl mx-auto relative z-10" ref={skillsRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Tech Stack</h2>
          
          {/* Languages Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'Python', icon: '🐍' },
                { name: 'JavaScript', icon: '📜' },
                { name: 'Core Java', icon: '☕' },
                { name: 'C', icon: '©️' },
                { name: 'C++', icon: '⚙️' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Web and Mobile Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Web & Mobile</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'React.js', icon: '⚛️' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'Django', icon: '🌐' },
                { name: 'HTML', icon: '📄' },
                { name: 'CSS', icon: '🎨' },
                { name: 'Bootstrap', icon: '🅱️' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cloud and DevOps Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Cloud & DevOps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'AWS', icon: '☁️' },
                { name: 'Firebase', icon: '🔥' },
                { name: 'Docker', icon: '🐳' },
                { name: 'Kubernetes', icon: '⎈' },
                { name: 'Jenkins', icon: '🤖' },
                { name: 'GitHub Actions', icon: '🔄' },
                { name: 'CI/CD', icon: '♾️' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data and AI/ML Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Data & AI/ML</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'TensorFlow', icon: '🧠' },
                { name: 'PyTorch', icon: '🔥' },
                { name: 'Generative AI', icon: '🎭' },
                { name: 'LangChain', icon: '🔗' },
                { name: 'LLMOps', icon: '🛠️' },
                { name: 'Pandas', icon: '🐼' },
                { name: 'NumPy', icon: '🔢' },
                { name: 'Tableau', icon: '📊' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Databases Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Databases</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'MongoDB', icon: '🍃' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'MySQL', icon: '🐬' },
                { name: 'GraphQL', icon: '⬢' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testing Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Testing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'Selenium', icon: '🧪' },
                { name: 'Cucumber', icon: '🥒' },
                { name: 'Postman', icon: '📮' },
                { name: 'SoapUI', icon: '🧼' },
                { name: 'Automation', icon: '🤖' },
                { name: 'Manual Testing', icon: '👁️' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools Section */}
          <div>
            <h3 className="text-2xl font-bold text-[#ff3e81] mb-8 pl-4 border-l-4 border-[#ff3e81]">Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'Git', icon: '📂' },
                { name: 'Jira', icon: '🔍' },
                { name: 'Figma', icon: '🎨' },
                { name: 'MS Office', icon: '📊' },
                { name: 'LibreOffice', icon: '📝' },
                { name: 'MS Teams', icon: '👥' }
              ].map((skill, idx) => (
                <div key={idx} className="relative group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center p-6 relative overflow-visible"
                  >
                    {/* Pink glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff3e81]/40 to-[#ff80ab]/40 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-125"></div>
                    
                    {/* Additional radial glow */}
                    <div className="absolute inset-0 bg-[#ff3e81]/20 rounded-full blur-lg opacity-60 transform scale-110"></div>
                    
                    {/* Icon container */}
                    <div className="relative text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    
                    {/* Skill name with hover effect */}
                    <p className="text-[#ff3e81] font-bold text-sm md:text-base relative z-10 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6336c]">
                      {skill.name}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="pt-0 py-20 px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3e81]">Get In Touch</h2>
          
          <div className="backdrop-filter backdrop-blur-lg bg-[#fff5f7]/90 border border-[#d6336c]/20 rounded-lg p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#ffb3c6] rounded-full blur-xl opacity-30"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#ffb3c6] rounded-full blur-xl opacity-30"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-bold text-[#ff3e81] mb-6">Send a Message</h3>
                
                <form className="space-y-4" action="https://formspree.io/f/mwpovrln" method="POST">
                  <div>
                    <label htmlFor="name" className="block text-[#ff3e81] font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-[#d6336c]/20 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#ff3e81] font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-[#d6336c]/20 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#ff3e81] font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-[#d6336c]/20 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#d6336c] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <input type="hidden" name="_subject" value="New message from portfolio website" />
                  
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#d6336c] text-white rounded-md font-medium shadow-lg shadow-[#d6336c]/30 hover:bg-[#ff1a75] transition-colors duration-300 w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="lg:border-l lg:border-[#d6336c]/20 lg:pl-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#ff3e81] mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#ffcdd5] rounded-full w-10 h-10 flex items-center justify-center text-[#ff3e81] mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#ff3e81]">Email</h4>
                      <a href="mailto:harpreetgill325@gmail.com" className="text-[#ff3e81] hover:underline">harpreetgill325@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#ffcdd5] rounded-full w-10 h-10 flex items-center justify-center text-[#ff3e81] mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#ff3e81]">Location</h4>
                      <p className="text-[#ff3e81]">Los Angeles, California</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-[#ff3e81] mb-4">Connect With Me</h4>

                  {/* Decorative ribbon with emoji */}
                  <div className="mb-6 bg-[#ffcdd5]/50 px-4 py-3 rounded-lg border border-[#ff3e81]/20">
                    <p className="text-center text-[#ff3e81] italic">
                      🎀 Let's create something beautiful together! 🎀
                    </p>
                  </div>
                  
                  
                  <div className="flex space-x-4 mb-6">
                    {[
                      { 
                        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", 
                        name: "LinkedIn",
                        url: "#"
                      },
                      { 
                        icon: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z", 
                        name: "GitHub",
                        url: "#"
                      },
                      { 
                        icon: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z", 
                        name: "Gmail",
                        url: "mailto:harpreetgill325@gmail.com"
                      }
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        className="bg-[#ffcdd5] text-[#ff3e81] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#d6336c] hover:text-white transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d={social.icon} />
                        </svg>

                        
                      </a>
                      
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative z-10 border-t border-[#d6336c]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <Link href="#about">
              <div className="text-2xl font-bold text-[#ff3e81] mb-4 cursor-pointer">HK</div>
            </Link>
            
            <div className="flex flex-wrap justify-center space-x-4 mb-6">
              {navLinks.map((link, index) => (
                <Link href={link.href} key={index}>
                  <span className="text-[#ff3e81] hover:text-[#ff3e81] text-sm cursor-pointer transition-colors duration-300 mb-2">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="text-center text-[#ff3e81]/70 text-sm">
              <p>&copy; {new Date().getFullYear()} Harpreet Kaur. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}