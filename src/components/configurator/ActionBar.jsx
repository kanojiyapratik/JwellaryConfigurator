import { formatINR } from '../../utils/currency'

export default function ActionBar({ total = 0, onNext, canProceed = true, selections = {} }){
  const summary = (() => {
    const parts = []
    if (selections?.metal?.name) parts.push(selections.metal.name)
    if (selections?.shape?.name) parts.push(selections.shape.name)
    if (selections?.carat?.name) parts.push(selections.carat.name)
    return parts.join(' · ')
  })()
  return (
    <div className="fixed bottom-0 left-0 w-full bg-ivory/95 backdrop-blur border-t">
      <div className="w-full px-[2vw] py-[2vh] flex items-center gap-[2vh] justify-between">
        <div className="hidden md:flex items-center text-gray-600 text-[1.6vh] truncate max-w-[50vw]">
          {summary || 'Make selections to see summary'}
        </div>
        <div className="flex items-center gap-[2vh]">
          <button className="btn btn-outline btn-pill">Book Appointment</button>
          <button
            onClick={canProceed ? onNext : undefined}
            aria-disabled={!canProceed}
            className={`btn btn-gold-outline btn-pill-lg ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {formatINR(total)} | {canProceed ? 'Next →' : 'Select an option'}
          </button>
        </div>
      </div>
    </div>
  )
}
