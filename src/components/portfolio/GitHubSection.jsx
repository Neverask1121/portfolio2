import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Github, Star, GitFork, ExternalLink, GitCommit, Code2, Activity } from 'lucide-react';

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c',
  C: '#555555', 'C++': '#f34b7d', Shell: '#89e051', TypeScript: '#3178c6',
  Jupyter: '#DA5B0B', Dockerfile: '#384d54',
};

export default function GitHubSection() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/Neverask1121'),
          fetch('https://api.github.com/users/Neverask1121/repos?sort=updated&per_page=100'),
          fetch('https://api.github.com/users/Neverask1121/events/public?per_page=10'),
        ]);
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();
        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch {
        // Silently fail
      }
      setLoading(false);
    };
    fetchGitHub();
  }, []);

  // Compute language stats
  const langStats = {};
  repos.forEach((r) => {
    if (r.language) {
      langStats[r.language] = (langStats[r.language] || 0) + 1;
    }
  });
  const langEntries = Object.entries(langStats).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const totalLangs = langEntries.reduce((sum, [, count]) => sum + count, 0) || 1;

  // Pinned/top repos (sort by stars)
  const topRepos = [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
    .slice(0, 6);

  // Recent commit events
  const pushEvents = events.filter((e) => e.type === 'PushEvent').slice(0, 5);

  if (loading) {
    return (
      <section id="github" className="relative py-24 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-cyber/30 border-t-cyber rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="// 09. GITHUB"
          title="Contribution Matrix"
          subtitle="Live data from my GitHub profile"
        />

        <div className="space-y-8">
          {/* Profile card */}
          {profile && profile.login && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={profile.avatar_url}
                alt="Aditya Bhandari GitHub avatar"
                className="w-20 h-20 rounded-2xl border-2 border-cyber/20"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-xl font-bold text-silver">{profile.name || 'Neverask1121'}</h3>
                <p className="text-muted-data text-sm font-mono">@{profile.login}</p>
                {profile.bio && <p className="text-muted-data text-sm mt-2">{profile.bio}</p>}
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <div className="font-heading text-2xl font-bold text-cyber">{profile.public_repos || 0}</div>
                  <div className="font-mono text-xs text-muted-data">Repos</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-violet">{profile.followers || 0}</div>
                  <div className="font-mono text-xs text-muted-data">Followers</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-silver">{profile.following || 0}</div>
                  <div className="font-mono text-xs text-muted-data">Following</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-4 md:p-6 overflow-x-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-cyber" />
              <div className="font-mono text-xs text-muted-data">CONTRIBUTION_GRAPH</div>
            </div>
            <img
              src="https://ghchart.rshah.org/00F0FF/Neverask1121"
              alt="Aditya Bhandari GitHub contribution graph"
              className="w-full max-w-full rounded-lg opacity-80"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Language stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Code2 size={16} className="text-cyber" />
                <h4 className="font-mono text-sm font-semibold text-silver">LANGUAGE_STATS</h4>
              </div>

              {/* Bar */}
              <div className="flex h-3 rounded-full overflow-hidden mb-4">
                {langEntries.map(([lang, count]) => (
                  <div
                    key={lang}
                    style={{
                      width: `${(count / totalLangs) * 100}%`,
                      backgroundColor: LANG_COLORS[lang] || '#666',
                    }}
                    title={`${lang}: ${count} repos`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2">
                {langEntries.map(([lang, count]) => (
                  <div key={lang} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: LANG_COLORS[lang] || '#666' }} />
                    <span className="font-mono text-xs text-silver truncate">{lang}</span>
                    <span className="font-mono text-xs text-muted-data ml-auto">{count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent commits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <GitCommit size={16} className="text-violet" />
                <h4 className="font-mono text-sm font-semibold text-silver">RECENT_COMMITS</h4>
              </div>
              <div className="space-y-3">
                {pushEvents.length > 0 ? pushEvents.map((event, i) => {
                  const repo = event.repo?.name || '';
                  const commit = event.payload?.commits?.[0];
                  const message = commit?.message || '';
                  return (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-violet mt-1.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs text-silver truncate">{message.split('\n')[0]}</p>
                        <p className="font-mono text-xs text-muted-data truncate">{repo}</p>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="font-mono text-xs text-muted-data">No recent public commits</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Top repos */}
          {topRepos.length > 0 && (
            <div>
              <h4 className="font-mono text-sm font-semibold text-silver mb-4 flex items-center gap-2">
                <Github size={16} className="text-cyber" /> PINNED_REPOSITORIES
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topRepos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-5 group hover:border-cyber/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Github size={16} className="text-muted-data group-hover:text-cyber transition-colors" />
                      <ExternalLink size={14} className="text-muted-data opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-mono text-sm font-semibold text-silver group-hover:text-cyber transition-colors mb-2 truncate">
                      {repo.name}
                    </h4>
                    <p className="text-xs text-muted-data line-clamp-2 mb-3 min-h-[2rem]">
                      {repo.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-data">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || '#666' }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* View all */}
          <div className="text-center">
            <a
              href="https://github.com/Neverask1121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-mono text-sm text-cyber hover:bg-cyber/5 transition-all"
            >
              <Github size={16} /> View Full Profile on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}