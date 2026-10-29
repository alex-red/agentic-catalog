// Catalog glyphs: a shared 20-unit grid, open geometry and a 1.5-unit stroke.
// Shapes carry meaning independently of color; adjacent text supplies the label.
const paths: Record<string, string> = {
  skill: "M6 2.75h8l3.25 3.25v8L14 17.25H6L2.75 14V6L6 2.75Z M11 6l-4 5h3l-1 3 4-5h-3l1-3Z",
  rule: "M6 3.5H3.5v13H6 M14 3.5h2.5v13H14 M7.5 7h5 M7.5 10h5 M7.5 13h3",
  workflow: "M3 3.5h5v5H3z M12 11.5h5v5h-5z M8 6h5.5v3 M11.5 7.5l2 2 2-2 M6 8.5V14h6",
  hook: "M5 3.5v8a5 5 0 0 0 10 0V7 M12 9.5 15 7l2 2.5 M3 3.5h4",
  subagent: "M7.5 3h5v5h-5z M3 13h5v4H3z M12 13h5v4h-5z M10 8v2.5 M5.5 13v-2.5h9V13",
  mcp: "M3 7h4v6H3z M13 7h4v6h-4z M7 10h6 M4 4.5v-2 M6 4.5v-2 M14 15.5v2 M16 15.5v2",
  plugin: "M7 3h6v4h4v6h-4v4H7v-4H3V7h4V3Z M8.5 10h3",
  tool: "M11 3a4.5 4.5 0 0 0-5 6L3 12a3 3 0 0 0 4 4l3-3a4.5 4.5 0 0 0 6-5l-3 3-4-4 3-3 M5 14.5l.5-.5",
  collection: "M3 6.5 10 3l7 3.5-7 3.5-7-3.5Z M3 10l7 3.5 7-3.5 M3 13.5l7 3.5 7-3.5",
  featured: "m10 2 2.5 5.5L18 10l-5.5 2.5L10 18l-2.5-5.5L2 10l5.5-2.5L10 2Z",
  custom: "M4 14.5V17h2.5l9-9L13 5.5l-9 9Z M11.5 7l2.5 2.5 M4 7V3 M2 5h4 M12 15h5",
  experimental: "M7 3h6 M8 3v5l-4.5 7a1.5 1.5 0 0 0 1.3 2h10.4a1.5 1.5 0 0 0 1.3-2L12 8V3 M6 12h8 M8 14.5h.01 M11 15h.01",
  "game-design": "M6 6h8a3 3 0 0 1 3 2.5l1 5a2 2 0 0 1-3.3 1.8L12.5 13h-5l-2.2 2.3A2 2 0 0 1 2 13.5l1-5A3 3 0 0 1 6 6Z M6 8.5v4 M4 10.5h4 M13 9h.01 M15 11h.01",
  "system-design": "M3 3h14v14H3z M3 8h14 M8 8v9 M11 11h3v3h-3z",
  "dev-ux": "M3 4h14v12H3z M3 7h14 M6 10l2 2-2 2 M10.5 14H14",
};

export function catalogIcon(kind: string): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("catalog-icon");
  svg.dataset.kind = kind;
  const path = document.createElementNS(svg.namespaceURI, "path");
  path.setAttribute("d", paths[kind] ?? paths.collection);
  svg.append(path);
  return svg;
}
