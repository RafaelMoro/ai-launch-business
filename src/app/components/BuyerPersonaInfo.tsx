import { useMutation } from "@tanstack/react-query"
import axios from 'axios'

import { backendUri } from "../constants"
import Loader from "./Loader"
import { BuyerPersona, GeolocationInfo } from "../interface"
import { addToLocalStorage } from "../utils/addInfoLocalStorage"
import ShowBuyerPersona from "./ShowBuyerPersona"

interface BuyerPersonaInfoProps {
  businessIdea: string
  locationInfo: GeolocationInfo | null
  buyerPersonas: BuyerPersona[];
  addBuyerPersona: (data: BuyerPersona[]) => void
}

export default function BuyerPersonaInfo({
  businessIdea,
  buyerPersonas,
  locationInfo,
  addBuyerPersona,
}: BuyerPersonaInfoProps) {
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
      return axios.post(`${backendUri}/buyer-persona`, data)
    },
    onSuccess: (response) => {
      const newData = response.data.data as BuyerPersona[]
      addBuyerPersona(newData)
      addToLocalStorage({ newInfo: newData, prop: 'buyerPersonas' })
    }
  })
  const handleGetBuyerPersona = () => {
    mutate()
  }

  return (
    <section className="flex flex-col gap-5">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Información del Buyer Persona
      </h4>
      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Aquí puedes encontrar información sobre la persona ideal ficticia para entender cuál es el público objetivo. Vamos a usar tu ubicación para obtener solamente información del estado de la República y país donde te encuentras.
      </p>
      <div className="w-full flex justify-center">
        { ((isIdle || isPending) && buyerPersonas.length === 0) && (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
            onClick={handleGetBuyerPersona}
            >
              { (isIdle) && 'Obtener buyer personas' }
              { isPending && (<Loader />)}
          </button>
        )}
      </div>
      { isError && (<p className="text-lg text-gray-900 dark:text-white text-pretty">Oops! Parece que hubo un error obteniendo los buyer personas. Por favor intente más tarde</p>) }
      { buyerPersonas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          { buyerPersonas.map((buyerPersona) => (
          <ShowBuyerPersona key={buyerPersona.name} buyerPersona={buyerPersona} />
        ))}
        </div>
      )}
    </section>
  )
}