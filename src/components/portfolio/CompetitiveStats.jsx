import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Trophy, Code, Zap, Star, TrendingUp, Award } from 'lucide-react';

const CF_USER = 'ADITYA1B2';
const LC_USER = 'A4A_B6I';

function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-5 text-center group hover:border-cyber/20 transition-all"
    >
      <Icon className={`w-5 h-5 mx-auto mb-3 ${color} group-hover:scale-110 transition-transform`} />
      <div className="font-heading text-2xl font-bold text-silver">{value}</div>
      <div className="font-mono text-xs text-muted-data uppercase tracking-wider mt-1">{label}</div>
      {sub && <div className="font-mono text-xs text-muted-data mt-1">{sub}</div>}
    </motion.div>
  );
}

function CodeforcesCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://codeforces.com/api/user.info?handles=${CF_USER}`)
      .then((r) => r.json())
      .then((d) => { if (d.status === 'OK') setData(d.result[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyber/30 border-t-cyber rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <Code className="w-6 h-6 text-muted-data mx-auto mb-2" />
        <p className="font-mono text-xs text-muted-data">Codeforces data unavailable</p>
      </div>
    );
  }

  const ratingColor = data.rating >= 1900 ? 'text-amber-400' : data.rating >= 1600 ? 'text-violet-400' : 'text-cyber';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Trophy size={18} className="text-amber-400" />
        </div>
        <div>
          <h3 className="font-mono text-sm font-semibold text-silver">Codeforces</h3>
          <p className="font-mono text-xs text-muted-data">@{CF_USER}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <div className={`font-heading text-xl font-bold ${ratingColor}`}>{data.rating || '—'}</div>
          <div className="font-mono text-xs text-muted-data">Rating</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className={`font-heading text-xl font-bold ${ratingColor}`}>{data.rank || 'unrated'}</div>
          <div className="font-mono text-xs text-muted-data capitalize">Rank</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-heading text-xl font-bold text-cyber">{data.maxRating || '—'}</div>
          <div className="font-mono text-xs text-muted-data">Max Rating</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-heading text-xl font-bold text-violet capitalize">{data.maxRank || '—'}</div>
          <div className="font-mono text-xs text-muted-data">Max Rank</div>
        </div>
      </div>

      <a
        href={`https://codeforces.com/profile/${CF_USER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center font-mono text-xs text-cyber hover:text-glow-cyan transition-all"
      >
        View Full Profile →
      </a>
    </motion.div>
  );
}

function LeetCodeCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${LC_USER}`)
      .then((r) => r.json())
      .then((d) => { if (d.status === 'success') setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-violet/30 border-t-violet rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <Code className="w-6 h-6 text-muted-data mx-auto mb-2" />
        <p className="font-mono text-xs text-muted-data">LeetCode data unavailable</p>
      </div>
    );
  }

  const solvedPct = data.totalQuestions > 0 ? Math.round((data.solvedProblem / data.totalQuestions) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Zap size={18} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="font-mono text-sm font-semibold text-silver">LeetCode</h3>
          <p className="font-mono text-xs text-muted-data">@{LC_USER}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-muted-data">Solved</span>
          <span className="font-heading text-lg font-bold text-silver">
            {data.solvedProblem}<span className="text-muted-data text-sm"> / {data.totalQuestions}</span>
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${solvedPct}%`, background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-heading text-lg font-bold text-emerald-400">{data.easySolved}</div>
          <div className="font-mono text-xs text-muted-data">Easy</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-heading text-lg font-bold text-amber-400">{data.mediumSolved}</div>
          <div className="font-mono text-xs text-muted-data">Medium</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-heading text-lg font-bold text-red-400">{data.hardSolved}</div>
          <div className="font-mono text-xs text-muted-data">Hard</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-cyber" />
          <span className="font-mono text-sm text-silver">{data.ranking || '—'}</span>
          <span className="font-mono text-xs text-muted-data">Rank</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award size={14} className="text-violet" />
          <span className="font-mono text-sm text-silver">{data.acceptanceRate || '—'}%</span>
          <span className="font-mono text-xs text-muted-data">Accept</span>
        </div>
      </div>

      <a
        href={`https://leetcode.com/${LC_USER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center font-mono text-xs text-cyber hover:text-glow-cyan transition-all"
      >
        View Full Profile →
      </a>
    </motion.div>
  );
}

export default function CompetitiveStats() {
  return (
    <section id="competitive" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 08. COMPETITIVE"
          title="Coding Profile"
          subtitle="Live stats from competitive programming platforms"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <CodeforcesCard />
          <LeetCodeCard />
        </div>
      </div>
    </section>
  );
}