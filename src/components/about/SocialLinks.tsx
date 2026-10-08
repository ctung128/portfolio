import { siteConfig } from "@/content/site";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[18px]">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[17px]">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

const linkClass = "text-ink-soft transition-colors hover:text-ink";

export function SocialLinks() {
  return (
    <div className="mt-6 flex items-center gap-5 font-sans text-base">
      <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={linkClass}>
        <LinkedInIcon />
      </a>
      <a href={siteConfig.x} target="_blank" rel="noreferrer" aria-label="X" className={linkClass}>
        <XIcon />
      </a>
      <span aria-hidden className="h-5 w-px bg-border" />
      <a href={siteConfig.curius} target="_blank" rel="noreferrer" className={linkClass}>
        Curius
      </a>
      <a
        href={siteConfig.resume}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-1.5 ${linkClass}`}
      >
        <DocumentIcon />
        Resume
      </a>
    </div>
  );
}
