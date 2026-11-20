"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/data/content";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function ActivityGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github");

  // GitHub State
  const [githubDays, setGithubDays] = useState<ContributionDay[]>([]);
  const [githubTotal, setGithubTotal] = useState<number | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);

  // LeetCode State
  const [leetcodeDays, setLeetcodeDays] = useState<ContributionDay[]>([]);
  const [leetcodeSolved, setLeetcodeSolved] = useState<number | null>(null);
  const [leetcodeRanking, setLeetcodeRanking] = useState<number | null>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<{
    easy: number;
    medium: number;
    hard: number;
  } | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);

  // Tooltip hover state
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    source: string;
  } | null>(null);

  // Fetch GitHub and LeetCode data
  useEffect(() => {
    // 1. Fetch GitHub
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data.contributions && Array.isArray(data.contributions)) {
          const recentDays = data.contributions.slice(-140);
          setGithubDays(recentDays);

          let total = 0;
          if (data.total) {
            total = Object.values(data.total as Record<string, number>).reduce(
              (acc: number, v: number) => acc + v,
              0
            );
          } else {
            total = recentDays.reduce((acc: number, d: ContributionDay) => acc + d.count, 0);
          }
          setGithubTotal(total);
        }
      })
      .catch((err) => console.error("GitHub fetch error:", err))
      .finally(() => setGithubLoading(false));

    // 2. Fetch LeetCode
    fetch("/api/leetcode-contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalSolved) setLeetcodeSolved(data.totalSolved);
        if (data.ranking) setLeetcodeRanking(data.ranking);
        if (data.easySolved !== undefined) {
          setLeetcodeStats({
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
          });
        }

        if (data.submissionCalendar) {
          let calendar: Record<string, number> = {};
          if (typeof data.submissionCalendar === "string") {
            try {
              calendar = JSON.parse(data.submissionCalendar);
            } catch (e) {
              calendar = {};
            }
          } else {
            calendar = data.submissionCalendar;
          }

          // Build reliable date string -> count map using UTC YYYY-MM-DD
          const countByDate: Record<string, number> = {};
          for (const [timestamp, count] of Object.entries(calendar)) {
            const dateObj = new Date(parseInt(timestamp, 10) * 1000);
            const iso = dateObj.toISOString().split("T")[0];
            countByDate[iso] = (countByDate[iso] || 0) + Number(count);
          }

          // Generate last 140 consecutive days up to today
          const today = new Date();
          const daysArray: ContributionDay[] = [];

          for (let i = 139; i >= 0; i--) {
            const targetDate = new Date();
            targetDate.setUTCDate(today.getUTCDate() - i);
            const dateStr = targetDate.toISOString().split("T")[0];

            const count = countByDate[dateStr] || 0;
            let level = 0;
            if (count > 0 && count <= 2) level = 1;
            else if (count > 2 && count <= 5) level = 2;
            else if (count > 5 && count <= 10) level = 3;
            else if (count > 10) level = 4;

            daysArray.push({ date: dateStr, count, level });
          }

          setLeetcodeDays(daysArray);
        }
      })
      .catch((err) => console.error("LeetCode fetch error:", err))
      .finally(() => setLeetcodeLoading(false));
  }, []);

  // GSAP Entrance and Tab Change Animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main container entrance
      gsap.fromTo(
        ".activity-card-container",
        { opacity: 0, y: 35, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );

      // Stagger dots reveal on load/tab switch
      const dots = document.querySelectorAll(".contribution-dot");
      if (dots.length > 0) {
        gsap.fromTo(
          dots,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: {
              each: 0.003,
              from: "start",
              grid: [7, 20],
            },
            duration: 0.4,
            ease: "back.out(1.7)",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab, githubLoading, leetcodeLoading]);

  // Pixel Pink Color Mapping for dots
  const getDotClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#ff2d78]/25 hover:bg-[#ff2d78]/55";
      case 2:
        return "bg-[#ff2d78]/55 hover:bg-[#ff2d78]/80";
      case 3:
        return "bg-[#ff2d78]/85 hover:bg-[#ff2d78]";
      case 4:
        return "bg-[#ff2d78] shadow-[0_0_10px_rgba(255,45,120,0.85)] hover:scale-135";
      default:
        return "bg-white/[0.04] hover:bg-white/[0.14]";
    }
  };

  const activeDays = activeTab === "github" ? githubDays : leetcodeDays;
  const isLoading = activeTab === "github" ? githubLoading : leetcodeLoading;

  return (
    <section
      ref={sectionRef}
      id="activity"
      className="page-wrap py-24 sm:py-28"
    >
      {/* Section Label */}
      <div className="minimal-divider">
        <span>ACTIVITY &amp; CODING CADENCE</span>
        <span>LIVE DAILY TELEMETRY</span>
      </div>

      {/* Editorial Headline */}
      <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] font-medium tracking-tight text-white leading-[0.95]">
            Engineering
            <br />
            <em className="text-zinc-500 not-italic">commit rhythm.</em>
          </h2>
          <p className="mt-4 text-[14px] text-zinc-400 font-normal max-w-xl">
            Live contribution telemetry updated automatically every hour from GitHub and LeetCode.
          </p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-white/10 bg-[#111114]">
          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`px-4 py-1.5 rounded-md font-mono-code text-xs transition-all ${
              activeTab === "github"
                ? "bg-[#ff2d78] text-white font-semibold shadow-[0_0_12px_rgba(255,45,120,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            GITHUB COMMITS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("leetcode")}
            className={`px-4 py-1.5 rounded-md font-mono-code text-xs transition-all ${
              activeTab === "leetcode"
                ? "bg-[#ff2d78] text-white font-semibold shadow-[0_0_12px_rgba(255,45,120,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            LEETCODE SUBMISSIONS
          </button>
        </div>
      </div>

      {/* Main Contribution Canvas Card */}
      <div className="activity-card-container mt-12 bg-[#111114] border border-white/10 hover:border-[#ff2d78]/40 rounded-xl p-6 sm:p-8 transition-colors duration-400 shadow-xl">
        {/* Header Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] animate-pulse" />
            <span className="font-mono-code text-xs font-semibold text-white tracking-wider uppercase">
              {activeTab === "github" ? "GitHub: @ekaagragupta" : "LeetCode: @ekaagragupta"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono-code text-xs">
            {activeTab === "github" ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-400">Total Lifetime:</span>
                  <span className="text-[#ff2d78] font-bold">
                    {githubTotal ? `${githubTotal.toLocaleString()} commits` : "1,600+ commits"}
                  </span>
                </div>
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#ff2d78] transition-colors"
                >
                  View Profile ↗
                </a>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-400">Solved:</span>
                  <span className="text-[#ff2d78] font-bold">
                    {leetcodeSolved ? `${leetcodeSolved} Problems` : "297 Problems"}
                  </span>
                </div>
                {leetcodeStats && (
                  <div className="hidden sm:flex items-center gap-3 text-[11px]">
                    <span className="text-emerald-400 font-medium">Easy: {leetcodeStats.easy}</span>
                    <span className="text-amber-400 font-medium">Med: {leetcodeStats.medium}</span>
                    <span className="text-rose-400 font-medium">Hard: {leetcodeStats.hard}</span>
                  </div>
                )}
                {leetcodeRanking && (
                  <div className="hidden md:flex items-center gap-1 text-[11px] text-zinc-400">
                    <span>Rank:</span>
                    <span className="text-white">#{leetcodeRanking.toLocaleString()}</span>
                  </div>
                )}
                <a
                  href={PERSONAL_INFO.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#ff2d78] transition-colors"
                >
                  View Profile ↗
                </a>
              </>
            )}
          </div>
        </div>

        {/* The Contribution Dot Grid */}
        <div ref={gridContainerRef} className="relative overflow-x-auto pb-2 pt-1 select-none">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center font-mono-code text-xs text-zinc-500">
              <span className="h-4 w-4 rounded-full border-2 border-[#ff2d78] border-t-transparent animate-spin mb-3" />
              <span>Syncing live daily telemetry from {activeTab}...</span>
            </div>
          ) : (
            <div className="min-w-[680px]">
              {/* 7 rows (days of week) × 20 columns (weeks) */}
              <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                {activeDays.map((day, idx) => (
                  <div
                    key={`${activeTab}-${idx}`}
                    onMouseEnter={() =>
                      setHoveredDay({
                        date: day.date,
                        count: day.count,
                        source: activeTab === "github" ? "commits" : "submissions",
                      })
                    }
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`contribution-dot h-3 w-3 rounded-[2.5px] transition-all duration-200 cursor-pointer ${getDotClass(
                      day.level
                    )}`}
                    title={`${day.count} ${activeTab === "github" ? "commits" : "submissions"} on ${day.date}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Legend & Live Tooltip */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono-code text-[11px]">
          <div className="text-zinc-400">
            {hoveredDay ? (
              <span className="text-white">
                <strong className="text-[#ff2d78] font-bold">{hoveredDay.count}</strong> {hoveredDay.source} on{" "}
                {new Date(hoveredDay.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : (
              <span>Hover over any pixel block to inspect daily cadence</span>
            )}
          </div>

          {/* Scale Legend */}
          <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-white/[0.04]" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#ff2d78]/25" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#ff2d78]/55" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#ff2d78]/85" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#ff2d78] shadow-[0_0_6px_#ff2d78]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
