import { useState } from 'react';
import { formatINR } from '../utils/currency';
import { solitaireData } from '../data/solitaire';
import { paveData } from '../data/pave';
import { haloData } from '../data/halo';
import { sidestoneData } from '../data/sidestone';
import { threestoneData } from '../data/threestone';

const jewelryTypes = [
  { key: 'solitaire', name: 'Solitaire', image: solitaireData.image, description: 'Classic single diamond', data: solitaireData },
  { key: 'pave', name: 'Pavé', image: paveData.image, description: 'Band covered with diamonds', data: paveData },
  { key: 'sidestone', name: 'Side Stone', image: sidestoneData.image, description: 'Center stone with accents', data: sidestoneData },
  { key: 'halo', name: 'Halo', image: haloData.image, description: 'Surrounded by smaller stones', data: haloData },
  { key: 'threestone', name: 'Three Stone', image: threestoneData.image, description: 'Past, present, and future', data: threestoneData }
];

export default function UnifiedConfigurator() {
  const [activeTab, setActiveTab] = useState('setting');
  const [selectedType, setSelectedType] = useState(jewelryTypes[0]);
  const [style, setStyle] = useState(null);
  const [metal, setMetal] = useState(null);
  const [shape, setShape] = useState(null);
  const [carat, setCarat] = useState(null);
  const [diamond, setDiamond] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const data = selectedType.data;
  const total = data.basePrice +
    (style?.price || 0) +
    (metal?.price || 0) +
    (shape?.price || 0) +
    (carat?.price || 0) +
    (diamond?.price || 0);

  // Use images array if available, otherwise fallback to previous logic
  const previewImages = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : [
        selectedType.image,
        style?.image || data.styles[0]?.image || '/images/hero1.jpg',
        metal?.image || '/images/hero2.jpg',
        shape?.image || '/images/hero3.jpg'
      ];

  const renderOptions = (options, selected, setSelected) => (
    <div className="grid grid-cols-3 gap-4">
      {Array.isArray(options) && options.map(opt => (
        <button 
          key={opt.name} 
          onClick={() => {
            setSelected(opt);
            setCurrentImage(1);
          }} 
          className={`bg-white border transition-all p-[22px] flex flex-row items-center group rounded-md ${selected?.name === opt.name ? 'border-gray-800 ring-2 ring-gray-800' : 'border-gray-200 hover:border-gray-800'}`}
        > 
          <div className="flex-shrink-0 bg-gray-50 rounded flex items-center justify-center mr-6" style={{height:'100px', width:'100px'}}>
            <img src={opt.image} alt={opt.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" style={{height:'80px', width:'80px'}} />
          </div>
          <div className="flex flex-col items-start justify-center flex-1">
            <div className="font-medium text-[22px] text-gray-800 mb-[4px]">{opt.name}</div>
            {opt.price > 0 && <div className="text-[16px] px-[8px] py-[3px] rounded-full bg-gray-100 text-gray-700">+ {formatINR(opt.price)}</div>}
          </div>
        </button>
      ))}
    </div>
  );

  const tabStates = [
    { key: 'setting', enabled: true },
    { key: 'style', enabled: true },
    { key: 'metal', enabled: !!style },
    { key: 'shape', enabled: !!metal },
    { key: 'carat', enabled: !!shape },
    { key: 'diamond', enabled: !!carat }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-ivory via-white to-blush">
      <div className="flex gap-3 px-8 py-4 border-b border-gold items-center bg-white/80 shadow-sm sticky top-0 z-10">
        <button className="px-4 py-2 text-sm border border-gold rounded-full text-gold bg-white hover:bg-gold hover:text-white transition">CARAT SIZES</button>
        <button className="w-10 h-10 text-lg border border-gray-300 rounded-full hover:bg-gray-100 flex items-center justify-center">♡</button>
        <button className="w-10 h-10 text-lg border border-gray-300 rounded-full hover:bg-gray-100 flex items-center justify-center">↓</button>
        <div className="flex-1"></div>
        <button className="px-5 py-2 text-sm border border-gold rounded-full text-gold bg-white hover:bg-gold hover:text-white transition">SAVE</button>
        <button className="w-10 h-10 text-lg border border-gray-300 rounded-full hover:bg-gray-100 flex items-center justify-center">↗</button>
      </div>

      <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-120px)] gap-0 md:gap-8 px-2 md:px-8 py-4 md:py-8">
        <div className="md:w-1/2 w-full bg-gradient-to-br from-blush via-white to-ivory flex items-center justify-center relative rounded-2xl shadow-lg p-4 md:p-8 mb-2 md:mb-0" style={{marginTop: '4px', height: '620px'}}>
          <button onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : previewImages.length - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-gold hover:text-charcoal w-12 h-12 flex items-center justify-center bg-white/80 rounded-full shadow transition">←</button>
          <div className="w-[80%] h-[80%] flex items-center justify-center">
            <img src={previewImages[currentImage]} alt="Ring preview" className="max-w-full max-h-full object-contain drop-shadow-xl rounded-xl" style={{width: '520px', height: '520px'}} />
          </div>
          <button onClick={() => setCurrentImage(prev => prev < previewImages.length - 1 ? prev + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-gold hover:text-charcoal w-12 h-12 flex items-center justify-center bg-white/80 rounded-full shadow transition">→</button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {previewImages.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)} className={`w-3 h-3 rounded-full border-2 border-gold transition ${i === currentImage ? 'bg-gold' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full overflow-y-auto bg-white/90 rounded-2xl shadow-lg p-4 md:p-8" style={{maxHeight: '620px', marginTop: '4px', overflowY: 'auto'}}>
          <div className="flex gap-4 mb-4 border-b border-gold" style={{maxHeight: '320px', marginTop: '-16px', overflowY: 'auto'}}>
            {tabStates.map(tab => (
              <button
                key={tab.key}
                disabled={!tab.enabled}
                onClick={() => tab.enabled && setActiveTab(tab.key)}
                className={tab.enabled 
                  ? `pb-3 px-4 text-base font-semibold border-b-4 -mb-px border-transparent text-gray-600 hover:text-gold hover:border-gold transition cursor-pointer ${activeTab === tab.key ? 'border-gold text-gold bg-blush/60' : ''}`
                  : `pb-3 px-4 text-base font-semibold border-b-4 -mb-px border-transparent text-gray-300 opacity-50 cursor-not-allowed`
                }
              >
                {tab.key === 'setting' ? 'SETTING' : tab.key.toUpperCase()}
              </button>
            ))}
          </div>

          {activeTab === 'setting' && (
            <div className="grid grid-cols-3 gap-4">
              {jewelryTypes.map((type) => (
                <button
                  key={type.key}
                  className={`bg-white border transition-all p-[22px] flex flex-row items-center group border-gray-200 hover:border-gray-800 ${selectedType.key === type.key ? 'border-gray-800 ring-2 ring-gray-800' : ''}`}
                  onClick={() => {
                    setSelectedType(type);
                    setStyle(null);
                    setMetal(null);
                    setShape(null);
                    setCarat(null);
                    setDiamond(null);
                    setActiveTab('style');
                    setCurrentImage(0);
                  }}
                >
                  <div className="flex-shrink-0 bg-gray-50 rounded flex items-center justify-center mr-6" style={{height:'100px', width:'100px'}}>
                    <img src={type.image} alt={type.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" style={{height:'80px', width:'80px'}} />
                  </div>
                  <div className="flex flex-col items-start justify-center flex-1">
                    <h3 className="font-medium text-[22px] text-gray-800 mb-[4px]">{type.name}</h3>
                    <div className="text-[16px] text-gray-400 mt-[2px]">{type.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'style' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Style</h2>
              <p className="text-sm text-gray-600 mb-6">Select the setting style</p>
              {renderOptions(data.styles, style, setStyle)}
            </div>
          )}

          {activeTab === 'metal' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Metal</h2>
              <p className="text-sm text-gray-600 mb-6">Select your preferred metal type</p>
              {style ? renderOptions(style.metals, metal, setMetal) : <div className="text-gray-400">Select a style first</div>}
            </div>
          )}

          {activeTab === 'shape' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Shape</h2>
              <p className="text-sm text-gray-600 mb-6">Select the diamond shape</p>
              {metal ? renderOptions(metal.shapes, shape, setShape) : <div className="text-gray-400">Select a metal first</div>}
            </div>
          )}

          {activeTab === 'carat' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Carat</h2>
              <p className="text-sm text-gray-600 mb-6">Select the carat weight</p>
              {shape ? renderOptions(shape.carats, carat, setCarat) : <div className="text-gray-400">Select a shape first</div>}
            </div>
          )}

          {activeTab === 'diamond' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Diamond Type</h2>
              <p className="text-sm text-gray-600 mb-6">Lab-grown or natural diamond</p>
              {carat ? renderOptions(carat.diamonds, diamond, setDiamond) : <div className="text-gray-400">Select a carat first</div>}
            </div>
          )}
        </div>
      </div>

      {style && metal && shape && carat && diamond && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
          <div className="w-full px-8 py-4 flex items-center gap-4 justify-between">
            <div className="text-xl font-bold text-gray-800">Total: {formatINR(total)}</div>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-sm border border-gray-800 rounded hover:bg-gray-50">Save Configuration</button>
              <button className="px-6 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
