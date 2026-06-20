import { useState } from "react";
import "./contact.css";
import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://api.wynxtalks.com"
    : "http://localhost:5001";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: "+1 (716) 217-1471",
      body: "Have questions about speaking, sponsorship, or registration? Our team is available to assist you with all conference-related inquiries.",
      tag: "Phone Number",
      cta: "Call Us Now →",
      accent: "#00c2ff",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: "contact@wynxtalks.com",
      body: "Send us your questions about keynote opportunities, award nominations, partnerships, and event participation. We typically respond within 24 hours.",
      tag: "Email Address",
      cta: "Email Us Now →",
      accent: "#a78bfa",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: "Dubai, United Arab Emirates.",
      body: "BLVD Heights, Dubai Opera District, Dubai, United Arab Emirates.",
      tag: "Our Location",
      cta: "Get Directions →",
      accent: "#34d399",
    },
  ];

  return (
    <div className="cp-wrap">
      <Navbar />
      <div className="cp-bg">
        <div className="cp-orb cp-orb-1" />
        <div className="cp-orb cp-orb-2" />
        <div className="cp-grid" />
      </div>

      {/* ── Hero Title ── */}
      <section className="cp-hero">
        <h1 className="cp-hero-title">
          <span className="cp-title-box">Contact</span>
          <span className="cp-title-plain"> Us</span>
        </h1>
        <p className="cp-hero-sub">
          Have questions about our conferences, awards, or sponsorship opportunities?
          <br />
          Reach out to our team and we'll be happy to assist you.
        </p>
      </section>

      {/* ── 3 Contact Cards ── */}
      <section className="cp-cards">
        {cards.map((c, i) => (
          <div className="cp-card" key={i} style={{ "--ca": c.accent, "--i": i }}>
            <div className="cp-card-icon">{c.icon}</div>
            <h3 className="cp-card-title">{c.title}</h3>
            <p className="cp-card-body">{c.body}</p>
            <div className="cp-card-footer">
              <span className="cp-card-tag">{c.tag}</span>
              <button className="cp-card-cta">{c.cta}</button>
            </div>
          </div>
        ))}
      </section>

      <section className="cp-touch">
        <div className="cp-left">
          <p className="cp-touch-label">( GET IN TOUCH )</p>
          <p className="cp-touch-body">
            We are here to answer your questions and provide support for all our global conferences and awards.
          </p>
          <div className="cp-socials">
            {["f", "𝕏", "▶", "in"].map((s, i) => (
              <button className="cp-social" key={i}>{s}</button>
            ))}
          </div>
          <p className="cp-map-label">Find Us Here!</p>
          <div className="cp-map-frame">
            <iframe
              title="Wynx HQ — BLVD Heights, Dubai Opera District"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1783565446397!2d55.27594387600785!3d25.197197977732263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6829cacd6a0d%3A0x8e0ca1b46b234faf!2sBLVD%20Heights%2C%20Dubai%20Opera%20District!5e0!3m2!1sen!2sae!4v1716000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(92%) hue-rotate(195deg) brightness(0.82) contrast(1.05) saturate(0.8)",
              }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="cp-right">
          {submitted ? (
            <div className="cp-success">
              <div className="cp-success-icon">✦</div>
              <p className="cp-success-title">Message Sent!</p>
              <p className="cp-success-sub">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="cp-form" onSubmit={handleSubmit}>
              {error && <p className="cp-form-error">{error}</p>}

              <div className="cp-form-row">
                <div className={`cp-field ${focused === "name" || formData.name ? "cp-active" : ""}`}>
                  <label>Name :</label>
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
                <div className={`cp-field ${focused === "email" || formData.email ? "cp-active" : ""}`}>
                  <label>Email :</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
              </div>

              <div className={`cp-field ${focused === "subject" || formData.subject ? "cp-active" : ""}`}>
                <label>Subject :</label>
                <input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </div>

              <div className={`cp-field ${focused === "message" || formData.message ? "cp-active" : ""}`}>
                <label>Message :</label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </div>

              <button type="submit" className="cp-submit" disabled={loading}>
                {loading ? "Sending..." : "Subscribe Now"}
              </button>
            </form>
          )}
        </div>
      </section>
      <NewFooter />
    </div>
  );
};

export default ContactPage;