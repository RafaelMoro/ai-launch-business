import { useMutation } from "@tanstack/react-query"
import axios from 'axios'

import { backendUri } from "../constants"
import { GeolocationInfo } from "../interface"

interface CompetitorsInfoProps {
  latitude: number | null
  longitude: number | null
  locationInfo: GeolocationInfo | null
  addLocationInfo: (data: GeolocationInfo) => void
}

export default function CompetitorsInfo({
  longitude,
  latitude,
  locationInfo,
  addLocationInfo }: CompetitorsInfoProps) {
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
    }
  })

  const handlesubmit = () => {
    getLocationInfo()
  }

  return (
    <section className="flex flex-col gap-5">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Información de Competencia
      </h4>
      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Aquí puedes encontrar información sobre la competencia en tu área y cómo diferenciarte de ellos.
      </p>
      { isIdleLocation && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
          onClick={handlesubmit}
          >
            Obtener información
          </button>
      )}
    </section>
  )
}