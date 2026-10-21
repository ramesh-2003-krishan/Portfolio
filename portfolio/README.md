# Ramesh Krishan Sudarshana - Personal Portfolio

A modern, high-performance personal portfolio built with React.js showcasing full-stack development, UI/UX design, machine learning interests, and interactive web projects.

**Live Site:** [portfolio-phi-ivory-19.vercel.app](https://portfolio-phi-ivory-19.vercel.app/)

---

## 🚀 Features

- **Responsive Design**: Flawless visual fidelity across Desktop (1920px, 1440px, 1280px), Tablet (768px - 1024px), and Mobile (390px - 640px).
- **Theme Modes**: Seamless Dark and Light theme switcher with persistent localStorage memory.
- **Interactive Tech Stack Marquee**: Continuous smooth animated ribbon displaying core technologies.
- **Dynamic Skills Tree**: Interactive category cards that reveal technology badges on click with custom spatial animations.
- **Sticky Stacked Project Showcase**: Video-featured interactive portfolio cards demonstrating real-world applications (FGhub, UniEVE, Portfolio, and ARCADE B.ARENA).
- **Typewriter Contact Section**: Intersection-triggered typewriter effect with quick contact details and verified social links.
- **Accessibility (a11y)**: Semantic HTML landmarks, clear aria-labels, focus-visible outlines, and respect for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ES6+)
- **Styling**: Vanilla CSS with CSS Custom Properties / Variables for dark and light themes
- **Build System**: Create React App (`react-scripts 5.0.1`)
- **Deployment**: Vercel

---

## 📁 Project Structure

```text
portfolio/
├── baseline/                  # Baseline screenshots across 5 viewports
├── public/
│   ├── assests/               # Profile portrait assets
│   ├── logos/                 # Tech and platform logo SVGs/PNGs
│   ├── video/                 # High-definition demo recordings for projects
│   ├── CV.pdf                 # Curated downloadable resume
│   ├── index.html             # HTML shell with meta tags & favicon
│   └── ramesh.ico             # Custom monogram favicon
├── src/
│   ├── components/
│   │   ├── cards/             # Reusable card components (SkillCard, ProjectCard)
│   │   ├── common/            # Common layout components (Navbar)
│   │   └── sections/          # Dedicated page sections (Hero, Marquee, About, Skills, Projects, Contact)
│   ├── data/                  # Decoupled content & configuration
│   │   ├── navigation.js      # Nav anchor routes
│   │   ├── personalInfo.js    # Contact, bio, and personal details
│   │   ├── projects.js        # Project descriptions, features, and video paths
│   │   ├── skills.js          # Skill hierarchies and badges
│   │   ├── socialLinks.js     # External profile links
│   │   └── techLogos.js       # Infinite banner technology logos
│   ├── hooks/                 # Custom React hooks (useTheme, useInView, useMediaQuery, useReducedMotion)
│   ├── pages/
│   │   └── Home.js            # Main home page orchestrating sections
│   ├── style/
│   │   └── Home.css           # Core styling, animations, and responsive media queries
│   ├── App.js                 # Root React component
│   └── index.js               # React DOM entry point
└── package.json
```

---

## 💻 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make edits.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

---

## 📄 License & Attribution
Designed & developed by Ramesh Krishan Sudarshana. All rights reserved.
