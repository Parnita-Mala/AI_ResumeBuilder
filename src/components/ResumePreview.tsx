'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Medal, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function ResumePreview({ data, template = 'classic' }: { data: any, template?: string }) {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

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

      {/* Languages */}
      {languages?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Languages</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-800">
            {languages.map((lang: any, i: number) => (
              <span key={i} className="flex items-center gap-1">• {lang.name} ({lang.level})</span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1 mb-3 uppercase tracking-wider">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert: any, i: number) => (
              <div key={i} className="flex justify-between items-baseline">
                <div className="text-[13px] text-slate-800 font-bold">{cert.name} — <span className="font-normal italic">{cert.issuer}</span></div>
                <div className="text-[12px] text-slate-600 font-sans">{cert.date}</div>
              </div>
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

        {certifications?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 pb-1 border-b-2 border-blue-500 inline-block">Certifications</h2>
            <div className="space-y-3">
              {certifications.map((cert: any, i: number) => (
                <div key={i}>
                  <div className="text-[12px] font-bold text-slate-900">{cert.name}</div>
                  <div className="text-[11px] text-slate-500">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 pb-1 border-b-2 border-blue-500 inline-block">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-700 font-medium">{lang.name}</span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">{lang.level}</span>
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

        {languages?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Languages</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {languages.map((lang: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900">{lang.name}</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Certifications</h2>
            <div className="space-y-6">
              {certifications.map((cert: any, i: number) => (
                <div key={i} className="flex justify-between items-baseline border-l border-slate-100 pl-4">
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">{cert.name}</h3>
                    <div className="text-[12px] text-slate-500">{cert.issuer}</div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400">{cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Education</h2>
            <div className="space-y-8">
              {education.map((edu: any, i: number) => (
                <div key={i} className="grid grid-cols-[120px_1fr] gap-8">
                  <div className="text-[12px] font-bold text-slate-400">{edu.dates}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{edu.school}</h3>
                    <div className="text-[14px] text-slate-500">{edu.degree}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div className="text-slate-800 font-serif h-full p-2 border-double border-4 border-slate-200">
      <header className="border-b-4 border-slate-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {personalInfo.fullName || 'Professional Name'}
          </h1>
        </div>
        <div className="text-right text-[12px] font-sans font-bold text-slate-600 space-y-1">
          {personalInfo.email && <div className="flex items-center justify-end gap-2">{personalInfo.email} <Mail className="w-3 h-3 text-slate-900" /></div>}
          {personalInfo.phone && <div className="flex items-center justify-end gap-2">{personalInfo.phone} <Phone className="w-3 h-3 text-slate-900" /></div>}
          {personalInfo.location && <div className="flex items-center justify-end gap-2">{personalInfo.location} <MapPin className="w-3 h-3 text-slate-900" /></div>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-white bg-slate-900 px-3 py-1 mb-4 uppercase tracking-widest text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1 border-b border-slate-100 pb-1">
                    <h3 className="text-[16px] font-black text-slate-900 uppercase">{exp.company}</h3>
                    <span className="text-[12px] font-bold text-slate-500 italic">{exp.dates}</span>
                  </div>
                  <div className="text-[14px] font-bold text-slate-800 mb-2">{exp.role}</div>
                  <p className="text-[13px] leading-relaxed text-slate-700 text-justify">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-8">
            {education.length > 0 && (
              <section>
                <h2 className="text-sm font-black border-b-2 border-slate-900 pb-1 mb-4 uppercase tracking-wider">Education</h2>
                <div className="space-y-4">
                  {education.map((edu: any, i: number) => (
                    <div key={i}>
                      <h3 className="text-[14px] font-bold text-slate-900">{edu.school}</h3>
                      <p className="text-[12px] text-slate-600 italic">{edu.degree}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-1">{edu.dates}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages?.length > 0 && (
              <section>
                <h2 className="text-sm font-black border-b-2 border-slate-900 pb-1 mb-4 uppercase tracking-wider">Languages</h2>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {languages.map((lang: any, i: number) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-bold text-slate-900">{lang.name}</span>
                      <span className="text-[10px] text-slate-500 italic">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-sm font-black border-b-2 border-slate-900 pb-1 mb-4 uppercase tracking-wider">Core Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: any, i: number) => (
                    <span key={i} className="text-[12px] px-2 py-0.5 border border-slate-200 font-bold text-slate-700 bg-slate-50">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {certifications?.length > 0 && (
              <section>
                <h2 className="text-sm font-black border-b-2 border-slate-900 pb-1 mb-4 uppercase tracking-wider">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert: any, i: number) => (
                    <div key={i} className="flex gap-3">
                      <Medal className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <div>
                        <div className="text-[12px] font-bold text-slate-900">{cert.name}</div>
                        <div className="text-[11px] text-slate-500">{cert.issuer} • {cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreative = () => (
    <div className="text-slate-800 font-sans h-full bg-slate-900 -m-12 p-12 text-white relative overflow-hidden">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-20 -ml-32 -mb-32"></div>

      <header className="relative z-10 mb-16">
        <h1 className="text-7xl font-black tracking-tighter leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {personalInfo.fullName?.split(' ').map((n: string, i: number) => (
            <span key={i} className={i === 1 ? 'block opacity-50' : i > 1 ? 'text-[0.5em] block' : ''}>{n} </span>
          ))}
        </h1>
        <div className="flex flex-wrap gap-6 text-[14px] font-medium text-slate-400">
          {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> {personalInfo.email}</span>}
          {personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-400" /> {personalInfo.location}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12 relative z-10">
        <div className="col-span-12 space-y-12">
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-8">Selected Career Path</h2>
              <div className="grid grid-cols-2 gap-8">
                {experience.map((exp: any, i: number) => (
                  <div key={i} className="group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-default backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-xl">
                        {exp.company[0]}
                      </div>
                      <span className="text-[11px] font-bold px-2 py-1 bg-white/10 rounded-lg">{exp.dates}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-blue-300 text-[14px] mb-4 font-medium uppercase tracking-wider">{exp.company}</p>
                    <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-3 gap-12 pt-8 border-t border-white/10">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 mb-6">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: any, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 rounded-full text-xs font-bold border border-white/10 hover:border-blue-500/50 transition-colors">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 mb-6">Languages</h2>
              <div className="space-y-4">
                {languages?.map((lang: any, i: number) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="text-sm font-bold text-slate-300">{lang.name}</span>
                    <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded uppercase tracking-tighter">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 mb-6">Education</h2>
              <div className="space-y-4">
                {education.map((edu: any, i: number) => (
                  <div key={i}>
                    <div className="text-sm font-bold text-slate-300">{edu.school}</div>
                    <div className="text-[11px] text-slate-500 mb-1">{edu.degree}</div>
                    <div className="text-[10px] font-bold text-blue-400">{edu.dates}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-2xl rounded-sm aspect-[1/1.414] scale-100 origin-top p-12 overflow-hidden" id="resume-preview">
      {template === 'classic' && renderClassic()}
      {template === 'modern' && renderModern()}
      {template === 'minimal' && renderMinimal()}
      {template === 'executive' && renderExecutive()}
      {template === 'creative' && renderCreative()}
      
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
