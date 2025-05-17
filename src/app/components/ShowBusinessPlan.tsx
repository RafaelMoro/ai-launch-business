import { GetBusinessPlanData } from "../interface"

interface ShowBusinessPlanProps {
  businessPlan: GetBusinessPlanData
}

export default function ShowBusinessPlan({ businessPlan }: ShowBusinessPlanProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Plan de negocio</h2>
      <div className="grid grid-cols-1 gap-4">
        <p><strong>Estrategia de negocio:</strong> {businessPlan.businessStrategy}</p>
        <p><strong>Plan de inversión:</strong> {businessPlan.inversionPlan}</p>
        <p><strong>Objetivos de negocio:</strong> {businessPlan.businessGoals}</p>
        <p><strong>Posibles riesgos:</strong> {businessPlan.possibleRisks}</p>
      </div>
    </div>
  )
} 