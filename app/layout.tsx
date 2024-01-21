import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navigation/Navbar'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentuser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ivan Hause',
  description: 'Online house renting',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <SearchModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
