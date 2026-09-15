import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Braces,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/shubh-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubh Dosi | AI & ML Student Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Shubh Dosi, an AI and Machine Learning student, software developer, and hackathon enthusiast at JECRC University.",
      },
      { property: "og:title", content: "Shubh Dosi | AI & ML Student Portfolio" },
      {
        property: "og:description",
        content: "Explore Shubh Dosi's projects, skills, achievements, and journey in AI and software development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const roles = ["AI & ML Student", "Software Developer", "SIH Participant", "Future Software Engineer"];
const tech = ["Python", "C", "HTML", "CSS", "JavaScript", "Git", "GitHub", "Artificial Intelligence", "Machine Learning"];
const skills = [
  ["Python", 78],
  ["C Programming", 70],
  ["HTML & CSS", 84],
  ["JavaScript", 68],
  ["Git & GitHub", 74],
  ["AI & Machine Learning", 65],
] as const;
const journey = [
  ["2026", "Started B.Tech AI & ML", "Began my computer science journey at JECRC University."],
  ["2026", "Smart India Hackathon", "Joined HEXACODERS to build a fair gig-services platform."],
  ["2026", "Started GitHub Portfolio", "Began documenting projects and learning in public."],
  ["2026", "IBM Data Science Badge", "Completed foundational data science learning."],
  ["2027", "Full Stack Development", "Next chapter: building complete, production-ready products."],
] as const;
const achievements = [
  { icon: Trophy, title: "SIH 2026", copy: "Smart India Hackathon participant" },
  { icon: Award, title: "IBM Badge", copy: "Data Science badge holder" },
  { icon: Code2, title: "Personal Projects", copy: "Building ideas independently" },
  { icon: Github, title: "Open Learning", copy: "Active GitHub learner" },
];

function useTyping() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [letters, setLetters] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[roleIndex] ?? "";
    const done = letters === word.length;
    const empty = letters === 0;
    const delay = done && !deleting ? 1400 : deleting ? 38 : 74;
    const timer = window.setTimeout(() => {
      if (done && !deleting) setDeleting(true);
      else if (empty && deleting) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else setLetters((count) => count + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, letters, roleIndex]);

  return (roles[roleIndex] ?? "").slice(0, letters);
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
        <span>{number}</span><span className="h-px w-10 bg-primary" /><span>{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>
    </div>
  );
}

function Portfolio() {
  const typedRole = useTyping();
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 90]);

  useEffect(() => {
    const stored = window.localStorage.getItem("shubh-theme");
    const nextDark = stored ? stored === "dark" : true;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("shubh-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-primary" style={{ scaleX: progress }} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60 [background-image:radial-gradient(circle_at_center,var(--particle)_1px,transparent_1px)] [background-size:34px_34px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="font-display text-lg font-bold" aria-label="Shubh Dosi home">SD<span className="text-primary">.</span></a>
          <div className="hidden items-center gap-8 md:flex">
            {["About", "Skills", "Work", "Journey", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-border bg-background px-5 py-5 md:hidden">
            {["About", "Skills", "Work", "Journey", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm">{item}</a>
            ))}
          </motion.div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="relative flex min-h-[94vh] items-center overflow-hidden border-b border-border pt-24">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 md:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-7 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"><span className="size-2 animate-pulse rounded-full bg-primary" />Available to collaborate</p>
              <h1 className="font-display text-6xl font-semibold leading-[0.94] md:text-8xl lg:text-[7.5rem]">
                Shubh<br /><span className="outline-word">Dosi</span><span className="text-primary">.</span>
              </h1>
              <div className="mt-7 h-9 font-mono text-base text-muted-foreground md:text-xl">
                <span className="text-primary">&gt;</span> {typedRole}<span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
              </div>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">Building at the intersection of artificial intelligence, thoughtful software, and real-world impact.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-none px-6 font-semibold">
                  <a href="/shubh-dosi-resume.pdf" download><Download /> Download resume</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-border bg-card/50 px-6">
                  <a href="#contact"><Mail /> Contact me</a>
                </Button>
              </div>
            </motion.div>

            <motion.div style={{ y: heroY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.8 }} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 border border-primary/30" />
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <img src={portrait} alt="Professional portrait representing Shubh Dosi" width={1200} height={1500} fetchPriority="high" className="h-full w-full object-cover grayscale-[18%] transition duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background/95 to-transparent p-6 pt-24">
                  <div><p className="font-mono text-[10px] uppercase tracking-widest text-primary">Based in India</p><p className="mt-1 text-sm">JECRC University · CSE</p></div>
                  <Code2 className="size-7 text-primary" />
                </div>
              </div>
              <div className="absolute -bottom-7 -left-5 hidden bg-primary px-5 py-4 text-primary-foreground shadow-glow md:block"><p className="font-mono text-[10px] uppercase">Current status</p><p className="text-sm font-bold">Learning. Building. Shipping.</p></div>
            </motion.div>
          </div>
          <a href="#about" aria-label="Scroll to about" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-muted-foreground md:block"><ArrowDown className="animate-bounce" /></a>
        </section>

        <div className="overflow-hidden border-b border-border bg-primary py-3 text-primary-foreground">
          <div className="marquee-track flex w-max items-center gap-8 font-mono text-xs font-bold uppercase tracking-widest">
            {[...tech, ...tech].map((item, i) => <span key={`${item}-${i}`} className="flex items-center gap-8"><span>{item}</span><span>✦</span></span>)}
          </div>
        </div>

        <section id="about" className="section-shell">
          <Reveal><SectionHeading number="01" eyebrow="About" title="Curiosity, converted into code." /></Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="text-2xl leading-relaxed text-foreground md:text-4xl md:leading-snug">I’m a first-year B.Tech CSE student specializing in <span className="text-primary">AI & Machine Learning</span>, passionate about turning ambitious ideas into useful technology.</p>
              <p className="mt-7 max-w-2xl leading-7 text-muted-foreground">Currently learning Python, web development, Git, GitHub, and machine learning while actively participating in projects and hackathons. I’m interested in systems that are intelligent, accessible, and built to solve meaningful problems.</p>
            </Reveal>
            <Reveal className="lg:col-span-5">
              <div className="glass-card p-6 md:p-8">
                <GraduationCap className="mb-8 size-8 text-primary" />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Education</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">JECRC University</h3>
                <p className="mt-2 text-sm text-muted-foreground">B.Tech Computer Science Engineering<br />(AI & Machine Learning)</p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5"><span className="text-sm">2026 — Present</span><span className="size-2 rounded-full bg-primary shadow-glow" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="section-shell border-y border-border bg-secondary/35">
          <Reveal><SectionHeading number="02" eyebrow="Capabilities" title="Tools I’m mastering." /></Reveal>
          <div className="grid gap-x-14 gap-y-7 md:grid-cols-2">
            {skills.map(([skill, level], index) => <SkillBar key={skill} skill={skill} level={level} delay={index * 0.08} />)}
          </div>
          <Reveal className="mt-14 flex flex-wrap gap-2">
            {tech.map((item) => <span key={item} className="border border-border bg-background/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">{item}</span>)}
          </Reveal>
        </section>

        <section id="work" className="section-shell">
          <Reveal><SectionHeading number="03" eyebrow="Selected work" title="Ideas with real-world intent." /></Reveal>
          <Reveal>
            <article className="group grid overflow-hidden border border-border bg-card md:grid-cols-2">
              <div className="relative min-h-80 overflow-hidden bg-project p-8 md:p-12">
                <div className="project-grid absolute inset-0 opacity-50" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between"><span className="font-mono text-xs uppercase tracking-widest text-primary">Featured / 01</span><Braces className="size-8 text-primary" /></div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">COOPERATIVE GIG SERVICES</p>
                    <div className="mt-4 flex gap-2">{["Trust", "Fairness", "Access"].map((tag) => <span key={tag} className="border border-primary/35 px-3 py-1 font-mono text-[10px] text-primary">{tag}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">Smart India Hackathon 2026</p>
                <h3 className="mt-4 font-display text-4xl font-semibold">HEXACODERS</h3>
                <p className="mt-5 leading-7 text-muted-foreground">A cooperative gig-services platform connecting trusted workers and customers through a transparent, fair ecosystem.</p>
                <div className="mt-8 flex flex-wrap gap-2"><span className="tag">Platform Design</span><span className="tag">Social Impact</span><span className="tag">Team Project</span></div>
                <a href="https://github.com/shubhdosi012" target="_blank" rel="noreferrer" className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">View on GitHub <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              </div>
            </article>
          </Reveal>
        </section>

        <section className="section-shell border-y border-border bg-secondary/35">
          <Reveal><SectionHeading number="04" eyebrow="Milestones" title="Progress worth marking." /></Reveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map(({ icon: Icon, title, copy }, index) => (
              <Reveal key={title}>
                <div className="group min-h-56 bg-background p-7 transition-colors hover:bg-card">
                  <Icon className="size-7 text-primary transition-transform group-hover:-translate-y-1" />
                  <p className="mt-14 font-display text-xl font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
                  <span className="mt-6 block font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="journey" className="section-shell">
          <Reveal><SectionHeading number="05" eyebrow="Journey" title="The path so far—and ahead." /></Reveal>
          <div className="mx-auto max-w-4xl">
            {journey.map(([year, title, copy], index) => (
              <Reveal key={`${year}-${title}`}>
                <div className="grid grid-cols-[70px_24px_1fr] gap-3 md:grid-cols-[120px_40px_1fr] md:gap-6">
                  <span className="pt-1 font-mono text-sm text-primary">{year}</span>
                  <div className="flex flex-col items-center"><span className="mt-1.5 size-3 rounded-full border-2 border-primary bg-background shadow-glow" />{index < journey.length - 1 && <span className="h-full min-h-28 w-px bg-border" />}</div>
                  <div className="pb-14"><h3 className="font-display text-xl font-semibold md:text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell border-y border-border bg-secondary/35">
          <Reveal><SectionHeading number="06" eyebrow="Open source" title="Learning in public." /></Reveal>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal className="glass-card p-6 md:p-8">
              <div className="mb-7 flex items-center justify-between"><div><p className="font-display text-xl font-semibold">Contribution activity</p><p className="mt-1 text-xs text-muted-foreground">A snapshot of consistent practice</p></div><Github className="text-primary" /></div>
              <ContributionGrid />
              <div className="mt-5 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>Less</span><span>2026 · GitHub learning journey</span><span>More</span></div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal className="glass-card flex items-center justify-between p-6"><div><p className="font-display text-4xl font-semibold text-primary">10+</p><p className="mt-2 text-sm text-muted-foreground">Repositories planned</p></div><Code2 className="size-8 text-muted-foreground" /></Reveal>
              <Reveal className="glass-card flex items-center justify-between p-6"><div><p className="font-display text-4xl font-semibold text-primary">∞</p><p className="mt-2 text-sm text-muted-foreground">Learning streak</p></div><Zap className="size-8 text-muted-foreground" /></Reveal>
            </div>
          </div>
          <div className="mt-5"><Button asChild variant="outline" className="rounded-none"><a href="https://github.com/shubhdosi012" target="_blank" rel="noreferrer"><Github /> Visit GitHub profile <ArrowUpRight /></a></Button></div>
        </section>

        <section className="section-shell">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[["10+", "Planned projects"], ["1+", "Hackathon"], ["5+", "Technologies"], ["2026", "Portfolio started"]].map(([number, label]) => (
              <Reveal key={label}><div className="bg-background p-8 md:p-10"><p className="font-display text-5xl font-semibold text-primary">{number}</p><p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p></div></Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell border-t border-border bg-contact">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">07 / Contact</p>
                <h2 className="mt-5 font-display text-5xl font-semibold leading-tight md:text-7xl">Let’s build something <span className="outline-word">meaningful.</span></h2>
                <p className="mt-6 max-w-lg leading-7 text-muted-foreground">Have a project, hackathon, or learning opportunity in mind? I’d love to hear about it.</p>
                <div className="mt-9 flex gap-3">
                  <Button asChild variant="outline" size="icon" className="size-11 rounded-none"><a href="https://github.com/shubhdosi012" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a></Button>
                  <Button asChild variant="outline" size="icon" className="size-11 rounded-none"><a href="https://www.linkedin.com/in/shubh-dosi-575323311" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></Button>
                  <Button asChild variant="outline" size="icon" className="size-11 rounded-none"><a href="mailto:shubhdosi012@gmail.com" aria-label="Email"><Mail /></a></Button>
                </div>
              </div>
              <form action="mailto:shubhdosi012@gmail.com" method="post" encType="text/plain" className="space-y-5">
                <label className="block"><span className="form-label">Your name</span><input name="name" required className="form-field" placeholder="Name" /></label>
                <label className="block"><span className="form-label">Email address</span><input type="email" name="email" required className="form-field" placeholder="you@example.com" /></label>
                <label className="block"><span className="form-label">Your message</span><textarea name="message" required rows={5} className="form-field resize-none" placeholder="Tell me about your idea..." /></label>
                <Button type="submit" size="lg" className="h-12 w-full rounded-none">Send message <ArrowUpRight /></Button>
              </form>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-background px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left"><span>© 2026 Shubh Dosi</span><span className="font-mono">Designed to learn. Built to evolve.</span></div>
      </footer>
    </div>
  );
}

function SkillBar({ skill, level, delay }: { skill: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true });
  return <div ref={ref}><div className="mb-2 flex justify-between text-sm"><span>{skill}</span><span className="font-mono text-xs text-muted-foreground">{level}%</span></div><div className="h-1.5 overflow-hidden bg-border"><motion.div initial={{ width: 0 }} animate={seen ? { width: `${level}%` } : {}} transition={{ duration: 1, delay, ease: "easeOut" }} className="h-full bg-primary shadow-glow" /></div></div>;
}

function ContributionGrid() {
  return <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden">{Array.from({ length: 168 }, (_, i) => { const level = (i * 7 + i * i + 3) % 11; return <span key={i} className={`size-2.5 rounded-[1px] md:size-3 ${level > 8 ? "bg-primary" : level > 5 ? "bg-primary/55" : level > 2 ? "bg-primary/25" : "bg-border"}`} />; })}</div>;
}