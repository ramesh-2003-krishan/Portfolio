import '../style/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      
  <nav class="navbar">
    <div class="nav-left">Home</div>
    <div class="nav-right">
      <a href="#">About Me</a>
      <a href="#">Education</a>
      <a href="#">Skills</a>
      <a href="#">Projects</a>
      <a href="#">Contact</a>
    </div>
  </nav>

  
  <section class="hero">

    <h1 class="title">HI, I'M RAMESH</h1>

   
    <div class="left-text">
      <h2>AI & ML</h2>
      <p>Enthusiast</p>
    </div>

   
    <div class="right-text">
      <p class="small">Passionate</p>
      <h2>Full-Stack</h2>
      <p class="small">Developer</p>
    </div>

    
    <img src="mine.png" alt="Ramesh" class="profile"/>

  </section>

    </div>
  );
}
