import React from 'react';
import ContactCard from '../contact/ContactCard';

export default function ContactSection() {
  return (
    <section id="contact" className="contact contact-redesign-section">
      <div className="contact-card-wrapper">
        <ContactCard />
      </div>
    </section>
  );
}
