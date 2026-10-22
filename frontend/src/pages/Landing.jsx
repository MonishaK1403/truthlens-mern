import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  Layers,
  FileSearch,
  BellRing,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    desc: "Rule-based and extensible NLP pipeline",
  },
  {
    icon: Layers,
    title: "Multi-Platform Support",
    desc: "News, social media and more",
  },
  {
    icon: FileSearch,
    title: "Detailed Explanations",
    desc: "Know exactly why content is flagged",
  },
  {
    icon: BellRing,
    title: "Stay Informed",
    desc: "Make better decisions",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Navbar */}
      <header className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 py-5 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="text-teal-600" size={28} />
          <span className="font-bold text-xl">TruthLens</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#home" className="hover:text-teal-600">Home</a>
          <a href="#about" className="hover:text-teal-600">About</a>
          <a href="#features" className="hover:text-teal-600">Features</a>
          <a href="#how" className="hover:text-teal-600">How it Works</a>
          <a href="#contact" className="hover:text-teal-600">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="border border-slate-200 rounded-lg px-5 py-2 hover:bg-slate-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-teal-600 text-white rounded-lg px-5 py-2 hover:bg-teal-700"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="max-w-5xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Uncover the Truth
            <br />
            In a <span className="text-teal-600">Noisy World</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Detect, analyze and understand misinformation on digital
            platforms using natural language processing techniques.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-lg hover:bg-teal-700"
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="border border-slate-200 px-5 py-3 rounded-lg hover:bg-slate-50"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="bg-teal-50 rounded-2xl h-64 flex items-center justify-center">
          <ShieldCheck
            size={150}
            strokeWidth={1.2}
            className="text-teal-400"
          />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
      >
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Icon size={21} />
            </div>

            <h3 className="font-semibold text-sm">{title}</h3>

            <p className="text-sm text-slate-500 mt-2">
              {desc}
            </p>
          </div>
        ))}
      </section>
      {/* ABOUT SECTION */}
<section
  id="about"
  className="bg-slate-50 px-6 py-16 md:py-20"
>
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-slate-900">
      About TruthLens
    </h2>

    <p className="mt-5 text-slate-600 max-w-3xl mx-auto leading-relaxed">
      TruthLens is a misinformation analysis platform designed to
      help users understand online content. Using natural language
      processing techniques, it analyzes submitted text and provides
      insights that help users make informed decisions.
    </p>
  </div>
</section>

{/* HOW IT WORKS SECTION */}
<section
  id="how"
  className="px-6 py-16 md:py-20"
>
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900">
        How It Works
      </h2>

      <p className="text-slate-500 mt-3">
        Analyze content in three simple steps.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="border border-slate-200 rounded-xl p-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
          01
        </div>

        <h3 className="font-semibold text-lg mt-5">
          Submit Content
        </h3>

        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          Enter the news article, message, or text you want to
          analyze.
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl p-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
          02
        </div>

        <h3 className="font-semibold text-lg mt-5">
          Analyze the Text
        </h3>

        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          TruthLens processes the submitted content using its
          misinformation analysis pipeline.
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl p-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
          03
        </div>

        <h3 className="font-semibold text-lg mt-5">
          Review the Results
        </h3>

        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          View the analysis result and its explanation to better
          understand the submitted content.
        </p>
      </div>

    </div>

    <div className="text-center mt-10">
      <Link
        to="/signup"
        className="btn-primary inline-flex items-center gap-2"
      >
        Try TruthLens <ArrowRight size={16} />
      </Link>
    </div>
  </div>
</section>

{/* CONTACT SECTION */}
<section
  id="contact"
  className="bg-teal-50 px-6 py-16 md:py-20"
>
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-slate-900">
      Get in Touch
    </h2>

    <p className="text-slate-600 mt-4 leading-relaxed">
      Have questions or feedback about TruthLens? We welcome your
      suggestions to help improve the platform.
    </p>

    <div className="mt-8">
      <Link
        to="/signup"
        className="btn-primary inline-flex items-center gap-2"
      >
        Join TruthLens <ArrowRight size={16} />
      </Link>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-slate-100 py-8 text-center text-sm text-slate-500"
      >
        TruthLens - Detection and Analysis of Misinformation
      </footer>

    </div>
  );
}