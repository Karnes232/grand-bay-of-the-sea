/**
 * Sticky share column (2026 redesign) — server-rendered anchor links, no JS.
 * Facebook / X / WhatsApp share intents for the given absolute post URL.
 */
const ShareLinks = ({ url, label }: { url: string; label: string }) => {
  const enc = encodeURIComponent(url)
  const links = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      label: "Facebook",
      path: "M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z",
    },
    {
      href: `https://twitter.com/intent/tweet?url=${enc}`,
      label: "X",
      path: "M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.8-8.9L1.5 2h6.8l4.7 6.2L18.9 2zm-2.3 18h1.7L7.5 3.8H5.7L16.6 20z",
    },
    {
      href: `https://wa.me/?text=${enc}`,
      label: "WhatsApp",
      path: "M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4zm4.5 10.3c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2c.2-.5.2-1 .1-1.1s-.2-.2-.4-.3z",
    },
  ]

  return (
    <aside className="flex flex-row flex-wrap items-center gap-[10px] lg:sticky lg:top-24 lg:flex-col lg:items-start lg:border-l lg:border-line lg:pl-5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-faint lg:mb-0.5 lg:w-full">
        {label}
      </span>
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${l.label}`}
          className="grid h-[44px] w-[44px] place-items-center rounded-[12px] border-[1.5px] border-line-strong text-muted transition-all hover:border-accent hover:bg-accent hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d={l.path} />
          </svg>
        </a>
      ))}
    </aside>
  )
}

export default ShareLinks
