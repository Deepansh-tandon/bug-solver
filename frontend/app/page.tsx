"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "../app/components/ui/background-beams";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../app/components/ui/resizable-navbar";
import { Search, ArrowRight } from "lucide-react";
import { GlowingEffect } from "../app/components/ui/glowing-effect";
import { IntelliFixFeaturesTimeline } from "../app/components/ui/intelli-fix-features-timeline";
import { marked } from 'marked'; // Import marked for markdown rendering

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Docs",
      link: "#docs",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [solution, setSolution] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setSolution(null); // Clear previous solution

    try {
      const response = await fetch("http://localhost:8080/solve_error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: errorMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSolution(data);
    } catch (error) {
      console.error("Error fetching solution:", error);
      setSolution({ error: "Failed to fetch solution. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
console.log(solution)
  return (
    <div className="relative w-full min-h-screen bg-neutral-950 mt-10">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Hero section content */}
      <div className="flex flex-col items-center flex-grow justify-center max-w-4xl mx-auto p-10 text-center mt-32 ">
        <h1 className="relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 font-sans font-bold leading-tight">
          Fix your code errors <span className="text-indigo-400">in seconds, not hours</span>
        </h1>
        <p className="text-neutral-400 max-w-3xl mx-auto my-6 text-md relative z-10 leading-relaxed">
          Paste your error, get instant solutions. Our AI-powered tool analyzes
          your code issues and provides actionable insights, references from GitHub, StackOverflow,
          and expert sources to help you debug faster and write better code.
        </p>
        <div className="flex w-full max-w-2xl mx-auto gap-3 relative z-10 mt-8 px-4">
            {/* Input with glowing effect */}
            <div className="relative flex-1 rounded-lg border border-neutral-700 p-1 md:rounded-xl md:p-1">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative flex h-full rounded-lg bg-neutral-800">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Enter your error message or paste your code..."
                  className="w-full bg-transparent pl-10 pr-2 py-3 text-neutral-200 focus:outline-none text-base"
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                />
              </div>
            </div>

            {/* Analyze button with glowing effect */}
            <div className="relative rounded-lg border border-neutral-700 p-1 md:rounded-xl md:p-1">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative flex h-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-colors duration-200">
                <button
                  type="submit"
                  className="w-full h-full text-white font-semibold px-6 py-3 flex items-center justify-center space-x-2"
                  onClick={handleAnalyze}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Analyzing...</span>
                  ) : (
                    <>
                      <span>Analyze</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {solution && solution.error ? (
            <div className="mt-8 text-left w-full max-w-2xl p-4 bg-red-900 rounded-lg shadow-lg relative z-10">
              <h2 className="text-xl font-bold text-white mb-4">Error:</h2>
              <p className="text-red-300">{solution.error}</p>
            </div>
          ) : solution && (
            <div className="mt-8 text-left w-full max-w-2xl p-4 rounded-lg shadow-lg relative z-10 bg-neutral-800 border border-neutral-700">
              <h2 className="text-2xl font-bold text-white mb-6">Solution</h2>

              {/* Summary Section */}
              {solution.summary && (
                <div className="mb-6 p-4 rounded-lg bg-neutral-700 border border-neutral-600">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-3">Summary:</h3>
                  <div
                    className="text-neutral-400 leading-relaxed space-y-2 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: marked.parse(solution.summary) as string }}
                  />
                </div>
              )}

              {/* Relevant Resources Section */}
              {solution.matches && solution.matches.length > 0 && (
                <div className="mb-6 p-4 rounded-lg bg-neutral-700 border border-neutral-600">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-3">Relevant Resources:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solution.matches.map((match: any, i: number) => (
                      <a key={i} href={match.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 border border-neutral-700 group">
                        <h4 className="text-lg font-semibold text-blue-400 group-hover:underline mb-1">{match.title}</h4>
                        <p className="text-sm text-neutral-500 line-clamp-3 mb-2">{match.content}</p>
                        <p className="text-xs text-neutral-600">Source: {match.source} | Score: {match.score.toFixed(2)}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Suggestions Section */}
              {solution.gemini_suggestions && (
                <div className="p-4 rounded-lg bg-neutral-700 border border-neutral-600">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-3">AI Suggestions:</h3>
                  
                  {solution.gemini_suggestions.analysis && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-neutral-300 mb-1">Analysis:</h4>
                      <p className="text-neutral-400 leading-relaxed">{solution.gemini_suggestions.analysis}</p>
                    </div>
                  )}

                  {solution.gemini_suggestions.suggestions && solution.gemini_suggestions.suggestions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-neutral-300 mb-1">Suggestions:</h4>
                      <ul className="list-disc list-inside text-neutral-400 space-y-1">
                        {solution.gemini_suggestions.suggestions.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {solution.gemini_suggestions.best_practices && solution.gemini_suggestions.best_practices.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-300 mb-1">Best Practices:</h4>
                      <ul className="list-disc list-inside text-neutral-400 space-y-1">
                        {solution.gemini_suggestions.best_practices.map((bp: string, i: number) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
      </div>
      <IntelliFixFeaturesTimeline />
      <BackgroundBeams />
    </div>
  );
}
