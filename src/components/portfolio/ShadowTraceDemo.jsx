import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Sparkles, Scan, Crosshair, Network, CheckCircle2, AlertTriangle } from 'lucide-react';

const SAMPLE_NEWS = [
  {
    text: "BREAKING: Scientists confirm that drinking 10 liters of water per day cures all diseases, according to a study from Harvard University.",
    verdict: 'false',
    score: 12,
  },
  {
    text: "New study published in Nature Climate Change shows global temperatures rose 1.1°C above pre-industrial levels, confirmed by multiple independent datasets.",
    verdict: 'true',
    score: 94,
  },
  {
    text: "Local startup claims their AI chip can run faster than quantum computers, no peer review available.",
    verdict: 'unverified',
    score: 35,
  },
];

const PIPELINE_STEPS = [
  { id: 'intake', label: 'Article Intake', icon: Scan, desc: 'Parsing input text and extracting structured data' },
  { id: 'extract', label: 'Claim Extraction', icon: Sparkles, desc: 'LLM identifies factual assertions from the article' },
  { id: 'verify', label: 'Source Verification', icon: Crosshair, desc: 'RAG cross-references claims against trusted sources' },
  { id: 'network', label: 'Network Analysis', icon: Network, desc: 'NetworkX maps information propagation patterns' },
  { id: 'verdict', label: 'Verdict Synthesis', icon: CheckCircle2, desc: 'Confidence-scored truthfulness assessment' },
];

