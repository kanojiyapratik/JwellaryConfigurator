import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ImageCarousel({ images = [] }){
  const [idx, setIdx] = useState(0)
  const has = images && images.length > 0
  const go = (d)=> setIdx(i => (i + d + (images?.length||1)) % (images?.length||1))
  const src = has ? images[idx] : '/vite.svg'
  return (
    <div className="relative w-full h-[56vh] bg-white rounded shadow flex items-center justify-center">
      <button aria-label="Prev" onClick={()=>go(-1)} className="absolute left-[1vw] p-[1vh] rounded-full bg-white/80 hover:bg-white border">
        <ChevronLeftIcon className="h-[3vh] w-[3vh]"/>
      </button>
      <img src={src} alt="preview" className="max-h-[48vh] object-contain" />
      <button aria-label="Next" onClick={()=>go(1)} className="absolute right-[1vw] p-[1vh] rounded-full bg-white/80 hover:bg-white border">
        <ChevronRightIcon className="h-[3vh] w-[3vh]"/>
      </button>
      {has && (
        <div className="absolute bottom-[1.6vh] flex gap-[0.8vh]">
          {images.map((_,i)=> (
            <span key={i} className={`inline-block h-[0.9vh] w-[0.9vh] rounded-full ${i===idx? 'bg-charcoal':'bg-gray-300'}`}/>
          ))}
        </div>
      )}
    </div>
  )
}
