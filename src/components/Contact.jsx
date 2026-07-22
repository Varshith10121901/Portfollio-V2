import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlowCard from './GlowCard'
import { AchievementIcon } from './Logos'

const MotionGlowCard = motion(GlowCard)

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, sending, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Server responded with an error')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status !== 'success' ? (
        <motion.form
          key="contact-form"
          onSubmit={handleSubmit}
          className="contact-form"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {status === 'error' && (
            <div style={{ color: '#ef4444', marginBottom: '1.25rem', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'left' }}>
              Failed to send message. Please try again or email Varshith directly.
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              placeholder="Your Name"
              disabled={status === 'sending'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              placeholder="name@example.com"
              disabled={status === 'sending'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              placeholder="Describe your project, timeline, or requirements..."
              disabled={status === 'sending'}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`btn-premium btn-submit ${status === 'sending' ? 'sending' : ''}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="spinner"></span>
                Initializing session...
              </>
            ) : (
              <>
                Submit Request
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </motion.form>
      ) : (
        <motion.div
          key="success-message"
          className="contact-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div className="success-icon-wrapper">
            <svg className="success-icon" viewBox="0 0 52 52">
              <circle className="success-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h3>Request Deployed!</h3>
          <p>Thank you for reaching out, Varshith will reply within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-secondary"
            style={{ marginTop: '1.5rem' }}
          >
            Send another message
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  const achievements = [
    'Completed Google Cloud Skills Boost labs with verified Google Skills Profile.',
    'Participated in OpenAI Academy x NxtWave Regional Buildathon – Karnataka.',
    'Participated in Google Cloud Agentic AI Day.',
    'Built and deployed production-ready AI systems for agriculture, education, and data intelligence.',
    'Completed specialized training in Generative AI, Agentic AI systems, and cloud-based AI deployments.'
  ]

  return (
    <section id="contact">
      <div className="title-mask">
        <motion.h2
          className="section-title"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Connect & Credentials
        </motion.h2>
      </div>
      <p className="section-subtitle">Get in touch via the secure contact form or explore certifications and achievements.</p>

      <div className="contact-grid">
        {/* Left Column: Contact Form */}
        <MotionGlowCard
          className="contact-form-card"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-form-container">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'left', color: 'var(--text-bright)' }}>
              Send Message
            </h3>
            <ContactForm />
          </div>
        </MotionGlowCard>

        {/* Right Column: Achievements & Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Achievements Card */}
          <MotionGlowCard
            className="info-card-wrapper"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="info-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AchievementIcon style={{ width: 20, height: 20, color: 'var(--secondary)' }} />
                Achievements & Certifications
              </h3>
              
              <ul style={{ 
                listStyle: 'none', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.85rem', 
                fontSize: '0.85rem',
                color: 'var(--text)',
                textAlign: 'left' 
              }}>
                {achievements.map((ach, idx) => (
                  <li key={idx} style={{ position: 'relative', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: '6px', 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: 'var(--secondary)' 
                    }} />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </MotionGlowCard>

          {/* Contact Details Card */}
          <MotionGlowCard
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ padding: '2rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>
                Contact Info
              </h3>
              
              <div className="info-details">
                <div className="info-item">
                  <div className="info-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="info-text">
                    <span className="info-label">Email</span>
                    <a href="mailto:varshithkumar815@gmail.com" className="info-link">varshithkumar815@gmail.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="info-text">
                    <span className="info-label">Phone</span>
                    <a href="tel:+917022756962" className="info-link">+91 7022756962</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="info-text">
                    <span className="info-label">Location</span>
                    <span className="info-val">Hubballi, Karnataka</span>
                  </div>
                </div>
              </div>

              <div className="info-socials" style={{ marginTop: '1.5rem' }}>
                <h4>Developer Portals</h4>
                <div className="social-icons">
                  <a href="https://github.com/Varshith10121901" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                  <a href="https://g.dev/thevk" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Google Developer Profile" title="Google Developer Profile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12c0 3.9-2.6 6.6-6.5 6.6C8.4 18.6 5 15.2 5 11c0-4.2 3.4-7.6 7.5-7.6c2 0 3.7.7 5 1.9L15 7.8c-.8-.8-2.2-1.7-4-1.7-3.4 0-6.1 2.8-6.1 6.3c0 3.5 2.7 6.3 6.1 6.3c3.9 0 5.4-2.8 5.6-4.2h-5.6v-3.2H19z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/varshith-kumar-anand-7479b42a6" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="https://x.com/vars84141" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter / X" title="Twitter / X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </MotionGlowCard>
        </div>
      </div>
    </section>
  )
}
