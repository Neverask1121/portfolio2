import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { ArrowRight, Database, Bot, Search, Network, CheckCircle2 } from 'lucide-react';

/**
 * Interactive architecture diagram for AI projects — currently ShadowTrace.
 * Clickable nodes reveal details about each component.
 */

const NODES = [
  {
    id: 'input',
    label: 'Input Article',
    icon: ArrowRight,
    x: 5, y: 50,
    color: '#00F0FF',
    detail: 'Raw news article or social media post is ingested via REST API endpoint. Text is cleaned and tokenized for downstream processing.',
  },
  {
    id: 'extract',
    label: 'Claim Extractor',
    icon: Search,
    x: 25, y: 50,
    color: '#00F0FF',
    detail: 'LLM-powered agent identifies and isolates factual assertions from the article. Uses few-shot prompting for precision. Outputs structured claim objects.',
  },
  {
    id: 'verify',
    label: 'Source Verifier',
    icon: Database,
    x: 50, y: 25,
    color: '#8B5CF6',
    detail: 'RAG pipeline cross-references each claim against a vector database of trusted sources (Reuters, AP, Nature, etc.). Computes semantic similarity scores.',
  },
  {
    id: 'crossref',
    label: 'Cross-Reference Engine',
    icon: Bot,
    x: 50, y: 75,
    color: '#8B5CF6',
    detail: 'Multi-agent system that queries external knowledge bases and web sources. Aggregates evidence for/against each claim with confidence weights.',
  },
  {
    id: 'network',
    label: 'Network Analyzer',
    icon: Network,
    x: 75, y: 50,
    color: '#00F0FF',
    detail: 'NetworkX builds a propagation graph mapping how the claim spreads across sources. Detects bot amplification patterns and source credibility clusters.',
  },
  {
    id: 'verdict',
    label: 'Verdict Synthesizer',
    icon: CheckCircle2,
    x: 95, y: 50,
    color: '#10B981',
    detail: 'Final agent synthesizes all evidence into a confidence-scored verdict (TRUE / FALSE / UNVERIFIED) with detailed reasoning and source citations.',
  },
];

const EDGES = [
  { from: 'input', to: 'extract' },
  { from: 'extract', to: 'verify' },
  { from: 'extract', to: 'crossref' },
  { from: 'verify', to: 'network' },
  { from: 'crossref', to: 'network' },
  { from: 'network', to: 'verdict' },
];

export default function ArchitectureDiagram() {
  const [selected, setSelected] = useState('extract');
  const selectedNode = NODES.find((n) => n.id === selected);

  return (
    <section id="architecture" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// ARCHITECTURE"
          title="System Design"
          subtitle="ShadowTrace multi-agent pipeline architecture"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 md:p-8"
        >
          {/* Diagram */}
          <div className="relative w-full" style={{ height: 360 }}>
            {/* SVG edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,240,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.2)" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                  <polygon points="0 0, 4 2, 0 4" fill="rgba(0,240,255,0.4)" />
                </marker>
              </defs>
              {EDGES.map((edge, i) => {
                const from = NODES.find((n) => n.id === edge.from);
                const to = NODES.find((n) => n.id === edge.to);
                const isHighlight = selected === edge.from || selected === edge.to;
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHighlight ? 'rgba(0,240,255,0.5)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth={isHighlight ? 0.4 : 0.2}
                    markerEnd="url(#arrowhead)"
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: 'all 0.3s' }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {NODES.map((node) => {
              const Icon = node.icon;
              const isActive = selected === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelected(node.id)}
                  className={`absolute flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'scale-110 z-10' : 'z-1 hover:scale-105'}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-2 transition-all ${
                      isActive ? 'border-current' : 'border-white/10'
                    }`}
                    style={{
                      backgroundColor: isActive ? `${node.color}20` : 'rgba(10, 12, 18, 0.8)',
                      borderColor: isActive ? node.color : 'rgba(255,255,255,0.1)',
                      boxShadow: isActive ? `0 0 20px ${node.color}40` : 'none',
                      color: node.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className={`font-mono text-xs whitespace-nowrap transition-colors ${isActive ? 'text-silver' : 'text-muted-data'}`}>
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass rounded-xl p-5 border-l-2"
            style={{ borderColor: selectedNode.color }}
          >
            <div className="flex items-center gap-2 mb-2">
              <selectedNode.icon size={16} style={{ color: selectedNode.color }} />
              <h4 className="font-mono text-sm font-semibold text-silver">{selectedNode.label}</h4>
            </div>
            <p className="text-muted-data text-sm leading-relaxed">{selectedNode.detail}</p>
          </motion.div>

          {/* Hint */}
          <p className="text-center font-mono text-xs text-muted-data mt-4">
            {'>'} Click any node to explore the architecture
          </p>
        </motion.div>
      </div>
    </section>
  );
}