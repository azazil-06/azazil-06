import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Calendar, Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { fadeUp, inView, staggerParent } from "../lib/motion";

const GITHUB_USERNAME = "azazil-06";

export default function LiveStats() {
  const { data: userStats, isLoading: isUserLoading } = useQuery({
    queryKey: ["github-user", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: recentRepo, isLoading: isRepoLoading } = useQuery({
    queryKey: ["github-recent-repo", GITHUB_USERNAME],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=1`);
      if (!res.ok) throw new Error("Failed to fetch repos");
      const repos = await res.json();
      return repos[0] || null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <motion.section
      id="stats"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-4 gap-x-6 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28"
    >
      <SectionHeading numeral="01" title="Stats" tag="Fig. 01 — Live Metrics" />

      <motion.div variants={fadeUp} className="col-span-4 mt-6 md:col-span-12 md:col-start-3 lg:col-span-10 lg:col-start-3">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Total Repos Card */}
          <div className="flex flex-col justify-between border border-rule bg-background p-6 transition-colors hover:bg-accent/5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Total Public Repos</span>
              <Github className="h-5 w-5" />
            </div>
            <div className="mt-8 flex items-end gap-3">
              <span className="font-display text-6xl leading-none md:text-8xl">
                {isUserLoading ? "--" : userStats?.public_repos || 0}
              </span>
            </div>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
              Across full-stack, games, and hardware projects.
            </p>
          </div>

          {/* Recent Repo Card */}
          <div className="flex flex-col justify-between border border-rule bg-background p-6 transition-colors hover:bg-accent/5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Latest Activity</span>
              <Code2 className="h-5 w-5" />
            </div>
            
            {isRepoLoading ? (
              <div className="mt-8 animate-pulse space-y-3">
                <div className="h-8 w-3/4 bg-rule"></div>
                <div className="h-4 w-full bg-rule"></div>
                <div className="h-4 w-5/6 bg-rule"></div>
              </div>
            ) : recentRepo ? (
              <div className="mt-8 flex flex-col items-start gap-4">
                <a 
                  href={recentRepo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center gap-2 font-display text-2xl md:text-3xl hover:text-accent transition-colors"
                >
                  {recentRepo.name}
                  <ExternalLink className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {recentRepo.description || "No description provided."}
                </p>
                <div className="mt-auto flex w-full flex-wrap gap-4 border-t border-rule pt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {recentRepo.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent"></span>
                      {recentRepo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {recentRepo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {recentRepo.forks_count}
                  </span>
                  <span className="flex items-center gap-1 md:ml-auto">
                    <Calendar className="h-3 w-3" />
                    {new Date(recentRepo.pushed_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-8 font-mono text-sm text-muted-foreground">No recent repositories found.</div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
