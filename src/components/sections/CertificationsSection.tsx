import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award } from 'lucide-react';

const certifications = [
  { id: 1, title: 'Data Analytics', issuer: 'Google', date: 'Jul 2025', color: '#4285f4' },
  { id: 2, title: 'Java', issuer: 'Infosys', date: 'Apr 2025', color: '#f89820' },
  { id: 3, title: 'Digital Marketing', issuer: 'Google', date: 'Jun 2025', color: '#34a853' },
  { id: 4, title: 'Artificial Intelligence', issuer: 'IBM', date: 'Jun 2024', color: '#052fab' },
  { id: 5, title: 'Deep Learning', issuer: 'NPTEL', date: 'Jan 2024', color: '#8b5cf6' },
];

const achievements = [
  { id: 1, title: '220+ DSA Problems', description: 'Arrays, Strings, Trees, Graphs, DP', date: 'Mar 2025' },
  { id: 2, title: '100+ Problems Solved', description: 'Data structures - Basic to Advanced', date: 'Feb 2025' },
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless loop
  const duplicatedCerts = [...certifications, ...certifications];

  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      {/* Light sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
      
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Credentials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        {/* Marquee Row 1 - Left */}
        <div 
          className="relative overflow-hidden mb-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-6 ${isPaused ? '' : 'marquee'}`}
            style={{ width: 'fit-content' }}
          >
            {duplicatedCerts.map((cert, i) => (
              <motion.div
                key={`${cert.id}-${i}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-6 min-w-[280px] flex-shrink-0 cursor-pointer group"
                style={{
                  borderColor: `${cert.color}30`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <Award className="w-6 h-6" style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <span className="text-xs text-primary mt-2 block">{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Right */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-6 ${isPaused ? '' : 'marquee-reverse'}`}
            style={{ width: 'fit-content' }}
          >
            {duplicatedCerts.reverse().map((cert, i) => (
              <motion.div
                key={`${cert.id}-rev-${i}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-panel p-6 min-w-[280px] flex-shrink-0 cursor-pointer group"
                style={{
                  borderColor: `${cert.color}30`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <Award className="w-6 h-6" style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <span className="text-xs text-primary mt-2 block">{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {achievements.map((achievement) => (
            <div key={achievement.id} className="glass-panel p-6 text-center">
              <h4 className="font-display font-bold text-lg gradient-text mb-2">
                {achievement.title}
              </h4>
              <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
              <span className="text-xs text-primary">{achievement.date}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
