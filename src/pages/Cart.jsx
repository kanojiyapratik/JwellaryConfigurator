import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/currency'

export default function Cart(){
  const { items: cart, remove, total } = useCart()
  const checkout = ()=>{ alert('Checkout demo: ' + cart.length + ' items, total ' + formatINR(total)) }

  if(cart.length===0) return <div className="w-full px-[2vw]"><h1 className="text-[3vh] font-bold">Cart</h1><p>Your cart is empty.</p></div>
  return (
    <div className="w-full px-[2vw]">
      <h1 className="text-[3vh] font-bold mb-[2vh]">Cart</h1>
      <div className="space-y-[1.6vh]">
        {cart.map(item=> (
          <div key={item.id} className="bg-white p-[2vh] rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Configured Item</div>
                <div className="text-sm text-gray-600">{Object.values(item.selections).map(s=>s.name).join(', ')}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatINR(item.total)}</div>
                <button onClick={()=>remove(item.id)} className="text-sm text-red-600 mt-2">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[2.5vh] flex justify-end items-center gap-[2vh]">
  <div className="text-[2vh]">Total: <span className="font-bold">{formatINR(total)}</span></div>
        <button onClick={checkout} className="bg-black text-white px-[2vh] py-[1.6vh] rounded">Checkout</button>
      </div>
    </div>
  )
}
