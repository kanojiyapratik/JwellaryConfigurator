import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatINR } from '../utils/currency'
import { useCart } from '../context/CartContext'

export default function Product(){
  // Demo product (static, since no backend)
  const { id } = useParams()
  const { add } = useCart()
  const demoProducts = [
    { _id: '1', name: 'Classic Solitaire', image: '/images/solitaire/solitare-preview.jpg', price: 2500, description: 'A timeless solitaire ring.' },
    { _id: '2', name: 'Pavé Band', image: '/images/pave/pave-preview.jpg', price: 3200, description: 'A sparkling pavé band.' },
    { _id: '3', name: 'Halo Ring', image: '/images/halo/halo-preview.jpg', price: 4100, description: 'A dazzling halo ring.' }
  ]
  const p = demoProducts.find(prod => prod._id === id) || demoProducts[0]
  return (
    <div className="w-full grid md:grid-cols-2 gap-[2.2vh] px-[2vw]">
      <img src={p.image||'/vite.svg'} alt={p.name} className="w-full rounded max-h-[60vh] object-contain" />
      <div>
        <h1 className="text-[3vh] font-bold">{p.name}</h1>
        <div className="text-[2.2vh] text-green-600 my-[1vh]">{formatINR(p.price)}</div>
        <p className="text-gray-700">{p.description}</p>
        <button onClick={()=>add({ id: Date.now(), productId: p._id, name: p.name, total: p.price })} className="mt-[2vh] bg-black text-white px-[2vh] py-[1.6vh] rounded">Add to cart</button>
      </div>
    </div>
  )
}
