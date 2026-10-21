import React, { useRef, useEffect } from 'react';

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => {
          // Graceful handling of browser autoplay restrictions
          console.error('Video play failed:', err);
        });
    }
  }, []);

  const content = (
    <div className="projectA-img">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        controls
        playsInline
        className={project.videoClass}
      >
        <source
          src={process.env.PUBLIC_URL + project.videoSrc}
          type="video/mp4"
        />
      </video>
      <div className="fghub-desc">
        <p className={project.videoDescClass}>{project.fullDesc}</p>
        <ul className="features">
          {project.features.map((feature, idx) => (
            <li key={idx} className="features">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} project link`}
      >
        <img src={project.linkIcon} alt={project.linkAlt} className="lllogo" />
      </a>
    </div>
  );

  return (
    <div className={project.wrapperClass}>
      <div className={project.cardClass}>
        <h4 className={project.titleClass}>{project.title}</h4>
        <p className={project.descClass}>{project.shortDesc}</p>
        {project.hasOuterImgDiv ? (
          <div className={project.outerImgClass}>{content}</div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
