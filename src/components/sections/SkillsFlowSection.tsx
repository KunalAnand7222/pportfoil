import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const skills = [
  { id: 'aiml', label: 'AI / ML', color: '#10B981', subSkills: ['Regression', 'Classification', 'Clustering', 'NLP', 'Neural Networks', 'Model Evaluation'] },
  { id: 'frontend', label: 'FRONTEND', color: '#3B82F6', subSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Animations'] },
  { id: 'data', label: 'DATA ANALYTICS', color: '#F59E0B', subSkills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Data Cleaning', 'Visualization'] },
  { id: 'backend', label: 'BACKEND', color: '#EC4899', subSkills: ['Python', 'Java', 'APIs', 'MongoDB', 'MySQL'] },
  { id: 'tools', label: 'TOOLS', color: '#8B5CF6', subSkills: ['GitHub', 'VS Code', 'Automation', 'Deployment'] },
  { id: 'others', label: 'OTHERS', color: '#06B6D4', subSkills: ['Problem Solving', 'DSA', 'System Thinking'] }
];

export default function SkillsFlowSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineProgress, setLineProgress] = useState(0);
  const [showSubSkills, setShowSubSkills] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const centerX = 650;
  const topY = 68;
  const pillY = 330;
  const pillWidth = 180;
  const pillGap = 15;
  const totalWidth = skills.length * pillWidth + (skills.length - 1) * pillGap;
  const startX = (1300 - totalWidth) / 2;

  // Animation cycle
  useEffect(() => {
    if (!isInView) {
      setActiveIndex(-1);
      setLineProgress(0);
      setShowSubSkills(false);
      return;
    }

    setIsAnimating(true);
    let animationFrame: number;
    let startTime: number;
    const lineDuration = 800;
    const subSkillDuration = 2000;
    const totalCycleDuration = lineDuration + subSkillDuration;

    const runAnimation = () => {
      let currentIndex = 0;

      const animateSkill = () => {
        if (currentIndex >= skills.length) {
          currentIndex = 0;
        }

        setActiveIndex(currentIndex);
        setShowSubSkills(false);
        setLineProgress(0);

        startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;

          if (elapsed < lineDuration) {
            setLineProgress(elapsed / lineDuration);
            animationFrame = requestAnimationFrame(animate);
          } else if (elapsed < totalCycleDuration) {
            setLineProgress(1);
            setShowSubSkills(true);
            animationFrame = requestAnimationFrame(animate);
          } else {
            currentIndex++;
            animateSkill();
          }
        };

        animationFrame = requestAnimationFrame(animate);
      };

      animateSkill();
    };

    const timeout = setTimeout(runAnimation, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView]);

  const getPathD = (index: number) => {
    const pillCenterX = startX + index * (pillWidth + pillGap) + pillWidth / 2;
    return `M ${centerX} 96 C ${centerX} 180, ${pillCenterX} 250, ${pillCenterX} ${pillY}`;
  };

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden" 
      style={{ background: 'radial-gradient(circle at center, #0a0f0a, #0A0A0A)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <svg 
          viewBox="0 0 1300 580" 
          className="w-full h-auto"
          style={{ maxHeight: '85vh' }}
        >
          {/* Top "MY SKILLS" box */}
          <rect 
            x="530" y="40" width="240" height="56" 
            rx="28" ry="28"
            fill="rgba(255,255,255,0.03)"
            stroke="#10B981"
            strokeWidth="1.5"
          />
          <text 
            x="650" y="75" 
            textAnchor="middle"
            fill="#10B981"
            fontSize="18"
            fontWeight="700"
            letterSpacing="3"
            fontFamily="system-ui, sans-serif"
          >
            MY SKILLS
          </text>

          {/* Flow paths - static background */}
          {skills.map((skill, index) => (
            <path
              key={`bg-${skill.id}`}
              d={getPathD(index)}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* Animated flow path */}
          {activeIndex >= 0 && (
            <motion.path
              key={`active-${activeIndex}`}
              d={getPathD(activeIndex)}
              fill="none"
              stroke={skills[activeIndex].color}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: lineProgress, opacity: 1 }}
              style={{ 
                filter: `drop-shadow(0 0 8px ${skills[activeIndex].color})`,
              }}
            />
          )}

          {/* Skill pills */}
          {skills.map((skill, index) => {
            const pillX = startX + index * (pillWidth + pillGap);
            const isActive = activeIndex === index && lineProgress === 1;
            
            return (
              <g key={skill.id}>
                <rect
                  x={pillX}
                  y={pillY}
                  width={pillWidth}
                  height="54"
                  rx="27"
                  ry="27"
                  fill={isActive ? `${skill.color}15` : 'rgba(255,255,255,0.03)'}
                  stroke={skill.color}
                  strokeWidth={isActive ? "2" : "1.5"}
                  style={{
                    filter: isActive ? `drop-shadow(0 0 15px ${skill.color}50)` : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <text
                  x={pillX + pillWidth / 2}
                  y={pillY + 32}
                  textAnchor="middle"
                  fill={skill.color}
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="1"
                  fontFamily="system-ui, sans-serif"
                >
                  {skill.label}
                </text>
              </g>
            );
          })}

          {/* Sub-skills */}
          <AnimatePresence>
            {showSubSkills && activeIndex >= 0 && (
              <g>
                {(() => {
                  const skill = skills[activeIndex];
                  const pillCenterX = startX + activeIndex * (pillWidth + pillGap) + pillWidth / 2;
                  const subSkills = skill.subSkills;
                  const subBoxW = 120;
                  const subBoxH = 32;
                  const subGap = 12;
                  const rowY = 460;
                  const totalSubW = subSkills.length * subBoxW + (subSkills.length - 1) * subGap;
                  let subStartX = Math.max(30, Math.min(pillCenterX - totalSubW / 2, 1300 - totalSubW - 30));

                  return subSkills.map((subSkill, i) => {
                    const subX = subStartX + i * (subBoxW + subGap) + subBoxW / 2;
                    const pathD = `M ${pillCenterX} ${pillY + 54} C ${pillCenterX} ${pillY + 90}, ${subX} ${rowY - 40}, ${subX} ${rowY}`;

                    return (
                      <g key={subSkill}>
                        {/* Sub-skill line background */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        {/* Sub-skill animated line */}
                        <motion.path
                          d={pathD}
                          fill="none"
                          stroke={skill.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          style={{ filter: `drop-shadow(0 0 6px ${skill.color})` }}
                        />
                        {/* Sub-skill box */}
                        <motion.rect
                          x={subX - subBoxW / 2}
                          y={rowY}
                          width={subBoxW}
                          height={subBoxH}
                          rx="16"
                          ry="16"
                          fill={`${skill.color}15`}
                          stroke={skill.color}
                          strokeWidth="1.2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                          style={{ cursor: 'pointer' }}
                        />
                        <motion.text
                          x={subX}
                          y={rowY + 20}
                          textAnchor="middle"
                          fill={skill.color}
                          fontSize="10"
                          fontWeight="600"
                          letterSpacing="0.5"
                          fontFamily="system-ui, sans-serif"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 + 0.25 }}
                          style={{ pointerEvents: 'none' }}
                        >
                          {subSkill}
                        </motion.text>
                      </g>
                    );
                  });
                })()}
              </g>
            )}
          </AnimatePresence>
        </svg>
      </div>
    </section>
  );
}
