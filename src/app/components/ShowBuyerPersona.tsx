import { BuyerPersona } from "../interface"

interface ShowBuyerPersonaProps {
  buyerPersona: BuyerPersona
}

export default function ShowBuyerPersona({ buyerPersona }: ShowBuyerPersonaProps) {
  const { name, demographicData, behaviorMotivations, needs } = buyerPersona;
  return (
    <article>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <ul className="mt-3 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>Datos demográficos: {demographicData}</li>
        <li>Motivaciones de comportamiento: {behaviorMotivations}</li>
        <li>Necesidades: {needs}</li>
      </ul>
    </article>
  )
}