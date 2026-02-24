import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const transparent = false
  const [mega, setMega] = useState(null) // 'jewelry' | null
  return (
  <nav className={`bg-ivory sticky top-0 z-30 w-full relative`} onMouseLeave={()=>setMega(null)}>
  <div className="w-full h-[9vh] min-h-[60px] flex items-center justify-between px-[2vw]">
        <div className="flex items-center gap-6">
          <button className="md:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>
            {open? <XMarkIcon className="h-6 w-6"/> : <Bars3Icon className="h-6 w-6"/>}
          </button>
          <Link to="/" className="leading-tight">
            <div className={`heading text-[2.6vh] tracking-tight text-charcoal`}>JEWELRY SHOP</div>
            <div className={`text-gray-600 text-[1.3vh] italic`}>since 1976</div>
          </Link>
          <div className={`hidden md:flex items-center gap-[2vw] uppercase tracking-[0.14em] text-[1.5vh] text-charcoal`}>
            <Link to="/products" className="hover:opacity-70">Engagement + Wedding</Link>
            <Link to="/unified-configurator" className="hover:opacity-70">Design Your Ring</Link>
            <div className="relative" onMouseEnter={()=>setMega('jewelry')}>
              <Link to="/products" className="hover:opacity-70">Jewelry</Link>
            </div>
            <Link to="/admin" className="hover:opacity-70">About Us</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className={`hidden md:inline text-[1.6vh] text-gray-700`}>Sign In | Sign Up</Link>
          <button aria-label="Wishlist" className="hidden md:inline-flex"><HeartIcon className={`h-6 w-6 text-gray-700`}/></button>
          <button aria-label="Search" className="hidden md:inline-flex"><MagnifyingGlassIcon className={`h-6 w-6 text-gray-700`}/></button>
          <Link to="/cart" className={`relative inline-flex items-center gap-1 text-charcoal`}>
            <ShoppingBagIcon className="h-6 w-6"/>
            <span className="text-sm">({items.length})</span>
          </Link>
          <a href="#appointment" className={`hidden md:inline-flex rounded-full btn-dark`}>Book an appointment</a>
        </div>
      </div>
      {/* Mega menu */}
      {mega==='jewelry' && (
        <div className="absolute inset-x-0 top-full bg-white border-t shadow-xl z-40">
          <div className="px-[2vw] py-[3vh] grid grid-cols-12 gap-[2vw]">
            <div className="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-[2vw]">
              <div>
                <div className="menu-heading mb-[1.2vh]">Curated Collections</div>
                <a href="#" className="menu-link">September Birthstones</a>
                <a href="#" className="menu-link">Back To The City</a>
                <a href="#" className="menu-link">Classic Diamond Essentials</a>
                <a href="#" className="menu-link">Bold Gold</a>
                <a href="#" className="menu-link">Light Layers</a>
                <a href="#" className="menu-link">Our Best-Sellers</a>
              </div>
              <div>
                <div className="menu-heading mb-[1.2vh]">Shop by Stone</div>
                <a href="/products?stone=diamond" className="menu-link">Diamond</a>
                <a href="/products?stone=sapphire" className="menu-link">Sapphire</a>
                <a href="/products?stone=emerald" className="menu-link">Emerald</a>
                <a href="/products?stone=pearl" className="menu-link">Pearl</a>
                <a href="/products?stone=ruby" className="menu-link">Ruby</a>
                <a href="/products?stone=opal" className="menu-link">Opal</a>
              </div>
              <div>
                <div className="menu-heading mb-[1.2vh]">Shop by Category</div>
                <a href="/products?category=rings" className="menu-link">Rings</a>
                <a href="/products?category=necklaces" className="menu-link">Necklaces</a>
                <a href="/products?category=earrings" className="menu-link">Earrings</a>
                <a href="/products?category=bracelets" className="menu-link">Bracelets</a>
                <a href="/products?category=chains" className="menu-link">Chains</a>
                <a href="/products?category=charms" className="menu-link">Charms</a>
              </div>
            </div>
            <div className="hidden md:block col-span-3">
              <div className="bg-gray-100 rounded overflow-hidden h-full flex items-end">
                <div className="p-[2vh]">
                  <div className="menu-heading mb-[0.8vh]">Featured</div>
                  <div className="text-[1.6vh] mb-[1vh]">Discover our seasonal capsule</div>
                  <a href="/products" className="btn btn-primary">Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {open && (
        <div className={`md:hidden border-t bg-white`}>
          <div className="container py-3 grid gap-3">
            <Link to="/products" onClick={()=>setOpen(false)}>Engagement + Wedding</Link>
            <Link to="/unified-configurator" onClick={()=>setOpen(false)}>Design Your Ring</Link>
            <Link to="/products" onClick={()=>setOpen(false)}>Jewelry</Link>
            <Link to="/admin" onClick={()=>setOpen(false)}>About Us</Link>
            <Link to="/login" onClick={()=>setOpen(false)}>Sign In / Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
