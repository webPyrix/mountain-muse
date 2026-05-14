import './globals.css'
// import Nav from '@/components/layout/Nav.js'

// fonts
import { playfair, poppins } from '@/libs/Fonts';

export const metadata = {
  title: 'Mountain Muse',
  description: 'Creative Model Agency',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.className}>
      <body className={poppins.className}>
        {/* <Nav /> */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}