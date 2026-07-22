import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView } from 'framer-motion'
import GlowCard from './GlowCard'
import { 
  PythonLogo, 
  FastAPILogo, 
  PostgreSQLLogo, 
  DockerLogo, 
  GCPLogo, 
  GeminiLogo, 
  OpenAILogo, 
  TensorFlowLogo,
  EducationIcon
} from './Logos'

const MotionGlowCard = motion(GlowCard)

function Counter({ value, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(() => {
    const end = parseInt(value, 10)
    return isNaN(end) ? value : 0
  })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const end = parseInt(value, 10)
    if (isNaN(end)) return

    let startTime = null
    let rafId = null

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const current = Math.floor(progress * end)
      setCount(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(update)
      } else {
        setCount(end)
      }
    }

    rafId = requestAnimationFrame(update)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [value, duration, isInView])

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        minWidth: '2.4ch',
        textAlign: 'left'
      }}
    >
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const [activeCert, setActiveCert] = useState(null)

  const handleSkillClick = (skillName) => {
    window.dispatchEvent(new CustomEvent('open-aura-chatbot', {
      detail: { query: skillName }
    }))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCert(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const skillsData = [
    {
      category: 'AI/ML & Frameworks',
      logo: <GeminiLogo style={{ width: 16, height: 16 }} />,
      skills: [
        { name: 'Generative AI', icon: <GeminiLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Agentic AI', icon: <OpenAILogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Advanced RAG Models', icon: null },
        { name: 'Prompt Engineering', icon: null },
        { name: 'LLM Integration', icon: null },
        { name: 'Fine-tuning', icon: null },
        { name: 'Deep Learning', icon: null },
        { name: 'Neural Networks', icon: null },
        { name: 'Image Classification', icon: null },
        { name: 'Model Training & Optimization', icon: null },
        { name: 'Google Gemini API', icon: <GeminiLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Vertex AI', icon: <GCPLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'TensorFlow', icon: <TensorFlowLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
      ],
    },
    {
      category: 'Development & Core CS',
      logo: <PythonLogo style={{ width: 16, height: 16 }} />,
      skills: [
        { name: 'Advanced Python', icon: <PythonLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'AI Tools & Frameworks', icon: null },
        { name: 'Data Structures', icon: null },
        { name: 'Algorithms', icon: null },
        { name: 'Software Engineering', icon: null },
      ],
    },
    {
      category: 'Backend & Database',
      logo: <FastAPILogo style={{ width: 16, height: 16 }} />,
      skills: [
        { name: 'FastAPI', icon: <FastAPILogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Flask', icon: null },
        { name: 'PostgreSQL', icon: <PostgreSQLLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'SQL Query Optimization', icon: null },
        { name: 'REST APIs', icon: null },
        { name: 'psycopg2', icon: null },
        { name: 'JSON Orchestration', icon: null },
      ],
    },
    {
      category: 'DevOps & Cloud',
      logo: <GCPLogo style={{ width: 16, height: 16 }} />,
      skills: [
        { name: 'AWS', icon: null },
        { name: 'Google Cloud Platform', icon: <GCPLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Cloud-based AI Deployments', icon: null },
        { name: 'Docker', icon: <DockerLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Cloud Run', icon: <GCPLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Compute Engine', icon: <GCPLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Artifact Registry', icon: <GCPLogo className="skill-logo-icon" style={{ width: 14, height: 14 }} /> },
        { name: 'Git & GitHub', icon: null },
        { name: 'Linux System Administration', icon: null },
        { name: 'CI/CD', icon: null },
      ],
    },
    {
      category: 'Frontend',
      logo: <FastAPILogo style={{ width: 16, height: 16 }} />,
      skills: [
        { name: 'HTML & CSS', icon: null },
        { name: 'JavaScript', icon: null },
        { name: 'Responsive Design', icon: null },
        { name: 'Glassmorphic UI', icon: null },
      ],
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 13,
        delay: index * 0.1,
      },
    }),
  }

  return (
    <section id="about">
      <div className="title-mask">
        <motion.h2
          className="section-title"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Professional Summary
        </motion.h2>
      </div>
      <p className="section-subtitle">AI engineering credentials, university details, and core technical skills.</p>

      <div className="about-grid">
        {/* Left Column: Summary & Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <MotionGlowCard
            className="about-bio-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="about-bio">
              <h3>Biography</h3>
              <p>
                AI Engineer and Full Stack Developer with hands-on experience in Generative AI, Agentic AI, FastAPI, RAG systems, and cloud-native deployments. Built and deployed production-ready intelligent systems including AURA Lite (live on Google Cloud Run), AI chatbots, farmer advisory agents, and NL-to-SQL assistants using Python, Gemini API, PostgreSQL, and Google Cloud Platform.
              </p>
              <p>
                Passionate about scalable backend architecture, AI agent orchestration, and solving real-world problems through intelligent automation.
              </p>

              <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--secondary)' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Open Source Contributor & Developer Portals
                </h4>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', fontSize: '0.82rem' }}>
                  <a href="https://github.com/Varshith10121901" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-underline">
                    GitHub
                  </a>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>|</span>
                  <a href="https://g.dev/thevk" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-underline">
                    Google Developer Profile
                  </a>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>|</span>
                  <a href="https://aikosh.indiaai.gov.in/web/user/public-profile/e907e2ef-f58b-4e93-b139-37d13d1f1694?tabs=about" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-underline">
                    AIkosh (IndiaAI)
                  </a>
                  <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>|</span>
                  <a href="https://www.kaggle.com/varshithkumaranand" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', transition: 'var(--transition-smooth)' }} className="hover-underline">
                    Kaggle
                  </a>
                </div>
              </div>
              
              <div className="about-stats" style={{ marginTop: '1.5rem' }}>
                <div className="stat-item">
                  <span className="stat-num text-gradient-purple-cyan">
                    <Counter value="96" suffix="%" />
                  </span>
                  <span className="stat-label">Model Accuracy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num text-gradient-purple-cyan">
                    <Counter value="20" suffix="+" />
                  </span>
                  <span className="stat-label">Plant Diseases Tracked</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num text-gradient-purple-cyan">
                    <Counter value="100" suffix="%" />
                  </span>
                  <span className="stat-label">Cloud Native (Docker)</span>
                </div>
              </div>
            </div>
          </MotionGlowCard>

          {/* Education Block inside GlowCard */}
          <MotionGlowCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <div style={{ padding: '2.5rem', textAlign: 'left' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                <EducationIcon style={{ width: 24, height: 24, color: 'var(--primary)' }} />
                Education
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid rgba(66, 133, 244, 0.2)' }}>
                {/* MCA Degree Node */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-21px',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    boxShadow: '0 0 8px var(--primary)'
                  }} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                    KLE Technological University
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Hubballi, Karnataka
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--secondary)', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                    Master of Computer Applications (MCA) <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>| 2025 - 2027</span>
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                    Specializing in Generative AI, Machine Learning, and Cloud Computing.
                  </p>
                </div>

                {/* BCA Degree Node */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-21px',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    boxShadow: '0 0 8px var(--primary)'
                  }} />
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                    Don Bosco Degree College
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Chitradurga, Karnataka
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--secondary)', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                    Bachelor of Computer Applications (BCA) <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>| 2023 - 2025</span>
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                    Affiliated with Davangere University. Focused on core Computer Science foundations.
                  </p>
                </div>
              </div>
            </div>
          </MotionGlowCard>

          {/* Certifications Block inside GlowCard */}
          <MotionGlowCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div style={{ padding: '2.5rem', textAlign: 'left' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Certifications
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Google Hackathon */}
                <div className="cert-item-row">
                  <div>
                    <h4 style={{ fontSize: '1.02rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                      Google GDG Hackathon Certificate
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      30-hour Hackathon | GDG Bengaluru x Reva University
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCert({
                      title: 'Google GDG Hackathon Certificate',
                      image: '/gdg_hackathon_certificate.png'
                    })}
                    className="cert-preview-btn"
                  >
                    PREVIEW
                  </button>
                </div>

                {/* OpenAI Hackathon */}
                <div className="cert-item-row">
                  <div>
                    <h4 style={{ fontSize: '1.02rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                      OpenAI Hackathon Certificate
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      OpenAI Academy x NxtWave Regional Buildathon
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCert({
                      title: 'OpenAI Hackathon Certificate',
                      image: 'https://cdn1.ccbp.in/misc/openai-rg-c/IZXED27R4U.png'
                    })}
                    className="cert-preview-btn"
                  >
                    PREVIEW
                  </button>
                </div>

                 {/* Agentic AI Day */}
                <div className="cert-item-row">
                  <div>
                    <h4 style={{ fontSize: '1.02rem', color: 'var(--text-bright)', marginBottom: '0.25rem' }}>
                      Agentic AI Day Certificate
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      Google Cloud Agentic AI Day | Hack2skill
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCert({
                      title: 'Agentic AI Day Certificate',
                      image: '/google_cloud_hackathon.png'
                    })}
                    className="cert-preview-btn"
                  >
                    PREVIEW
                  </button>
                </div>
              </div>
            </div>
          </MotionGlowCard>
        </div>

        {/* Certificate Preview Modal Overlay */}
        {activeCert && createPortal(
          <div 
            onClick={() => setActiveCert(null)}
            className="cert-preview-overlay"
          >
            {/* Floating close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="cert-close-btn"
              aria-label="Close Certificate Preview"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image — constrained to half-screen size */}
            <img
              src={activeCert.image}
              alt={activeCert.title}
              onClick={(e) => e.stopPropagation()}
              className="cert-preview-img"
            />
          </div>,
          document.body
        )}

        {/* Right Column: Skills */}
        <div className="about-skills">
          {skillsData.map((group, index) => (
            <MotionGlowCard
              key={group.category}
              className="skills-card-wrapper"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={cardVariants}
            >
              <div className="skills-card">
                <h4>
                  {group.logo}
                  {group.category}
                </h4>
                <ul className="skills-list">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="skill-tag skill-tag-clickable"
                      onClick={() => handleSkillClick(skill.name)}
                      title={`Ask Aura-Mini about ${skill.name} projects`}
                    >
                      {skill.icon ? skill.icon : <span className="skill-dot" />}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionGlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
