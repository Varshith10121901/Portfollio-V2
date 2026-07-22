import { useState, useRef, useEffect } from 'react'

const KNOWLEDGE_BASE = [
  {
    keywords: ['project', 'work', 'portfolio', 'code', 'repo', 'github', 'links'],
    response: "Hii! Varshith has built several exciting AI and Full Stack applications that showcase his expertise in Generative AI, RAG systems, and cloud deployments. Here is a quick overview:\n\n" +
              "• **SwarmAI Bernabeu Edition (Stadium-Controller)**: A decentralized crowd intelligence platform for smart stadium navigation. [Live Demo](https://stadium-swarmai.azurewebsites.net/dashboard) | [Source Code](https://github.com/Varshith10121901/AIAS)\n" +
              "• **Images Scanner Preprocessing Pipeline**: A computer vision pipeline that automates image enhancement and dataset curation before CNN training. [Source Code](https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training)\n" +
              "• **Agrilens (GDG Hackathon)**: A leaf disease diagnostics platform utilizing computer vision, built during the 30-hour GDG Hackathon. [Source Code](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)\n" +
              "• **Bank of India Fraud Detection**: An ML anomaly classifier built during the Bank of India Hackathon. [Source Code](https://github.com/Varshith10121901/Bank-of-India-Hackathon)\n" +
              "• **AURA Lite (Google Cohort 1)**: An agricultural assistant integrating Gemini AI with FastAPI and Cloud Run. [Source Code](https://github.com/Varshith10121901/Google-Cohort-1)\n" +
              "• **Promptwar Challenge 3**: Advanced prompt engineering and chains. [Source Code](https://github.com/Varshith10121901/Promptwar-challenge-3)\n\n" +
              "Which of these would you like to discuss further? Ask me about a specific project like 'SwarmAI' or 'Agrilens'!"
  },
  {
    keywords: ['aias', 'saas', 'workflow', 'automation'],
    response: "**AIAS** is one of Varshith's flagship projects. It's an AI SaaS platform designed to help businesses orchestrate and automate their operations using intelligent agents, custom chat widgets, and automated task pipelines.\n\n" +
              "Varshith built the entire backend infrastructure and deployed it to Google Cloud. Here are the links if you'd like to check it out:\n" +
              "• [Live Demo Console](https://aiasapp.me/)\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/AIAS)"
  },
  {
    keywords: ['images-scanner', 'scanner', 'preprocess', 'dataset', 'cv', 'opencv', 'training'],
    response: "The **Images Scanner Preprocessing Pipeline** is a specialized computer vision workflow. Varshith built it to automate the tedious task of cleaning, normalizing, augmenting, and annotating raw image datasets before feeding them into deep learning CNN models.\n\n" +
              "It's highly efficient for preparing datasets in computer vision applications! You can explore the code here:\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training)"
  },
  {
    keywords: ['agrilens', 'agriculture', 'leaf', 'disease', 'crop', 'gdg', 'hackathon'],
    response: "**Agrilens** was built by Varshith during the intense **Build for Bengaluru GDG Hackathon** (a 30-hour continuous event at Reva University). It uses computer vision models to diagnose crop leaf diseases from photos and instantly recommends pathology-based treatments.\n\n" +
              "You can inspect the codebase here:\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)"
  },
  {
    keywords: ['bank', 'fraud', 'boihackathon', 'transaction', 'banking'],
    response: "**Bank of India Hackathon** is a Machine Learning anomaly detection project. Varshith designed it to parse banking transaction logs, run anomalous classifications, and spot fraudulent transactions in real-time to bolster financial security.\n\n" +
              "Check out the repository:\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/Bank-of-India-Hackathon)"
  },
  {
    keywords: ['google-cohort', 'cohort', 'aura', 'aura lite', 'google cohort'],
    response: "**AURA Lite** was developed during **Google's AI Cohort 1**. It is a smart farming advisor that integrates Gemini API models with FastAPI backends and is deployed natively on GCP Cloud Run. It helps farmers identify crops and get recommendations.\n\n" +
              "Here is the project link:\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/Google-Cohort-1)"
  },
  {
    keywords: ['promptwar', 'prompt', 'challenge', 'promptwar-challenge-3'],
    response: "**Promptwar Challenge 3** highlights Varshith's advanced skills in prompt engineering, prompt chaining, and rapid prototyping. He achieved top rankings (Rank 322, 124, and 386) across these competitive developer hackathons.\n\n" +
              "Check out the prompt workflows:\n" +
              "• [Source Code Repository](https://github.com/Varshith10121901/Promptwar-challenge-3)"
  },
  {
    keywords: ['skills', 'tech', 'python', 'fastapi', 'docker', 'gcp', 'tensorflow', 'gemini', 'javascript', 'html', 'css', 'stack'],
    response: "Varshith has a comprehensive backend and AI stack:\n\n" +
              "• **Generative & Agentic AI**: Prompt engineering, RAG (Retrieval-Augmented Generation), LangChain, Vertex AI, Gemini, OpenAI APIs.\n" +
              "• **Machine Learning & CV**: TensorFlow, Keras, OpenCV, CNN architectures, data preprocessing pipelines.\n" +
              "• **Backend Systems**: Python, FastAPI, Flask, PostgreSQL (psycopg2), RESTful APIs, and database query optimization.\n" +
              "• **Cloud & DevOps**: Google Cloud Platform (GCP), Cloud Run, Compute Engine, Docker containerization, Git/GitHub, Linux administration, and CI/CD.\n" +
              "• **Frontend**: React, JavaScript (ES6+), HTML5, CSS3 (Glassmorphic responsive interfaces)."
  },
  {
    keywords: ['education', 'university', 'college', 'mca', 'kle', 'm.c.a', 'bca', 'pu', 'degree'],
    response: "Varshith's academic background is centered on computer applications:\n\n" +
              "• **Master of Computer Applications (MCA)**: Currently pursuing at **KLE Technological University, Hubballi** (Batch 2025–2027) with specialized training in cutting-edge GenAI and Cloud systems.\n" +
              "• **Bachelor of Computer Applications (BCA)**: Don Bosco Degree College, Chitradurga (Batch 2023–2025).\n" +
              "• **Pre-University (PU)**: Don Bosco PU College, Chitradurga (Batch 2020–2022)."
  },
  {
    keywords: ['achievements', 'certifications', 'skills boost', 'buildathon', 'hackathon', 'hackathons'],
    response: "Varshith is highly active in the developer community and hackathons. His achievements include:\n\n" +
              "• **Google GDG Hackathon**: Participated in the 30-hour continuous buildathon at Reva University, Bangalore.\n" +
              "• **OpenAI x NxtWave Regional Buildathon**: Participant in the 2-day buildathon in Karnataka. [OpenAI Certificate Link](https://cdn1.ccbp.in/misc/openai-rg-c/IZXED27R4U.png)\n" +
              "• **Google Cloud Agentic AI Day**: Certified attendee for building AI agents on GCP.\n" +
              "• **Google Cloud Skills Boost**: Completed verified labs and quests in cloud infrastructure and Vertex AI."
  },
  {
    keywords: ['assignments', 'assignment', 'daa', 'daa program'],
    response: "Varshith has completed several academic and program assignments. These include:\n\n" +
              "• **DAA Program Assignment**: Design and Analysis of Algorithms Program. You can view his public access file here: [DAA Public File Link](https://drive.google.com/file/d/1H3qnlom7t-PVezOBnvYEYiUfKGXqjGtR/view?usp=sharing)"
  },
  {
    keywords: ['contact', 'email', 'phone', 'location', 'connect', 'social', 'linkedin', 'github', 'twitter', 'x', 'g.dev', 'google developer', 'developer profile'],
    response: "You can easily connect with Varshith through these portals:\n\n" +
              "• **Email**: varshithkumar815@gmail.com\n" +
              "• **Phone**: +91 7022756962\n" +
              "• **Location**: Hubballi, Karnataka\n" +
              "• **Google Developer Profile**: [Profile Link](https://g.dev/thevk)\n" +
              "• **LinkedIn**: [Profile Link](https://www.linkedin.com/in/varshith-kumar-anand-7479b42a6)\n" +
              "• **GitHub**: [Profile Link](https://github.com/Varshith10121901)\n" +
              "• **Twitter / X**: [@vars84141](https://x.com/vars84141)\n\n" +
              "You can also drop a message using the Contact Form on the page, and he will receive an instant email notification!"
  },
  {
    keywords: ['resume', 'cv', 'profile'],
    response: "Sure! You can download Varshith's resume directly: [Download Final Resume](/Final_Resume.pdf). There is also a 'View Resume' button in the Hero section at the top of the page.\n\nAdditionally, you can view his [Google Developer Profile](https://g.dev/thevk), [GitHub](https://github.com/Varshith10121901), and [LinkedIn](https://www.linkedin.com/in/varshith-kumar-anand-7479b42a6) profiles."
  },
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'greetings', 'who are you', 'name', 'biography', 'bio', 'about', 'vk', 'who is vk', 'varshith', 'varshith kumar', 'tell me about vk', 'introduce'],
    response: "**VK** — that's **Varshith Kumar A** — is the developer behind everything you see on this portfolio!\n\n" +
              "Here's a quick bio:\n" +
              "• **Education**: Pursuing his **MCA at KLE Technological University, Hubballi** (2025–2027). Previously completed **BCA from Don Bosco Degree College, Chitradurga**.\n" +
              "• **Specialization**: Generative AI, Agentic AI systems, RAG pipelines, and deploying intelligent backend services on GCP.\n" +
              "• **Flagship Project**: **AIAS** — a live AI SaaS platform for workflow automation and intelligent chatbots. [Try it live](https://aiasapp.me/)\n" +
              "• **Hackathons**: GDG Buildathon (Reva University), OpenAI x NxtWave Buildathon, Bank of India Hackathon, Google Cohort 1.\n" +
              "• **Location**: Hubballi, Karnataka, India.\n\n" +
              "Ask me about his **projects**, **skills**, **certifications**, or how to **contact** him!"
  },
  {
    keywords: ['joke', 'tell a joke'],
    response: "Why did the AI developer go broke? Because he used all his cache! 😄"
  },
  {
    keywords: ['why hire', 'hire him', 'hire'],
    response: "Varshith is an excellent hire for AI Engineer and Full Stack roles because:\n\n" +
              "1. **Production Experience**: He has built and deployed real SaaS products like **AIAS** and microservices on GCP Cloud Run.\n" +
              "2. **Specialized Stack**: Hands-on experience with RAG, FastAPI, Docker, and TensorFlow.\n" +
              "3. **Fast Prototyper**: Active participant in demanding 30-hour hackathons (GDG Reva, OpenAI Buildathon), proving he can deliver high-quality work under pressure.\n" +
              "4. **Fast Learner**: Currently excelling in his MCA at KLE Technological University."
  },
  // ── Skill-specific entries ──
  {
    keywords: ['cnn', 'convolutional', 'convolutional neural network'],
    response: "Great pick! Varshith uses **Convolutional Neural Networks (CNNs)** directly in two projects:\n\n" +
              "• **Images Scanner Preprocessing Pipeline** — Varshith built this specifically to clean and curate raw image datasets *before* feeding them into CNN models. It automates augmentation, normalization, and labelling so CNNs train faster and more accurately. [Source Code](https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training)\n" +
              "• **Agrilens (GDG Hackathon)** — Uses a CNN-based vision model to classify and diagnose crop leaf diseases from photos in real time. [Source Code](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)\n\n" +
              "Would you like to explore either project in more detail?"
  },
  {
    keywords: ['tensorflow', 'keras', 'deep learning', 'neural network'],
    response: "Varshith uses **TensorFlow** and **Keras** for his deep learning and computer vision work:\n\n" +
              "• **Images Scanner Preprocessing Pipeline** — Handles image preprocessing to prepare datasets for TensorFlow model training workflows. [Source Code](https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training)\n" +
              "• **Agrilens** — The leaf disease classification model was trained using TensorFlow/Keras with custom CNN architecture. [Source Code](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)\n\n" +
              "He's also familiar with transfer learning techniques and model evaluation using TensorFlow's built-in tools!"
  },
  {
    keywords: ['opencv', 'image processing', 'computer vision'],
    response: "Varshith applies **OpenCV** extensively in his computer vision projects:\n\n" +
              "• **Images Scanner Preprocessing Pipeline** — OpenCV is the backbone for image reading, channel conversion, denoising, histogram equalization, and augmentation steps. [Source Code](https://github.com/Varshith10121901/Images-Scanner-Before-Model-Training)\n" +
              "• **Agrilens** — Uses OpenCV for image capture handling and preprocessing before classification. [Source Code](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)\n\n" +
              "Both projects demonstrate his hands-on CV pipeline experience!"
  },
  {
    keywords: ['rag', 'retrieval-augmented generation', 'retrieval augmented'],
    response: "**RAG (Retrieval-Augmented Generation)** is one of Varshith's core specializations:\n\n" +
              "• **AIAS** — He designed and built custom RAG pipelines inside AIAS, allowing business chatbots to pull context from uploaded documents and knowledge bases, giving highly accurate, domain-specific AI responses. [Live Demo](https://aiasapp.me/) | [Source Code](https://github.com/Varshith10121901/AIAS)\n\n" +
              "He uses vector embeddings, document chunking, and semantic search to power these retrieval systems — a key skill for modern GenAI applications!"
  },
  {
    keywords: ['langchain', 'lang chain', 'agent', 'agentic', 'llm', 'orchestration'],
    response: "Varshith leverages **LangChain** and **agentic AI** architectures in his flagship project:\n\n" +
              "• **AIAS** — Built using LangChain for orchestrating multi-step AI workflows, creating autonomous agents that can browse, reason, and act on business tasks without manual intervention. [Live Demo](https://aiasapp.me/) | [Source Code](https://github.com/Varshith10121901/AIAS)\n\n" +
              "He also explored advanced prompt chaining in his **Promptwar Challenge 3** entries. [Source Code](https://github.com/Varshith10121901/Promptwar-challenge-3)"
  },
  {
    keywords: ['fastapi', 'api', 'backend', 'rest', 'flask'],
    response: "**FastAPI** is Varshith's primary backend framework:\n\n" +
              "• **AIAS** — The entire AIAS platform backend is built with FastAPI, handling authentication, workflow triggers, agent APIs, and PostgreSQL queries. [Source Code](https://github.com/Varshith10121901/AIAS)\n" +
              "• **AURA Lite (Google Cohort 1)** — FastAPI was used to build the farming advisory REST API exposed to the Gemini-powered frontend. [Source Code](https://github.com/Varshith10121901/Google-Cohort-1)\n\n" +
              "He is also comfortable with Flask and building RESTful endpoints for any GenAI service!"
  },
  {
    keywords: ['docker', 'container', 'containerize', 'deployment'],
    response: "Varshith uses **Docker** to containerize and deploy all his production services:\n\n" +
              "• **AIAS** — Dockerized the full FastAPI + agent backend and deployed it via **Google Cloud Run**. This allows serverless, auto-scaling deployments without managing VMs. [Live Demo](https://aiasapp.me/)\n" +
              "• **AURA Lite** — Also containerized with Docker for Cloud Run deployment. [Source Code](https://github.com/Varshith10121901/Google-Cohort-1)\n\n" +
              "He writes clean Dockerfiles, manages environment configs, and handles container registries through GCP Artifact Registry!"
  },
  {
    keywords: ['gcp', 'google cloud', 'cloud run', 'vertex ai', 'compute engine', 'cloud'],
    response: "**Google Cloud Platform (GCP)** is Varshith's primary cloud infrastructure:\n\n" +
              "• **AIAS** — Fully deployed on GCP Cloud Run with Docker containers, handling real-time AI workflows at scale. [Live Demo](https://aiasapp.me/)\n" +
              "• **AURA Lite** — Also hosted on GCP Cloud Run, integrating Vertex AI (Gemini) APIs for agricultural recommendations. [Source Code](https://github.com/Varshith10121901/Google-Cohort-1)\n\n" +
              "He also earned the **Google Cloud Skills Boost** certification and attended the **Google Cloud Agentic AI Day** where he built AI agents on GCP!"
  },
  {
    keywords: ['gemini', 'generative ai', 'genai', 'openai', 'llm', 'vertex'],
    response: "**Gemini AI** and **Generative AI** is Varshith's primary specialization:\n\n" +
              "• **AIAS** — Integrates Gemini/OpenAI LLMs to power intelligent chatbots, auto-reasoning agents, and document QA systems. [Live Demo](https://aiasapp.me/)\n" +
              "• **AURA Lite** — Uses Gemini API via Vertex AI to provide smart farming advisories. [Source Code](https://github.com/Varshith10121901/Google-Cohort-1)\n\n" +
              "He also won badges and certifications from **Google's Generative AI learning pathway** and actively competed in **OpenAI x NxtWave Buildathons**!"
  },
  {
    keywords: ['react', 'javascript', 'frontend', 'html', 'css'],
    response: "Varshith builds beautiful, modern frontends using **React** and core web technologies:\n\n" +
              "• **AIAS Dashboard** — The main AIAS console UI is built with React, handling chat widgets, workflow visualizers, and user management panels. [Live Demo](https://aiasapp.me/)\n" +
              "• **This very portfolio** — Built with React + Vite, featuring glassmorphism design, GSAP animations, and a custom chatbot (the one you're talking to right now! 😄)\n\n" +
              "He focuses on performant, accessible UIs with smooth animations and responsive layouts."
  },
  {
    keywords: ['postgresql', 'postgres', 'sql', 'database', 'psycopg2'],
    response: "Varshith works with **PostgreSQL** for production data management:\n\n" +
              "• **AIAS** — Uses PostgreSQL (via psycopg2) to store user data, chat histories, workflow configurations, and agent states. The database queries are optimized for low-latency API responses. [Source Code](https://github.com/Varshith10121901/AIAS)\n\n" +
              "He designs clean schema structures, writes optimized SQL queries, and handles connection pooling for high-traffic backend services!"
  },
  {
    keywords: ['machine learning', 'ml', 'scikit', 'anomaly', 'classification', 'regression'],
    response: "Varshith applies **Machine Learning** models across several projects:\n\n" +
              "• **Bank of India Hackathon** — Built an ML-based fraud detection system that classifies anomalous banking transactions using supervised learning. [Source Code](https://github.com/Varshith10121901/Bank-of-India-Hackathon)\n" +
              "• **Agrilens** — Uses ML classification models on leaf images to diagnose crop diseases. [Source Code](https://github.com/Varshith10121901/Agrilens-GDG-Hackathon)\n\n" +
              "He is experienced in model training, evaluation metrics, and deploying ML models as REST APIs!"
  },
  {
    keywords: ['linux', 'git', 'github', 'version control', 'devops', 'ci'],
    response: "Varshith is proficient in **Linux administration**, **Git**, and **DevOps** practices:\n\n" +
              "• All his projects are hosted on **GitHub** with clean commit histories and proper branch management.\n" +
              "• He uses **Linux terminals** for SSH-based server management, package installations, and script automation.\n" +
              "• His deployment workflows on GCP use automated Cloud Build triggers for CI/CD pipelines.\n\n" +
              "Check out his GitHub for all repositories: [GitHub Profile](https://github.com/Varshith10121901)"
  }
]

