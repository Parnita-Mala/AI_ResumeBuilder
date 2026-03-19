'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

export default function ResumePreview({ data, template = 'classic' }: { data: any, template?: string }) {
  const { personalInfo, education, experience, skills, projects } = data;

  const renderClassic = () => (
    <div className="text-slate-800 font-serif h-full">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 text-[13px] text-slate-600 font-sans">
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>
          )}
        </div>
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.company}</h3>
                  <span className="text-[12px] text-slate-600 italic font-sans">{exp.dates}</span>
                </div>
                <div className="text-[14px] font-bold text-slate-700 mb-1 italic">{exp.role}</div>
                <div className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-line">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900">{proj.name}</h3>
                  <span className="text-[12px] text-slate-600 font-sans italic">{proj.tech}</span>
                </div>
                <div className="text-[13px] text-slate-700 leading-relaxed">
                  {proj.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-800">
            {skills.map((skill: any, i: number) => (
              <span key={i} className="flex items-center gap-1">• {skill.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Education</h2>
          <div className="space-y-3">
            {education.map((edu: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <span className="text-[12px] text-slate-600 font-sans">{edu.dates}</span>
                </div>
                <div className="text-[13px] text-slate-700 italic">{edu.degree}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderModern = () => (
    <div className="text-slate-800 font-sans h-full flex gap-8">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-50 -m-12 p-12 border-r flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-tight mb-4">
            {personalInfo.fullName?.split(' ')[0]} <br />
            <span className="text-blue-600">{personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="space-y-3 text-[12px] text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-500" /> {personalInfo.email}</div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-500" /> {personalInfo.phone}</div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {personalInfo.location}</div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 pb-1 border-b-2 border-blue-500 inline-block">Skills</h2>
            <div className="flex flex-col gap-2">
              {skills.map((skill: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[13px] font-medium text-slate-700">{skill.name}</span>
                  <div className="w-full bg-slate-200 h-1 rounded-full mt-1">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 pb-1 border-b-2 border-blue-500 inline-block">Education</h2>
            <div className="space-y-4">
              {education.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="text-[13px] font-bold text-slate-900">{edu.school}</div>
                  <div className="text-[12px] text-slate-600 italic">{edu.degree}</div>
                  <div className="text-[11px] text-blue-500 font-bold mt-0.5">{edu.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 py-4">
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, i: number) => (
                <div key={i} className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-600"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[12px] font-bold text-blue-600">{exp.dates}</span>
                  </div>
                  <div className="text-[13px] font-bold text-slate-600 mb-2">{exp.company}</div>
                  <div className="text-[13px] leading-relaxed text-slate-600">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj: any, i: number) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{proj.tech}</span>
                  </div>
                  <div className="text-[12px] text-slate-600 line-clamp-2">
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="text-slate-800 font-sans h-full max-w-[90%] mx-auto">
      <header className="mb-12 pt-8">
        <h1 className="text-5xl font-light text-slate-900 mb-4 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex gap-4 text-[13px] text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-12">
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp: any, i: number) => (
                <div key={i} className="grid grid-cols-[120px_1fr] gap-8">
                  <div className="text-[12px] font-bold text-slate-400">{exp.dates}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{exp.role}</h3>
                    <div className="text-[14px] text-slate-500 mb-3">{exp.company}</div>
                    <p className="text-[14px] leading-relaxed text-slate-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Capability</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {skills.map((skill: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900">{skill.name}</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">{skill.level || 'Expert'}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-2xl rounded-sm aspect-[1/1.414] scale-100 origin-top p-12 overflow-hidden" id="resume-preview">
      {template === 'classic' && renderClassic()}
      {template === 'modern' && renderModern()}
      {template === 'minimal' && renderMinimal()}
      
      {/* Placeholder for empty state */}
      {!experience.length && !education.length && !personalInfo.fullName && (
        <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed rounded-xl p-12 text-center font-sans">
          <Globe className="w-12 h-12 mb-4 opacity-10" />
          <p className="text-lg font-medium">Enter your details on the left <br /> to see your resume here.</p>
        </div>
      )}
    </div>
  );
}
