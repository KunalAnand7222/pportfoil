import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const paragraphs = [
  "I design systems, not just interfaces.",
  "My work blends engineering, data science, and creativity.",
  "I focus on clarity, performance, and real-world impact."
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container relative z-10 px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
                About Me
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                Aspiring Data Scientist<br />
                <span className="gradient-text">& Developer</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-muted-foreground/80 leading-relaxed"
            >
              Currently pursuing B.Tech in Computer Science at Lovely Professional University with a CGPA of 8.64. 
              I have hands-on experience with Python, SQL, Tableau, and machine learning, building real-world projects 
              in analytics, NLP, and frontend development.
            </motion.p>
          </div>

          {/* Glass Panel Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative perspective-1000"
          >
            <div className="glass-panel p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary">const</span> kunal = {'{'}
                </p>
                <p className="pl-4 text-foreground/90">
                  name: <span className="text-primary">"Kunal Anand"</span>,
                </p>
                <p className="pl-4 text-foreground/90">
                  role: <span className="text-primary">"Data Scientist"</span>,
                </p>
                <p className="pl-4 text-foreground/90">
                  location: <span className="text-primary">"India"</span>,
                </p>
                <p className="pl-4 text-foreground/90">
                  education: <span className="text-primary">"B.Tech CSE"</span>,
                </p>
                <p className="pl-4 text-foreground/90">
                  passions: [<span className="text-primary">"AI"</span>, <span className="text-primary">"Data"</span>, <span className="text-primary">"Code"</span>]
                </p>
                <p className="text-muted-foreground">{'}'}</p>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
