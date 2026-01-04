import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/KunalAnand7222', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/kunaland72', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:kunalbhardwaj7222805@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-display text-2xl font-bold"
          >
            <span className="gradient-text">KA</span>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors"
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Kunal Anand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
