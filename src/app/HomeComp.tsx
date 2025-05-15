'use client'
import { useState, useEffect } from "react";
export default function HomeComp() {
  const [permissionGeo, setGeoPermission] = useState<string | null>(null);
  const showPosition = (position: any) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
      console.log('permission', permission);
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