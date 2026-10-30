import React, { useState } from 'react';
import { 
  ASSESSMENT_STEPS, 
  ASSESSMENT_QUESTIONS 
} from '../../data/questionData';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  RotateCcw,
  Factory,
  Network,
  Lock,
  Database,
  ShieldAlert,
  Server,
  Monitor,
  Cog,
  Bot,
  Radio,
  Laptop
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Factory,
  Cpu,
  Network,
  Lock,
  Database,
  ShieldAlert,
  Server,
  Monitor,
  Cog,
  Bot,
  Radio,
  Laptop
};

export default function AssessmentWizard({
  assessmentAnswers,
  onUpdateAnswers,
  onCompleteAssessment,
  lang = 'en'
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState(assessmentAnswers);
  const [showTooltip, setShowTooltip] = useState(null);

  const stepQuestions = ASSESSMENT_QUESTIONS.filter(q => q.step === currentStep);
  const currentStepMeta = ASSESSMENT_STEPS.find(s => s.id === currentStep);

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleMultiCheckToggle = (questionId, optionValue) => {
    const existing = answers[questionId] || [];
    let updated;
    if (existing.includes(optionValue)) {
      updated = existing.filter(v => v !== optionValue);
    } else {
      updated = [...existing, optionValue];
    }
    handleInputChange(questionId, updated);
  };

  const handleNext = () => {
    onUpdateAnswers(answers);
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Trigger completion confetti & recalculate
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      onCompleteAssessment(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Step Progress Stepper */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
          alignItems: 'center'
        }}>
          {ASSESSMENT_STEPS.map(step => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const StepIcon = ICON_MAP[step.icon] || Factory;

            return (
              <div 
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  opacity: isCurrent ? 1 : isCompleted ? 0.9 : 0.45,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCurrent 
                    ? 'linear-gradient(135deg, #00F0FF, #0077B6)' 
                    : isCompleted 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isCurrent 
                    ? '2px solid #00F0FF' 
                    : isCompleted 
                    ? '1px solid #10B981' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCurrent ? '#070d1e' : isCompleted ? '#10B981' : '#94A3B8',
                  boxShadow: isCurrent ? '0 0 15px rgba(0, 240, 255, 0.5)' : 'none',
                  marginBottom: '6px'
                }}>
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : <StepIcon size={18} />}
                </div>

                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? '#00F0FF' : isCompleted ? '#F8FAFC' : '#64748B',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '120px'
                }}>
                  {lang === 'hi' ? step.titleHi : step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Question Form Card */}
      <div className="cyber-card" style={{ padding: '32px' }}>
        {/* Step Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '20px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cyber-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                Step {currentStep} of 6
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {lang === 'hi' ? 'ओटी-जागरूक प्रश्नावली' : 'OT-Aware Assessment'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '8px' }}>
              {lang === 'hi' ? currentStepMeta?.titleHi : currentStepMeta?.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
              {lang === 'hi' ? currentStepMeta?.subtitleHi : currentStepMeta?.subtitle}
            </p>
          </div>

          <div style={{
            fontSize: '1.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.15)'
          }}>
            0{currentStep}
          </div>
        </div>

        {/* Question Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {stepQuestions.map(q => {
            const val = answers[q.id];

            return (
              <div 
                key={q.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {/* Question Header & Tooltip */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.4 }}>
                      {lang === 'hi' && q.labelHi ? q.labelHi : q.label}
                    </label>
                    {q.helpText && (
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <HelpCircle size={13} color="#00F0FF" />
                        <span>{q.helpText}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Controls according to type */}
                {q.type === 'select' && (
                  <select
                    value={val || q.default}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0a1329',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    {q.options.map(opt => (
                      <option key={opt.value} value={opt.value} style={{ background: '#0a1329', color: '#FFFFFF' }}>
                        {opt.label} {opt.badge ? `[${opt.badge}]` : ''}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === 'number' && (
                  <input
                    type="number"
                    min={q.min || 0}
                    max={q.max || 100}
                    value={val !== undefined ? val : q.default}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    style={{
                      width: '160px',
                      padding: '10px 14px',
                      background: '#0a1329',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#00F0FF',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      outline: 'none'
                    }}
                  />
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    value={val !== undefined ? val : q.default}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0a1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                )}

                {q.type === 'radio' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map(opt => {
                      const isSelected = (val || q.default) === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => handleInputChange(q.id, opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                            border: isSelected ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid #00F0FF' : '2px solid #64748B',
                              background: isSelected ? '#070d1e' : 'transparent'
                            }} />
                            <span style={{ fontSize: '0.85rem', color: isSelected ? '#FFFFFF' : '#CBD5E1', fontWeight: isSelected ? 600 : 400 }}>
                              {opt.label}
                            </span>
                          </div>

                          {opt.badge && (
                            <span className="badge badge-high">
                              {opt.badge}
                            </span>
                          )}

                          {opt.isUnknown && (
                            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontStyle: 'italic' }}>
                              Evaluated as High Risk
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'multicheck' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '10px'
                  }}>
                    {q.options.map(opt => {
                      const selectedList = val || q.default || [];
                      const isChecked = selectedList.includes(opt.value);
                      const CardIcon = ICON_MAP[opt.icon] || Cpu;

                      return (
                        <div
                          key={opt.value}
                          onClick={() => handleMultiCheckToggle(q.id, opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            background: isChecked ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                            border: isChecked ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.06)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <CardIcon size={20} color={isChecked ? '#00F0FF' : '#64748B'} style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: isChecked ? '#FFFFFF' : '#CBD5E1' }}>
                              {opt.label}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                              {opt.desc}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            style={{ accentColor: '#00F0FF', width: '16px', height: '16px', marginTop: '2px' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Wizard Footer Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px'
        }}>
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="btn btn-secondary"
            >
              <ChevronLeft size={16} />
              <span>Previous Step</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.92rem' }}
          >
            <span>{currentStep === 6 ? 'Complete & Generate Blueprint' : 'Next Step'}</span>
            {currentStep === 6 ? <Sparkles size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
