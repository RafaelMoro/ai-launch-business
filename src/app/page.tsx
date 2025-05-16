'use client'
import { useState } from "react";
import GetPosition from "./GetPosition";
import UserForm from "./UserForm";
import { GetBusinessPlanData } from "./interface";

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("")
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [businessPlan, setBusinessPlan] = useState<GetBusinessPlanData | null>(null);

  const addBusinessPlan = (data: GetBusinessPlanData) => {
    setBusinessPlan(data);
  };
  const addLatitude = (lat: number) => setLatitude(lat);
  const addLongitude = (long: number) => setLongitude(long);
  const updateBusinessIdea = (idea: string) => setBusinessIdea(idea);
  const resetBusinessIdea = () => setBusinessIdea("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <GetPosition addLatitude={addLatitude} addLongitude={addLongitude} />
      <UserForm
        addBusinessPlan={addBusinessPlan}
        businessIdea={businessIdea}
        updateBusinessIdea={updateBusinessIdea}
        resetBusinessIdea={resetBusinessIdea}
        />
      { businessPlan && (
        <div>
          <h2 className="text-2xl font-bold">Asesoría de negocio</h2>
          <div className="grid grid-cols-1 gap-4">
            <p><strong>Estrategia de negocio:</strong> {businessPlan.businessStrategy}</p>
            <p><strong>Plan de inversión:</strong> {businessPlan.inversionPlan}</p>
            <p><strong>Objetivos de negocio:</strong> {businessPlan.businessGoals}</p>
            <p><strong>Posibles riesgos:</strong> {businessPlan.possibleRisks}</p>
          </div>
        </div>
      )}
    </div>
  );
}
