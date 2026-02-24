import Hero from '../components/Hero'
import { formatINR } from '../utils/currency'

export default function Home() {
  return (
    <div className="w-full">
      <Hero />

      {/* Featured Collections */}
      <section className="w-full px-[2vw] py-[6vh]">
        <div className="flex items-end justify-between mb-[2vh]">
          <h2 className="heading text-[4vh]">Featured Collections</h2>
          <a href="/products" className="text-[2vh] underline">View all</a>
        </div>
        <div className="grid md:grid-cols-3 gap-[2vh]">
          {["Rings","Necklaces","Earrings"].map((t,i)=> (
            <a key={t} href="/products" className="group block bg-white rounded overflow-hidden shadow-sm">
              <div className="h-[34vh] w-full bg-gray-100">
                <img src={`/images/hero${(i%3)+1}.jpg`} alt={t} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"/>
              </div>
              <div className="p-[2vh] flex items-center justify-between">
                <div className="font-semibold">{t}</div>
                <span className="text-gray-600 text-[1.6vh]">Explore →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Best Sellers placeholder */}
      <section className="w-full px-[2vw] py-[6vh] bg-white/60">
        <div className="flex items-end justify-between mb-[2vh]">
          <h2 className="heading text-[4vh]">Best Sellers</h2>
          <a href="/products" className="text-[2vh] underline">Shop</a>
        </div>
        <div className="grid md:grid-cols-4 gap-[2vh]">
          {[1,2,3,4].map(i=> (
            <div key={i} className="bg-white rounded shadow-sm overflow-hidden">
              <div className="h-[28vh] bg-gray-100">
                <img src={`/images/hero${(i%3)+1}.jpg`} alt="product" className="w-full h-full object-cover"/>
              </div>
              <div className="p-[2vh]">
                <div className="font-medium mb-[0.6vh]">Diamond Piece {i}</div>
                <div className="text-gray-700">{formatINR(1500 + i*250)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="w-full px-[2vw] py-[5vh]">
        <div className="grid md:grid-cols-3 gap-[2vh]">
          <div className="bg-white rounded p-[2vh] shadow-sm">
            <div className="font-semibold mb-[0.6vh]">Certified Materials</div>
            <div className="text-gray-700 text-[1.8vh]">Only conflict-free diamonds and 18k gold.</div>
          </div>
          <div className="bg-white rounded p-[2vh] shadow-sm">
            <div className="font-semibold mb-[0.6vh]">Lifetime Care</div>
            <div className="text-gray-700 text-[1.8vh]">Free cleaning and resizing services.</div>
          </div>
          <div className="bg-white rounded p-[2vh] shadow-sm">
            <div className="font-semibold mb-[0.6vh]">Secure Delivery</div>
            <div className="text-gray-700 text-[1.8vh]">Insured global shipping with tracking.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
