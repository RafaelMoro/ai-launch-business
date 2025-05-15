'use client'
import { useState, useEffect } from "react";
export default function GetPosition() {
  const [permissionGeo, setGeoPermission] = useState<string | null>(null);
  const showPosition = (position: any) => {
    console.log('latitude ', position.coords.latitude);
    console.log('longitude ', position.coords.longitude);
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
      <button onClick={getLocation}>Get Position</button>
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