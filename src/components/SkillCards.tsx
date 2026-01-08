import { BrainCircuit, Code2, BarChart3, Boxes } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";

const cards = [
  { key: "aiml", title: "AI / ML", sub: "Modeling • Prediction • Intelligence", icon: BrainCircuit, bg: "from-violet-950 to-fuchsia-800" },
  { key: "frontend", title: "Frontend", sub: "UI • UX • Animations", icon: Code2, bg: "from-sky-950 to-cyan-800" },
  { key: "data", title: "Data Analytics", sub: "Insights • Dashboards • SQL", icon: BarChart3, bg: "from-indigo-950 to-indigo-800" },
  { key: "others", title: "Others", sub: "APIs • Tools • Cloud", icon: Boxes, bg: "from-emerald-950 to-teal-800" }
];

export default function SkillCards() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"switch" | "grid">("switch");

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (mode === "switch") {
      id = setInterval(() => {
        setActive(a => {
          if (a === cards.length - 1) {
            setMode("grid");
            return a;
          }
          return a + 1;
        });
      }, 2000);
    }
    if (mode === "grid") {
      id = setTimeout(() => {
        setActive(0);
        setMode("switch");
      }, 2000);
    }
    return () => {
      clearInterval(id);
      clearTimeout(id);
    };
  }, [mode]);

  return (
    <LayoutGroup>
      {mode === "switch" && (
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="w-[280px] h-[180px] md:w-[420px] md:h-[260px]">
            {cards.map((c, i) => i === active && (
              <motion.div
                key={c.key}
                layoutId={c.key}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className={`w-full h-full rounded-3xl bg-gradient-to-br ${c.bg} p-6 md:p-8 shadow-[0_0_80px_rgba(168,85,247,0.25)]`}
              >
                <div className="flex items-center gap-2 text-white">
                  <c.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h2 className="mt-8 md:mt-14 text-xl md:text-2xl font-semibold text-white">{c.title}</h2>
                <p className="text-xs md:text-sm text-slate-300">{c.sub}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-3 md:gap-4">
            {cards.map((c, i) => i !== active && (
              <motion.div
                key={c.key}
                layoutId={c.key}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${c.bg} p-3 md:p-4 shadow-xl`}
              >
                <div className="text-white">
                  <c.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <p className="mt-2 md:mt-3 text-xs md:text-sm text-white">{c.title}</p>
                <p className="text-[9px] md:text-[11px] text-slate-300">{c.sub.split(" ")[0]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {mode === "grid" && (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {cards.map(c => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.key}
                layoutId={c.key}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className={`w-28 h-28 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${c.bg} p-4 md:p-6 shadow-xl`}
              >
                <div className="text-white">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="mt-4 md:mt-6 text-xs md:text-sm font-semibold text-white">{c.title}</h2>
                <p className="text-[10px] md:text-xs text-slate-300">{c.sub.split(" ")[0]}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </LayoutGroup>
  );
}
