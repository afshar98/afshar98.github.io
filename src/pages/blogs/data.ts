export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO or human string
  tags: string[];
  cover?: string;
  excerpt: string;
  contentHtml: string; // keep HTML to avoid extra deps
};

export const BLOGS: BlogPost[] = [
  {
    slug: "optimizing-react-bundles",
    title: "Optimizing React Bundles for Faster LCP",
    date: "2025-10-01",
    tags: ["React", "Performance", "LCP"],
    cover:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
    excerpt:
      "A practical walkthrough of code-splitting, route-level chunks, and preloading critical UI for better LCP.",
    contentHtml: `
      <p>Improving LCP starts with honest audits: shared deps, oversized pages, and blocking resources.</p>
      <p>Key steps:</p>
      <ul>
        <li>Route-level code-splitting &amp; dynamic imports</li>
        <li>Defer non-critical scripts and hydrate islands when visible</li>
        <li>Inline above-the-fold styles smartly (no global bloat)</li>
      </ul>
      <p>Bonus: measure with Web Vitals in production, not just lab.</p>
    `,
  },
  {
    slug: "designing-terminal-portfolios",
    title: "Designing Terminal-Driven Portfolios",
    date: "2025-09-18",
    tags: ["UX", "Design Systems", "DX"],
    cover:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&q=80",
    excerpt:
      "Why command-style navigation can delight power users—and how to keep it accessible for everyone else.",
    contentHtml: `
      <p>Terminal UIs can feel playful and fast if you respect affordances:</p>
      <ol>
        <li>Always show hints (autocomplete, examples like <code>cd resume</code>).</li>
        <li>Offer mouse-first alternatives for accessibility.</li>
        <li>Preserve history and support smart suggestions.</li>
      </ol>
    `,
  },
  {
    slug: "optimizing-react-bundles",
    title: "Optimizing React Bundles for Faster LCP",
    date: "2025-10-01",
    tags: ["React", "Performance", "LCP"],
    cover:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
    excerpt:
      "A practical walkthrough of code-splitting, route-level chunks, and preloading critical UI for better LCP.",
    contentHtml: `
      <p>Improving LCP starts with honest audits: shared deps, oversized pages, and blocking resources.</p>
      <p>Key steps:</p>
      <ul>
        <li>Route-level code-splitting &amp; dynamic imports</li>
        <li>Defer non-critical scripts and hydrate islands when visible</li>
        <li>Inline above-the-fold styles smartly (no global bloat)</li>
      </ul>
      <p>Bonus: measure with Web Vitals in production, not just lab.</p>
    `,
  },
];
