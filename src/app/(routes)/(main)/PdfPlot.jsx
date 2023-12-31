import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPdf } from "./actions";

export default function PdfPlot() {
  const { params, distr } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pdf = await showPdf(formData)
      if (pdf) await vegaEmbed('#pdf', pdf)

    }
    update()
  }, [params, distr])

  return <div>
    <h2>Probability Density Function (PDF)</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg h-104">
      <div id='pdf' />
    </div>
  </div>
}