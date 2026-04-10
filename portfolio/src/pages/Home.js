import '../style/Home.css';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const videoRef = useRef(null);
  const contactRef = useRef(null);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setContactVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }

    
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  function toggleMenu(menuId) {
    setOpenMenu(openMenu === menuId ? null : menuId);
  }





  return (
    <>
      <div className="home-page">
        <nav className="navbar">
          <div className="nav-left">
            <img src="/ramesh.ico" alt="ico" className="logo" />
          </div>
          <div className="nav-center">
            <a href="#hero">Home</a>
            <a href="#aboutme">About Me</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isLightMode ? '🌙' : '☀️'}
          </button>
        </nav>

        <section id="hero" className="hero">

          <h1 className="title">HI, I'M RAMESH</h1>

          <div className="left-text">
            <h2 className="ai">AI</h2>
            <h2 className="and">&</h2>
            <h2 className="ml">ML</h2>
            <p className="ent">Enthusiast</p>
          </div>

          <div className="right-text">
            <p className="small">Passionate</p>
            <h2>Full-Stack</h2>
            <p className="small">Developer</p>
          </div>
          <div className="img">
            <img src="/assests/mine.png" alt="Ramesh" className="profile" />
          </div>
        </section>

        <section className="bar">
          <div className="animated-bar-container">
            <div className="animated-bar">

              <a href="https://github.com/ramesh-2003-krishan?tab=overview&from=2026-04-01&to=2026-04-07" target="_blank" rel="noopener noreferrer">
                <img src="/logos/git.png" alt="Git" className="logo" />
              </a>
              <img src="/logos/react.png" alt="React" className="logo" />
              <img src="/logos/nodejs.png" alt="Node.js" className="logo" />
              <img src="/logos/postman.png" alt="Postman" className="logo" />
              <img src="/logos/docker.png" alt="Docker" className="logo" />
              <img src="/logos/aws.svg" alt="AWS" className="logo" />
              <img src="/logos/mongodb.png" alt="MongoDB" className="logo" />
              <img src="/logos/php.png" alt="PHP" className="logo" />
              <img src="/logos/mysql.svg" alt="mysql" className="logo" />
              <img src="/logos/java.svg" alt="java" className="logo" />
              <img src="/logos/javascript.svg" alt="javascript" className="logo" />
              <img src="/logos/figma.svg" alt="Figma" className="logo" />
              <img src="/logos/azure.png" alt="azure" className="logo" />

              <a href="https://github.com/ramesh-2003-krishan?tab=overview&from=2026-04-01&to=2026-04-07" target="_blank" rel="noopener noreferrer">
                <img src="/logos/git.png" alt="Git" className="logo" />
              </a>
              <img src="/logos/react.png" alt="React" className="logo" />
              <img src="/logos/nodejs.png" alt="Node.js" className="logo" />
              <img src="/logos/postman.png" alt="Postman" className="logo" />
              <img src="/logos/docker.png" alt="Docker" className="logo" />
              <img src="/logos/aws.svg" alt="AWS" className="logo" />
              <img src="/logos/mongodb.png" alt="MongoDB" className="logo" />
              <img src="/logos/php.png" alt="PHP" className="logo" />
              <img src="/logos/mysql.svg" alt="mysql" className="logo" />
              <img src="/logos/java.svg" alt="java" className="logo" />
              <img src="/logos/javascript.svg" alt="javascript" className="logo" />
              <img src="/logos/figma.svg" alt="Figma" className="logo" />
              <img src="/logos/azure.png" alt="azure" className="logo" />


            </div>
          </div>
        </section>

        <section id="aboutme" className="aboutme">
          <div className="about">
            <div>
              <h2 className="who-title">Who Am I?</h2>
              <p className="line"> </p>
            </div>
            <div className="cardd">
              <div className="card-img">
                <img src="/assests/webp.jpeg" alt="About Me" className="about-img" />
              </div>
              <div className="card-content">
                <h2 className="about-title">About Me</h2>
                <h3 className="about-subtitle">My Details...</h3>
                <p className="about-desc">
                  I’m a Software Engineering undergraduate at the University of Kelaniya who enjoys turning ideas into real-world applications. I have hands-on experience in building modern full-stack systems that are scalable and user-friendly. I enjoy and continuously improving my coding practices. My interests lie in Data Science, Machine Learning and Net-Centric Web Applications.
                </p>
                <div className="info-boxes">
                  <div className="info-box">
                    <label>Name</label>
                    <span>Ramesh Krishan Sudarshana</span>
                  </div>
                  <div className="info-box">
                    <label>Email</label>
                    <span>sudarshanakrishan123@gmail.com</span>
                  </div>
                  <div className="info-box">
                    <label>Address</label>
                    <span>56/1, Thalagalla, Nagollagama</span>
                  </div>
                  <div className="info-box">
                    <label>Phone No.</label>
                    <span>0702913026</span>
                  </div>
                  <div className="cv">
                    <button className="cv-button" onClick={() => window.open('/CV.pdf', '_blank')}>
                      Download CV
                    </button>
                  </div>
                  <div className="llogo">
                    <a href="https://github.com/ramesh-2003-krishan?tab=overview&from=2026-04-01&to=2026-04-07" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/git.png" alt="Git" className="logos" />
                    </a>
                    <a href="https://www.linkedin.com/in/ramesh-krishan-8b8274320" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/linkedin.png" alt="LinkedIn" className="logos" />
                    </a>
                    <a href="mailto:sudarshanakrishan123@gmail.com" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/gmail.png" alt="Gmail" className="logos" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills">
          <div className="skill">
            <div className="skill-tit">
              <h2 className="skill-head">Skills</h2>
              <p className="line"></p>
            </div>
            <div className="cards">
              <div>
                <button className="cardA" onClick={() => toggleMenu('A')}>
                  <img src="/logos/code.png" alt="code" className="logoo" />
                  <h4>Full stack Developing</h4>
                </button>
                <div className={`sub-menu ${openMenu === 'A' ? "active" : ""}`}>
                  <img src="/logos/java.svg" alt="java" className="loggo" />
                  <img src="/logos/javascript.svg" alt="javascript" className="loggo" />
                  <img src="/logos/react.png" alt="React" className="loggo" />
                  <img src="/logos/mongodb.png" alt="MongoDB" className="loggo" />
                  <img src="/logos/azure.png" alt="azure" className="loggo" />
                  <img src="/logos/spring.svg" alt="spring" className="loggo" />
                </div>
              </div>

              <div >
                <button className="cardB" onClick={() => toggleMenu('B')} >
                  <img src="/logos/uiux.png" alt="ui" className="logoo" />
                  <h4>UI/UX design</h4>
                </button>
                <div className={`sub-menuB ${openMenu === 'B' ? "active" : ""}`}>
                  <img src="/logos/figma.svg" alt="Figma" className="loggo" />
                  <img src="/logos/adobe.svg" alt="adobe" className="loggo" />
                  <img src="/logos/framer.png" alt="framer" className="loggo" />
                </div>
              </div>

              <div>
                <button className="cardC" onClick={() => toggleMenu('C')}>
                  <img src="/logos/data.png" alt="data" className="logoo" />
                  <h4>Data Analysing</h4>
                </button>
                <div className={`sub-menuC ${openMenu === 'C' ? "active" : ""}`}>
                  <img src="/logos/powerbi.png" alt="bi" className="loggo" />
                  <img src="/logos/spss.png" alt="spss" className="loggo" />
                </div>
              </div>

              <div>
                <button className="cardD" onClick={() => toggleMenu('D')}>
                  <img src="/logos/gamedev.png" alt="data" className="logoo" />
                  <h4>Game Developing and Animation</h4>
                </button>
                <div className={`sub-menuD ${openMenu === 'D' ? "active" : ""}`}>
                  <img src="/logos/unity.svg" alt="unity" className="loggo" />
                  <img src="/logos/unreal.svg" alt="unreal" className="loggo" />
                  <img src="/logos/blender.png" alt="blender" className="loggo" />
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="project">
            <div>
              <h2 className="project-title">Projects</h2>
              <p className="line"></p>
            </div>
            <div className="project-cards">
              <div className="project-cardx projectA-wrapper">
                <div className="projectA">
                  <h4 className="projectA-title">FGhub</h4>
                  <p className="projectA-desc">Game and films management platform and sharepoint</p>
                  <div className="projectA-img">
                    <video ref={videoRef} autoPlay loop muted controls playsInline className="card-video">
                      <source src={process.env.PUBLIC_URL + "/video/vid.mp4"} type="video/mp4" />
                    </video>
                    <div className="fghub-desc">
                      <p className="video-desc">FGhub is a user-friendly full-stack web platform for managing and organizing digital media like images and videos with ease.</p>
                      <ul className="features">
                        <li className="features">Spring Boot + MongoDB based system</li>
                        <li className="features">Upload, store, and organize media files</li>
                        <li className="features">Clean and simple user interface</li>
                        <li className="features">AI assistant for better user experience</li>
                        <li className="features">Secure and scalable design</li>
                      </ul>
                    </div>
                    <a href="https://github.com/ramesh-2003-krishan/FGhub" target="_blank" rel="noopener noreferrer">
                       <img src="/logos/git.png" alt="Git" className="lllogo" />
                    </a>
                  </div>
                </div>
              </div>


              <div className="project-cardx projectB-wrapper">
                <div className="projectB">
                  <h4 className="projectB-title">UniEVE</h4>
                  <p className="projectB-desc">Ui for university event mobile application</p>
                  <div className="projectB-img">
                    <div className="projectA-img">
                    <video ref={videoRef} autoPlay loop muted controls playsInline className="card-video">
                      <source src={process.env.PUBLIC_URL + "/video/fvid.mp4"} type="video/mp4" />
                    </video>
                    <div className="fghub-desc">
                      <p className="video-desc">UniEVE UI project is a modern and user-friendly interface designed for a smooth and interactive user experience. It focuses on clean layout design, easy navigation, and responsive components to improve usability across different screens.</p>
                      <ul className="features">
                        <li className="features">Clean and modern UI design</li>
                        <li className="features">Responsive layout for different screen sizes</li>
                        <li className="features">Simple and smooth navigation flow</li>
                        <li className="features">Well-structured sections for better user interaction</li>
                        <li className="features">Focused on usability and user experience (UX)</li>
                      </ul>
                    </div>
                      <a href="https://www.figma.com/design/ui3kdurtO0xxwSPIIttVzh/Mini-Design?node-id=3-32&t=xRcmVREZEg4MYMOT-1" target="_blank" rel="noopener noreferrer">
                       <img src="/logos/figma.svg" alt="Figma" className="lllogo" />
                      </a>
                  </div>
                  </div>
                </div>
              </div>


              <div className="project-cardx projectC-wrapper">
                <div className="projectC">
                  <h4 className="projectC-title">Portfolio</h4>
                  <p className="projectC-desc">Personal portfolio website showcasing my work and skills</p>
                  <div className="projectA-img">
                    <video ref={videoRef} autoPlay loop muted controls playsInline className="card-video">
                      <source src={process.env.PUBLIC_URL + "/video/pvid.mp4"} type="video/mp4" />
                    </video>
                    <div className="fghub-desc">
                      <p className="video-desc">This is my personal portfolio website built to showcase my skills, projects, and experience as a Software Engineering undergraduate. It serves as a professional online presence for recruiters and clients to learn more about me and easily connect with me.</p>
                      <ul className="features">
                        <li className="features">Built using React.js with modern UI/UX design</li>
                        <li className="features">Fully responsive and mobile-friendly layout</li>
                        <li className="features">Clean and professional interface for better user experience</li>
                        <li className="features">Deployed using Vercel / Netlify for live access</li>
                        <li className="features">Designed to highlight my development journey and abilities</li>
                      </ul>
                    </div>
                    <a href="https://github.com/ramesh-2003-krishan/Portfolio" target="_blank" rel="noopener noreferrer">
                       <img src="/logos/git.png" alt="Git" className="lllogo" />
                    </a>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-section">
            <div>
              <h2 className="contact-title">Contact</h2>
              <p className="line"> </p>
            </div>
            <div className="contact-info">
              <div>
                <p className="liine"></p>
              </div>
              <div ref={contactRef} className="typing-wrapper">
                <p className={`word ${contactVisible ? 'typewriter' : ''}`}>
                Hire Me your 
                </p>
                <p className={`wword ${contactVisible ? 'typewriter-delayed' : ''}`}>
                Next Project!
                </p>
             </div>
             <div className="contact-links">
                <p className="cname">Name: Ramesh Krishan Sudarshana</p>
                <p className="cemail">Gmail: sudarshanakrishan@gmail.com</p>
                <p className="cphone">Phone: 0702913026</p>
                <div className="ogo">
                    <a href="https://github.com/ramesh-2003-krishan?tab=overview&from=2026-04-01&to=2026-04-07" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/git.png" alt="Git" className="logs" />
                    </a>
                    <a href="https://www.linkedin.com/in/ramesh-krishan-8b8274320" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/linkedin.png" alt="LinkedIn" className="logs" />
                    </a>
                    <a href="mailto:sudarshanakrishan123@gmail.com" target="_blank" rel="noopener noreferrer">
                      <img src="/logos/gmail.png" alt="Gmail" className="logs" />
                    </a>
                  </div>
             </div>
          </div>
        </div>
        </section>



      </div>

    </>
  );
}
