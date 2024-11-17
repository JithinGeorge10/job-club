'use client'
import { USER_SERVICE_URL } from '@/utils/constants'
import axios from 'axios'
import { useSearchParams,useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const userId = searchParams.get('id');
  const [skills, setSkills] = useState<{ [key: number]: string }>({}) 
  const [inputValue, setInputValue] = useState<string>('')  
  const [id, setId] = useState<number>(1) 

  const handleAddSkill = () => {
    if (inputValue.trim() !== '') {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [id]: inputValue
      }))
      setId(id + 1)
      setInputValue('')  
    }
  }
  
  const handleRemoveSkill = (key: number) => {
    setSkills((prevSkills) => {
      const newSkills = { ...prevSkills }
      delete newSkills[key]
      setId(id - 1)
      return newSkills
    })
  }

  const handleSave =async () => {

    const response = await axios.post(`${USER_SERVICE_URL}/add-skills`, { skills,userId }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    if(response.data.failToken){
      router.push(`login`)
    }
    if (response.data.userDetails) {
      toast.success('Skills Added')
      setTimeout(() => {
        router.push(`userProfile?id=${userId}`)
      }, 1000);
    } else {
      toast.error('Error')
      
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-8">

      <h2 className="text-3xl font-bold mb-8">Add Skills</h2>


      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Skills</h3>
          <span className="text-gray-500">✏️</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(skills).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 bg-green-500 text-black font-semibold rounded-full px-4 py-2">
              <span>{value}</span>
              <button onClick={() => handleRemoveSkill(Number(key))} className="text-white">X</button>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-6 w-full max-w-3xl">
        <input 
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Add skills"
          className="w-full px-4 py-2 text-black bg-gray-200 rounded-md outline-none placeholder-gray-500 focus:ring-2 focus:ring-green-500"
        />
      </div>


      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleAddSkill}
          className="px-6 py-2 bg-gray-400 text-black font-semibold rounded-lg hover:bg-gray-500 transition"
        >
          Add Skills
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Save
        </button>
      </div>

     
    </div>
  )
}

export default Page
