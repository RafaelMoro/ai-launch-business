'use client'
import { useState, useEffect } from "react";

interface GetPositionProps {
  addLatitude: (lat: number) => void;
  addLongitude: (long: number) => void;
}

export default function GetPosition({ addLatitude, addLongitude }: GetPositionProps) {
  const [permissionGeo, setGeoPermission] = useState<string | null>(null);
  const showPosition = (position: any) => {
    addLatitude(position.coords.latitude);
    addLongitude(position.coords.longitude);
  }

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
      }
      if (permission.state === 'granted') {
        setGeoPermission('granted');
      }
    });
  }, [])

  return (
    <>
      <p>Esta aplicación funcionará mejor si podemos obtener acceso a tu ubicación</p>
      <button onClick={getLocation}>Obtener ubicación</button>
      <p>
        Permiso de ubicación: 
        {permissionGeo === 'denied' && 'Denegado'}
        {permissionGeo === 'prompt' && 'Pendiente por solicitar'}
        {permissionGeo === 'granted' && 'Permitido'}
      </p>
      { permissionGeo === 'denied' && (<p>El permiso de la ubicacioón ha sido degenada, por favor autorice para que funcione correctamente</p>)}
    </>
  )
}