'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Search, Loader2, Calendar, Mail, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';

export default function ResumesPage() {
  const [email, setEmail] = useState('');
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setEmail(session.user.email || '');
        fetchResumes(session.user);
      }
    });
  }, []);

  const fetchResumes = async (authUser?: any) => {
    const targetUser = authUser || user;
    const searchEmail = email || targetUser?.email;
    
    if (!searchEmail && !targetUser?.id) return;
    
    setLoading(true);
    setSearched(true);
    try {
      let query = supabase.from('resumes').select('*');
      
      // If we have a logged in user, try fetching by user_id or email
      if (targetUser?.id) {
        query = query.or(`user_id.eq.${targetUser.id},user_email.eq.${searchEmail}`);
      } else {
        query = query.eq('user_email', searchEmail);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      alert('Failed to fetch resumes. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-900">AI Resume Pro</span>
          </Link>
          <Link href="/builder" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Builder
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto p-6 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">My Saved Resumes</h1>
          <p className="text-slate-600">Enter your email address to find all your saved resumes.</p>
        </div>

        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex gap-2 mb-12">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchResumes()}
            />
          </div>
          <button
            onClick={fetchResumes}
            disabled={loading || !email}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Find
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Searching for your resumes...</p>
            </div>
          ) : resumes.length > 0 ? (
            resumes.map((resume) => (
              <div key={resume.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {resume.content?.personalInfo?.fullName || 'Untitled Resume'}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(resume.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{resume.content?.experience?.length || 0} Experiences</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.setItem('resume_to_load', JSON.stringify(resume.content));
                      window.location.href = '/builder';
                    }}
                    className="px-4 py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Load & Edit
                  </button>
                </div>
              </div>
            ))
          ) : searched ? (
            <div className="text-center py-20 bg-slate-100 rounded-2xl border border-dashed">
              <p className="text-slate-500">No resumes found for this email address.</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
