import { useState, useEffect } from 'react'
import { Settings, Mic, Send, Bot, BarChart2, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Landing from './Landing'
import './App.css'

function App() {
  const [appState, setAppState] = useState('landing') 
  const [jobDescription, setJobDescription] = useState('')
  const [mode, setMode] = useState('Job-Specific')
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(5)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isListening, setIsListening] = useState(false) 
  const [interviewHistory, setInterviewHistory] = useState([])

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch('http://https://shabo.onrender.com/api/v1/generate_questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          job_description: jobDescription, 
          mode: mode,
          question_count: questionCount // <-- ADD THIS LINE!
        })
      });
      const data = await response.json();
      setQuestions(data.questions);
      setAppState('interview');
    } catch (error) {
      alert("Failed to generate questions. Check backend.");
    } finally {
      setIsProcessing(false);
    }
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser doesn't support voice input.");
    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => setCurrentAnswer(prev => prev + (prev ? " " : "") + e.results[0][0].transcript);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleAnswerSubmit = async () => {
    setIsProcessing(true);
    const currentQ = questions[currentQuestionIndex];

    try {
      const response = await fetch('http://https://shabo.onrender.com/api/v1/evaluate_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_description: jobDescription,
          question_text: currentQ.text,
          answer_text: currentAnswer
        })
      });
      const evaluation = await response.json();

      setInterviewHistory([...interviewHistory, {
        question: currentQ.text,
        answer: currentAnswer,
        evaluation: evaluation
      }]);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(''); 
      } else {
        setAppState('results'); 
      }
    } catch (error) {
      alert("Failed to evaluate answer.");
    } finally {
      setIsProcessing(false);
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        
        {appState === 'landing' && (
          <motion.div key="landing" initial="initial" animate="in" exit="exit" variants={pageVariants}>
            <Landing onStart={() => setAppState('setup')} />
          </motion.div>
        )}

        {appState === 'setup' && (
          <motion.div key="setup" initial="initial" animate="in" exit="exit" variants={pageVariants} className="container">
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
              <div className="saas-badge">
                <span style={{ fontSize: '14px', marginRight: '6px' }}></span> Make we do am Shabo-shabo! <span style={{ fontSize: '14px', marginLeft: '6px' }}></span>
              </div>

              {/* THE NEW SPLIT COLOUR LOGO (SCALED UP) */}
              <div className="shabo-split-logo" style={{ fontSize: '64px', marginBottom: '16px' }}>
                <span className="sha">sha</span><span className="bo">bo</span>
                <span className="ai-dot"></span>
              </div>
              
              <p className="shabo-tagline" style={{ marginTop: '0px' }}>
                Because the interview is tomorrow.
              </p>
            </div>

            <form onSubmit={handleStartInterview} className="input-form">
              
              {/* INTERACTIVE MODE GRID */}
              <div className="field-group">
                <label>Select Prep Mode:</label>
                <div className="mode-grid">
                  <div className={`mode-card ${mode === 'Job-Specific' ? 'active' : ''}`} onClick={() => setMode('Job-Specific')}>
                    <div className="mode-title">Targeted</div>
                    <div className="mode-desc">Calibrated to a specific job description</div>
                  </div>
                  <div className={`mode-card ${mode === 'Quick Practice' ? 'active' : ''}`} onClick={() => setMode('Quick Practice')}>
                    <div className="mode-title">Quick Reps</div>
                    <div className="mode-desc">Classic behavioral questions for any role</div>
                  </div>
                  <div className={`mode-card ${mode === 'Stress Mode' ? 'active' : ''}`} onClick={() => setMode('Stress Mode')}>
                    <div className="mode-title">The Gauntlet</div>
                    <div className="mode-desc">High-pressure scenarios & hard technicals</div>
                  </div>
                  <div className={`mode-card ${mode === 'Beginner Mode' ? 'active' : ''}`} onClick={() => setMode('Beginner Mode')}>
                    <div className="mode-title">Guided Walkthrough</div>
                    <div className="mode-desc">Step-by-step interview fundamentals</div>
                  </div>
                </div>
              </div>

              {/* TEXTAREA */}
              <div className="field-group">
                <label>What role are we hacking today?</label>
                <textarea 
                  rows="4" 
                  placeholder="Paste the job description or role title here so Shabo can tailor the questions..." 
                  value={jobDescription} 
                  onChange={(e) => setJobDescription(e.target.value)} 
                  required 
                />
              </div>
              
              {/* INTERACTIVE CHIP SELECTOR */}
              <div className="field-group">
                <label>Questions per session:</label>
                <div className="q-count-row">
                  <div className="q-chips">
                    {[3, 5].map(num => (
                      <div 
                        key={num} 
                        className={`q-chip ${questionCount === num ? 'active' : ''}`} 
                        onClick={() => setQuestionCount(num)}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="q-count-label">questions</div>
                </div>
              </div>
              
              {/* SUBMIT ROW */}
              <div style={{ marginTop: '12px' }}>
                {isProcessing ? (
                  <div className="skeleton-loader">
                    <p style={{margin: 0, fontSize: '14px', color: 'var(--primary-hover)', fontWeight: '600'}}>
                      Booting up the simulation...
                    </p>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line medium"></div>
                  </div>
                ) : (
                  <button type="submit" style={{ width: '100%', fontSize: '16px', padding: '16px' }}>
                    Start Prep Session →
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {appState === 'interview' && (
          <motion.div key="interview" initial="initial" animate="in" exit="exit" variants={pageVariants} className="container">
            <div className="progress-bar">Question {currentQuestionIndex + 1} of {questions.length}</div>
            <div className="interview-box">
              <h2 className="ai-question" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Bot size={32} style={{ flexShrink: 0, marginTop: '4px', color: 'var(--primary)' }} /> 
                <span>"{questions[currentQuestionIndex].text}"</span>
              </h2>
              <p className="focus-skill">Testing Focus: <span style={{color: '#fff'}}>{questions[currentQuestionIndex].focus_skill}</span></p>
              
              <textarea rows="6" value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} placeholder="Type your response here or click the microphone to speak..." disabled={isProcessing}/>
              
              {isProcessing ? (
                 <div className="skeleton-loader">
                   <p style={{margin: 0, fontSize: '14px', color: 'var(--primary-hover)', fontWeight: '600'}}>Analyzing your delivery and logic...</p>
                   <div className="skeleton-line"></div>
                   <div className="skeleton-line medium"></div>
                 </div>
              ) : (
                <div className="action-buttons">
                  <button className={`mic-btn ${isListening ? 'listening' : ''}`} onClick={startListening} disabled={isListening} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {isListening ? <><Mic size={18} /> Recording...</> : <><Mic size={18} /> Speak Answer</>}
                  </button>
                  <button className="submit-btn" onClick={handleAnswerSubmit} disabled={!currentAnswer.trim()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Send size={18} /> Lock in Answer
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div key="results" initial="initial" animate="in" exit="exit" variants={pageVariants} className="container results-container">
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontFamily: "'Playfair Display', serif", fontSize: '42px', marginBottom: '40px' }}>
              <BarChart2 size={36} color="var(--primary)" /> Shabo Final Report
            </h1>

            <div style={{ width: '100%', height: 250, marginBottom: '50px' }}>
              <ResponsiveContainer>
                <BarChart data={interviewHistory.map((item, i) => ({
                    name: `Q${i + 1}`,
                    Logic: item.evaluation.logic_metrics.logic_score * 10,
                    Delivery: item.evaluation.delivery_metrics.confidence_score
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{backgroundColor: '#111120', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px'}} />
                  <Bar dataKey="Logic" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Delivery" fill="var(--success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {interviewHistory.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="result-card">
                <h3>Q: {item.question}</h3>
                <p className="user-answer"><strong>You:</strong> "{item.answer}"</p>
                <div className="metrics-grid">
                  <div className="card">
                    <h4>Delivery</h4>
                    <p style={{ color: item.evaluation.delivery_metrics.confidence_score > 70 ? 'var(--success)' : 'var(--primary)' }}>
                      {item.evaluation.delivery_metrics.status} ({item.evaluation.delivery_metrics.confidence_score}%)
                    </p>
                  </div>
                  <div className="card">
                    <h4>Logic Score</h4>
                    <p>{item.evaluation.logic_metrics.logic_score} / 10</p>
                  </div>
                </div>
                <div className="feedback-section">
                  <p><strong>Feedback:</strong> {item.evaluation.logic_metrics.feedback}</p>
                  <p><strong>Missing STAR:</strong> {item.evaluation.logic_metrics.missing_elements.join(", ") || "None"}</p>
                </div>
              </motion.div>
            ))}
            <button onClick={() => window.location.reload()} className="restart-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '18px', fontSize: '16px', marginTop: '40px' }}>
              <RefreshCw size={18} /> Run another session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App