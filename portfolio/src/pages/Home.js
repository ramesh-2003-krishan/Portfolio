import '../style/Home.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
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

  return (
    <>
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-left">Home</div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isLightMode ? '🌙' : '☀️'}
          </button>
          <a href="#">About Me</a>
          <a href="#">Education</a>
          <a href="#">Skills</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className="hero">
        
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
            <img src="/logos/git.png" alt="Git"  className="logo" />
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
            <img src="/logos/git.png" alt="Git"  className="logo" />
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
      
      <section className="aboutme">
        <div className="about">
          <h2 className="about-title">Who am I</h2>
          <p>
            I'm a passionate full-stack developer with a strong interest in AI and ML. I enjoy creating innovative solutions and learning new technologies to enhance my skills.
          </p>
        </div>
      </section>
      
    </div>

    </>
  );
}
