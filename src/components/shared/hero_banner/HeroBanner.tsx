import bg_image from "@/assets/images/banner_image.png"

export default function HeroBanner() {
  return (
    <div style={{backgroundImage: `url('/banner_image.png')`}} className={`min-h-screen w-full bg-cover bg-center`} >

    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.22%,rgba(0,0,0,0.7)_69.98%)]"></div>
      
    </div>
  )
}
