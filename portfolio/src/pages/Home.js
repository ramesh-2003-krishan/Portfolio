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

  function App(){
    useEffect(()=>{
      const cards = document.querySelectorAll(".card");

      const Observer = new IntersectionObserver(
        (entries)=>{
          entries.forEach((entry)=>{
            if(entry.isIntersecting){
              entry.target.classList.add("show");
            }
          });
        },
        {
          threshold:0.2,
        }
      );
      cards.forEach((card)=>{
        Observer.observe(card);
      });
    },
  []);
  }

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
                     <img src="/logos/git.png" alt="Git"  className="logos" />
                 </a>
                 <a href="https://www.linkedin.com/in/ramesh-krishan-8b8274320" target="_blank" rel="noopener noreferrer">
                    <img src="/logos/linkedin.png" alt="LinkedIn"  className="logos" />
                 </a>
                 <a href="mailto:sudarshanakrishan123@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src="/logos/gmail.png" alt="Gmail"  className="logos" />
                 </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="skill">
          <div className="skill-tit">
            <h2 className="skill-head">Skills</h2>
            <p className="line"></p>
          </div>
          <div className="cards">
            <div className="cardA">
                <img src="/logos/code.png" alt="code" className="logoo" />
                <h4>Full stack Developing</h4>
            </div>
            <div className="cardB">
              <img src="/logos/uiux.png" alt="ui" className="logoo" />
              <h4>UI/UX design</h4>
            </div>
            <div className="cardC">
              <img src="/logos/data.png" alt="data" className="logoo" />
              <h4>Data Analysing</h4>
            </div>
            <div className="cardD">
              <img src="/logos/gamedev.png" alt="game" className="logoo" />
              <h4>Game Developing and Animation</h4>
            </div>
          </div>
        </div>
      </section>
      
    </div>

    </>
  );
}
