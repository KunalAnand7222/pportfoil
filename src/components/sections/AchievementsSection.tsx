import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Target, Zap, Code2 } from 'lucide-react';

const achievements = [
  { 
    icon: Code2, 
    title: '220+ Problems', 
    subtitle: 'DSA Solved',
    color: 'from-emerald-500 to-teal-500',
    angle: 0 
  },
  { 
    icon: Award, 
    title: '8.64 CGPA', 
    subtitle: 'Academic',
    color: 'from-blue-500 to-cyan-500',
    angle: 60 
  },
  { 
    icon: Trophy, 
    title: '85%+ Accuracy', 
    subtitle: 'ML Models',
    color: 'from-purple-500 to-pink-500',
    angle: 120 
  },
  { 
    icon: Star, 
    title: '5+ Projects', 
    subtitle: 'ML & AI',
    color: 'from-yellow-500 to-orange-500',
    angle: 180 
  },
  { 
    icon: Zap, 
    title: '4+ Certifications', 
    subtitle: 'Professional',
    color: 'from-red-500 to-rose-500',
    angle: 240 
  },
  { 
    icon: Target, 
    title: 'IBM Trainee', 
    subtitle: 'Summer 2024',
    color: 'from-indigo-500 to-violet-500',
    angle: 300 
  },
];

export default function AchievementsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 text-sm font-mono mb-2 block">05 / ACHIEVEMENTS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Milestones & Recognition
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Key accomplishments that define my journey in data science and technology
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Orbital Display */}
        <div 
          className="relative h-[600px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Central Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/30 flex items-center justify-center backdrop-blur-sm"
          >
            <Trophy className="w-12 h-12 text-emerald-400" />
          </motion.div>

          {/* Orbital Ring */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-emerald-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          {/* Achievement Nodes */}
          <motion.div
            animate={isPaused ? {} : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[400px] h-[400px]"
          >
            {achievements.map((achievement, i) => {
              const angle = (achievement.angle * Math.PI) / 180;
              const x = Math.cos(angle) * 200;
              const y = Math.sin(angle) * 200;
              const Icon = achievement.icon;

              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px - 80px)`,
                    top: `calc(50% + ${y}px - 80px)`,
                  }}
                  animate={isPaused ? {} : { rotate: -360 }}
                  transition={isPaused ? { delay: 0.05 * i, duration: 0.3 } : { duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="w-[160px]"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -8 }}
                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${achievement.color} shadow-lg cursor-pointer transition-all`}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <h4 className="text-white font-bold text-lg mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-white/80 text-sm font-medium">
                        {achievement.subtitle}
                      </p>
                    </div>

                    {/* Glow Effect on Hover */}
                    {hoveredIndex === i && (
                      <motion.div
                        layoutId="achievement-glow"
                        className="absolute inset-0 rounded-2xl bg-white/20 blur-xl -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Hover to pause rotation • Click to explore
        </motion.p>
      </div>
    </section>
  );
}
