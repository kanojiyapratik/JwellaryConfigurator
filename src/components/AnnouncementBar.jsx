export default function AnnouncementBar(){
  return (
    <div className="w-full" style={{background:'#c7a34b'}}>
      <div className="px-[2vw] text-center text-[1.7vh] py-[0.9vh] text-ivory">
        <span className="uppercase tracking-[0.18em]">Explore the Estate Capsule Collection</span>
        {' '}|{' '}
        <a href="/products" className="underline">Shop now</a>
      </div>
    </div>
  )
}
