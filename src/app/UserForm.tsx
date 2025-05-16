'use client'
import { FormEvent } from "react"
import axios from 'axios'
import { useMutation } from "@tanstack/react-query"

import { GetBusinessPlanData } from "./interface"
import { backendUri } from "./constants"
import Loader from "./components/Loader"

interface UserFormProps {
  addBusinessPlan: (data: GetBusinessPlanData) => void;
  businessIdea: string;
  updateBusinessIdea: (idea: string) => void
  resetBusinessIdea: () => void
}

export default function UserForm({ businessIdea, addBusinessPlan, resetBusinessIdea, updateBusinessIdea }: UserFormProps) {
  const { mutate: getBusinessPlan, isError, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: () => {
      const data = { businessIdea }
      return axios.post(`${backendUri}/business-plan`, data)
    },
    onSuccess: (response) => {
      const newData = response.data.data as GetBusinessPlanData
      addBusinessPlan(newData)
      resetBusinessIdea() // Clear form after successful submission
    }
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getBusinessPlan()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Ingrese su idea de su negocio de manera breve y concisa</label>
        <textarea
          id="message"
          value={businessIdea}
          onChange={(e) => updateBusinessIdea(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ingrese su idea de negocio"
          ></textarea>

        <button
          disabled={isPending || isSuccess}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
          >
          { (isIdle || isSuccess) && 'Obtener asesoria' }
          { isPending && (<Loader />)}
        </button>
      </form>
      { isError && (<p>Oops! Parece que hubo un error. Por favor intente más tarde</p>) }
    </>
  )
}