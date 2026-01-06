import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Layout, BarChart, Code, Brain, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface ResumeRole {
  id: string;
  role_id: string;
  label: string;
  icon: string;
  focus: string | null;
  display_order: number;
}

interface ResumeFile {
  role_id: string;
  file_url: string | null;
  file_name: string | null;
}

const iconMap: Record<string, React.ReactNode> = {
  'layout': <Layout className="w-5 h-5" />,
  'bar-chart': <BarChart className="w-5 h-5" />,
  'code': <Code className="w-5 h-5" />,
  'brain': <Brain className="w-5 h-5" />,
};

// Placeholder resume content for each role
const resumeContent: Record<string, { summary: string; skills: string[]; experience: { title: string; company: string; period: string; points: string[] }[]; education: string; certifications: string[] }> = {
  frontend: {
    summary: "Creative Frontend Developer passionate about crafting beautiful, responsive, and performant user interfaces. Experienced in modern React ecosystem with a keen eye for design and animations.",
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'HTML5/CSS3', 'JavaScript ES6+', 'Responsive Design', 'UI/UX Principles', 'Git'],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Tech Company',
        period: '2022 - Present',
        points: ['Built responsive web applications using React and TypeScript', 'Implemented complex animations using Framer Motion', 'Improved page load times by 40% through optimization']
      }
    ],
    education: 'Bachelor of Technology in Computer Science',
    certifications: ['Meta Frontend Developer Professional Certificate', 'Advanced React Patterns']
  },
  data_analyst: {
    summary: "Data-driven analyst with expertise in transforming raw data into actionable insights. Skilled in data visualization, statistical analysis, and business intelligence tools.",
    skills: ['SQL', 'Python (Pandas, NumPy)', 'Tableau', 'Power BI', 'Excel Advanced', 'Data Cleaning', 'Statistical Analysis', 'Data Visualization', 'ETL Processes', 'Storytelling with Data'],
    experience: [
      {
        title: 'Data Analyst Intern',
        company: 'Analytics Firm',
        period: '2023 - Present',
        points: ['Created dashboards that reduced reporting time by 60%', 'Analyzed customer data to identify trends and patterns', 'Built automated reports using Python and SQL']
      }
    ],
    education: 'Bachelor of Technology in Computer Science',
    certifications: ['Google Data Analytics Certificate', 'Tableau Desktop Specialist']
  },
  sde: {
    summary: "Software Development Engineer with strong problem-solving skills and experience in building scalable systems. Proficient in data structures, algorithms, and system design principles.",
    skills: ['Python', 'Java', 'Data Structures', 'Algorithms', 'System Design', 'REST APIs', 'MongoDB', 'MySQL', 'Git', 'Agile/Scrum'],
    experience: [
      {
        title: 'Software Developer',
        company: 'Tech Startup',
        period: '2022 - Present',
        points: ['Developed RESTful APIs serving 10K+ daily requests', 'Implemented efficient algorithms reducing processing time by 50%', 'Collaborated in agile team environment']
      }
    ],
    education: 'Bachelor of Technology in Computer Science',
    certifications: ['AWS Cloud Practitioner', 'LeetCode 500+ Problems Solved']
  },
  aiml: {
    summary: "AI/ML Engineer passionate about developing intelligent systems and leveraging machine learning to solve complex problems. Experienced in building and deploying ML models.",
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Neural Networks', 'Model Deployment', 'Data Preprocessing', 'Feature Engineering'],
    experience: [
      {
        title: 'ML Research Intern',
        company: 'AI Research Lab',
        period: '2023 - Present',
        points: ['Developed NLP models with 92% accuracy for text classification', 'Implemented CNN architectures for image recognition tasks', 'Published research paper on transfer learning techniques']
      }
    ],
    education: 'Bachelor of Technology in Computer Science',
    certifications: ['Deep Learning Specialization (Coursera)', 'TensorFlow Developer Certificate']
  }
};

export default function ResumeSection() {
  const [roles, setRoles] = useState<ResumeRole[]>([]);
  const [files, setFiles] = useState<ResumeFile[]>([]);
  const [activeRole, setActiveRole] = useState<string>('frontend');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rolesRes, filesRes] = await Promise.all([
        supabase.from('resume_roles').select('*').order('display_order'),
        supabase.from('resume_files').select('*')
      ]);

      if (rolesRes.data) setRoles(rolesRes.data);
      if (filesRes.data) setFiles(filesRes.data);
    } catch (error) {
      console.error('Error fetching resume data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (roleId: string) => {
    const file = files.find(f => f.role_id === roleId);
    return file?.file_url;
  };

  const currentContent = resumeContent[activeRole] || resumeContent.frontend;
  const currentRole = roles.find(r => r.role_id === activeRole);

  if (loading) {
    return (
      <section id="resume" className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Career Profiles
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            My Resumes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One profile, multiple career identities. Select a role to view my tailored resume.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Role Selector - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-3 w-72 sticky top-24 h-fit"
          >
            {roles.map((role) => (
              <motion.button
                key={role.role_id}
                onClick={() => setActiveRole(role.role_id)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  activeRole === role.role_id
                    ? 'bg-primary/10 border-2 border-primary text-primary'
                    : 'bg-card/50 border-2 border-transparent hover:border-primary/30 text-foreground'
                }`}
                style={{
                  boxShadow: activeRole === role.role_id ? '0 0 30px hsl(152 76% 50% / 0.2)' : 'none'
                }}
              >
                <span className={activeRole === role.role_id ? 'text-primary' : 'text-muted-foreground'}>
                  {iconMap[role.icon] || <Code className="w-5 h-5" />}
                </span>
                <div>
                  <div className="font-semibold">{role.label}</div>
                  {role.focus && (
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {role.focus}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Role Selector - Mobile Dropdown */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-card/50 border border-border rounded-xl"
            >
              <div className="flex items-center gap-3">
                {currentRole && iconMap[currentRole.icon]}
                <span className="font-semibold">{currentRole?.label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl overflow-hidden z-50"
                >
                  {roles.map((role) => (
                    <button
                      key={role.role_id}
                      onClick={() => {
                        setActiveRole(role.role_id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                        activeRole === role.role_id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      }`}
                    >
                      {iconMap[role.icon] || <Code className="w-5 h-5" />}
                      <span className="font-medium">{role.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 md:p-10 rounded-2xl"
                style={{ 
                  boxShadow: '0 25px 50px -12px hsl(0 0% 0% / 0.5)',
                  perspective: '1000px'
                }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 pb-6 border-b border-border">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">
                      {currentRole?.label}
                    </h3>
                    <p className="text-muted-foreground">{currentRole?.focus}</p>
                  </div>
                  {getFileUrl(activeRole) && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-emerald-400 hover:opacity-90"
                      >
                        <a href={getFileUrl(activeRole)!} download>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 text-primary">Summary</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentContent.summary}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 text-primary">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentContent.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 text-primary">Experience</h4>
                  {currentContent.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h5 className="font-semibold text-foreground">{exp.title}</h5>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-muted-foreground mb-2">{exp.company}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.points.map((point, j) => (
                          <li key={j} className="text-sm text-muted-foreground">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education & Certifications */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Education</h4>
                    <p className="text-muted-foreground">{currentContent.education}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Certifications</h4>
                    <ul className="space-y-1">
                      {currentContent.certifications.map((cert, i) => (
                        <li key={i} className="text-muted-foreground text-sm">• {cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recruiter hint */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center italic">
                    💡 This resume automatically adapts to the selected role
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
