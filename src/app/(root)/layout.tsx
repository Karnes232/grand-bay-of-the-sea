// Pass-through layout. The single <html>/<head>/<body> for public pages is
// rendered by (root)/[locale]/layout.tsx (which sets lang per locale). Rendering
// html/body here too produced invalid, duplicated document markup on every page.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
