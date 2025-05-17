import { GetBusinessPlanData } from "../interface"

interface ShowBusinessPlanProps {
  businessPlan: GetBusinessPlanData
}

export default function ShowBusinessPlan({ businessPlan }: ShowBusinessPlanProps) {
  return (
    <div>
      <h2 id="business-plan-title" className="text-2xl font-bold mb-3">Plan de negocio</h2>
      <div className="grid grid-cols-1 gap-4">
        <p><span className="font-bold">Estrategia de negocio:</span> {businessPlan.businessStrategy}</p>
        <p><span className="font-bold">Plan de inversión:</span> {businessPlan.inversionPlan}</p>
        <p><span className="font-bold">Objetivos de negocio:</span> {businessPlan.businessGoals}</p>
        <p><span className="font-bold">Posibles riesgos:</span> {businessPlan.possibleRisks}</p>
      </div>
    </div>
  )
} 