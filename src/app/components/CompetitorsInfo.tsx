import { useMutation } from "@tanstack/react-query"
import axios from 'axios'

import { backendUri } from "../constants"
import { Competitors, GeolocationInfo } from "../interface"
import { addToLocalStorage } from "../utils/addInfoLocalStorage"
import Loader from "./Loader"
import { useEffect } from "react"
import ShowCompetitors from "./ShowCompetitors"

interface CompetitorsInfoProps {
  businessIdea: string;
  latitude: number | null
  longitude: number | null
  locationInfo: GeolocationInfo | null
  competitors: Competitors[]
  addLocationInfo: (data: GeolocationInfo) => void
  addCompetitors: (data: Competitors[]) => void
}

export default function CompetitorsInfo({
  longitude,
  latitude,
  locationInfo,
  businessIdea,
  competitors,
  addLocationInfo,
  addCompetitors,
}: CompetitorsInfoProps) {
  const {
    mutate: getLocationInfo,
    isError: isErrorLocation,
    isPending: isPendingLocation,
    isSuccess: isSuccessLocation,
    isIdle: isIdleLocation
  } = useMutation({
    mutationFn: () => {
      const data = { latitude: String(latitude), longitude: String(longitude) }
      return axios.post(`${backendUri}/state-country`, data)
    },
    onSuccess: (response) => {
      const newData = response.data.data as GeolocationInfo
      addLocationInfo(newData)
      addToLocalStorage({ newInfo: newData, prop: 'geoLocationInfo' })
    }
  })

  const {
    mutate: getCompetitors,
    isError: isErrorCompetitors,
    isPending: isPendingCompetitors,
    isSuccess: isSuccessCompetitors,
    isIdle: isIdleCompetitors
  } = useMutation({
    mutationFn: () => {
      const data = { 
        business: businessIdea,
        state: locationInfo?.state ?? '',
        country: locationInfo?.country ?? ''
       }
      return axios.post(`${backendUri}/competition`, data)
    },
    onSuccess: (response) => {
      const newData = response.data.data as Competitors[]
      addCompetitors(newData)
      addToLocalStorage({ newInfo: newData, prop: 'competitors' })
    }
  })

  const handleGetLocationInfo = () => {
    getLocationInfo()
  }
  const handleGetCompetitors = () => {
    getCompetitors()
  }

  useEffect(() => {
    if (isSuccessLocation && locationInfo) {
      getCompetitors()
    }
  }, [getCompetitors, locationInfo, isSuccessLocation])

  return (
    <section className="flex flex-col gap-5">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Información de Competencia
      </h4>
      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Aquí puedes encontrar información sobre la competencia en tu área y cómo diferenciarte de ellos. Vamos a usar tu ubicación para obtener solamente información del estado de la República y país donde te encuentras.
      </p>

      { ((isIdleLocation || isPendingLocation) && !locationInfo?.state) && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
          onClick={handleGetLocationInfo}
          >
            { (isIdleLocation) && 'Obtener información' }
            { isPendingLocation && (<Loader />)}
          </button>
      )}
      { ((isIdleCompetitors || isPendingCompetitors) && locationInfo?.state) && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
          onClick={handleGetCompetitors}
          >
            { (isIdleCompetitors) && 'Obtener información de mis competidores' }
            { isPendingCompetitors && (<Loader />)}
          </button>
      )}
      { isErrorLocation && (<p className="text-lg text-gray-900 dark:text-white text-pretty">Oops! Parece que hubo un error obteniendo la información sobre tu país y estado de la República. Por favor intente más tarde</p>) }
      {  isSuccessLocation && (
        <>
          <Loader />
          <p className="text-lg text-gray-900 dark:text-white text-pretty">Logramos obtener del estado de la Republica y su país. Obteniendo información de sus competidores...</p>
        </>
      ) }
      { competitors.length > 0 && (
        <ShowCompetitors />
      )}
    </section>
  )
}