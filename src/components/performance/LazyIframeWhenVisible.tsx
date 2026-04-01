"use client"

import { useEffect, useRef, useState } from "react"

type Props = Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, "src"> & {
  src: string
  /** e.g. "400px" — start loading before the iframe enters the viewport */
  rootMargin?: string
}

/**
 * Defers third-party iframe network + JS until the embed is near the viewport.
 */
export default function LazyIframeWhenVisible({
  src,
  title,
  className,
  rootMargin = "320px",
  ...iframeProps
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  const h = iframeProps.height
  const minHeight =
    typeof h === "number"
      ? h
      : typeof h === "string"
        ? parseInt(h, 10) || undefined
        : undefined

  return (
    <div ref={wrapRef} className="w-full">
      {active ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className={className}
          {...iframeProps}
        />
      ) : (
        <div
          className={`${className ?? ""} bg-slate-800/20 animate-pulse`}
          aria-hidden
          style={{
            ...iframeProps.style,
            ...(minHeight != null && Number.isFinite(minHeight)
              ? { minHeight }
              : {}),
          }}
        />
      )}
    </div>
  )
}
