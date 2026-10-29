import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Building2, User, Mail, Phone } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'Memory Care Facility Director',
    patientCount: '25-100 residents'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#141A17] border border-[#2A3A30] text-[#F4F1EB] rounded-[2rem] p-7 md:p-9 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-mint)]/20 border border-[var(--color-mint)] flex items-center justify-center text-[var(--color-mint)] mb-5">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-sans font-bold text-2xl text-white">Clinical Pilot Intake Received</h3>
            <p className="text-white/70 text-sm mt-3 leading-relaxed max-w-md">
              Thank you, <span className="text-[var(--color-mint)] font-semibold">{formData.name || 'Doctor'}</span>. Our clinical deployment team will review your institution ({formData.organization || 'Facility'}) and provide an onboarding sandbox within 24 hours.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/60 text-left w-full">
              <div>• Priority Channel: clinical-intake@viktronhealth.com</div>
              <div>• Pilot Hardware: AIMB-G2 Titanium Glasses (2 units)</div>
              <div>• Cloud Status: 100% Air-Gapped NPU Enclave</div>
            </div>
            <button
              onClick={handleReset}
              className="btn-magnetic mt-8 px-8 py-3 rounded-full bg-[var(--color-mint)] text-emerald-950 font-bold text-xs font-mono uppercase tracking-wider"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-mint)] flex items-center gap-1.5 mb-1.5">
                <ShieldCheck size={14} /> Institutional Clinical Intake
              </span>
              <h3 className="font-sans font-bold text-2xl text-white">
                Request Clinical Demonstration
              </h3>
              <p className="text-white/60 text-xs mt-1">
                Evaluate AuraPath smart glasses and AuraGuide EHR triage for your memory care center.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-mono text-white/70 mb-1">Full Name & Credentials</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-white/40" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Eleanor Vance, MD"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-mint)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">Institutional Work Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-white/40" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="evance@memoryclinic.org"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-mint)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-white/70 mb-1">Organization / Center</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-3 text-white/40" />
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Baystate Health"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-mint)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-white/70 mb-1">Clinical Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B2420] border border-white/10 text-white focus:outline-none focus:border-[var(--color-mint)] font-mono text-xs"
                  >
                    <option>Memory Care Director</option>
                    <option>Neurologist / Geriatrician</option>
                    <option>Health System Executive</option>
                    <option>Clinical Informatics Officer</option>
                    <option>Family Caregiver</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">Facility Size / Patient Population</label>
                <select
                  value={formData.patientCount}
                  onChange={(e) => setFormData({ ...formData, patientCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B2420] border border-white/10 text-white focus:outline-none focus:border-[var(--color-mint)] font-mono text-xs"
                >
                  <option>10 - 25 Memory Care Residents</option>
                  <option>25 - 100 Residents (Standard Facility)</option>
                  <option>100+ Residents (Multi-Facility Network)</option>
                  <option>Independent Patient / Home Care</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-magnetic w-full py-3.5 rounded-full bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white font-bold font-mono text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Clinical Pilot Request</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="text-[11px] text-white/40 text-center font-mono pt-1">
                Zero patient data is shared. Protected under BAA & HIPAA compliance standards.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
