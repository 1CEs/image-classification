import { useState } from "react"
import { AntDesignClearOutlined, MingcuteClassify2Line, OouiLogoWikispecies, PhDna, TablerFolderUp } from "./icons/icons"

function App() {
  const [menuSelected, setMenuSelected] = useState<number>(0)
  const selectors = [
    {
      name: "Type",
      icon: <PhDna width={35} height={35} />
    },
    {
      name: "Breed",
      icon: <OouiLogoWikispecies width={30} height={30} />
    },
  ]
  return (
    <div className="w-screen h-screen bg-[url(https://gamerisaac.com/wp-content/uploads/2025/02/Pixel-Wallpaper-002-2160x1080-1.jpg)] bg-cover">
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-2/3 z-10">
          <ul className="pt-6 flex flex-col gap-1 justify-end items-end">
            {
              selectors.map((sel: typeof selectors[0], idx: number) => (
                <li onClick={() => setMenuSelected(idx)} className={`w-30 border-1 border-white/50 border-r-0 
                  cursor-pointer p-4 pl-6 bg-white/20 rounded-l-3xl backdrop-blur-xl text-lg text-gray-400
                  ${idx == menuSelected && "bg-white/40 backdrop-blur-xl text-white w-35"}
                  hover:bg-white/40 flex items-center gap-x-1 hover:text-white duration-300
                  `}
                  key={idx}>{sel.icon}{sel.name}</li>
              ))
            }
          </ul>
        </div>
        <div className="w-2/3 h-2/3 border-1 border-white/50 bg-white/20 backdrop-blur-lg rounded-xl flex flex-col">
          <div className="w-1/2 h-full p-12 flex flex-col gap-y-2">
            <div className="h-full flex flex-col gap-y-2">
              <div className=" flex-col gap-y-1 bg-black/20 h-2/3 rounded-2xl border text-gray-400 border-white/15 cursor-pointer flex justify-center items-center">
                <TablerFolderUp width={40} height={40} />
                <p>Import an image to this area.</p>
              </div>
              <div className="flex w-full text-[#eee] gap-x-2">
                <button className="p-2 flex items-center cursor-pointer duration-300 bg-[#37b492] rounded-xl hover:bg-[#4e9280]"><MingcuteClassify2Line width={30} height={30} />Classify</button>
                <button className="p-2 flex items-center cursor-pointer duration-300 bg-[#e2c13e] rounded-xl hover:bg-[#b7a663]"><AntDesignClearOutlined width={33} height={33} />Clear</button>
              </div>
            </div>

            <a href="https://github.com/1CEs/image-classification" className="text-white hover:text-gray-200 w-fit text-xl underline ">github.com/1CEs/image-classification</a>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
