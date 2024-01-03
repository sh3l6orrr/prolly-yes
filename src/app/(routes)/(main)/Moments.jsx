import { useProbabilityStore } from "./store"
import { useEffect, useState } from "react"
import { getMoments } from "./actions"
import { InlineMath } from 'react-katex'

export default function Moments() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [moments, setMoments] = useState({ mean: 0, variance: 1, skewness: 0, kurtosis: 0 })
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const moments = await getMoments(formData)
      if (moments) setMoments(moments)
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])
  return <div>
    <h2>Moments</h2>
    <div className="bg-neutral-100 dark:bg-black shadow-lg rounded-2xl p-6">
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        <InlineMath math={`E(X) = ${moments.mean}`} />
        <InlineMath math={`Var(X) = ${moments.variance}`} />
        <InlineMath math={`Skew(X) = ${moments.skewness}`} />
        <InlineMath math={`Kurt(X) = ${moments.kurtosis}`} />
      </div>
    </div>
  </div>
}