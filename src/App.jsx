import { useState } from 'react'
import toast from 'react-hot-toast'
import { FileUploader } from 'react-drag-drop-files'
import millify from 'millify'
import axios from 'axios'
function App() {
  const [file, setFile] = useState(null)
  const fileTypes = ['JPG', 'PNG', 'GIF', 'ZIP']
  const handleChange = (file) => {
    setFile(file)
  }
  const handleDrop = async (data) => {
    setFile(data)
  }
  const handleSelect = async (data) => {
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://api.anonfiles.com/upload',
        data.name
      )
      setFile(data)
      console.log(response)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <main className="min-h-screen w-full bg-blue-100 flex items-center justify-center">
      <div className="p-8 bg-white  rounded-lg w-[min(95%,45rem)] flex flex-col gap-3">
        <FileUploader
          onChange={handleChange}
          name="file"
          types={fileTypes}
          onDrop={handleDrop}
          onSelect={handleSelect}
          children={
            <UploadArea handleDrop={handleDrop} handleSelect={handleSelect} />
          }
        />
        {file && (
          <div className="w-full  bg-blue-50 rounded-md p-3">
            <h4 className="text-xl">
              <span className="text-blue-400 animate-pulse">Uploading</span>{' '}
              <span className="text-gray-700">{file.name}</span>
            </h4>
            <p className="text-lg">
              Size:{' '}
              {millify(file.size, {
                units: ['B', 'KB', 'MB', 'GB'],
                space: true,
              })}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App

function UploadArea() {
  return (
    <div className="border-2 border-dashed w-full h-52 rounded-lg flex justify-center items-center">
      <div className=" space-y-2 text-center flex flex-col items-center">
        <img src="/file.png" alt="file upload icon" className="w-28" />
        <h2 className="text-lg  text-[#245689]">
          Drop your file here, or <span className="text-blue-500">browse</span>
        </h2>
        <p className="text-gray-400 text-sm">Supports all files</p>
      </div>
    </div>
  )
}
