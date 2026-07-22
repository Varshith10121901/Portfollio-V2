import { motion } from 'framer-motion'
import GlowCard from './GlowCard'
import { 
  PythonLogo, 
  FastAPILogo, 
  DockerLogo, 
  GCPLogo, 
  GeminiLogo, 
  TensorFlowLogo,
  JSLogo,
  HTMLLogo,
  CSSLogo,
  OpenCVLogo,
  ScikitLogo,
  SQLLogo,
  AWSLogo,
  GmailLogo
} from './Logos'

const MotionGlowCard = motion(GlowCard)

export default function Projects() {
  const projectsData = [
    {
      title: 'AIAS – AI SaaS & Workflow Automation',
      date: '2026',
      live: true,
      description: 'An AI SaaS platform that enables businesses to automate workflows using AI agents, intelligent chatbots, and scalable business automation from a unified dashboard.',
      points: [
        'Unified dashboard for orchestrating workflows with intelligent chatbots and AI agents.',
        'Secure user authentication, API token usage monitoring, and scalable business logic.',
        'Fast, modular microservices designed for enterprise deployment and rapid integrations.'
      ],
      image: '/projects/AIAS image.png',
      linkDemo: 'https://aiasapp.me/',
      linkRepo: 'https://github.com/Varshith10121901/AIAS',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L18.5 4.5l-11 11z" />
          <path d="M12 9l9-9-9 9z" />
          <path d="M9 15l-9 9 9-9z" />
        </svg>
      ),
      logos: [
        { name: 'Python', icon: <PythonLogo style={{ width: 14, height: 14 }} /> },
        { name: 'FastAPI', icon: <FastAPILogo style={{ width: 14, height: 14 }} /> },
        { name: 'Gemini AI', icon: <GeminiLogo style={{ width: 14, height: 14 }} /> },
        { name: 'AWS', icon: <AWSLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Gmail System', icon: <GmailLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Docker', icon: <DockerLogo style={{ width: 14, height: 14 }} /> },
        { name: 'JavaScript', icon: <JSLogo style={{ width: 14, height: 14 }} /> }
      ]
    },
    {
      title: 'Images Scanner Preprocessing Pipeline',
      date: '2025',
      live: false,
      description: 'An AI-powered image preprocessing pipeline that prepares datasets for deep learning models through automated image enhancement, normalization, augmentation, annotation, and quality validation before model training.',
      points: [
        'Automated computer vision dataset curation with real-time feedback and progress.',
        'Integrated dataset augmentation (rotations, flips, crops) for CNN robustness.',
        'Automated file renaming, format conversions, and metadata structure generation.'
      ],
      image: '/projects/Images-Scanner-Before-Model-Training.png',
      linkDemo: '#',
      linkRepo: 'https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      logos: [
        { name: 'Python', icon: <PythonLogo style={{ width: 14, height: 14 }} /> },
        { name: 'OpenCV', icon: <OpenCVLogo style={{ width: 14, height: 14 }} /> },
        { name: 'TensorFlow', icon: <TensorFlowLogo style={{ width: 14, height: 14 }} /> },
        { name: 'ML', icon: <ScikitLogo style={{ width: 14, height: 14 }} /> }
      ]
    },
    {
      title: 'Agrilens – GDG AI Agriculture Platform',
      date: '2024',
      live: false,
      description: 'An AI-powered agriculture platform that detects crop diseases using computer vision and provides intelligent treatment recommendations to improve farming productivity.',
      points: [
        'High-accuracy plant disease classification from high-resolution image uploads.',
        'Generative AI-powered treatment guides and local farming recommendations.',
        'GDG Hackathon project built for ecological farming sustainability.'
      ],
      image: '/projects/agrilens image.png',
      linkDemo: '#',
      linkRepo: 'https://github.com/Varshith10121901/Agrilens-GDG-Hackathon',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <path d="M12 22V12m0 0C12 8.5 9 5.5 5 5m7 7c0-3.5 3-6.5 7-7" />
        </svg>
      ),
      logos: [
        { name: 'Python', icon: <PythonLogo style={{ width: 14, height: 14 }} /> },
        { name: 'TensorFlow', icon: <TensorFlowLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Gemini AI', icon: <GeminiLogo style={{ width: 14, height: 14 }} /> },
        { name: 'JavaScript', icon: <JSLogo style={{ width: 14, height: 14 }} /> }
      ]
    },
    {
      title: 'Bank of India Transaction Fraud Detection',
      date: '2024',
      live: false,
      description: 'A machine learning-based fraud detection system that analyzes banking transactions to identify suspicious activities and improve financial security.',
      points: [
        'Machine learning fraud anomaly matching and risk categorization.',
        'Exploratory data analysis of banking transaction patterns using Jupyter Notebook.',
        'Data pipelines engineered to clean, filter, and validate payment accounts.'
      ],
      image: '/projects/Banking fruad detection.png',
      linkDemo: '#',
      linkRepo: 'https://github.com/Varshith10121901/Bank-of-India-Hackathon',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M12 2L2 7h20L12 2z" />
          <path d="M9 22V11M15 22V11" />
        </svg>
      ),
      logos: [
        { name: 'Python', icon: <PythonLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Scikit-learn', icon: <ScikitLogo style={{ width: 14, height: 14 }} /> },
        { name: 'SQL', icon: <SQLLogo style={{ width: 14, height: 14 }} /> }
      ]
    },
    {
      title: 'Google Cohort 1 – AURA Lite',
      date: '2026',
      live: false,
      description: 'A cloud-native AI agriculture assistant built during Google\'s AI Cohort, integrating Gemini AI with FastAPI and Google Cloud services for scalable intelligent farming solutions.',
      points: [
        'Officially incubated during Google\'s AI Cohort 1 program.',
        'Scalable Cloud Run containers managed using Docker and Google Cloud Platform.',
        'Weather-aware crop advisory alerts and real-time chat with farming logs.'
      ],
      image: '/projects/google cohort 1.png',
      linkDemo: 'https://github.com/Varshith10121901/Google-Cohort-1',
      linkRepo: 'https://github.com/Varshith10121901/Google-Cohort-1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <path d="M18 10h-.08A7 7 0 0 0 4.75 8.75a6 6 0 0 0 .25 11.25H18a5 5 0 0 0 0-10z" />
        </svg>
      ),
      logos: [
        { name: 'Python', icon: <PythonLogo style={{ width: 14, height: 14 }} /> },
        { name: 'FastAPI', icon: <FastAPILogo style={{ width: 14, height: 14 }} /> },
        { name: 'GCP', icon: <GCPLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Gemini AI', icon: <GeminiLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Docker', icon: <DockerLogo style={{ width: 14, height: 14 }} /> }
      ]
    },
    {
      title: 'Promptwar Challenge 3 AI App',
      date: '2024',
      live: false,
      description: 'An AI-powered application developed for the PromptWar Challenge, showcasing rapid prototyping, prompt engineering, and AI-assisted application development. Achieved Rank 322, Rank 124, and Rank 386 in coding challenges.',
      points: [
        'Competed in three PromptWar coding hackathons, ranking 322, 124, and 386 globally.',
        'Implemented high-performance prompt chains using Gemini AI models.',
        'Designed fluid web interactions using vanilla JavaScript, HTML5, and CSS3 under strict timer constraints.'
      ],
      image: '/projects/Google promptwars (1).png',
      linkDemo: '#',
      linkRepo: 'https://github.com/Varshith10121901/Promptwar-challenge-3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, color: 'var(--secondary)' }}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      logos: [
        { name: 'JavaScript', icon: <JSLogo style={{ width: 14, height: 14 }} /> },
        { name: 'HTML5', icon: <HTMLLogo style={{ width: 14, height: 14 }} /> },
        { name: 'CSS3', icon: <CSSLogo style={{ width: 14, height: 14 }} /> },
        { name: 'Gemini AI', icon: <GeminiLogo style={{ width: 14, height: 14 }} /> }
      ]
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 14
      }
    }
  }

  return (
    <section id="projects">
      <div className="title-mask">
        <motion.h2
          className="section-title"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Key Projects
        </motion.h2>
      </div>
      <p className="section-subtitle">Real-world AI systems built for agriculture, data intelligence, and SaaS automation.</p>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projectsData.map((project) => (
          <MotionGlowCard
            key={project.title}
            className="project-card-wrapper"
            variants={cardVariants}
          >
            <div className="project-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Card Screenshot Preview Banner */}
              <div className="project-preview" style={{ height: '180px', overflow: 'hidden', borderBottom: '1px solid var(--border)', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  className="project-img-preview"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.08)', pointerEvents: 'none' }} />
              </div>

              <div className="project-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Title & Icon Header */}
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', margin: '0 0 1rem 0', fontSize: '1.18rem', fontWeight: 600, color: 'var(--text-bright)' }}>
                  {project.icon}
                  {project.title}
                </h3>

                {/* Brief description */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5', minHeight: '65px', textAlign: 'left' }}>
                  {project.description}
                </p>

                {/* Bulleted detail lists with relative circle dots */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text)', textAlign: 'left', marginBottom: '1.5rem', paddingLeft: 0 }}>
                  {project.points.map((pt, idx) => (
                    <li key={idx} style={{ position: 'relative', paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                      <span style={{ position: 'absolute', left: '0px', top: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }}></span>
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Logos Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', margin: 'auto 0 1.25rem 0' }}>
                  {project.logos.map((logo, idx) => (
                    <div key={idx} className="project-logo-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-offset)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.2rem 0.4rem', fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-bright)' }}>
                      {logo.icon}
                      <span>{logo.name}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action Buttons */}
                <div className="project-links" style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  {project.live && (
                    <a href={project.linkDemo} target="_blank" rel="noreferrer" className="project-link-btn primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600, border: 'none', borderRadius: '6px', background: 'var(--primary)', color: '#ffffff', textDecoration: 'none', cursor: 'pointer' }}>
                      Launch Console
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  <a href={project.linkRepo} target="_blank" rel="noreferrer" className="google-sweep-hover-btn" style={{ flexGrow: 1 }}>
                    <span className="google-sweep-hover-btn-inner" style={{ width: '100%', justifyContent: 'center' }}>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </MotionGlowCard>
        ))}
      </motion.div>
    </section>
  )
}
