import Loader from "./Loader"

export default function BuyerPersonaInfo() {
  const isIdle = true
  const isPending = false
  const handleGetBuyerPersona = () => {}

  return (
    <section className="flex flex-col gap-5">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Información del Buyer Persona
      </h4>
      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Aquí puedes encontrar información sobre la persona ideal ficticia para entender cuál es el público objetivo. Vamos a usar tu ubicación para obtener solamente información del estado de la República y país donde te encuentras.
      </p>
      <div className="w-full flex justify-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
          onClick={handleGetBuyerPersona}
          >
            { (isIdle) && 'Obtener buyer personas' }
            { isPending && (<Loader />)}
          </button>
      </div>
    </section>
  )
}