export default function Footer(){
  return (
    <footer className="bg-white border-t mt-[6vh] w-full">
      <div className="w-full max-w-[92vw] mx-auto py-[4vh] grid md:grid-cols-3 gap-[2vh] px-[2vw]">
        <div>
          <div className="font-bold">Jewelry Shop</div>
          <div className="text-sm text-gray-600">Handcrafted pieces for every moment.</div>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <div className="text-sm text-gray-600">About · Careers · Press</div>
        </div>
        <div>
          <div className="font-semibold">Support</div>
          <div className="text-sm text-gray-600">Contact · Shipping · Returns</div>
        </div>
      </div>
    </footer>
  )
}
