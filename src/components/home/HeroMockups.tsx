import { motion } from "framer-motion";
import { Check, ShoppingBag, Search, TrendingUp } from "lucide-react";

/*
  Illustrative interface mockups shown in the home hero, built in HTML/CSS so they
  stay crisp at any size and need no image downloads. Purely decorative (aria-hidden).
*/

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const Float = ({ children, className, delay = 0.5 }: { children: React.ReactNode; className: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    className={`absolute rounded-md bg-white p-4 text-foreground shadow-[0_24px_50px_-18px_rgba(0,0,0,0.65)] ${className}`}
  >
    {children}
  </motion.div>
);

const BrowserFrame = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-lg bg-white text-foreground shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
    <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      </span>
      <span className="flex-1 rounded bg-white px-3 py-1 text-[11px] text-muted-foreground">{url}</span>
    </div>
    {children}
  </div>
);

const products = [
  { name: "Canvas tote", price: "$48", shape: "rounded-t-full" },
  { name: "Desk lamp", price: "$96", shape: "rounded-full" },
  { name: "Ceramic mug", price: "$22", shape: "rounded-b-3xl" },
  { name: "Wall print", price: "$64", shape: "rounded-sm" },
];

export const StoreMockup = () => (
  <div className="relative" aria-hidden>
    <BrowserFrame url="yourstore.com">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="h-4 w-20 rounded bg-foreground" />
          <span className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-2 w-10 rounded bg-foreground/15" />
            ))}
          </span>
          <ShoppingBag size={16} className="text-foreground" />
        </div>
        <div className="mt-5 flex items-center justify-between rounded-md bg-primary p-6">
          <div className="space-y-2.5">
            <span className="block h-4 w-44 rounded bg-foreground/85" />
            <span className="block h-4 w-32 rounded bg-foreground/85" />
            <span className="mt-4 block h-7 w-24 rounded bg-foreground" />
          </div>
          <span className="h-24 w-24 rounded-full border-[10px] border-foreground/15 bg-white/40" />
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: EASE }}
            >
              <div className="grid aspect-square place-items-center rounded-md bg-mist">
                <span className={`h-10 w-10 bg-foreground/20 ${p.shape}`} />
              </div>
              <p className="mt-2 text-[11px] font-semibold">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </BrowserFrame>
    <Float className="-bottom-6 -left-8 flex items-center gap-3" delay={0.7}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary">
        <Check size={17} strokeWidth={3} />
      </span>
      <span>
        <span className="block text-sm font-semibold">New order received</span>
        <span className="block text-xs text-muted-foreground">$128.00 paid by card</span>
      </span>
    </Float>
  </div>
);

const swatches = [
  { name: "Lime", hex: "#8DC63F", cls: "bg-primary" },
  { name: "Moss", hex: "#3F6B0E", cls: "bg-moss" },
  { name: "Graphite", hex: "#1E2328", cls: "bg-graphite ring-1 ring-white/15" },
  { name: "Mist", hex: "#F4F6F3", cls: "bg-mist" },
];

export const DesignMockup = () => (
  <div className="relative" aria-hidden>
    <div className="grid grid-cols-5 gap-4 rounded-lg bg-[#262C33] p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <div className="col-span-3 space-y-4">
        <div className="flex items-center gap-4 rounded-md bg-black p-5">
          <img src="/images/logo.jpeg" alt="" className="h-16 w-16 rounded" />
          <div>
            <p className="font-heading text-2xl font-semibold text-white">Brand identity</p>
            <p className="text-xs text-white/50">Logo, colour and type system</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {swatches.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: EASE }}
            >
              <div className={`aspect-square rounded ${s.cls}`} />
              <p className="mt-1.5 text-[11px] font-semibold text-white">{s.name}</p>
              <p className="text-[10px] text-white/45">{s.hex}</p>
            </motion.div>
          ))}
        </div>
        <div className="rounded-md bg-white p-5">
          <p className="font-heading text-5xl font-semibold leading-none text-foreground">Aa</p>
          <p className="mt-2 text-xs text-muted-foreground">Barlow Condensed, headings</p>
          <div className="mt-4 space-y-1.5">
            <span className="block h-2 w-full rounded bg-foreground/10" />
            <span className="block h-2 w-4/5 rounded bg-foreground/10" />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="w-full max-w-[170px] rounded-[26px] bg-black p-2 ring-1 ring-white/15"
        >
          <div className="overflow-hidden rounded-[20px] bg-white">
            <div className="bg-primary px-3 pb-6 pt-5">
              <span className="block h-2.5 w-16 rounded bg-foreground/80" />
              <span className="mt-2 block h-2 w-24 rounded bg-foreground/40" />
            </div>
            <div className="-mt-3 space-y-2 px-3 pb-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm ring-1 ring-line">
                  <span className="h-7 w-7 rounded bg-mist" />
                  <span className="flex-1 space-y-1">
                    <span className="block h-1.5 w-full rounded bg-foreground/20" />
                    <span className="block h-1.5 w-2/3 rounded bg-foreground/10" />
                  </span>
                </div>
              ))}
              <span className="mt-2 block h-7 rounded-md bg-foreground" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Float className="-bottom-6 -right-6 w-52" delay={0.7}>
      <p className="text-xs text-muted-foreground">Prototype review</p>
      <p className="mt-1 text-sm font-semibold">Homepage v3 approved</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
        />
      </div>
    </Float>
  </div>
);

const bars = [34, 42, 38, 51, 47, 58, 55, 66, 63, 74, 81, 92];

export const GrowthMockup = () => (
  <div className="relative" aria-hidden>
    <div className="rounded-lg bg-white p-6 text-foreground shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Organic traffic, last 12 months</p>
          <p className="mt-1 font-heading text-4xl font-semibold text-foreground">24,680</p>
        </div>
        <span className="flex items-center gap-1 rounded bg-primary px-2 py-1 text-xs font-semibold text-foreground">
          <TrendingUp size={13} /> 38%
        </span>
      </div>
      <div className="mt-6 flex h-40 items-end gap-2 border-b border-line">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-primary" : "bg-foreground/15"}`}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.04, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          ["Conversion rate", "3.8%"],
          ["Leads", "412"],
          ["Revenue", "$41.2k"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-mist p-3">
            <p className="text-[11px] text-muted-foreground">{k}</p>
            <p className="mt-0.5 font-heading text-xl font-semibold text-foreground">{v}</p>
          </div>
        ))}
      </div>
    </div>
    <Float className="-bottom-8 -left-8 flex items-center gap-3" delay={0.8}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-graphite text-primary">
        <Search size={16} />
      </span>
      <span>
        <span className="block text-sm font-semibold">Ranking on page one</span>
        <span className="block text-xs text-muted-foreground">for 18 target keywords</span>
      </span>
    </Float>
  </div>
);
