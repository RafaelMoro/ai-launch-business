import { Budget } from "../interface"

interface ShowBudgetProps {
  budget: Budget
}

export default function ShowBudget({ budget }: ShowBudgetProps) {
  const { budget: budgetData, considerations } = budget

  return (
    <section className="flex flex-col gap-3">
      <h4 className="text-2xl text-gray-900 dark:text-white mb-6 text-center">Presupuestos sugeridos</h4>

      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Concepto
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Presupuesto sugerido
                      </th>
                  </tr>
              </thead>
              <tbody>
                  { (budgetData && budgetData?.length > 0) && budgetData.map((budgetConcept) => (
                    (
                      <tr key={budgetConcept.gasto} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {budgetConcept?.gasto}
                          </th>
                          <td className="px-6 py-4">
                              ${budgetConcept.valor}
                          </td>
                      </tr>
                  )
                  )) }
              </tbody>
          </table>
      </div>

      <p className="text-lg text-gray-900 dark:text-white text-pretty">
        Consideraciones: {considerations}
      </p>
    </section>
  )
}