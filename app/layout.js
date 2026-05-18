export const metadata = {
  title: 'ScopeCreep — Spot scope creep before it kills your project',
  description: 'Spot scope creep before it kills your project',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </head>
      <body style={{margin:0,padding:0,fontFamily:'Inter,sans-serif'}}>{children}</body>
    </html>
  )
}
