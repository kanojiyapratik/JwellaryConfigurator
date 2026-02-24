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

  const previewImages = [
    selectedType.image,
    style?.image || data.styles[0]?.image || '/images/hero1.jpg',
    metal?.image || '/images/hero2.jpg',
    shape?.image || '/images/hero3.jpg'
  ];

  const renderOptions = (options, selected, setSelected) => (
    <div className="grid grid-cols-3 gap-2">
      {Array.isArray(options) && options.map(opt => (
        <button 
          key={opt.name} 
          onClick={() => {
            setSelected(opt);
            setCurrentImage(1);
          }} 
          className={`bg-white border transition-all p-[4px] flex flex-row items-center group rounded-md
            ${selected?.name === opt.name ? 'border-gray-800 ring-2 ring-gray-800' : 'border-gray-200 hover:border-gray-800'}`}
        > 
          <div className="flex-shrink-0 bg-gray-50 rounded flex items-center justify-center mr-3" style={{height:'32px', width:'32px'}}>
            <img src={opt.image} alt={opt.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" style={{height:'22px', width:'22px'}} />
          </div>
          <div className="flex flex-col items-start justify-center flex-1">
            <div className="font-medium text-[12px] text-gray-800 mb-[2px]">{opt.name}</div>
            {opt.price > 0 && <div className="text-[10px] px-[4px] py-[1px] rounded-full bg-gray-100 text-gray-700">+ {formatINR(opt.price)}</div>}
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
  const visibleTabs = tabStates;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex gap-2 px-4 py-2 border-b border-gray-200 items-center">
        <button className="px-3 py-1.5 text-xs border border-gray-800 rounded text-gray-800 hover:bg-gray-50">CARAT SIZES</button>
        <button className="w-8 h-8 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center">♡</button>
        <button className="w-8 h-8 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center">↓</button>
        <div className="flex-1"></div>
        <button className="px-4 py-1.5 text-xs border border-gray-800 rounded text-gray-800 hover:bg-gray-50">SAVE</button>
        <button className="w-8 h-8 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center">↗</button>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left side - Image preview */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center relative">
          <button onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : previewImages.length - 1)} className="absolute left-4 text-2xl text-gray-400 hover:text-gray-800 w-10 h-10 flex items-center justify-center">←</button>
          <div className="w-[70%] h-[70%] flex items-center justify-center">
            <img src={previewImages[currentImage]} alt="Ring preview" className="max-w-full max-h-full object-contain" />
          </div>
          <button onClick={() => setCurrentImage(prev => prev < previewImages.length - 1 ? prev + 1 : 0)} className="absolute right-4 text-2xl text-gray-400 hover:text-gray-800 w-10 h-10 flex items-center justify-center">→</button>
          <div className="absolute bottom-8 flex gap-2">
            {previewImages.map((_, i) => (
              <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition ${i === currentImage ? 'bg-gray-800' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {/* Right side - Tabs and Options */}
        <div className="w-1/2 overflow-y-auto bg-white">
          <div className="px-8 py-6">
            <div className="flex gap-6 mb-6 border-b border-gray-200">
              {visibleTabs.map(tab => (
                  <button
                    key={tab.key}
                    disabled={!tab.enabled}
                    onClick={() => tab.enabled && setActiveTab(tab.key)}
                    className={tab.enabled 
                      ? `pb-3 text-sm font-medium border-b-2 -mb-px border-transparent text-gray-600 hover:text-gray-800 cursor-pointer ${activeTab === tab.key ? 'border-gray-800 text-gray-800' : ''}`
                      : `pb-3 text-sm font-medium border-b-2 -mb-px border-transparent text-gray-300 opacity-50 cursor-not-allowed`
                    }
                  >
                    {tab.key === 'setting' ? 'SETTING' : tab.key.toUpperCase()}
                  </button>
                ))}
            </div>

            {/* SETTING tab: jewelry type selection */}
            <div style={{ display: activeTab === 'setting' ? 'block' : 'none' }}>
              <div className="grid grid-cols-3 gap-3">
                {jewelryTypes.map((type, idx) => (
                  <button
                    key={type.key}
                    className={`bg-white border transition-all p-[6px] flex flex-row items-center group border-gray-200 hover:border-gray-800 ${selectedType.key === type.key ? 'border-gray-800 ring-2 ring-gray-800' : ''}`}
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
                    <div className="flex-shrink-0 bg-gray-50 rounded flex items-center justify-center mr-3" style={{height:'32px', width:'32px'}}>
                      <img src={type.image} alt={type.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" style={{height:'22px', width:'22px'}} />
                    </div>
                    <div className="flex flex-col items-start justify-center flex-1">
                      <h3 className="font-medium text-[12px] text-gray-800 mb-[2px]">{type.name}</h3>
                      <div className="text-[10px] text-gray-400 mt-[2px]">{type.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization tabs */}
            <div style={{ display: activeTab === 'style' ? 'block' : 'none' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Style</h2>
              <p className="text-sm text-gray-600 mb-6">Select the setting style</p>
              {renderOptions(data.styles, style, setStyle)}
            </div>
            <div style={{ display: activeTab === 'metal' ? 'block' : 'none' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Metal</h2>
              <p className="text-sm text-gray-600 mb-6">Select your preferred metal type</p>
              {style ? renderOptions(style.metals, metal, setMetal) : <div className="text-gray-400">Select a style first</div>}
            </div>
            <div style={{ display: activeTab === 'shape' ? 'block' : 'none' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Shape</h2>
              <p className="text-sm text-gray-600 mb-6">Select the diamond shape</p>
              {metal ? renderOptions(metal.shapes, shape, setShape) : <div className="text-gray-400">Select a metal first</div>}
            </div>
            <div style={{ display: activeTab === 'carat' ? 'block' : 'none' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Carat</h2>
              <p className="text-sm text-gray-600 mb-6">Select the carat weight</p>
              {shape ? renderOptions(shape.carats, carat, setCarat) : <div className="text-gray-400">Select a shape first</div>}
            </div>
            <div style={{ display: activeTab === 'diamond' ? 'block' : 'none' }}>
              <h2 className="text-lg font-medium text-gray-800 mb-1">Choose Diamond Type</h2>
              <p className="text-sm text-gray-600 mb-6">Lab-grown or natural diamond</p>
              {carat ? renderOptions(carat.diamonds, diamond, setDiamond) : <div className="text-gray-400">Select a carat first</div>}
            </div>
          </div>
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
