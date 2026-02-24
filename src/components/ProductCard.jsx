import { Link } from 'react-router-dom'
import { formatINR } from '../utils/currency'

export default function ProductCard({ product }){
  return (
  <Link to={`/products/${product._id}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition p-[2vh] border border-transparent hover:border-gold">
      <div className="h-[28vh] bg-gray-100 rounded overflow-hidden mb-[1.2vh] flex items-center justify-center">
        <img src={product.image||'/vite.svg'} alt={product.name} className="max-h-full max-w-full" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-sm text-gray-500">{product.description}</div>
        </div>
  <div className="text-lg font-bold">{formatINR(product.price)}</div>
      </div>
    </Link>
  )
}
