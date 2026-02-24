import { useEffect, useState } from 'react'

const slides = [
  { id: 1, src: '/images/hero1.jpg', alt: 'Elegant Ring' },
  { id: 2, src: '/images/hero2.jpg', alt: 'Luxury Necklace' },
  { id: 3, src: '/images/hero3.jpg', alt: 'Classic Earrings' },
]

export default function Hero(){
  const [idx, setIdx] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setIdx(i => (i+1)%slides.length), 5000)
    return ()=> clearInterval(t)
  },[])
  return (
  <section className="relative w-full hero-fit overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={slides[idx]?.src || '/vite.svg'}
          alt={slides[idx]?.alt || 'featured'}
          className="w-full h-full object-cover"
        />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(27,27,27,0.5) 0%, rgba(27,27,27,0.32) 42%, rgba(27,27,27,0.14) 78%)' }} />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="px-[4vw] md:px-[6vw] max-w-[1100px]">
          <div className="mb-[2vh] eyebrow text-ivory text-shadow">Fine Jewelry</div>
          <h1 className="heading text-[5vh] md:text-[7vh] leading-[1.05] text-ivory text-shadow max-w-[70ch] mb-[2vh]">
            Exquisite Jewelry, Crafted with Care
          </h1>
          <p className="text-ivory/90 text-shadow-sm text-[2vh] md:text-[2.2vh] max-w-[75ch] mb-[3vh]">
            Design your perfect piece or choose from our curated collection. Luxury that lasts.
          </p>
          <div className="flex gap-[1.4vh]">
            <a href="/products" className="btn btn-primary">Shop Collection</a>
            <a href="/unified-configurator" className="btn btn-outline" style={{borderColor:'#faf9f6', color:'#faf9f6'}}>Customize</a>
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-[2.4vh] left-1/2 -translate-x-1/2 flex gap-[0.9vh] z-10">
        {slides.map((s,i)=> (
          <button key={s.id} aria-label={`Go to slide ${i+1}`} onClick={()=>setIdx(i)} className={`h-[0.9vh] w-[0.9vh] rounded-full ${i===idx? 'bg-ivory':'bg-ivory/80'}`}/>
        ))}
      </div>
    </section>
  )
}
