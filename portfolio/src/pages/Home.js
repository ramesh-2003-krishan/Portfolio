import '../style/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-left">Home</div>
        <div className="nav-right">
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
    </div>
  );
}
