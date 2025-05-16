'use client'
import { FormEvent, useState } from "react"
import axios from 'axios'
import { GetBusinessPlanData } from "./interface"

interface UserFormProps {
  addBusinessPlan: (data: GetBusinessPlanData) => void
}

export default function UserForm({ addBusinessPlan }: UserFormProps) {
  const [business, setBusiness] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      const data = { business }
      const response = await axios.post('http://localhost:6060/business-plan', data)

      if (!response.data) {
        console.error('Failed to submit form')
      }

      const newData = response.data.data as GetBusinessPlanData
      console.log('data recieved', newData)
      addBusinessPlan(newData)
      setBusiness("") // Clear form after successful submission
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ingrese su idea de su negocio de manera breve y concisa</label>
      <textarea
        id="message"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ingrese su idea de negocio"></textarea>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Obtener asesoria</button>
    </form>
  )
}