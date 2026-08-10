import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, t as useInView } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AAJzjalF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Magnetic hover wrapper: the child shifts slightly toward the cursor.
* Skipped entirely when the user prefers reduced motion or on touch/small screens.
*/
function Magnetic({ children, strength = .25, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const handleMove = (e) => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.innerWidth < 768) return;
		const rect = ref.current.getBoundingClientRect();
		setOffset({
			x: (e.clientX - (rect.left + rect.width / 2)) * strength,
			y: (e.clientY - (rect.top + rect.height / 2)) * strength
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className: `inline-block ${className}`,
		onMouseMove: handleMove,
		onMouseLeave: () => setOffset({
			x: 0,
			y: 0
		}),
		animate: offset,
		transition: {
			duration: .25,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children
	});
}
function DarkModeToggle() {
	const [dark, setDark] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		const saved = localStorage.getItem("theme");
		if (saved) return saved === "dark";
		return true;
	});
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (dark) root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setDark((d) => !d),
		"aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
		className: "relative flex h-7 w-7 items-center justify-center rounded-full border border-rule text-foreground transition-colors hover:bg-ink-wash",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: "14",
			height: "14",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: `absolute transition-all duration-300 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: "14",
			height: "14",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: `absolute transition-all duration-300 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
		})]
	});
}
function LiveTime() {
	const [time, setTime] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const updateTime = () => {
			setTime((/* @__PURE__ */ new Date()).toLocaleTimeString(void 0, {
				hour12: true,
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit"
			}));
		};
		updateTime();
		const interval = setInterval(updateTime, 1e3);
		return () => clearInterval(interval);
	}, []);
	if (!time) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[85px]" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden font-mono text-[10px] tracking-[0.1em] text-foreground/60 md:block",
		children: time
	});
}
/**
* Shared Framer Motion variants + easing for the whole site.
* Motion is precise, never bouncy: cubic-bezier easeOut, 200–500ms.
*/
var EASE = [
	.22,
	1,
	.36,
	1
];
var staggerParent = {
	hidden: {},
	show: { transition: {
		staggerChildren: .07,
		delayChildren: .05
	} }
};
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 12
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .45,
			ease: EASE
		}
	}
};
var lineReveal = {
	hidden: { y: "110%" },
	show: {
		y: "0%",
		transition: {
			duration: .5,
			ease: EASE
		}
	}
};
var inView = {
	once: true,
	amount: .25
};
/**
* Fixed top navigation. Links are magnetic on hover and use an
* accent underline that draws in from the left.
*/
var LINKS$1 = [
	{
		label: "About",
		href: "#about",
		num: "01"
	},
	{
		label: "Stack",
		href: "#stack",
		num: "02"
	},
	{
		label: "Work",
		href: "#work",
		num: "03"
	},
	{
		label: "Contact",
		href: "#contact",
		num: "04"
	}
];
function useActiveSection() {
	const [active, setActive] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const ids = LINKS$1.map((l) => l.href.slice(1));
		const observers = [];
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) setActive(`#${id}`);
			}, { rootMargin: "-40% 0px -55% 0px" });
			observer.observe(el);
			observers.push(observer);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, []);
	return active;
}
function Nav() {
	const activeHref = useActiveSection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.nav, {
		initial: {
			opacity: 0,
			y: -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			ease: EASE,
			delay: .2
		},
		className: "fixed inset-x-0 top-0 z-50 border-b border-rule bg-background/85 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "font-display text-sm lowercase tracking-[0.3em]",
					children: ["Arjun", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: ".dev"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTime, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex items-center gap-4 md:gap-8",
				children: [LINKS$1.map((l) => {
					const isActive = activeHref === l.href;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
						strength: .3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: l.href,
							className: "group flex items-baseline gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `hidden font-mono text-[10px] md:inline ${isActive ? "text-accent" : "text-accent"}`,
								children: l.num
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `relative font-mono text-[11px] uppercase tracking-[0.18em] ${isActive ? "text-accent" : ""}`,
								children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}` })]
							})]
						})
					}) }, l.href);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DarkModeToggle, {}) })]
			})]
		})
	});
}
/**
* ScrambleText — smooth "slot machine" text reveal.
*
* Characters swap at a readable pace (shuffleSpeed), then lock
* left-to-right.  Uses rAF for smooth timing without layout thrash.
*
* Props:
*   text            – the target string
*   className       – forwarded to the wrapping <span>
*   scrambleDuration – ms the scramble runs before the first char locks
*   staggerMs       – ms between each successive character locking
*   shuffleSpeed    – ms between random character swaps (higher = slower shuffle)
*/
var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function ScrambleText({ text, className = "", scrambleDuration = 600, staggerMs = 80, shuffleSpeed = 70 }) {
	const containerRef = (0, import_react.useRef)(null);
	const [display, setDisplay] = (0, import_react.useState)(text);
	const animRef = (0, import_react.useRef)(null);
	const randomChar = (0, import_react.useCallback)(() => CHARS[Math.floor(Math.random() * 36)], []);
	const runScramble = (0, import_react.useCallback)(() => {
		if (animRef.current) cancelAnimationFrame(animRef.current);
		const target = text.split("");
		const len = target.length;
		const startTime = performance.now();
		let lastShuffle = 0;
		const lockTimes = target.map((_, i) => scrambleDuration + i * staggerMs);
		const totalDuration = lockTimes[len - 1] + 60;
		let currentRandom = target.map((ch) => ch === " " || ch === "—" ? ch : randomChar());
		const tick = (now) => {
			const elapsed = now - startTime;
			if (now - lastShuffle >= shuffleSpeed) {
				lastShuffle = now;
				currentRandom = target.map((ch) => ch === " " || ch === "—" ? ch : randomChar());
			}
			const chars = [];
			let allLocked = true;
			for (let i = 0; i < len; i++) if (target[i] === " " || target[i] === "—") chars.push(target[i]);
			else if (elapsed >= lockTimes[i]) chars.push(target[i]);
			else {
				allLocked = false;
				chars.push(currentRandom[i]);
			}
			setDisplay(chars.join(""));
			if (elapsed < totalDuration && !allLocked) animRef.current = requestAnimationFrame(tick);
			else {
				setDisplay(text);
				animRef.current = null;
			}
		};
		animRef.current = requestAnimationFrame(tick);
	}, [
		text,
		scrambleDuration,
		staggerMs,
		shuffleSpeed,
		randomChar
	]);
	(0, import_react.useEffect)(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) runScramble();
		}, { threshold: .3 });
		observer.observe(el);
		return () => {
			observer.disconnect();
			if (animRef.current) cancelAnimationFrame(animRef.current);
		};
	}, [runScramble]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: containerRef,
		className,
		"aria-label": text,
		children: display
	});
}
/**
* Hero: typography is the visual. "ARJUN" uses a slot-machine scramble
* that flashes random glyphs then locks each letter left-to-right.
* The effect re-triggers every time the section scrolls into view.
*/
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .3,
					ease: EASE
				},
				className: "mb-10 flex items-center justify-between border-b border-rule pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
					children: "Portfolio / Rev. 2026"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.28em] text-accent",
					children: "Kerala, IN"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex font-display text-[22vw] font-semibold uppercase leading-[0.82] tracking-[-0.04em] md:text-[17vw]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrambleText, {
						text: "A",
						scrambleDuration: 800,
						staggerMs: 150
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrambleText, {
					text: "RJUN",
					scrambleDuration: 950,
					staggerMs: 150
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-4 gap-6 border-t border-rule pt-5 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] md:col-span-6 md:text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrambleText, {
						text: "Developer & Maker — Building Games, Robots, IoT & Prototyping Full-Stack Tools.",
						scrambleDuration: 400,
						staggerMs: 18
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .45,
						ease: EASE,
						delay: .6
					},
					className: "col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 md:col-start-10 md:text-right",
					children: "Fig. 01 — Index"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
				href: "#about",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .4,
					delay: .8
				},
				className: "mt-16 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]",
				children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					"aria-hidden": "true",
					animate: { y: [
						0,
						6,
						0
					] },
					transition: {
						duration: 1.6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "text-accent",
					children: "↓"
				})]
			})
		]
	});
}
/**
* Oversized section numeral + label used as a grid anchor for every section.
*/
function SectionHeading({ numeral, title, tag }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		variants: fadeUp,
		className: "col-span-4 mb-10 grid grid-cols-4 items-end gap-x-6 border-t border-rule pt-4 md:col-span-12 md:grid-cols-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-1 md:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-5xl leading-none text-accent md:text-7xl",
					children: numeral
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-3 md:col-span-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl uppercase tracking-tight md:text-4xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: title.charAt(0)
					}), title.slice(1)]
				})
			}),
			tag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-4 md:col-span-3 md:text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: tag
				})
			}) : null
		]
	});
}
/**
* Small stats strip with numerals that count up when scrolled into view.
*/
var STATS = [
	{
		value: 2,
		label: "Featured Projects",
		suffix: ""
	},
	{
		value: 6,
		label: "Languages Used",
		suffix: ""
	},
	{
		value: 4,
		label: "Focus Areas",
		suffix: ""
	},
	{
		value: 2026,
		label: "Revision",
		suffix: ""
	}
];
function Counter({ to }) {
	const ref = (0, import_react.useRef)(null);
	const visible = useInView(ref, {
		once: true,
		amount: .5
	});
	const [value, setValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setValue(to);
			return;
		}
		const start = performance.now();
		const duration = 500;
		let frame;
		const tick = (now) => {
			const t = Math.min((now - start) / duration, 1);
			setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [visible, to]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: "font-display text-4xl leading-none md:text-6xl",
		children: value
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: staggerParent,
		className: "col-span-4 mt-16 grid grid-cols-4 gap-y-8 border-b border-t border-rule py-8 md:col-span-12 md:grid-cols-12",
		children: STATS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: fadeUp,
			className: "col-span-2 md:col-span-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, { to: s.value }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
				children: s.label
			})]
		}, s.label))
	});
}
/**
* About: short bio plus a grid-list of focus areas.
*/
var FOCUS = [
	"Game Dev",
	"Robotics & Hardware",
	"Creative AI Tooling",
	"Full-Stack Development"
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		id: "about",
		variants: staggerParent,
		initial: "hidden",
		whileInView: "show",
		viewport: inView,
		className: "relative z-10 mx-auto grid max-w-[1400px] grid-cols-4 gap-x-6 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				numeral: "01",
				title: "About",
				tag: "Fig. 02 — Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				variants: fadeUp,
				className: "col-span-4 text-lg leading-snug md:col-span-6 md:col-start-3 md:text-2xl",
				children: "Developer and maker from Kerala, India — building games, robots, creative AI tooling and full-stack projects."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				variants: fadeUp,
				className: "col-span-4 mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground md:col-span-5 md:col-start-3 md:text-base",
				children: "I work across the stack: from low-level hardware and game mechanics to AI-integrated web apps. The interesting part is making constrained systems feel responsive and honest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
				variants: staggerParent,
				className: "col-span-4 mt-12 grid grid-cols-4 border-t border-rule md:col-span-12 md:grid-cols-12",
				children: FOCUS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					variants: fadeUp,
					className: "col-span-4 flex items-baseline gap-4 border-b border-rule py-5 md:col-span-3 md:border-r md:last:border-r-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[10px] text-accent",
						children: ["0", i + 1]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base uppercase tracking-tight md:text-lg",
						children: item
					})]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {})
		]
	});
}
/**
* Skills: grouped stack lists, rendered as static wrap lists
* with a staggered entrance and a smooth hover animation.
*/
var GROUPS$1 = [
	{
		label: "Languages",
		items: [
			"JavaScript",
			"Python",
			"C#",
			"C++",
			"Java",
			"C",
			"Dart"
		]
	},
	{
		label: "Frontend",
		items: [
			"Vite+React",
			"Nextjs",
			"Tailwind CSS",
			"Flutter"
		]
	},
	{
		label: "Backend / AI",
		items: [
			"FastAPI",
			"Django",
			"Node.js",
			"Langchain",
			"n8n",
			"Relevance AI"
		]
	},
	{
		label: "Game / Creative",
		items: [
			"Unity Junior Developer",
			"Blender 3D Artist & Rigger",
			"Krita Artist"
		]
	},
	{
		label: "Hardware",
		items: ["Bipedal Robo", "Build Custom Library For Oled Displays"]
	}
];
var itemVariant = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .4,
			ease: EASE
		}
	}
};
function SkillList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: { show: { transition: { staggerChildren: .05 } } },
		className: "flex flex-wrap gap-3 mt-4",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			variants: itemVariant,
			whileHover: {
				scale: 1.05,
				y: -2
			},
			className: "inline-flex cursor-default items-center rounded-full border border-rule bg-ink-wash/50 px-4 py-2 font-sans text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-rule md:text-base",
			children: item
		}, `${item}-${i}`))
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		id: "stack",
		variants: staggerParent,
		initial: "hidden",
		whileInView: "show",
		viewport: inView,
		className: "relative z-10 mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-x-6 md:grid-cols-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				numeral: "02",
				title: "Stack",
				tag: "Fig. 03 — Tooling"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-rule mt-8",
			children: GROUPS$1.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				className: "border-b border-rule py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground",
					children: g.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillList, { items: g.items })]
			}, g.label))
		})]
	});
}
/**
* Projects: two hard-edged project rows. Hover reveals a clip-path wipe + drawn underline.
*/
var GROUPS = [{
	numeral: "03.1",
	title: "Selected Work",
	projects: [
		{
			n: "01",
			title: "NextCore",
			desc: "Edge-First Multi-Agent Clinical Intelligence & Emergency Decision-Support Platform",
			tags: [
				"Vite+React",
				"Node.js",
				"LanceDB",
				"SQLite"
			],
			href: "https://github.com/azazil-06/NextCare.git"
		},
		{
			n: "02",
			title: "Bipedal Robo",
			desc: "Rocky — A BLE-Controlled Bipedal Robot",
			tags: [
				"Esp32",
				"I2C Oled",
				"SG90",
				"MT3608",
				"Arduino IDE (cpp)"
			],
			href: "https://github.com/azazil-06/Bipedal-Robot-esp32c3-.git"
		},
		{
			n: "03",
			title: "Adventure Game",
			desc: "An RPG game created using UNITY",
			tags: [
				"Unity",
				"Blender",
				"Krita",
				"C#"
			],
			href: "https://github.com/azazil-06/Adventure-Game.git"
		},
		{
			n: "04",
			title: "Aseprite Local Stable Diffusion for low spec devices",
			desc: "An extension for Aseprite that uses Stable Diffusion to generate pixel art",
			tags: [
				"Python",
				"Aseprite",
				"Stable Diffusion"
			],
			href: "https://github.com/azazil-06/Aseprite-Local-Stable-Diffusion-for-low-spec-devices-Ongoing-.git"
		},
		{
			n: "05",
			title: "GestureLite",
			desc: "Gesture recognition based electrical switch",
			tags: [
				"Python",
				"OpenCV",
				"MediaPipe",
				"Arduino"
			],
			href: "https://github.com/azazil-06/Phalanx-Vectorized-Bio-Kinetic-Optoelectronic-Modulation-System.git"
		}
	]
}];
function ProjectCard({ p }) {
	const Wrapper = p.href ? "a" : "div";
	const linkProps = p.href ? {
		href: p.href,
		target: "_blank",
		rel: "noopener noreferrer"
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
		variants: fadeUp,
		className: "border-b border-rule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrapper, {
			...linkProps,
			className: "group relative block overflow-hidden py-6 md:py-8",
			"aria-label": p.href ? `${p.title} — open GitHub repository in a new tab` : p.title,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute inset-0 origin-left scale-x-0 bg-ink-wash transition-transform duration-300 ease-out group-hover:scale-x-100"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid grid-cols-4 items-start gap-x-6 md:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "col-span-1 font-mono text-[10px] text-accent md:col-span-1",
						children: p.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-3 md:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "relative inline-block font-display text-xl uppercase tracking-tight md:text-3xl",
							children: [p.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground",
							children: p.desc
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "col-span-4 mt-4 flex flex-wrap gap-x-3 gap-y-1 md:col-span-4 md:col-start-8 md:mt-0 md:justify-end",
						children: [p.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border border-rule px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
							children: t
						}, t)), p.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "font-mono text-[10px] uppercase tracking-[0.16em] text-accent",
							children: "GitHub ↗"
						}) : null]
					})
				]
			})]
		})
	});
}
function Projects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "work",
		className: "relative z-10 mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: staggerParent,
			initial: "hidden",
			whileInView: "show",
			viewport: inView,
			className: "grid grid-cols-4 gap-x-6 md:grid-cols-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				numeral: "03",
				title: "Selected Work",
				tag: "Fig. 04 — Index of Builds"
			})
		}), GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: staggerParent,
			initial: "hidden",
			whileInView: "show",
			viewport: inView,
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				className: "flex items-baseline gap-4 border-t border-ink pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-accent",
					children: g.numeral
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-mono text-xs uppercase tracking-[0.24em]",
					children: g.title
				})]
			}), g.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { p }, p.n))]
		}, g.numeral))]
	});
}
/**
* Contact / footer: large closing typographic statement, magnetic links,
* and small-print credit. Email and phone are placeholders to fill in.
*/
var LINES = ["LET'S BUILD", "SOMETHING"];
var LINKS = [
	{
		label: "GitHub",
		value: "See my projects?",
		href: "https://github.com/azazil-06"
	},
	{
		label: "LinkedIn",
		value: "Let's connect?",
		href: "https://www.linkedin.com/in/arjun-prasad-9139a1327/"
	},
	{
		label: "email",
		value: "Send me a message?",
		href: "https://mail.google.com/mail/?view=cm&fs=1&to=arjunprasadsa@gmail.com&su=Hi%20Arjun%20:)",
		target: "_blank",
		rel: "noopener noreferrer"
	},
	{
		label: "Instagram",
		value: "Follow Me?",
		href: "https://www.instagram.com/_arjuneyy?igsh=cjg5M250dmhuaTIz"
	}
];
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.footer, {
		id: "contact",
		variants: staggerParent,
		initial: "hidden",
		whileInView: "show",
		viewport: inView,
		className: "relative z-10 mx-auto max-w-[1400px] border-t border-ink px-6 py-20 md:px-10 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				variants: fadeUp,
				className: "mb-8 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
				children: "04 / Contact — Fig. 05"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.04em] md:text-[11vw]",
				children: LINES.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						variants: lineReveal,
						className: `block ${line === "SOMETHING" ? "text-accent" : ""}`,
						children: line
					})
				}, line))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
				variants: staggerParent,
				className: "mt-14 grid grid-cols-4 border-t border-rule md:grid-cols-12",
				children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					variants: fadeUp,
					className: "col-span-4 border-b border-rule py-4 md:col-span-3 md:border-r md:last:border-r-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground",
						children: l.label
					}), l.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
						strength: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: l.href,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group relative mt-1 inline-block font-display text-base uppercase tracking-tight md:text-lg",
							children: [l.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" })]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-base uppercase tracking-tight text-accent md:text-lg",
						children: l.value
					})]
				}, l.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				className: "mt-10 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Arjun. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Designed & built by Arjun" })]
			})
		]
	});
}
/**
* Fixed 1px modular grid overlay — a visible design element, not a debug tool.
* 12 columns on desktop, 4 on mobile. Lines "draw in" downward on load.
*/
function GridLines() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto h-full max-w-[1400px] px-6 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-full grid-cols-4 md:grid-cols-12",
				children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: `h-full border-l border-rule ${i >= 4 ? "hidden md:block" : ""}`,
					initial: { scaleY: 0 },
					animate: { scaleY: 1 },
					style: { transformOrigin: "top" },
					transition: {
						duration: .5,
						ease: EASE,
						delay: .05 * i
					}
				}, i))
			})
		})
	});
}
/**
* DinoGame — a Chrome-style T-Rex runner drawn on a <canvas>.
*
* Controls: Space / ArrowUp / tap to jump.
* Renders pixel-art dino, cacti, ground, and clouds using raw canvas calls.
* Styled to match the portfolio's Swiss design tokens.
*/
var DINO_W = 40;
var DINO_H = 44;
var GROUND_Y_OFFSET = 60;
var GRAVITY = .6;
var JUMP_FORCE = -12;
var BASE_SPEED = 5;
var SPEED_INCREMENT = .001;
function drawDino(ctx, x, y, frame, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x + 8, y, 24, 28);
	ctx.fillRect(x + 18, y - 16, 22, 20);
	ctx.save();
	ctx.globalCompositeOperation = "destination-out";
	ctx.fillRect(x + 32, y - 12, 4, 4);
	ctx.restore();
	ctx.fillRect(x + 34, y - 2, 6, 3);
	ctx.fillRect(x, y + 4, 10, 8);
	if (frame % 2 === 0) {
		ctx.fillRect(x + 12, y + 28, 6, 16);
		ctx.fillRect(x + 24, y + 28, 6, 12);
	} else {
		ctx.fillRect(x + 12, y + 28, 6, 12);
		ctx.fillRect(x + 24, y + 28, 6, 16);
	}
	ctx.fillRect(x + 6, y + 10, 4, 10);
}
function drawCactus(ctx, x, groundY, h, color) {
	ctx.fillStyle = color;
	const w = 14;
	ctx.fillRect(x, groundY - h, w, h);
	ctx.fillRect(x - 8, groundY - h + 12, 8, 6);
	ctx.fillRect(x - 8, groundY - h + 12, 4, 18);
	ctx.fillRect(x + w, groundY - h + 20, 8, 6);
	ctx.fillRect(x + w + 4, groundY - h + 10, 4, 16);
}
function drawCloud(ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 36, 6);
	ctx.fillRect(x + 4, y - 4, 28, 4);
	ctx.fillRect(x + 10, y - 8, 16, 4);
}
function DinoGame() {
	const canvasRef = (0, import_react.useRef)(null);
	const stateRef = (0, import_react.useRef)(null);
	const animRef = (0, import_react.useRef)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [gameOver, setGameOver] = (0, import_react.useState)(false);
	const [started, setStarted] = (0, import_react.useState)(false);
	const resetState = (0, import_react.useCallback)((canvas) => {
		const groundY = canvas.height - GROUND_Y_OFFSET;
		return {
			dino: {
				x: 60,
				y: groundY - DINO_H,
				vy: 0,
				grounded: true,
				frame: 0
			},
			cacti: [],
			clouds: [
				{
					x: 200,
					y: 30
				},
				{
					x: 460,
					y: 50
				},
				{
					x: 700,
					y: 20
				}
			],
			groundOffset: 0,
			speed: BASE_SPEED,
			score: 0,
			frameCount: 0,
			nextCactus: 120,
			gameOver: false,
			groundY
		};
	}, []);
	const startGame = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		stateRef.current = resetState(canvas);
		setScore(0);
		setGameOver(false);
		setStarted(true);
	}, [resetState]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		const style = getComputedStyle(document.documentElement);
		const ink = style.getPropertyValue("--ink")?.trim() || "#1a1a1a";
		const rule = style.getPropertyValue("--rule")?.trim() || "rgba(26,26,26,0.14)";
		style.getPropertyValue("--muted-foreground")?.trim();
		style.getPropertyValue("--background")?.trim();
		if (!stateRef.current) stateRef.current = resetState(canvas);
		const loop = () => {
			const s = stateRef.current;
			if (!s) return;
			const { groundY } = s;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = ink;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(0, groundY);
			ctx.lineTo(canvas.width, groundY);
			ctx.stroke();
			ctx.strokeStyle = rule;
			for (let i = 0; i < canvas.width + 20; i += 24) {
				const gx = ((i - s.groundOffset) % (canvas.width + 20) + (canvas.width + 20)) % (canvas.width + 20) - 10;
				ctx.beginPath();
				ctx.moveTo(gx, groundY + 4);
				ctx.lineTo(gx + 6, groundY + 4);
				ctx.stroke();
			}
			s.clouds.forEach((c) => drawCloud(ctx, c.x, c.y, rule));
			drawDino(ctx, s.dino.x, s.dino.y, s.dino.frame, ink);
			s.cacti.forEach((c) => drawCactus(ctx, c.x, groundY, c.h, ink));
			if (!started || s.gameOver) {
				animRef.current = requestAnimationFrame(loop);
				return;
			}
			s.frameCount++;
			s.speed = BASE_SPEED + s.frameCount * SPEED_INCREMENT;
			s.groundOffset = (s.groundOffset + s.speed) % (canvas.width + 20);
			if (!s.dino.grounded) {
				s.dino.vy += GRAVITY;
				s.dino.y += s.dino.vy;
				if (s.dino.y >= groundY - DINO_H) {
					s.dino.y = groundY - DINO_H;
					s.dino.vy = 0;
					s.dino.grounded = true;
				}
			}
			if (s.dino.grounded && s.frameCount % 6 === 0) s.dino.frame++;
			s.clouds.forEach((c) => {
				c.x -= s.speed * .3;
				if (c.x < -50) {
					c.x = canvas.width + Math.random() * 200;
					c.y = 15 + Math.random() * 50;
				}
			});
			s.nextCactus--;
			if (s.nextCactus <= 0) {
				s.cacti.push({
					x: canvas.width + 10,
					h: 28 + Math.random() * 24
				});
				s.nextCactus = 80 + Math.floor(Math.random() * 100);
			}
			s.cacti.forEach((c) => c.x -= s.speed);
			s.cacti = s.cacti.filter((c) => c.x > -30);
			const d = s.dino;
			for (const c of s.cacti) if (d.x + DINO_W - 8 > c.x && d.x + 8 < c.x + 14 && d.y + DINO_H > groundY - c.h) {
				s.gameOver = true;
				setGameOver(true);
				break;
			}
			if (!s.gameOver) {
				s.score++;
				if (s.score % 3 === 0) setScore(Math.floor(s.score / 3));
			}
			animRef.current = requestAnimationFrame(loop);
		};
		animRef.current = requestAnimationFrame(loop);
		return () => {
			if (animRef.current) cancelAnimationFrame(animRef.current);
		};
	}, [started, resetState]);
	(0, import_react.useEffect)(() => {
		const jump = () => {
			const s = stateRef.current;
			if (!s) return;
			if (s.gameOver) {
				startGame();
				return;
			}
			if (!started) {
				startGame();
				return;
			}
			if (s.dino.grounded) {
				s.dino.vy = JUMP_FORCE;
				s.dino.grounded = false;
			}
		};
		const onKey = (e) => {
			if (e.code === "Space" || e.code === "ArrowUp") {
				e.preventDefault();
				jump();
			}
		};
		window.addEventListener("keydown", onKey);
		const canvas = canvasRef.current;
		if (canvas) canvas.addEventListener("pointerdown", jump);
		return () => {
			window.removeEventListener("keydown", onKey);
			if (canvas) canvas.removeEventListener("pointerdown", jump);
		};
	}, [started, startGame]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 mx-auto max-w-[1400px] border-t border-rule px-6 py-16 md:px-10 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-6 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
				children: "Easter Egg — Take a break"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-none border border-rule bg-[var(--background)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						width: 800,
						height: 200,
						className: "w-full",
						style: {
							imageRendering: "pixelated",
							cursor: "pointer"
						}
					}),
					!started && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]",
							children: "Press Space or Tap to Start"
						})
					}),
					gameOver && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--background)]/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-semibold uppercase tracking-tight text-[var(--ink)]",
							children: "Game Over"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Press Space or Tap to Restart"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: "↑ / Space to Jump"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]",
					children: ["Score: ", String(score).padStart(5, "0")]
				})]
			})
		]
	});
}
/**
* ParticleField — a full-page canvas of tiny confetti-like particles
* that drift gently and get repelled by the mouse cursor.
*
* • Fixed behind all content (z-index 0, pointer-events none).
* • Particles drift slowly, then spring back to their home position.
* • On mouse proximity they push away with a smooth falloff.
* • Skipped on mobile / prefers-reduced-motion for perf.
*/
var PARTICLE_COUNT = 220;
var PARTICLE_SIZE = 2.8;
var REPEL_RADIUS = 140;
var REPEL_STRENGTH = 70;
var RETURN_SPEED = .05;
var DRIFT_SPEED = .14;
function ParticleField() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.innerWidth < 768) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let w = 0;
		let h = 0;
		let animId;
		const mouse = {
			x: -9999,
			y: -9999
		};
		const style = getComputedStyle(document.documentElement);
		const ink = style.getPropertyValue("--ink")?.trim() || "#1a1a1a";
		const palette = [
			style.getPropertyValue("--accent")?.trim() || "#c94c2b",
			ink,
			"#f5c542",
			"#5ac8fa",
			"#8b5cf6"
		];
		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			w = window.innerWidth;
			h = document.documentElement.scrollHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener("resize", resize);
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(document.documentElement);
		const particles = Array.from({ length: PARTICLE_COUNT }, () => {
			const homeX = Math.random() * w;
			const homeY = Math.random() * h;
			return {
				homeX,
				homeY,
				x: homeX,
				y: homeY,
				driftPhase: Math.random() * Math.PI * 2,
				driftAmplitude: 10 + Math.random() * 14,
				opacity: .16 + Math.random() * .24,
				size: PARTICLE_SIZE + Math.random() * 2.6,
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - .5) * .02,
				color: palette[Math.floor(Math.random() * palette.length)],
				shape: Math.random() < .5 ? "rect" : Math.random() < .8 ? "circle" : "triangle"
			};
		});
		const onMouseMove = (e) => {
			mouse.x = e.pageX;
			mouse.y = e.pageY;
		};
		const onMouseLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};
		window.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseleave", onMouseLeave);
		let time = 0;
		const loop = () => {
			time += .01;
			ctx.clearRect(0, 0, w, h);
			for (const particle of particles) {
				const driftX = Math.sin(time + particle.driftPhase) * DRIFT_SPEED * particle.driftAmplitude;
				const driftY = Math.cos(time * .7 + particle.driftPhase) * DRIFT_SPEED * particle.driftAmplitude;
				const targetX = particle.homeX + driftX;
				const targetY = particle.homeY + driftY;
				const dx = particle.x - mouse.x;
				const dy = particle.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				let repelX = 0;
				let repelY = 0;
				if (dist < REPEL_RADIUS && dist > 0) {
					const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
					repelX = dx / dist * force;
					repelY = dy / dist * force;
				}
				particle.x += (targetX + repelX - particle.x) * RETURN_SPEED;
				particle.y += (targetY + repelY - particle.y) * RETURN_SPEED;
				particle.rotation += particle.rotationSpeed;
				ctx.save();
				ctx.translate(particle.x, particle.y);
				ctx.rotate(particle.rotation);
				ctx.globalAlpha = particle.opacity;
				ctx.fillStyle = particle.color;
				if (particle.shape === "circle") {
					ctx.beginPath();
					ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
					ctx.fill();
				} else if (particle.shape === "triangle") {
					ctx.beginPath();
					ctx.moveTo(0, -particle.size);
					ctx.lineTo(particle.size, particle.size);
					ctx.lineTo(-particle.size, particle.size);
					ctx.closePath();
					ctx.fill();
				} else ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
				ctx.restore();
			}
			ctx.globalAlpha = 1;
			animId = requestAnimationFrame(loop);
		};
		animId = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseleave", onMouseLeave);
			resizeObserver.disconnect();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-0",
		style: {
			position: "absolute",
			top: 0,
			left: 0
		}
	});
}
/**
* Enables native smooth scrolling on the document (Lenis stand-in).
* Disabled automatically when the user prefers reduced motion.
*/
function useSmoothScroll() {
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const root = document.documentElement;
		const prev = root.style.scrollBehavior;
		root.style.scrollBehavior = "smooth";
		return () => {
			root.style.scrollBehavior = prev;
		};
	}, []);
}
function Index() {
	useSmoothScroll();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridLines, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DinoGame, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
		]
	});
}
//#endregion
export { Index as component };
