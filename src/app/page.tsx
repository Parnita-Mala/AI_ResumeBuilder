import Image from "next/image";

import Link from 'next/link';
import { FileText, Sparkles, Download, Layout } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Resume Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/resumes" 
              className="text-slate-600 font-medium hover:text-blue-600 transition-colors"
            >
              My Resumes
            </Link>
            <Link 
              href="/builder" 
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Build a Professional Resume <br /> 
            <span className="text-blue-600">in Minutes</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Revolutionize your job search with our AI-powered resume builder. Create, polish, and export a stunning resume that stands out to recruiters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/builder" 
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              Build My Resume <Sparkles className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              View Templates
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24 border-t border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">AI Enhancement</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our AI analyzes your experience and suggests professional bullet points and action verbs to highlight your achievements.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Live Preview</h3>
                <p className="text-slate-600 leading-relaxed">
                  See changes in real-time as you type. Our clean, modern templates are optimized for both recruiters and ATS systems.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">One-Click PDF</h3>
                <p className="text-slate-600 leading-relaxed">
                  Export your polished resume to a high-quality PDF format instantly. Ready to be sent to your dream company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <span className="text-white font-bold">AI Resume Pro</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p>© 2026 AI Resume Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
