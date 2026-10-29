import React from 'react';
import { Check, ShieldCheck, ArrowRight, Zap, Building2, Hospital, Home } from 'lucide-react';

export default function ClinicalPricingSection({ onSelectTier }) {
  const tiers = [
    {
      id: "pilot",
      name: "Family & In-Home Pilot",
      tagline: "For individual memory care patients and primary caregivers.",
      badge: "Single Patient Deployment",
      price: "$2,400",
      period: "per unit / year",
      icon: Home,
      features: [
        "1x AuraPath Titanium Smart Glasses (AIMB-G2)",
        "AuraGuide Mobile & Tablet Caregiver App",
        "Offline Facial Vectoring for up to 30 family members",
        "Directional bone-conduction audio cues",
        "Real-time wander deviation geofencing",
        "Dedicated onboarding clinical specialist"
      ],
      popular: false,
      btnText: "Request In-Home Pilot",
      btnClass: "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
    },
    {
      id: "center",
      name: "Memory Care Facility",
      tagline: "Engineered for specialized assisted living & dementia residences.",
      badge: "Most Deployed Tier",
      price: "$18,500",
      period: "per facility wing / year",
      icon: Building2,
      features: [
        "10x AuraPath Titanium Smart Glasses Fleet",
        "Centralized AuraGuide Multi-Patient Nursing Dashboard",
        "Unlimited Staff & Family Vector Enclaves",
        "Bi-directional EPIC & Cerner HL7 FHIR sync",
        "Automatic medication OCR packaging audit",
        "Corridor hazard & fall mitigation telemetry",
        "HIPAA BAA & Local Institutional SLA"
      ],
      popular: true,
      btnText: "Deploy Center Pilot",
      btnClass: "bg-[var(--color-clay)] hover:bg-[var(--color-clay-hover)] text-white shadow-lg"
    },
    {
      id: "enterprise",
      name: "Health System Enterprise",
      tagline: "For multi-hospital geriatric networks & neurology departments.",
      badge: "Custom Clinical Integration",
      price: "Custom",
      period: "institutional contract",
      icon: Hospital,
      features: [
        "Unlimited AuraPath Fleet with custom prescription lenses",
        "Dedicated On-Premise NPU Cluster Integration",
        "Full Clinical Trial Protocol telemetry export",
        "Enterprise EHR custom schema adaptations",
        "24/7 Clinical Informatics Engineering Support",
        "Custom Institutional IRB & Ethics documentation"
      ],
      popular: false,
      btnText: "Schedule Institutional Review",
      btnClass: "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-3 inline-block">
          Institutional Deployment Tiers
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-5xl text-[var(--color-foreground)] tracking-tight">
          Clinical deployments tailored to care density.
        </h2>
        <p className="text-[var(--color-muted-foreground)] mt-3 text-base md:text-lg">
          From private in-home memory assurance to enterprise memory care facilities and geriatric hospital networks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const IconComp = tier.icon;
          return (
            <div
              key={tier.id}
              className={`rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-[var(--color-moss)] text-white shadow-2xl ring-2 ring-[var(--color-clay)] lg:-translate-y-4'
                  : 'bg-white border border-[var(--color-border)] text-[var(--color-foreground)] shadow-sm hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-clay)] text-white text-[11px] font-mono font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    tier.popular ? 'bg-white/10 text-[var(--color-mint)]' : 'bg-[var(--color-cream)] text-[var(--color-moss)]'
                  }`}>
                    <IconComp size={24} />
                  </div>
                  {!tier.popular && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-cream-subtle)] px-2.5 py-1 rounded-full border border-[var(--color-border)]">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-2xl tracking-tight mb-2">
                  {tier.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 ${tier.popular ? 'text-white/70' : 'text-[var(--color-muted-foreground)]'}`}>
                  {tier.tagline}
                </p>

                <div className="mb-8 pb-6 border-b border-current/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-sans tracking-tight">{tier.price}</span>
                    <span className={`text-xs font-mono ${tier.popular ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-snug">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        tier.popular ? 'bg-[var(--color-mint)]/20 text-[var(--color-mint)]' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className={tier.popular ? 'text-white/90' : 'text-[var(--color-foreground)]'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-current/10">
                <button
                  onClick={onSelectTier}
                  className={`btn-magnetic w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${tier.btnClass}`}
                >
                  <span>{tier.btnText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
