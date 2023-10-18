import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './navbar/page.js'
import { Container } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PersonalBook',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar></Navbar>
      <Container className='main'>
      {children}
      </Container>
      </body>
    </html>
  )
}
