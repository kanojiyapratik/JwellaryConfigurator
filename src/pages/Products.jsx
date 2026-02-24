import { useEffect, useState } from 'react'
import api from '../api'
import ProductCard from '../components/ProductCard'

export default function Products(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [active, setActive] = useState('All')
  useEffect(()=>{
    api.get('/api/products').then(r=>setItems(r.data)).catch(()=>{})
  },[])
  return (
  <div className="w-full px-[2vw]">
      <h1 className="text-[3vh] font-bold mb-[2vh] heading">Products</h1>
      <div className="sticky-under-nav bg-ivory/80 backdrop-blur py-[1.6vh]">
        <div className="flex flex-wrap items-center gap-[1.2vh]">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search jewelry..." className="flex-1 min-w-[240px] border border-gray-300 rounded px-[1.6vh] py-[1.2vh] bg-white/80"/>
          <div className="flex flex-wrap gap-[1vh]">
            {['All','Rings','Necklaces','Earrings','Bracelets'].map(c => (
              <button key={c} onClick={()=>setActive(c)} className={`chip ${active===c? 'chip-active':''}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.2vh]">
        {items
          .filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()))
          .map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}
