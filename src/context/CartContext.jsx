import { createContext, useContext, useEffect, useState } from 'react'

const CartCtx = createContext()
export function CartProvider({ children }){
  const [items, setItems] = useState([])
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem('cart')||'[]')) },[])
  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(items)) },[items])
  const add = (item)=> setItems(prev=>[...prev, item])
  const remove = (id)=> setItems(prev=> prev.filter(i=>i.id!==id))
  const clear = ()=> setItems([])
  const total = items.reduce((a,i)=> a + (i.total||0), 0)
  return <CartCtx.Provider value={{ items, add, remove, clear, total }}>{children}</CartCtx.Provider>
}
export const useCart = ()=> useContext(CartCtx)
