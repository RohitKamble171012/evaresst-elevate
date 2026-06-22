import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useScroll, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroBottle from "@/assets/hero-bottle.png";
import bottlesLineup from "@/assets/bottles-lineup.png";
import colorfulDrinks from "@/assets/colorful-drinks.png";
import foodSpread from "@/assets/food-spread.png";
import logo from "@/assets/evaresst-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evaresst Agro — The ART of Delicious Innovations" },
      { name: "description", content: "Food & beverage consulting — recipe formulation, compliance, supply chain and commercialization. Crafted for makers building the next great product." },
      { property: "og:title", content: "Evaresst Agro — The ART of Delicious Innovations" },
      { property: "og:description", content: "Food & beverage consulting — recipe formulation, compliance, supply chain and commercialization." },
    ],
  }),
  component: Landing,
});

const roles = ["Brew Master", "Food Technologist", "Recipe & Formulation Advisor", "Compliance Expert", "Flavouring Your Future"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-cream/85 backdrop-blur-md border-b border-earth/10 shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Evaresst Agro" className="h-10 md:h-12 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-earth/80">
          {["Services", "Expertise", "Workflow", "Results", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-amber-brand transition-colors">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-amber-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-brand/30 hover:bg-amber-brand/90 transition-all hover:scale-105">
          Speak With Expert
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax via motion values (smoothed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Layer transforms (different depths)
  const bottleX = useTransform(smx, (v) => v * 18);
  const bottleY = useTransform(smy, (v) => v * 18);
  const blobX = useTransform(smx, (v) => v * 40);
  const blobY = useTransform(smy, (v) => v * 40);
  const textFrontX = useTransform(smx, (v) => v * -10);
  const textBackX = useTransform(smx, (v) => v * 8);
  const tag1X = useTransform(smx, (v) => v * 30);
  const tag1Y = useTransform(smy, (v) => v * 30);
  const tag2X = useTransform(smx, (v) => v * -28);
  const tag2Y = useTransform(smy, (v) => v * 22);
  const tag3X = useTransform(smx, (v) => v * 24);
  const tag3Y = useTransform(smy, (v) => v * -26);
  const tag4X = useTransform(smx, (v) => v * -34);
  const tag4Y = useTransform(smy, (v) => v * -22);

  // Scroll parallax
  const { scrollY } = useScroll();
  const scrollBottle = useTransform(scrollY, [0, 800], [0, -120]);
  const scrollBg = useTransform(scrollY, [0, 800], [0, 200]);
  const scrollGiant = useTransform(scrollY, [0, 800], [0, -260]);
  const scrollFade = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cream"
    >
      {/* Soft dotted texture */}
      <motion.div
        style={{ y: scrollBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#3D2B1F 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </motion.div>

      {/* Color blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute top-[8%] left-[10%] w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #E8730A66, transparent 70%)" }} />
      </motion.div>
      <motion.div
        style={{ x: useTransform(smx, v => v * -36), y: useTransform(smy, v => v * -36) }}
        className="pointer-events-none absolute bottom-[5%] right-[8%] w-[560px] h-[560px] rounded-full blur-3xl opacity-50"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #4A7C3F55, transparent 70%)" }} />
      </motion.div>

      {/* Giant outline word in background */}
      <motion.div
        style={{ y: scrollGiant, opacity: scrollFade }}
        aria-hidden
        className="absolute inset-x-0 top-[18%] flex justify-center pointer-events-none select-none"
      >
        <span
          className="font-display italic font-black leading-none text-[28vw] md:text-[22vw] tracking-tighter"
          style={{
            WebkitTextStroke: "1.5px rgba(61,43,31,0.12)",
            color: "transparent",
          }}
        >
          ART
        </span>
      </motion.div>

      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-30 flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-earth/10 px-4 py-1.5 text-xs font-medium text-earth/80 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-brand animate-pulse" />
          Food &amp; Beverage Consulting · Est. Excellence
        </span>
      </motion.div>

      {/* CENTERPIECE: bottle + overlapping text */}
      <div className="relative z-10 mt-8 md:mt-10 mx-auto max-w-[1200px] px-6">
        <div className="relative flex items-center justify-center h-[560px] md:h-[680px]">

          {/* Glow behind bottle */}
          <motion.div
            style={{ x: bottleX, y: bottleY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[460px] h-[460px] md:w-[560px] md:h-[560px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #E8730A99, transparent 65%)" }} />
          </motion.div>

          {/* TEXT BEHIND bottle: "The" + "of" */}
          <motion.div
            style={{ x: textBackX, y: scrollBg }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-full flex items-start justify-between max-w-[900px]">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display italic text-earth/80 text-5xl md:text-7xl lg:text-8xl leading-none -translate-y-4"
              >
                The
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-display italic text-earth/80 text-5xl md:text-7xl lg:text-8xl leading-none translate-y-2"
              >
                of
              </motion.span>
            </div>
          </motion.div>

          {/* THE BOTTLE */}
          <motion.img
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: bottleX, y: useTransform([bottleY, scrollBottle], ([a, b]) => (a as number) + (b as number)) }}
            src={heroBottle}
            alt="Sea Buckthorn premium beverage bottle"
            className="relative z-20 h-[520px] md:h-[680px] w-auto object-contain animate-float-bottle drop-shadow-[0_40px_60px_rgba(232,115,10,0.35)]"
          />

          {/* TEXT IN FRONT of bottle: ART (huge, splits across) & Delicious / Innovations */}
          <motion.div
            style={{ x: textFrontX }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* ART headline crossing the bottle */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black italic text-amber-brand text-[26vw] md:text-[20vw] lg:text-[17rem] leading-[0.8] tracking-tighter mix-blend-multiply"
              style={{ textShadow: "0 8px 30px rgba(232,115,10,0.35)" }}
            >
              ART
            </motion.h1>
          </motion.div>

          {/* Bottom overlay text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute z-30 bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <div className="font-display font-bold text-earth text-3xl md:text-5xl lg:text-6xl leading-tight">
              Delicious <span className="italic text-green-brand">Innovations.</span>
            </div>
          </motion.div>

          {/* Floating tags — parallax */}
          <motion.div style={{ x: tag1X, y: tag1Y }} className="absolute z-40 top-10 left-2 md:left-8 animate-tag-1">
            <Tag color="amber-brand">🌱 Sea Buckthorn</Tag>
          </motion.div>
          <motion.div style={{ x: tag2X, y: tag2Y }} className="absolute z-40 top-1/3 right-2 md:right-6 animate-tag-2">
            <Tag color="green-brand">Natural Extract</Tag>
          </motion.div>
          <motion.div style={{ x: tag3X, y: tag3Y }} className="absolute z-40 bottom-28 left-0 md:left-6 animate-tag-3">
            <Tag color="teal-brand">Craft Formula</Tag>
          </motion.div>
          <motion.div style={{ x: tag4X, y: tag4Y }} className="absolute z-40 bottom-16 right-0 md:right-8 animate-tag-1">
            <Tag color="berry">✓ FSSAI Approved</Tag>
          </motion.div>
        </div>

        {/* Subline + CTAs + stats */}
        <div className="relative z-30 mt-6 md:mt-8 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="h-9 overflow-hidden relative text-xl md:text-2xl font-display italic text-green-brand">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIdx}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {roles[roleIdx]}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-base md:text-lg text-earth/70 max-w-xl">
            From recipe to retail — we partner with founders, brands and manufacturers to craft food &amp; beverage products that win on taste, science and shelf.
          </p>
          <div className="mt-7 flex flex-wrap gap-4 justify-center">
            <a href="#services" className="inline-flex items-center justify-center rounded-full bg-amber-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-brand/30 hover:scale-105 transition-transform">
              Explore Services
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border-2 border-green-brand px-7 py-3.5 text-sm font-semibold text-green-brand hover:bg-green-brand hover:text-white transition-colors">
              Speak With Expert
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-earth/70 justify-center">
            <span><b className="text-earth font-display text-lg">100+</b> Products Launched</span>
            <span className="text-earth/30">|</span>
            <span><b className="text-earth font-display text-lg">60%</b> Revenue Growth</span>
            <span className="text-earth/30">|</span>
            <span><b className="text-earth font-display text-lg">40%</b> Cost Saved</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs md:text-sm font-semibold shadow-lg border border-earth/5" style={{ color: `var(--${color})` }}>
      {children}
    </span>
  );
}

const services = [
  { title: "Product Development", desc: "Recipe formulation, sensory profiling and prototype iteration that nails taste and shelf-life.", color: "#E8730A", icon: "🧪" },
  { title: "Quality Assurance", desc: "Lab testing, batch consistency and HACCP-aligned QA protocols you can scale.", color: "#4A7C3F", icon: "🧫" },
  { title: "Market Strategy", desc: "Positioning, pricing and category fit research grounded in real consumer behavior.", color: "#D4AC0D", icon: "📈" },
  { title: "Supply Chain", desc: "Ingredient sourcing, vendor audits and cost-engineered procurement workflows.", color: "#1A8FA0", icon: "🚚" },
  { title: "Regulatory Compliances", desc: "FSSAI, FSSC, label law and export documentation handled end-to-end.", color: "#C0392B", icon: "📋" },
  { title: "Innovation & R&D", desc: "Functional ingredients, clean-label reformulation and category-creating concepts.", color: "#7C3AED", icon: "✨" },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-cream-warm">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-brand">Our Services</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold text-earth">Crafted for Every Stage of Your Journey</h2>
          <p className="mt-4 text-lg text-earth/70">From the first sip of an idea to nationwide shelves — we steward your product through every milestone.</p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl p-7 border-t-4 transition-shadow"
              style={{ borderTopColor: s.color, boxShadow: "0 6px 24px -12px rgba(61,43,31,0.15)" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ backgroundColor: `${s.color}1A`, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-earth">{s.title}</h3>
              <p className="mt-2 text-earth/70 leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1" style={{ color: s.color }}>
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const expertise = [
  { label: "Beverages", icon: "🥤", color: "#E8730A" },
  { label: "Packaging", icon: "📦", color: "#4A7C3F" },
  { label: "Dairy", icon: "🥛", color: "#1A8FA0" },
  { label: "Bakery & Confectionery", icon: "🥐", color: "#D4AC0D" },
];

function Expertise() {
  return (
    <section id="expertise" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute -inset-6 bg-amber-brand/10 rounded-3xl blur-2xl" />
          <img src={bottlesLineup} alt="Premium beverage lineup" className="relative rounded-3xl shadow-2xl w-full object-cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-brand">Our Expertise</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold text-earth">Our Domain of Expertise</h2>
          <p className="mt-5 text-lg text-earth/70 leading-relaxed">
            Four core categories where our hands-on craft meets food science. From shelf-stable beverages to artisan bakery, we bring formulation, compliance and commercialization under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {expertise.map((e) => (
              <span key={e.label} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2" style={{ borderColor: `${e.color}33`, backgroundColor: `${e.color}10`, color: e.color }}>
                <span className="text-xl">{e.icon}</span>{e.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const flavors = [
  { name: "Orange", color: "#E8730A" },
  { name: "Melon", color: "#7CB342" },
  { name: "Green Apple", color: "#C5E1A5" },
  { name: "Mango", color: "#F9A825" },
  { name: "Rasberry", color: "#D85A7C" },
  { name: "Blueberry", color: "#1A8FA0" },
  { name: "Cranberry", color: "#C0392B" },
];

function Showcase() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-berry">Real Products</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold text-earth">From Our Lab to Your Shelf</h2>
          <p className="mt-4 text-lg text-earth/70 max-w-2xl mx-auto">Real beverages crafted using Evaresst formulation expertise — colour-true, taste-tested, shelf-ready.</p>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-12 relative rounded-3xl overflow-hidden shadow-2xl">
          <img src={colorfulDrinks} alt="Colorful Evaresst beverage range" className="w-full h-auto object-cover" />
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {flavors.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-sm font-medium text-earth"
            >
              <span className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: f.color }} />
              {f.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Process Innovation", desc: "Re-engineering production for cost & quality.", color: "#E8730A" },
  { n: "02", title: "Demand Analysis", desc: "Category, audience and price-point research.", color: "#4A7C3F" },
  { n: "03", title: "Supply Chain Optimization", desc: "Right vendors, right cost, right timing.", color: "#1A8FA0" },
  { n: "04", title: "Regulatory Affairs", desc: "Approvals, labelling and export-ready docs.", color: "#C0392B" },
  { n: "05", title: "Quality Verification", desc: "Lab, sensory and batch consistency checks.", color: "#D4AC0D" },
  { n: "06", title: "Product Commercialization", desc: "Launch playbook and channel activation.", color: "#7C3AED" },
];

function Workflow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section id="workflow" ref={ref} className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, #FDF6EC 0%, #F0FDF4 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-brand">Workflow</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold text-earth">Our Innovation Workflow</h2>
          <p className="mt-4 text-lg text-earth/70">Six interconnected stages — each one a checkpoint on the road from idea to shelf.</p>
        </motion.div>

        <div className="relative mt-16">
          <svg className="hidden lg:block absolute top-12 left-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 1200 24">
            <motion.path
              d="M 20 12 L 1180 12"
              stroke="#4A7C3F"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`bg-white rounded-2xl p-6 shadow-md border border-earth/5 ${i % 2 === 1 ? "lg:mt-12" : ""}`}
              >
                <div className="font-display text-5xl font-bold leading-none" style={{ color: s.color }}>{s.n}</div>
                <h3 className="mt-3 text-lg font-bold text-earth">{s.title}</h3>
                <p className="mt-2 text-sm text-earth/70 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { c.stop(); unsub(); };
  }, [inView, mv, rounded, to]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function Stats() {
  const items = [
    { n: 60, suffix: "%", label: "Revenue Growth", desc: "Beverage Manufacturing" },
    { n: 40, suffix: "%", label: "Cost Reduction", desc: "Food Processing" },
    { n: 100, suffix: "+", label: "Products Launched", desc: "Food Startups" },
  ];
  return (
    <section id="results" className="relative py-24 md:py-32 overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #E8730A 0%, #4A7C3F 100%)" }}>
      <svg className="absolute -left-10 top-10 opacity-10" width="200" height="300" viewBox="0 0 60 100" fill="white">
        <path d="M25 0 h10 v15 q0 5 5 10 q5 10 5 25 v40 q0 10 -10 10 h-10 q-10 0 -10 -10 v-40 q0 -15 5 -25 q5 -5 5 -10 z" />
      </svg>
      <svg className="absolute -right-10 bottom-10 opacity-10 rotate-12" width="200" height="300" viewBox="0 0 60 100" fill="white">
        <path d="M25 0 h10 v15 q0 5 5 10 q5 10 5 25 v40 q0 10 -10 10 h-10 q-10 0 -10 -10 v-40 q0 -15 5 -25 q5 -5 5 -10 z" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold">Numbers, Not Promises</h2>
        <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">Outcomes we have delivered for our partners across categories.</p>
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {items.map((it) => (
            <div key={it.label}>
              <div className="font-display font-bold text-7xl md:text-8xl leading-none">
                <Counter to={it.n} suffix={it.suffix} />
              </div>
              <div className="mt-3 text-xl font-semibold">{it.label}</div>
              <div className="mt-1 text-white/75">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { n: "01", title: "Discovery", desc: "Audit your brand, product and market reality." },
  { n: "02", title: "Strategy", desc: "Roadmap the formulation, compliance and launch path." },
  { n: "03", title: "Execution", desc: "Recipe, packaging, vendors — built and tested." },
  { n: "04", title: "Scale", desc: "Production handoff, QA cadence and growth playbook." },
];

function Process() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F0FAFA" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-brand">Engagement</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold text-earth">How We Work With You</h2>
        </motion.div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="font-display text-6xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #E8730A, #4A7C3F)" }}>
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-bold text-earth">{s.title}</h3>
              <p className="mt-2 text-earth/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <img src={foodSpread} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(232,115,10,0.88), rgba(192,57,43,0.82))" }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto px-6 text-center text-white"
      >
        <h2 className="font-display font-bold text-5xl md:text-7xl leading-tight">Let's Build Your Product Right</h2>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Navigate formulation, compliance &amp; scale — with confidence.</p>
        <a href="mailto:hello@evaresstagro.com" className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-amber-brand shadow-2xl hover:bg-amber-brand hover:text-white transition-colors">
          Start a Conversation →
        </a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-cream" style={{ backgroundColor: "#3D2B1F" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="bg-white inline-block rounded-xl p-3">
            <img src={logo} alt="Evaresst Agro" className="h-12 w-auto" />
          </div>
          <p className="mt-5 font-display italic text-2xl text-cream/90 max-w-md">The ART of Delicious Innovations.</p>
          <p className="mt-3 text-cream/60 max-w-md leading-relaxed">Food &amp; beverage consulting partner for brands that take craft, science and shelf-life seriously.</p>
        </div>
        <div>
          <h4 className="text-cream font-semibold text-sm uppercase tracking-widest">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-cream/70">
            {["Services", "Expertise", "Workflow", "Results", "Contact"].map((l) => (
              <li key={l}><a className="hover:text-amber-brand transition-colors" href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold text-sm uppercase tracking-widest">Contact</h4>
          <ul className="mt-4 space-y-2 text-cream/70">
            <li>hello@evaresstagro.com</li>
            <li>+91 — Speak with our expert</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-cream/50 flex flex-wrap justify-between gap-2">
          <span>© 2025 EvaresstAgro. All Rights Reserved.</span>
          <span>Crafted with care for makers of delicious things.</span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-cream text-earth">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Expertise />
        <Showcase />
        <Workflow />
        <Stats />
        <Process />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
