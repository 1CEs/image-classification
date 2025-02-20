import { OouiLogoWikispecies, PhDna } from "./icons/icons"

function App() {
  const selectors = [
    {
      name: "Type",
      icon: <PhDna width={35} height={35} />
    },
    {
      name: "Breed",
      icon: <OouiLogoWikispecies width={30} height={30}/>
    },
  ]
  return (
    <div className="w-screen h-screen bg-[url(https://gamerisaac.com/wp-content/uploads/2025/02/Pixel-Wallpaper-002-2160x1080-1.jpg)] bg-cover">
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-2/3 z-10">
          <ul className="pt-6">
            {
              selectors.map((sel: typeof selectors[0], idx: number) => (
                <li className={`w-45 border-2 border-black/75 border-r-0 
                  cursor-pointer p-4 pl-10 bg-white/20 rounded-l-3xl backdrop-blur-xl
                  ${idx == 0 && "bg-white/40 backdrop-blur-xl"}
                  hover:bg-white/40 flex items-center gap-x-2
                  `} 
                  key={idx}>{sel.icon}{sel.name}</li>
              ))
            }
          </ul>
        </div>
        <div className="w-1/2 h-2/3 border-2 border-black/75 bg-white/40 backdrop-blur-lg rounded-xl flex flex-col">
        </div>
      </div>

    </div>
  )
}

export default App