const PLACEHOLDER_KEYWORDS = ['VK', 'AIAS', 'skills', 'MCA', 'projects', 'contact']

export default function AuraChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hii! I'm Aura-Mini, Varshith's console agent. Ask me anything about Varshith's credentials, skills, or projects!"
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatbotRef = useRef(null)

  // Typewriter placeholder state
  const [placeholder, setPlaceholder] = useState('')
  const [keywordIndex, setKeywordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  // Typing speed configuration
  const typeSpeed = isDeleting ? 40 : 80
  const delayBeforeDelete = 2000

  // Placeholder typewriter loop
  useEffect(() => {
    const currentKeyword = PLACEHOLDER_KEYWORDS[keywordIndex]
    const fullText = `Ask anything about ${currentKeyword}...`

    const handleType = () => {
      if (!isDeleting) {
        setPlaceholder(fullText.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
        if (charIndex + 1 >= fullText.length) {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete)
        }
      } else {
        setPlaceholder(fullText.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
        if (charIndex - 1 <= 0) {
          setIsDeleting(false)
          setKeywordIndex((prev) => (prev + 1) % PLACEHOLDER_KEYWORDS.length)
        }
      }
    }

    const timer = setTimeout(handleType, typeSpeed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, keywordIndex, typeSpeed, delayBeforeDelete])

  // Click outside detection to collapse the chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Listen for open events from other components (like hero search or skill clicks)
  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true)
      if (e.detail?.query) {
        const queryText = e.detail.query
        
        // Add the user message first
        setMessages((prev) => [...prev, { sender: 'user', text: `Tell me about projects involving ${queryText}` }])
        setIsTyping(true)
        
        setTimeout(() => {
          setIsTyping(false)
          const queryLower = queryText.toLowerCase()
          let matchedResponse = ""
          
          // Match queries against knowledge base
          for (const entry of KNOWLEDGE_BASE) {
            if (entry.keywords.some((k) => queryLower.includes(k))) {
              matchedResponse = entry.response
              break
            }
          }
          
          if (!matchedResponse) {
            // Fallback response for skills without explicit project match
            matchedResponse = `Varshith has strong experience in **${queryText}**! He applies this skill across his main AI projects (such as **AIAS** for agentic systems or **Images Preprocessing Pipeline** for model training). You can view details about these projects in the Projects section above!`
          }
          
          // Stream the bot response
          setMessages((prev) => [...prev, { sender: 'bot', text: '', isStreaming: true }])
          
          let currentText = ""
          let index = 0
          const streamInterval = setInterval(() => {
            currentText += matchedResponse.slice(index, index + 3)
            index += 3
            
            setMessages((prev) => {
              const next = [...prev]
              const lastMsg = next[next.length - 1]
              if (lastMsg && lastMsg.sender === 'bot') {
                lastMsg.text = currentText
              }
              return next
            })
            
            if (index >= matchedResponse.length) {
              clearInterval(streamInterval)
              setMessages((prev) => {
                const next = [...prev]
                const lastMsg = next[next.length - 1]
                if (lastMsg && lastMsg.sender === 'bot') {
                  delete lastMsg.isStreaming
                }
                return next
              })
            }
          }, 20)
        }, 600)
      } else if (e.detail?.focusInput) {
        setTimeout(() => {
          const inputEl = chatbotRef.current?.querySelector('input')
          if (inputEl) inputEl.focus()
        }, 120)
      }
    }
    window.addEventListener('open-aura-chatbot', handleOpen)
    return () => window.removeEventListener('open-aura-chatbot', handleOpen)
  }, [])

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMessage = inputVal.trim()
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])
    setInputVal('')
    setIsTyping(true)

    // Simulate standard Google Cloud console answer summarization lag
    setTimeout(() => {
      setIsTyping(false)
      const query = userMessage.toLowerCase()
      let matchedResponse = ""

      // Match queries against knowledge base
      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((k) => query.includes(k))) {
          matchedResponse = entry.response
          break
        }
      }

      if (!matchedResponse) {
        matchedResponse = "Hii! I'm not fully sure about that detail, but I can tell you all about Varshith's key AI projects (like AIAS or Agrilens), his skills in FastAPI and Google Cloud, his hackathon experiences, or how to contact him directly! What would you like to know?"
      }

      // Add empty message that will be streamed
      setMessages((prev) => [...prev, { sender: 'bot', text: '', isStreaming: true }])

      // Stream the response character by character
      let currentText = ""
      let index = 0
      const streamInterval = setInterval(() => {
        // Add 3 characters at a time for a fast, responsive streaming effect
        currentText += matchedResponse.slice(index, index + 3)
        index += 3

        setMessages((prev) => {
          const next = [...prev]
          const lastMsg = next[next.length - 1]
          if (lastMsg && lastMsg.sender === 'bot') {
            lastMsg.text = currentText
          }
          return next
        })

        if (index >= matchedResponse.length) {
          clearInterval(streamInterval)
          setMessages((prev) => {
            const next = [...prev]
            const lastMsg = next[next.length - 1]
            if (lastMsg && lastMsg.sender === 'bot') {
              lastMsg.isStreaming = false
            }
            return next
          })
        }
      }, 15)

    }, 1200)
  }

  // Format responses containing bullet points, bold markdown, and links
  const renderMessageText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Step 1: Parse markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      let match
      const parts = []
      let lastIndex = 0

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index))
        }
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noreferrer"
            className="chat-link"
            style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}
          >
            {match[1]}
          </a>
        )
        lastIndex = linkRegex.lastIndex
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex))
      }

      // Step 2: Parse bold markdown **text** inside the string pieces
      const parsedParts = parts.flatMap((part, partIdx) => {
        if (typeof part !== 'string') return part

        const boldParts = part.split('**')
        return boldParts.map((subText, subIdx) => {
          if (subIdx % 2 === 1) {
            return <strong key={`bold-${partIdx}-${subIdx}`} style={{ color: 'var(--text-bright)', fontWeight: '700' }}>{subText}</strong>
          }
          return subText
        })
      })

      // Check if bullet point
      if (line.startsWith('• ')) {
        const cleanParts = parsedParts.map((part, pIdx) => {
          if (pIdx === 0 && typeof part === 'string' && part.startsWith('• ')) {
            return part.substring(2)
          }
          return part
        })

        return (
          <div key={idx} style={{ paddingLeft: '1rem', position: 'relative', marginBottom: '0.35rem' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--secondary)' }}>•</span>
            {cleanParts}
          </div>
        )
      }

      return (
        <p key={idx} style={{ marginBottom: line ? '0.5rem' : 0 }}>
          {parsedParts}
        </p>
      )
    })
  }

  return (
    <div
      ref={chatbotRef}
      className={`aura-chatbot-container ${isOpen ? 'expanded' : 'collapsed'}`}
    >
      <div className="glow-card-inner aura-chatbot-inner">
        
        {/* Expanded Chat Header */}
        {isOpen && (
          <div className="aura-chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Spark/Gemini logo */}
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                <path d="M12 3c.13 2.87 1.13 3.87 4 4-2.87.13-3.87 1.13-4 4-.13-2.87-1.13-3.87-4-4 2.87-.13 3.87-1.13 4-4z" fill="#4285F4" />
                <path d="M18 13c.07 1.43.57 1.93 2 2-1.43.07-1.93.57-2 2-.07-1.43-.57-1.93-2-2 1.43-.07 1.93-.57 2-2z" fill="#34A853" />
              </svg>
              <span className="aura-chatbot-title">Ask about Varshith</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="aura-badge">Aura-Mini</span>
              <button onClick={() => setIsOpen(false)} className="aura-chatbot-close-btn" aria-label="Minimize Chat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Expanded Chat History Panel */}
        {isOpen && (
          <div className="aura-chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`aura-chat-bubble-container ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="aura-avatar">
                    <span>A</span>
                  </div>
                )}
                <div className={`aura-chat-bubble ${msg.sender}`}>
                  {msg.sender === 'bot' ? renderMessageText(msg.text) : <p>{msg.text}</p>}
                </div>
              </div>
            ))}

            {/* Summarizing Loader State */}
            {isTyping && (
              <div className="aura-chat-loader-container">
                <div className="aura-avatar">
                  <span>A</span>
                </div>
                <div className="aura-chat-loader-bubble">
                  <div className="aura-loading-svg-wrapper">
                    {/* Animated loading ring */}
                    <svg className="aura-lottie-loader" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="45 45" />
                    </svg>
                  </div>
                  <div className="aura-loader-label">Summarizing answer...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Chat Input Pill (Visible in both Collapsed and Expanded States) */}
        <form onSubmit={handleSend} className={`aura-chatbot-form ${isOpen ? 'expanded-form' : 'collapsed-form'}`}>
          <div className="aura-chatbot-input-container" onClick={() => setIsOpen(true)}>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={placeholder || "Ask anything about VK"}
              aria-label="Ask anything about VK"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="aura-chatbot-send-btn"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="aura-chatbot-credits">
              Built with <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Aura-Mini</span>
            </div>
          )}
        </form>

      </div>
    </div>
  )
}
