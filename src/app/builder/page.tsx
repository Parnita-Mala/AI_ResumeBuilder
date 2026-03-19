'use client';

import React, { useState, useEffect, useRef } from 'react';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { FileText, Download, Save, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  education: { school: string; degree: string; dates: string }[];
  experience: { company: string; role: string; dates: string; description: string }[];
  skills: { name: string; level: string }[];
  projects: { name: string; tech: string; description: string }[];
}

import Auth from '@/components/Auth';

export default function BuilderPage() {
  const [loading, setLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [user, setUser] = useState<any>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  });

  const lastSaveRef = useRef<string>('');

  // Handle Auth State
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user && !resumeData.personalInfo.email) {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, email: session.user.email || '' }
        }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load from localStorage if redirected from dashboard
  useEffect(() => {
    const savedResume = localStorage.getItem('resume_to_load');
    if (savedResume) {
      try {
        const parsed = JSON.parse(savedResume);
        setResumeData(parsed);
        if (parsed.template) setSelectedTemplate(parsed.template);
        lastSaveRef.current = savedResume;
        localStorage.removeItem('resume_to_load');
      } catch (e) {
        console.error('Failed to parse saved resume:', e);
      }
    }
  }, []);

  const handleUpdate = (newData: ResumeData) => {
    setResumeData(newData);
  };

  // Auto-save logic
  useEffect(() => {
    const dataString = JSON.stringify({ ...resumeData, template: selectedTemplate });
    
    // Don't save if nothing changed or email is missing
    const emailToUse = user?.email || resumeData.personalInfo.email;
    if (dataString === lastSaveRef.current || !emailToUse) return;

    const timer = setTimeout(() => {
      handleSave(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate, user]);

  const handleEnhance = async (type: string, index: number) => {
    if (type === 'experience') {
      const content = resumeData.experience[index].description;
      if (!content) return;

      setLoading(true);
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, type }),
        });
        const data = await response.json();
        if (data.improvedContent) {
          const newExperience = [...resumeData.experience];
          newExperience[index].description = data.improvedContent;
          setResumeData({ ...resumeData, experience: newExperience });
        }
      } catch (err) {
        console.error('Failed to enhance:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (isAuto = false) => {
    const emailToUse = user?.email || resumeData.personalInfo.email;
    if (!emailToUse) {
      if (!isAuto) alert('Please enter your email or sign in to save your resume.');
      return;
    }

    setSavingStatus('saving');
    try {
      const { error } = await supabase
        .from('resumes')
        .insert([{ 
          content: { ...resumeData, template: selectedTemplate }, 
          user_email: emailToUse,
          user_id: user?.id || null
        }]);
      
      if (error) throw error;
      
      setSavingStatus('saved');
      lastSaveRef.current = JSON.stringify({ ...resumeData, template: selectedTemplate });
      
      if (!isAuto) alert('Resume saved to Supabase!');
    } catch (err: any) {
      console.error('Save error details:', err);
      setSavingStatus('error');
      if (!isAuto) alert(`Failed to save: ${err.message || 'Check console for details.'}`);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 border-r pr-4 mr-4 border-slate-200">AI Resume Pro</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 font-medium hidden sm:inline">
                {resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'Untitled Resume'}
              </span>
              
              {/* Save Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-medium">
                {savingStatus === 'saving' && (
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </span>
                )}
                {savingStatus === 'saved' && (
                  <span className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved
                  </span>
                )}
                {savingStatus === 'error' && (
                  <span className="flex items-center gap-1.5 text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" /> Save failed
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border mr-4">
              {[
                { id: 'classic', label: 'Classic' },
                { id: 'modern', label: 'Modern' },
                { id: 'minimal', label: 'Minimalist' }
              ].map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    selectedTemplate === tpl.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>

            <Link 
              href="/resumes"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all border border-transparent hover:border-slate-200 rounded-lg"
            >
              My Resumes
            </Link>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

            <Auth />

            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

            <button 
              onClick={() => handleSave(false)}
              disabled={savingStatus === 'saving'}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 border rounded-lg transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Now
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-100"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <ResumeForm data={resumeData} onUpdate={handleUpdate} onEnhance={handleEnhance} />
          </div>

          {/* Preview Section */}
          <div className="sticky top-24">
            <div className="mb-4 flex items-center justify-between bg-white p-3 rounded-xl border">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                {loading ? (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-blue-500" />
                )}
                {loading ? 'AI is thinking...' : 'Live Preview'}
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border">
                  Template: {selectedTemplate}
                </div>
              </div>
            </div>
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </div>
        </div>
      </main>
    </div>
  );
}


