import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useCart } from '../context/CartContext'
import Navbar from './Navbar'
import AnnouncementBar from './AnnouncementBar'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { items } = useCart()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
  <AnnouncementBar />
  <Navbar />
  <main className={`flex-1 w-full ${onHome? 'pt-0 pb-[4vh]':'py-[4vh]'}`}>{children}</main>
      <Footer />
    </div>
  )
}
