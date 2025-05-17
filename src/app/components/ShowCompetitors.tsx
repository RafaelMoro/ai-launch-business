
'use client'
import { Competitors } from "../interface"

interface ShowCompetitorsProps {
  competitor: Competitors
}

export default function ShowCompetitors({ competitor }: ShowCompetitorsProps) {
  const {  name, description, website, logoDescription, competition, competitionType, competitionSize, competitionLocation, differenciator } = competitor;
  const link = website === 'No Disponible' ? '#' : website

  return (
    <article>
      <a
        href={`https://${link}`}
        target={"_blank"}
        rel={"noreferrer"}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <ul className="mt-3 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>Descripción del logo: {logoDescription}</li>
          <li>Competencia: {competition}</li>
          <li>Tipo de competencia: {competitionType}</li>
          <li>Tamaño de la competidor: {competitionSize}</li>
          <li>Lugar del competidor: {competitionLocation}</li>
          <li>Diferenciador: {differenciator}</li>
        </ul>
      </a>
    </article>
  )
}