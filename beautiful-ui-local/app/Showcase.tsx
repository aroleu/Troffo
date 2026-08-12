"use client";

import {
  ApprovalCard,
  ChatComposer,
  CodeBlock,
  ContextCards,
  DiffTable,
  FilterTable,
  FineTuneCard,
  InsightCards,
  LoadingState,
  PromptBar,
  RecommendationCard,
  RecordsTable,
  SearchList,
  SelectionActions,
  SidebarNav,
  StreamingText,
  TaskRows,
  ThinkingState,
  ToolChips,
} from "@/components";
import type { ComponentType } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type CatalogItem = {
  id: string;
  title: string;
  description: string;
  height: number;
  component: ComponentType;
};

const catalog: CatalogItem[] = [
  { id: "loading-state", title: "Loading State", description: "Pixel-grid loader with shimmer and elapsed time.", height: 272, component: LoadingState },
  { id: "thinking-state", title: "Thinking", description: "Expandable traces — steps, reasoning, search, coding.", height: 272, component: ThinkingState },
  { id: "streaming-text", title: "Streaming Text", description: "Streamed answer with inline sources, actions, and follow-ups.", height: 273, component: StreamingText },
  { id: "approval-card", title: "Approval Card", description: "Human-in-the-loop questions the agent asks before acting.", height: 272, component: ApprovalCard },
  { id: "tool-chips", title: "Tool Chips", description: "Code edits and tool calls as compact chips.", height: 272, component: ToolChips },
  { id: "task-rows", title: "Task Rows", description: "Live agent task status — running, failed, completed.", height: 272, component: TaskRows },
  { id: "chat-composer", title: "Chat", description: "Tabbed chat panel with reasoning replies and a composer.", height: 312, component: ChatComposer },
  { id: "prompt-bar", title: "Prompt Bar", description: "Composer with @ sources, / commands, model picker, and dictation.", height: 408, component: PromptBar },
  { id: "recommendation-card", title: "Recommendation Card", description: "Agent suggestion with a confidence meter and actions.", height: 272, component: RecommendationCard },
  { id: "context-cards", title: "Context Cards", description: "Retrieved knowledge chunks with their sources.", height: 320, component: ContextCards },
  { id: "diff-table", title: "Diff Table", description: "AI-proposed edits sweeping through tabular data.", height: 281, component: DiffTable },
  { id: "records-table", title: "Records Table", description: "CRM-style grid with tags, sorting, and relationship status.", height: 464, component: RecordsTable },
  { id: "filter-table", title: "Filter Table", description: "Status chips that reorganize live data.", height: 277, component: FilterTable },
  { id: "sidebar-nav", title: "Sidebar Nav", description: "Workspace navigation with quick search.", height: 384, component: SidebarNav },
  { id: "search", title: "Search", description: "Command search with live filtering and an empty state.", height: 272, component: SearchList },
  { id: "insight-cards", title: "Insight Cards", description: "Paged agent insights with scrub-ready live charts.", height: 436, component: InsightCards },
  { id: "code-block", title: "Code Block", description: "Agent-written code streaming in line by line.", height: 272, component: CodeBlock },
  { id: "fine-tune-card", title: "Fine-tune Card", description: "The agent adjusts design properties in an inspector.", height: 272, component: FineTuneCard },
  { id: "selection-actions", title: "Selection Actions", description: "Highlight a passage and hand it to the agent to rewrite.", height: 272, component: SelectionActions },
];

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const setTheme = (nextDark: boolean) => {
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("bui-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  };

  return (
    <div className="relative inline-grid h-9 grid-cols-2 items-center rounded-full bg-field p-0.5">
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-8 rounded-full bg-surface shadow-btn transition-transform duration-200"
        style={{
          transform: `translateX(${dark ? 32 : 0}px)`,
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          opacity: 1,
        }}
      />
      <button
        aria-label="Light mode"
        aria-pressed={!dark}
        onClick={() => setTheme(false)}
        className={`relative z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-150 ${dark ? "text-ink-3 hover:text-ink-2" : "text-ink"}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
      <button
        aria-label="Dark mode"
        aria-pressed={dark}
        onClick={() => setTheme(true)}
        className={`relative z-10 flex size-8 items-center justify-center rounded-full transition-colors duration-150 ${dark ? "text-ink" : "text-ink-3 hover:text-ink-2"}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}

function ComponentNav({ active }: { active: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ top: 0, height: 29, opacity: 0 });

  useLayoutEffect(() => {
    const list = listRef.current;
    const item = itemRefs.current[active];
    if (!list || !item) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    setIndicator({
      top: itemBox.top - listBox.top,
      height: itemBox.height,
      opacity: 1,
    });
  }, [active]);

  return (
    <nav aria-label="Components">
      <p className="mb-2 text-[11.5px] text-ink-3">Components</p>
      <ul ref={listRef} className="relative flex flex-col">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
          style={{
            top: indicator.top,
            height: indicator.height,
            opacity: indicator.opacity,
            transition:
              "top 220ms cubic-bezier(0.23, 1, 0.32, 1), height 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms",
          }}
        />
        {catalog.map((item) => (
          <li key={item.id}>
            <a
              ref={(node) => {
                itemRefs.current[item.id] = node;
              }}
              href={`#${item.id}`}
              className={`relative z-10 flex items-center rounded-[7px] px-2 py-[5px] text-[12.5px] transition-colors duration-150 ${active === item.id ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Showcase() {
  const [active, setActive] = useState(catalog[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const item of catalog) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative mx-auto max-w-[960px] bg-page shadow-[0_0_0_1px_var(--line)]">
      <div className="lg:grid lg:grid-cols-[288px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-dashed border-line px-7 pt-16 pb-7 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:border-r lg:border-b-0 lg:pt-[clamp(2.5rem,8vh,5rem)]">
          <div className="shrink-0">
            <div className="flex items-center justify-between">
              <img src="/logo.png" alt="Beautiful UI" className="-ml-3 size-20 shrink-0 lg:ml-0" />
              <ThemeToggle />
            </div>
            <h1 className="mt-12 text-[21px] leading-snug font-semibold tracking-[-0.02em] text-ink text-balance lg:mt-[clamp(1.5rem,5vh,3rem)]">
              Beautiful UI for AI-native interfaces.
            </h1>
          </div>

          <div className="relative mt-7 border-t border-dashed border-line pt-6 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:pt-0">
            <div className="component-nav-scroll lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pt-6 lg:pb-16">
              <ComponentNav active={active} />
            </div>
          </div>

          <div className="mt-8 shrink-0 lg:mt-6">
            <div className="block rounded-control px-2 py-1">
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-[12px] font-medium text-ink">Local study library</span>
                <span className="font-mono text-[10.5px] text-ink-3">19 extracted components</span>
              </span>
              <span className="mt-1.5 block text-[12px] leading-relaxed text-ink-2 text-pretty">
                Private learning copy with local assets and source files.
              </span>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex w-full flex-col pt-8 pb-12 lg:pt-10 lg:pb-16">
            {catalog.map((item, index) => {
              const Component = item.component;
              return (
                <section
                  key={item.id}
                  id={item.id}
                  className="primitive-showcase group flex w-full scroll-mt-8 flex-col border-b border-dashed border-line px-8 py-10"
                >
                  <div className="mb-3 flex items-start gap-2 sm:items-baseline">
                    <span className="mt-0.5 font-mono text-[11px] text-ink-3 tabular-nums sm:mt-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 sm:flex sm:items-baseline sm:gap-2">
                      <h3 className="whitespace-nowrap text-[13px] font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[12.5px] text-ink-3 text-pretty sm:mt-0 sm:truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className="primitive-demo-surface relative flex items-center justify-center overflow-hidden rounded-window bg-canvas p-3 shadow-hairline"
                    style={{ minHeight: item.height }}
                  >
                    <Component />
                  </div>
                </section>
              );
            })}
          </div>

          <section className="px-8 py-14">
            <p className="font-mono text-[11px] tracking-wide text-ink-3">/ local</p>
            <h2 className="mt-2 max-w-md text-[19px] leading-snug font-semibold tracking-[-0.02em] text-ink text-balance">
              Component source is available locally.
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-2 text-pretty">
              Open the components directory to study, modify, and test every primitive without contacting the original website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
