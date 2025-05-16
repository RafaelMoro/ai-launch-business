import { useMutation } from "@tanstack/react-query"
import axios from 'axios'

import Loader from "./Loader"
import { Budget, GeolocationInfo } from "../interface"
import { backendUri } from "../constants"
import { addToLocalStorage } from "../utils/addInfoLocalStorage"
import ShowBudget from "./ShowBudget"

interface GetBudgetInfoProps {
  businessIdea: string
  locationInfo: GeolocationInfo | null
  budget: Budget | null
  updateBudget: (data: Budget) => void
}

export default function GetBudgetInfo({
  businessIdea,
  locationInfo,
  budget,
  updateBudget
}: GetBudgetInfoProps) {
  const {
    mutate,
    isError,
    isPending,
    isIdle
  } = useMutation({
    mutationFn: () => {
      const data = { 
        business: businessIdea,
        state: locationInfo?.state ?? '',
        country: locationInfo?.country ?? ''
       }
      return axios.post(`${backendUri}/budget`, data)
    },
    onSuccess: (response) => {
      const newData = response.data.data as Budget
      updateBudget(newData)
      addToLocalStorage({ newInfo: newData, prop: 'budget' })
    }
  })
  const handleGetBudgetInfo = () => {
    mutate()
  }

  return (
    <section className="flex flex-col gap-5">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Información del presupuesto
      </h4>
      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Aquí puedes encontrar información sobre el presupuesto necesario para tu idea de negocio.
      </p>
        { ((isIdle || isPending) && !budget) && (
          <div className="w-full flex justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
              onClick={handleGetBudgetInfo}
              >
                { (isIdle) && 'Obtener presupuesto' }
                { isPending && (<Loader />)}
            </button>
          </div>
        )}
        { isError && (<p className="text-lg text-gray-900 dark:text-white text-pretty">Oops! Parece que hubo un error obteniendo información de tu presupuesto. Por favor intente más tarde</p>) }
        { budget && (
          <ShowBudget />
        )}
    </section>
  )
}