import React from "react";
import { Timeline } from "./timeline";

export function IntelliFixFeaturesTimeline() {
  const data = [
    {
      title: "Real-time Error Diagnosis",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Instantly paste your code error and let our AI-powered engine go to work. We quickly analyze the context of your issue, leveraging Gemini's intelligence and Qdrant's high-performance vector search for lightning-fast, accurate diagnosis.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://placehold.co/500x300/4F46E5/FFFFFF?text=AI+Analysis"
              alt="AI analysis of code errors"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://placehold.co/500x300/4F46E5/FFFFFF?text=Instant+Results"
              alt="Instant error resolution results"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Comprehensive Multi-Source Solutions",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Our tool goes beyond a single answer. It intelligently synthesizes the best solutions from a vast knowledge base, including highly relevant discussions from Stack Overflow, practical examples from GitHub, and insights from our proprietary expert AI models.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://placehold.co/500x300/F97316/FFFFFF?text=Stack+Overflow+Insights"
              alt="Stack Overflow integration"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://placehold.co/500x300/1C2128/FFFFFF?text=GitHub+Code+Examples"
              alt="GitHub code examples"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Actionable Insights & Code Improvement",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            We don't just give you an answer; we provide clear, actionable steps to implement the fix. Learn from common pitfalls and best practices, empowering you to debug faster and write higher-quality, more resilient code in the future.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://placehold.co/500x300/22C55E/FFFFFF?text=Actionable+Steps"
              alt="Actionable steps for debugging"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://placehold.co/500x300/3B82F6/FFFFFF?text=Better+Code"
              alt="Writing better code"
              width={500}
              height={300}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 