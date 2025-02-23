import { useState } from "react"
import { AntDesignClearOutlined, MingcuteClassify2Line, PhDna, TablerFolderUp } from "./icons/icons"
import './index.css'

function App() {
  const [menuSelected, setMenuSelected] = useState<number>(0)
  const [image, setImage] = useState<{ name: string, buf: ArrayBuffer | string | null } | null>()
  const [result, setResult] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [guess, setGuess] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const selectors = [
    {
      name: "Type",
      icon: <PhDna width={35} height={35} />,
    },
  ]

  const animateGuess = async (finalResult: string, choices: unknown) => {
    const castChoices = (choices as Array<string>)
    let currentGuess = castChoices[0]
    setGuess(currentGuess)
    for (let i = 1; i < Math.floor(Math.random() * 10) + 1; i++) {
      for (let j = 1; j < castChoices.length; j++) {
        currentGuess = castChoices[j]
        await delay(200)
        setGuess(currentGuess)
      }
    }
    console.log(finalResult)
    setGuess(finalResult)
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage({ name: file.name, buf: reader.result })
        setProgress(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const classifyImage = async () => {
    setIsStart(true)
    if (!image?.buf) return
    setResult("Classifying...")
    setProgress(15)

    const base64String = (image.buf as string).split(",")[1]
    const mode = selectors[menuSelected].name.toLowerCase()

    try {
      await delay(250)

      const response = await fetch("https://icapi.xams.online/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64String, mode }),
      })

      setProgress(60)

      await delay(500)
      setProgress(100)
      await delay(500)
      const data = await response.json()
      setIsStart(false)
      setPrediction(JSON.parse(data.predictions)[0].name)
      await animateGuess(JSON.parse(data.predictions)[0].name, Object.values(data.info.classes))
      setResult(JSON.stringify(JSON.parse(data.predictions), null, 2) + JSON.stringify(data.info, null, 2))
    } catch (error) {
      setResult("Error classifying image.")
      setProgress(0)
    }
  }


  return (
    <div className="w-screen h-screen bg-[url(https://gamerisaac.com/wp-content/uploads/2025/02/Pixel-Wallpaper-002-2160x1080-1.jpg)] bg-cover">
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-2/3 z-10">
          <ul className="pt-6 flex flex-col gap-1 justify-end items-end">
            {selectors.map((sel, idx) => (
              <li
                onClick={() => setMenuSelected(idx)}
                className={`w-30 border-1 border-white/50 border-r-0 
                  cursor-pointer p-4 pl-6 bg-white/20 rounded-l-3xl backdrop-blur-xl text-lg text-gray-400
                  ${idx == menuSelected && "bg-white/40 backdrop-blur-xl text-white w-35"}
                  hover:bg-white/40 flex items-center gap-x-1 hover:text-white duration-300
                  `}
                key={idx}
              >
                {sel.icon}
                {sel.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 h-2/3 border-1 border-white/50 bg-white/20 backdrop-blur-lg rounded-xl flex flex-col">
          <div className="w-full h-full p-12 flex gap-2">
            <div className="h-full w-1/2 flex flex-col gap-y-2">
              <div
                onClick={() => document.getElementById("upload")?.click()}
                className=" flex-col gap-y-1 relative bg-black/20 h-2/3 rounded-2xl border text-gray-400 border-white/15 cursor-pointer flex justify-center items-center"
              >
                <TablerFolderUp width={40} height={40} />
                <p>Import an image to this area.</p>
                <input onChange={handleFileChange} id="upload" className="invisible absolute" type="file" accept="image/png, image/jpeg" />
                <div className="flex justify-center items-center text-gray-300">
                  {image?.name ? <p className="flex w-full items-end">{image.name}</p> : <p>No image</p>}
                </div>
              </div>
              <div className={`${image?.buf ? "text-[#eee]" : "text-[#d5d5d5]"} flex w-full gap-x-2`}>
                <button
                  onClick={() => classifyImage()}
                  disabled={!image?.buf}
                  className={`p-2 w-30 flex justify-center items-center duration-300 rounded-xl border-1 hover:bg-white/1 bg-black/15 backdrop-blur-3xl
                             ${image?.buf ? "cursor-pointer border-[#3af39d] hover:bg-white/1 bg-black/15 text-[#3af39d]" : "cursor-not-allowed border-white/15"}
                          `}
                >
                  <MingcuteClassify2Line width={30} height={30} />
                  Classify
                </button>
                <button
                  disabled={!image?.buf}
                  onClick={() => {
                    setImage(null)
                    setProgress(0)
                    setResult(null)
                    setGuess(null)
                    setPrediction(null)
                  }}
                  className={`p-2 w-30 flex justify-center items-center duration-300 rounded-xl border-1 hover:bg-white/1 bg-black/15 backdrop-blur-3xl
                            ${image?.buf ? "cursor-pointer border-[#edf33a] hover:bg-white/1 bg-black/15 text-[#edf33a]" : "cursor-not-allowed border-white/15"}
                          `}
                >
                  <AntDesignClearOutlined width={33} height={33} />
                  Clear
                </button>
                <div className="w-full flex justify-end items-center">
                  {guess && <span className="text-xl bg-black/20 rounded-xl border text-white border-white/15 h-full p-3">
                    <span className={`${guess == prediction && "text-[#3af39d]"}`}>
                      {guess}
                    </span>
                  </span>}
                </div>
              </div>

              {/* Progress Bar */}
              {
                isStart && <div className="border-1 bg-black/15 border-white/15 rounded-xl shadow-sm overflow-hidden p-1">
                  <div className="relative h-6 flex items-center justify-center">
                    <div
                      className="absolute top-0 bottom-0 left-0 rounded-lg bg-[#3af39d]/75 backdrop-blur-3xl transition-all duration-500"
                      style={{ width: `${progress}%` }} // Dynamic width
                    ></div>
                    <div className="relative text-gray-300 font-medium text-sm">{progress}%</div>
                  </div>
                </div>
              }

              <a href="https://github.com/1CEs/image-classification" className="text-gray-400 hover:text-gray-200 w-fit text-sm underline ">
                github.com/1CEs/image-classification
              </a>
            </div>
            <div className="scrollbar p-3 w-1/2 flex-col max-h-full overflow-y-scroll gap-y-1 bg-black/20 rounded-2xl border text-white border-white/15">
              {result ? <pre className="text-xl">{result}</pre> : <div className="flex h-full justify-center items-center">No result yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