export default function ShadowTraceDemo() {
  const [input, setInput] = useState('');
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [claims, setClaims] = useState([]);

  const runPipeline = async (text) => {
    const article = text || SAMPLE_NEWS[0].text;
    setInput(article);
    setRunning(true);
    setResult(null);
    setClaims([]);
    setActiveStep(-1);

    // Determine result based on keywords for the demo
    const lower = article.toLowerCase();
    let verdict, score;
    if (lower.includes('harvard') || lower.includes('cures all') || lower.includes('faster than quantum')) {
      verdict = 'false'; score = 10 + Math.floor(Math.random() * 15);
    } else if (lower.includes('nature') || lower.includes('peer review') || lower.includes('datasets')) {
      verdict = 'true'; score = 85 + Math.floor(Math.random() * 12);
    } else {
      verdict = 'unverified'; score = 30 + Math.floor(Math.random() * 20);
    }

    // Simulated extracted claims
    const extractedClaims = article.split(/[.,]/).map((s) => s.trim()).filter((s) => s.length > 15).slice(0, 4);

    // Animate through pipeline steps
    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setActiveStep(i);
      if (i === 1) {
        // Show extracted claims during claim extraction
        await sleep(600);
        setClaims(extractedClaims);
      }
      await sleep(i === 3 ? 1200 : 800);
    }

    setResult({ verdict, score });
    setRunning(false);
    setActiveStep(-1);
  };

  const reset = () => {
    setInput('');
    setResult(null);
    setClaims([]);
    setActiveStep(-1);
    setRunning(false);
  };

  const verdictConfig = {
    true: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'VERIFIED', icon: CheckCircle2 },
    false: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'FALSE', icon: AlertTriangle },
    unverified: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'UNVERIFIED', icon: AlertTriangle },
  };

  return (
    <section id="shadowtrace-demo" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={12} className="text-cyber" />
            <span className="font-mono text-xs text-muted-data">INTERACTIVE DEMO</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-silver mb-3">
            Try <span className="text-cyber">ShadowTrace</span>
          </h2>
          <p className="text-muted-data text-sm max-w-xl mx-auto">
            Input a news snippet and watch the multi-agent AI pipeline detect misinformation in real-time.
          </p>
        </motion.div>

        <div className="glass-strong rounded-2xl p-6 md:p-8">
          {/* Input area */}
          <div className="mb-6">
            <label className="block font-mono text-xs text-cyber mb-2">{'>'} INPUT_NEWS_ARTICLE</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={running}
              placeholder="Paste a news article or claim here..."
              className="w-full h-24 glass rounded-xl p-4 text-sm text-silver placeholder:text-muted-data outline-none resize-none focus:border-cyber/30 transition-all font-mono"
            />
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={() => runPipeline(input)}
                disabled={running || !input.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber/10 text-cyber font-mono text-sm hover:bg-cyber/20 disabled:opacity-30 transition-all"
              >
                <Play size={14} /> {running ? 'Analyzing...' : 'Run Pipeline'}
              </button>
              <button
                onClick={reset}
                disabled={running}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-muted-data font-mono text-sm hover:text-silver disabled:opacity-30 transition-all"
              >
                <RotateCcw size={14} /> Reset
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-mono text-xs text-muted-data">Samples:</span>
                {SAMPLE_NEWS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(s.text); }}
                    disabled={running}
                    className="px-2 py-1 rounded-md glass font-mono text-xs text-violet hover:text-cyber disabled:opacity-30 transition-all"
                  >
                    #{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline visualization */}
          <div className="space-y-2">
            {PIPELINE_STEPS.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = activeStep === i;
              const isDone = result && i < PIPELINE_STEPS.length - 1 || (result && i === PIPELINE_STEPS.length - 1);
              const showClaims = step.id === 'extract' && claims.length > 0;

              return (
                <div key={step.id}>
                  <motion.div
                    animate={{
                      opacity: activeStep === -1 && !result ? 0.4 : 1,
                      borderColor: isActive ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.05)',
                    }}
                    className={`glass rounded-xl p-4 flex items-center gap-4 ${isActive ? 'glow-cyan' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive ? 'bg-cyber/20 border border-cyber/40' :
                      isDone ? 'bg-emerald-500/10 border border-emerald-500/20' :
                      'bg-white/5 border border-white/5'
                    }`}>
                      <StepIcon size={14} className={isActive ? 'text-cyber' : isDone ? 'text-emerald-400' : 'text-muted-data'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-sm font-semibold ${isActive ? 'text-cyber' : isDone ? 'text-silver' : 'text-muted-data'}`}>
                          {step.label}
                        </span>
                        {isActive && (
                          <span className="font-mono text-xs text-cyber animate-pulse">processing...</span>
                        )}
                        {isDone && !isActive && (
                          <CheckCircle2 size={12} className="text-emerald-400" />
                        )}
                      </div>
                      <p className="font-mono text-xs text-muted-data truncate">{step.desc}</p>
                    </div>
                    <div className="font-mono text-xs text-muted-data shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </motion.div>

                  {/* Show extracted claims */}
                  <AnimatePresence>
                    {showClaims && (isActive || isDone) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-12 space-y-1.5 mt-1.5 mb-1.5"
                      >
                        {claims.map((claim, ci) => (
                          <motion.div
                            key={ci}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ci * 0.15 }}
                            className="font-mono text-xs text-silver glass rounded-lg px-3 py-2 border-l-2 border-cyber/40"
                          >
                            <span className="text-cyber">CLAIM_{ci + 1}:</span> {claim}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 rounded-xl p-5 border ${verdictConfig[result.verdict].bg} ${verdictConfig[result.verdict].border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {React.createElement(verdictConfig[result.verdict].icon, { size: 20, className: verdictConfig[result.verdict].color })}
                    <div>
                      <div className="font-mono text-xs text-muted-data">VERDICT</div>
                      <div className={`font-heading text-xl font-bold ${verdictConfig[result.verdict].color}`}>
                        {verdictConfig[result.verdict].label}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-muted-data">CONFIDENCE</div>
                    <div className={`font-heading text-2xl font-bold ${verdictConfig[result.verdict].color}`}>
                      {result.score}%
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: result.verdict === 'true' ? '#10b981' : result.verdict === 'false' ? '#ef4444' : '#f59e0b',
                    }}
                  />
                </div>
                <p className="font-mono text-xs text-muted-data mt-3">
                  {'>'} Demo uses heuristic analysis. Production system uses LLM + RAG + network analysis for real-time verification.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}