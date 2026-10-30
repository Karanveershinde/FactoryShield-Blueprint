import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  IndianRupee, 
  UserCheck, 
  ArrowUpRight, 
  Filter, 
  Sparkles,
  Calendar,
  Layers,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ActionChecklist({ 
  assessmentState, 
  onUpdateTaskStatus, 
  onNavigateToTemplate, 
  onNavigateToPolicy 
}) {
  const [activeHorizon, setActiveHorizon] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { tasks, dynamicScore, rawScore, riskColor } = assessmentState;

  // Flatten all tasks
  const allTasksList = [
    ...(tasks.immediate || []).map(t => ({ ...t, horizonLabel: '1-2 Weeks (Immediate)' })),
    ...(tasks.medium || []).map(t => ({ ...t, horizonLabel: '1-3 Months (Medium)' })),
    ...(tasks.longTerm || []).map(t => ({ ...t, horizonLabel: '3-12 Months (Long-Term)' }))
  ];

  // Filter tasks
  const filteredTasks = allTasksList.filter(t => {
    const matchHorizon = activeHorizon === 'all' || 
      (activeHorizon === 'immediate' && t.horizon.includes('Immediate')) ||
      (activeHorizon === 'medium' && t.horizon.includes('Medium')) ||
      (activeHorizon === 'longTerm' && t.horizon.includes('Long-Term'));

    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchHorizon && matchStatus;
  });

  const completedCount = allTasksList.filter(t => t.status === 'Completed').length;
  const inProgressCount = allTasksList.filter(t => t.status === 'In Progress').length;
  const totalCount = allTasksList.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTaskStatus(taskId, newStatus);
    if (newStatus === 'Completed') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Card */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cyber-tag" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34D399', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                Feature 4: Prioritized Action Checklist
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Dynamic Threat Mitigation Engine
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
              Prioritized Cyber Hardening Roadmap
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
              Step-by-step tasks generated from your factory's assessment gaps. Completing tasks directly restores your Cyber Risk Score.
            </p>
          </div>

          {/* Live Score Recovery Banner */}
          <div style={{
            padding: '12px 18px',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Current Risk Score</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: riskColor, fontFamily: 'var(--font-mono)' }}>
                {dynamicScore} <span style={{ fontSize: '0.8rem', color: '#64748B' }}>/ 100</span>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Checklist Progress</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                {completedCount} of {totalCount} Done
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>Roadmap Completion: {progressPct}%</span>
            <span>{inProgressCount} in progress • {totalCount - completedCount - inProgressCount} not started</span>
          </div>
          <div style={{
            height: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #00F0FF, #10B981)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Horizon Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Tasks', count: totalCount },
            { id: 'immediate', label: '1–2 Weeks (Must Do Now)', count: (tasks.immediate || []).length },
            { id: 'medium', label: '1–3 Months (Medium-Term)', count: (tasks.medium || []).length },
            { id: 'longTerm', label: '3–12 Months (Long-Term)', count: (tasks.longTerm || []).length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveHorizon(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeHorizon === tab.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeHorizon === tab.id ? '#00F0FF' : '#94A3B8',
                border: activeHorizon === tab.id ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Status:</span>
          {['all', 'Not Started', 'In Progress', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                background: statusFilter === st ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: statusFilter === st ? '#FFFFFF' : '#64748B',
                border: '1px solid transparent'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredTasks.length === 0 ? (
          <div className="cyber-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
            <CheckCircle size={36} color="#10B981" style={{ margin: '0 auto 10px auto' }} />
            <div>No tasks matching the selected filter criteria.</div>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isCompleted = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';

            return (
              <div
                key={task.id}
                className="cyber-card"
                style={{
                  padding: '20px 24px',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-card)',
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                  {/* Left: Checkbox & Content */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                    <button
                      onClick={() => handleStatusChange(task.id, isCompleted ? 'Not Started' : 'Completed')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        color: isCompleted ? '#10B981' : '#64748B'
                      }}
                      title={isCompleted ? 'Mark Not Started' : 'Mark Completed (+Score Boost)'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={24} color="#10B981" />
                      ) : (
                        <Circle size={24} color="#475569" />
                      )}
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: isCompleted ? '#94A3B8' : '#FFFFFF',
                          textDecoration: isCompleted ? 'line-through' : 'none'
                        }}>
                          {task.title}
                        </span>

                        <span className={`badge ${task.priority === 'Critical' ? 'badge-high' : task.priority === 'High' ? 'badge-medium' : 'badge-low'}`}>
                          {task.priority}
                        </span>

                        <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                          {task.horizon}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                        {task.description}
                      </p>

                      {/* Metadata Chips: Cost, Effort, Owner */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginTop: '12px',
                        fontSize: '0.75rem',
                        color: '#CBD5E1',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <IndianRupee size={13} color="#10B981" />
                          <span>Cost: <strong>{task.cost}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} color="#00F0FF" />
                          <span>Effort: <strong>{task.effort}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <UserCheck size={13} color="#F59E0B" />
                          <span>Owner: <strong>{task.owner}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Switcher & Template Link */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : isInProgress ? 'rgba(0, 240, 255, 0.15)' : '#0a1329',
                        color: isCompleted ? '#34D399' : isInProgress ? '#00F0FF' : '#94A3B8',
                        border: isCompleted ? '1px solid #10B981' : isInProgress ? '1px solid #00F0FF' : '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="Not Started" style={{ background: '#0a1329', color: '#CBD5E1' }}>Not Started</option>
                      <option value="In Progress" style={{ background: '#0a1329', color: '#00F0FF' }}>In Progress</option>
                      <option value="Completed" style={{ background: '#0a1329', color: '#10B981' }}>Completed</option>
                    </select>

                    {task.templateId && (
                      <button
                        onClick={() => onNavigateToTemplate(task.templateId)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#00F0FF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>Open Config Script</span>
                        <ArrowUpRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
