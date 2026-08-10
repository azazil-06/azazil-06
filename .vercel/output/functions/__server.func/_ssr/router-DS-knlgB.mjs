import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as MotionConfig, i as motion, n as useSpring, r as useMotionValue } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DS-knlgB.js
var router_DS_knlgB_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomCursor() {
	const [isHovering, setIsHovering] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)("");
	const [visible, setVisible] = (0, import_react.useState)(true);
	const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
	const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
	const ringX = useSpring(mouseX, {
		stiffness: 150,
		damping: 25,
		mass: .5
	});
	const ringY = useSpring(mouseY, {
		stiffness: 150,
		damping: 25,
		mass: .5
	});
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.innerWidth < 768) return;
		document.documentElement.style.cursor = "none";
		const onMove = (e) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
			if (!visible) setVisible(true);
		};
		const onLeave = (e) => {
			if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) setVisible(false);
		};
		const onEnter = () => setVisible(true);
		const onOver = (e) => {
			const el = e.target.closest("a, button, [role='button'], .cursor-pointer, .group");
			if (el) {
				setIsHovering(true);
				if ((el.getAttribute("aria-label") || "").includes("GitHub") || el.closest("[class*='project']")) setLabel("View");
				else setLabel("");
			}
		};
		const onOut = (e) => {
			if (e.target.closest("a, button, [role='button'], .cursor-pointer, .group")) {
				setIsHovering(false);
				setLabel("");
			}
		};
		window.addEventListener("mousemove", onMove);
		document.addEventListener("mouseleave", onLeave);
		document.addEventListener("mouseenter", onEnter);
		document.addEventListener("mouseover", onOver);
		document.addEventListener("mouseout", onOut);
		return () => {
			document.documentElement.style.cursor = "";
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			document.removeEventListener("mouseenter", onEnter);
			document.removeEventListener("mouseover", onOver);
			document.removeEventListener("mouseout", onOut);
		};
	}, [
		visible,
		mouseX,
		mouseY
	]);
	if (typeof window !== "undefined" && window.innerWidth < 768) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0",
		style: {
			zIndex: 9999,
			opacity: visible ? 1 : 0,
			transition: "opacity 0.2s"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					position: "fixed",
					top: -3,
					left: -3,
					x: mouseX,
					y: mouseY,
					width: isHovering ? 4 : 6,
					height: isHovering ? 4 : 6,
					borderRadius: "50%",
					backgroundColor: "var(--accent)"
				},
				animate: {
					width: isHovering ? 4 : 6,
					height: isHovering ? 4 : 6,
					top: isHovering ? -2 : -3,
					left: isHovering ? -2 : -3
				},
				transition: {
					type: "tween",
					duration: .2
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					position: "fixed",
					top: -18,
					left: -18,
					x: ringX,
					y: ringY,
					width: 36,
					height: 36,
					borderRadius: "50%",
					border: "1.5px solid var(--ink)",
					opacity: label ? 0 : .5
				},
				animate: {
					scale: isHovering ? 2.2 : 1,
					opacity: label ? 0 : .5
				},
				transition: {
					type: "tween",
					duration: .2
				}
			}),
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					position: "fixed",
					top: -36,
					left: -36,
					x: ringX,
					y: ringY,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 72,
					height: 72,
					borderRadius: "50%",
					backgroundColor: "var(--ink)",
					color: "var(--background)",
					fontFamily: "var(--font-mono)",
					fontSize: 10,
					fontWeight: 600,
					textTransform: "uppercase",
					letterSpacing: "0.12em"
				},
				initial: {
					scale: .5,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					type: "spring",
					stiffness: 300,
					damping: 20
				},
				children: label
			})
		]
	});
}
var styles_default = "/assets/styles-DBQa5oJC.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Arjun — Developer, Game Dev & Robotics" },
			{
				name: "description",
				content: "Portfolio of Arjun, a developer and maker from Kerala building games, robots, creative AI tooling and full-stack projects."
			},
			{
				name: "author",
				content: "Arjun"
			},
			{
				property: "og:title",
				content: "Arjun — Games, Robots & Full-Stack Tools"
			},
			{
				property: "og:description",
				content: "Swiss-style portfolio of a maker from Kerala, India."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionConfig, {
			reducedMotion: "user",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
		})
	});
}
var $$splitComponentImporter = () => import("./routes-AAJzjalF.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Arjun — Developer, Game Dev & Robotics" },
		{
			name: "description",
			content: "Portfolio of Arjun, a developer and maker from Kerala building games, robots, creative AI tooling and full-stack projects."
		},
		{
			property: "og:title",
			content: "Arjun — Games, Robots & Full-Stack Tools"
		},
		{
			property: "og:description",
			content: "Swiss-style portfolio: Unity game dev, ESP32 robotics, creative AI tooling and full-stack builds."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter, router_DS_knlgB_exports as t };
