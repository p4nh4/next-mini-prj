import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AQUA',
  description: 'create by istad-er',
  thumbnail: 'https://i.pinimg.com/564x/82/22/93/8222935b6eb4e2852db3b304a99bf309.jpg',
  openGraph: {
    images: ['https://i.pinimg.com/564x/82/22/93/8222935b6eb4e2852db3b304a99bf309.jpg'],
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar/> */}
        {children}
        {/* <Footer/> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        </body>
    </html>
  )
}
