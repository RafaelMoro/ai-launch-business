'use client'
import { useState, useEffect } from "react";
import classNames from "classnames"
import { IconLocation } from "@tabler/icons-react"; 
import { GeoPosition } from "./interface";
import { addToLocalStorage } from "./utils/addInfoLocalStorage";

interface GetPositionProps {
  addLatitude: (lat: number) => void;
  addLongitude: (long: number) => void;
}

export default function GetPosition({ addLatitude, addLongitude }: GetPositionProps) {
  const [permissionGeo, setGeoPermission] = useState<GeoPosition | null>(null);

  const showPosition = (position: any) => {
    addLatitude(position.coords.latitude);
    addLongitude(position.coords.longitude);
  }

  const buttonCssClasses = classNames(
      "inline-flex gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50",
      { "dark:bg-green-500 bg-green-700": permissionGeo === 'granted' },
      { "dark:bg-red-500 bg-red-700": permissionGeo === 'denied' }
    )

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
      if (permission.state === 'prompt') {
        setGeoPermission('prompt');
      }
      if (permission.state === 'denied') {
        setGeoPermission('denied');
        const localStorageInfo = {
          latitude: null,
          longitude: null
        }
        addToLocalStorage({ newInfo: localStorageInfo, prop: 'geoLocationCoords' })
      }
      if (permission.state === 'granted') {
        setGeoPermission('granted');
      }
    });
  }, [])

  return (
    <section className="flex flex-col items-center justify-center gap-3">
      <p className="text-lg text-gray-900 dark:text-gray-300 text-pretty">Esta aplicación funcionará mejor si podemos obtener acceso a tu ubicación</p>
      <div>
        <button disabled={permissionGeo === 'granted'} className={buttonCssClasses} onClick={getLocation}>
          <IconLocation />
          { permissionGeo === 'prompt' && 'Obtener ubicación' }
          { permissionGeo === 'granted' && 'Ubicación obtenida'}
          { permissionGeo === 'denied' && 'Ubicación denegada'}
        </button>
      </div>
      { permissionGeo === 'denied' && (<p>El permiso de la ubicacioón ha sido degenada, por favor autorice para que funcione correctamente</p>)}
    </section>
  )
}