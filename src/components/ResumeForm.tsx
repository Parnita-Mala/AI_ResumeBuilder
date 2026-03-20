'use client';

import React from 'react';
import { User, GraduationCap, Briefcase, Award, FolderKanban, Plus, Trash2, Sparkles, Medal, Globe } from 'lucide-react';

export default function ResumeForm({ data, onUpdate, onEnhance }: { data: any, onUpdate: (d: any) => void, onEnhance: (type: string, index: number) => void }) {
  const handleChange = (section: string, field: string, value: any, index: number | null = null) => {
    const newData = { ...data };
    if (index !== null) {
      newData[section][index][field] = value;
    } else {
      newData[section][field] = value;
    }
    onUpdate(newData);
  };

  const addItem = (section: string, template: any) => {
    const newData = { ...data };
    newData[section] = [...newData[section], template];
    onUpdate(newData);
  };

  const removeItem = (section: string, index: number) => {
    const newData = { ...data };
    newData[section] = newData[section].filter((_: any, i: number) => i !== index);
    onUpdate(newData);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              value={data.personalInfo.fullName}
              onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
              value={data.personalInfo.email}
              onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+1 (555) 000-0000"
              value={data.personalInfo.phone}
              onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="New York, NY"
              value={data.personalInfo.location}
              onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Work Experience</h2>
          </div>
          <button 
            onClick={() => addItem('experience', { company: '', role: '', dates: '', description: '' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
              <button 
                onClick={() => removeItem('experience', index)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={exp.company}
                    onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={exp.role}
                    onChange={(e) => handleChange('experience', 'role', e.target.value, index)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <button 
                    onClick={() => onEnhance('experience', index)}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                    disabled={!exp.description}
                  >
                    <Sparkles className="w-3 h-3" /> AI Enhance
                  </button>
                </div>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                  value={exp.description}
                  placeholder="Describe your achievements..."
                  onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Education</h2>
          </div>
          <button 
            onClick={() => addItem('education', { school: '', degree: '', dates: '' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
              <button 
                onClick={() => removeItem('education', index)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full border shadow-sm text-slate-400 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">School</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={edu.school}
                  onChange={(e) => handleChange('education', 'school', e.target.value, index)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Degree</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={edu.degree}
                  onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Dates</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  placeholder="2018 - 2022"
                  value={edu.dates}
                  onChange={(e) => handleChange('education', 'dates', e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Skills */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Skills</h2>
          </div>
          <button 
            onClick={() => addItem('skills', { name: '', level: 'Intermediate' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skills.map((skill: any, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 outline-none"
                placeholder="React.js"
                value={skill.name}
                onChange={(e) => handleChange('skills', 'name', e.target.value, index)}
              />
              <button 
                onClick={() => removeItem('skills', index)}
                className="p-2 text-slate-400 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Projects</h2>
          </div>
          <button 
            onClick={() => addItem('projects', { name: '', tech: '', description: '' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
        <div className="space-y-6">
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
              <button 
                onClick={() => removeItem('projects', index)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={project.name}
                    onChange={(e) => handleChange('projects', 'name', e.target.value, index)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tech Stack</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Next.js, Tailwind, Supabase"
                    value={project.tech}
                    onChange={(e) => handleChange('projects', 'tech', e.target.value, index)}
                  />
                </div>
              </div>
              <div>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                  value={project.description}
                  placeholder="Describe your project..."
                  onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Certifications */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Certifications</h2>
          </div>
          <button 
            onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Certification
          </button>
        </div>
        <div className="space-y-4">
          {data.certifications?.map((cert: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
              <button 
                onClick={() => removeItem('certifications', index)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full border shadow-sm text-slate-400 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={cert.name}
                  onChange={(e) => handleChange('certifications', 'name', e.target.value, index)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Issuer</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={cert.issuer}
                  onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  placeholder="2023"
                  value={cert.date}
                  onChange={(e) => handleChange('certifications', 'date', e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Languages</h2>
          </div>
          <button 
            onClick={() => addItem('languages', { name: '', level: 'Fluent' })}
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Language
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.languages?.map((lang: any, index: number) => (
            <div key={index} className="flex gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 outline-none text-sm"
                  placeholder="Language (e.g. English)"
                  value={lang.name}
                  onChange={(e) => handleChange('languages', 'name', e.target.value, index)}
                />
                <select
                  className="w-full px-3 py-1.5 rounded-md border border-slate-200 outline-none text-xs font-medium bg-white"
                  value={lang.level}
                  onChange={(e) => handleChange('languages', 'level', e.target.value, index)}
                >
                  <option>Native</option>
                  <option>Fluent</option>
                  <option>Professional</option>
                  <option>Intermediate</option>
                  <option>Elementary</option>
                </select>
              </div>
              <button 
                onClick={() => removeItem('languages', index)}
                className="p-2 text-slate-400 hover:text-red-500 transition-all self-start"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
