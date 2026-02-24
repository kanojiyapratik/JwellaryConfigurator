import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { formatINR } from '../utils/currency'
import { useCart } from '../context/CartContext'

export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{ api.get(`/api/products/${id}`).then(r=>setP(r.data)).catch(()=>{}) },[id])
  const { add } = useCart()
  if(!p) return <div>Loading...</div>
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
