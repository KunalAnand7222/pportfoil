import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const skills = [
  { id: 'aiml', label: 'AI / ML', subSkills: ['Regression', 'Classification', 'Clustering', 'NLP', 'Neural Networks', 'Model Eval'], color: '#22c55e' },
  { id: 'frontend', label: 'Frontend', subSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'], color: '#3b82f6' },
  { id: 'data', label: 'Data Analytics', subSkills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Pandas'], color: '#f59e0b' },
  { id: 'backend', label: 'Backend', subSkills: ['Python', 'Java', 'APIs', 'MongoDB', 'MySQL'], color: '#8b5cf6' },
  { id: 'tools', label: 'Tools', subSkills: ['GitHub', 'VS Code', 'Jupyter', 'Git'], color: '#ec4899' },
  { id: 'others', label: 'Others', subSkills: ['Problem Solving', 'DSA', 'System Design'], color: '#14b8a6' },
];

// Calculate skill positions - horizontal layout with no overlap
const skillWidth = 180;
const skillGap = 20;
const totalSkillsWidth = skills.length * skillWidth + (skills.length - 1) * skillGap;
const startX = (1300 - totalSkillsWidth) / 2 + skillWidth / 2;

const getSkillX = (index: number) => startX + index * (skillWidth + skillGap);

export default function SkillsFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [lineProgress, setLineProgress] = useState(0);

  // Continuous animation through skills
  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    let startTime: number | null = null;
    const cycleDuration = 2000; // 2 seconds per skill cycle
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate which skill is active
      const totalCycleTime = cycleDuration * skills.length;
      const currentCycleTime = elapsed % totalCycleTime;
      const currentSkillIndex = Math.floor(currentCycleTime / cycleDuration);
      
      // Calculate progress within current skill (0-1)
      const skillProgress = (currentCycleTime % cycleDuration) / cycleDuration;
      
      setActiveSkillIndex(currentSkillIndex);
      setLineProgress(skillProgress);
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Start after a small delay
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView]);

  // Determine which skill to show sub-skills for (animation or hover)
  const displayedSkillIndex = hoveredSkill 
    ? skills.findIndex(s => s.id === hoveredSkill)
    : activeSkillIndex;

  // Calculate sub-skill positions - centered, split left/right from center
  const getSubSkillPositions = (skillIndex: number) => {
    const skill = skills[skillIndex];
    const subSkills = skill.subSkills;
    const subSkillWidth = 100;
    const subSkillGap = 12;
    const centerX = 650; // SVG center
    const minX = 80; // Left boundary
    const maxX = 1220; // Right boundary
    
    const positions: number[] = [];
    
    // Distribute from center outward
    const half = Math.ceil(subSkills.length / 2);
    
    for (let i = 0; i < subSkills.length; i++) {
      let x: number;
      if (i < half) {
        // Left half - go left from center
        const offset = (half - 1 - i) * (subSkillWidth + subSkillGap);
        x = centerX - (subSkillWidth + subSkillGap) / 2 - offset;
      } else {
        // Right half - go right from center
        const offset = (i - half) * (subSkillWidth + subSkillGap);
        x = centerX + (subSkillWidth + subSkillGap) / 2 + offset;
      }
      
      // Clamp to boundaries
      x = Math.max(minX + subSkillWidth / 2, Math.min(maxX - subSkillWidth / 2, x));
      positions.push(x);
    }
    
    return positions;
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
        </motion.div>

        {/* SVG Skills Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <svg viewBox="0 0 1300 380" className="w-full h-auto">
            {/* Skill nodes - horizontal row */}
            {skills.map((skill, i) => {
              const x = getSkillX(i);
              const isActive = displayedSkillIndex === i;
              const showLine = activeSkillIndex === i && !hoveredSkill;
              
              return (
                <g key={skill.id}>
                  {/* Node background */}
                  <motion.rect
                    x={x - skillWidth / 2}
                    y="40"
                    width={skillWidth}
                    height="56"
                    rx="28"
                    ry="28"
                    fill={isActive ? `${skill.color}30` : 'rgba(255,255,255,0.03)'}
                    stroke={skill.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ 
                      cursor: 'pointer',
                      filter: isActive ? `drop-shadow(0 0 15px ${skill.color})` : 'none'
                    }}
                  />
                  
                  {/* Node label */}
                  <motion.text
                    x={x}
                    y="75"
                    textAnchor="middle"
                    fill={isActive ? skill.color : '#ffffff'}
                    className="font-display font-bold text-sm tracking-wider uppercase pointer-events-none"
                    style={{ fontSize: '12px' }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {skill.label}
                  </motion.text>

                  {/* Sub-skill lines and nodes - show when active */}
                  {isActive && (
                    <>
                      {skill.subSkills.map((sub, j) => {
                        const positions = getSubSkillPositions(i);
                        const subX = positions[j];
                        const subY = 280;

                        return (
                          <g key={`${skill.id}-${sub}`}>
                            {/* Connection line background */}
                            <path
                              d={`M ${x} 96 C ${x} 160, ${subX} 200, ${subX} ${subY}`}
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            
                            {/* Animated connection line */}
                            <motion.path
                              d={`M ${x} 96 C ${x} 160, ${subX} 200, ${subX} ${subY}`}
                              fill="none"
                              stroke={skill.color}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ 
                                pathLength: showLine ? lineProgress : 1, 
                                opacity: 1 
                              }}
                              transition={{ duration: hoveredSkill ? 0.3 : 0, delay: hoveredSkill ? j * 0.05 : 0 }}
                              style={{
                                filter: `drop-shadow(0 0 8px ${skill.color})`
                              }}
                            />
                            
                            {/* Sub-skill pill */}
                            <motion.rect
                              x={subX - 50}
                              y={subY}
                              width="100"
                              height="34"
                              rx="17"
                              ry="17"
                              fill={`${skill.color}20`}
                              stroke={skill.color}
                              strokeWidth="1.5"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.25, delay: j * 0.04 }}
                              whileHover={{ 
                                scale: 1.1
                              }}
                              style={{ 
                                cursor: 'pointer',
                                filter: `drop-shadow(0 0 8px ${skill.color})`
                              }}
                            />
                            <motion.text
                              x={subX}
                              y={subY + 22}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="font-body font-semibold text-xs uppercase pointer-events-none"
                              style={{ fontSize: '9px', letterSpacing: '0.5px' }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.25, delay: j * 0.05 }}
                            >
                              {sub}
                            </motion.text>
                          </g>
                        );
                      })}
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}