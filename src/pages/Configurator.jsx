import { useEffect, useMemo, useState } from 'react'
// Using a sample configuration for one product as requested
import { useCart } from '../context/CartContext'
import ImageCarousel from '../components/configurator/ImageCarousel'
import Tabs from '../components/configurator/Tabs'
import OptionCard from '../components/configurator/OptionCard'
import ActionBar from '../components/configurator/ActionBar'

export default function Configurator(){
  const SAMPLE_CATS = [
    { key: 'setting', name: 'SETTING', options: [
      { id: 'sol', name: 'Solitaire', price: 0, image: '/images/hero1.jpg' },
      { id: 'pave', name: 'Pavé', price: 200, image: '/images/hero2.jpg' },
      { id: 'sidestones', name: 'Side Stones', price: 350, image: '/images/hero3.jpg' },
      { id: 'halo', name: 'Hidden Halo', price: 400, image: '/images/hero1.jpg' },
    ]},
    { key: 'style', name: 'STYLE', options: [
      { id: 'classic', name: 'Classic', price: 0 },
      { id: 'modern', name: 'Modern', price: 50 },
      { id: 'vintage', name: 'Vintage', price: 80 },
    ]},
    { key: 'metal', name: 'METAL', options: [
      { id: 'yg18', name: '18k Yellow Gold', price: 0 },
      { id: 'wg18', name: '18k White Gold', price: 100 },
      { id: 'pt', name: 'Platinum', price: 250 },
    ]},
    { key: 'shape', name: 'SHAPE', options: [
      { id: 'round', name: 'Round', price: 0 },
      { id: 'emerald', name: 'Emerald', price: 0 },
      { id: 'oval', name: 'Oval', price: 0 },
    ]},
    { key: 'carat', name: 'CARAT', options: [
      { id: '05', name: '0.50 ct', price: 1200 },
      { id: '10', name: '1.00 ct', price: 2500 },
      { id: '15', name: '1.50 ct', price: 4200 },
    ]},
    { key: 'diamond', name: 'DIAMOND', options: [
      { id: 'lab', name: 'Lab Grown', price: 0 },
      { id: 'natural', name: 'Natural', price: 800 },
    ]},
  ]

  const [cats, setCats] = useState(SAMPLE_CATS)
  const [activeKey, setActiveKey] = useState('setting')
  // Preselect Solitaire
  const [sel, setSel] = useState({ setting: SAMPLE_CATS[0].options[0] })

  useEffect(()=>{ setCats(SAMPLE_CATS) },[])

  const toggle = (catKey, option)=>{
    setSel(s=>({ ...s, [catKey]: option }))
  }

  const basePrice = 2500 // sample base for ring setting
  const total = useMemo(()=> basePrice + Object.values(sel).reduce((acc,o)=>acc + (o?.price||0), 0), [sel])
  const { add } = useCart()
  const addToCart = ()=>{ add({ id: Date.now(), selections: sel, total }); alert('Added to cart') }

  // Progressive unlock: you must select current tab to enable the next
  const progressIndex = cats.findIndex(c => !sel[c.key])
  const tabs = cats.map((c, i)=> ({ key: c.key, label: c.name, disabled: i>progressIndex && progressIndex!==-1 }))
  useEffect(()=>{
    // If current tab gets disabled due to changes, move back to the first incomplete
    const activeIdx = cats.findIndex(c=>c.key===activeKey)
    if(progressIndex !== -1 && activeIdx > progressIndex){
      setActiveKey(cats[progressIndex].key)
    }
  },[sel])

  const onNext = ()=>{
    const keys = cats.map(c=>c.key)
    const idx = keys.indexOf(activeKey)
    if(idx > -1 && idx < keys.length - 1){
      setActiveKey(keys[idx+1])
    } else {
      addToCart()
    }
  }

  return (
    <div className="w-full px-[2vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0]">
        <div className="p-[2vh] flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-[1vh]">
            <div className="flex gap-[1vh]">
              <button className="btn btn-outline btn-pill">Carat Sizes</button>
            </div>
            <div className="flex items-center gap-[1vh]">
              <button className="btn btn-outline btn-pill" title="Wishlist">♡</button>
              <button className="btn btn-outline btn-pill" title="Share">↗</button>
            </div>
          </div>
          {/* Show preview of selected setting (Solitaire) */}
          <div className="w-full flex flex-col items-center">
            <img src={sel.setting?.image || '/images/hero1.jpg'} alt={sel.setting?.name || 'Preview'} className="rounded-xl shadow-lg object-cover w-[32vh] h-[32vh] mb-[2vh]" />
            <div className="font-semibold text-[2vh] text-charcoal">{sel.setting?.name || 'Solitaire'}</div>
          </div>
        </div>
        <div className="bg-blush p-[2vh]">
          <Tabs tabs={tabs} active={activeKey} onChange={setActiveKey} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1vh] max-h-[52vh] overflow-auto pr-[1vh]">
            {cats.find(c=>c.key===activeKey)?.options?.map(o=> (
              <OptionCard 
                key={o.id} 
                option={o} 
                selected={sel[activeKey]?.id===o.id} 
                onSelect={()=>toggle(activeKey, o)} 
                style={{ minHeight: '8vh', maxWidth: '18vh', fontSize: '1.4vh', padding: '1vh' }}
              />
            ))}
          </div>
          <div className="flex items-center justify-end mt-[1vh]">
            <button className="btn btn-outline btn-pill">Save</button>
          </div>
        </div>
      </div>
      <ActionBar total={total} onNext={onNext} canProceed={!!sel[activeKey]} selections={sel} />
    </div>
  )
}
