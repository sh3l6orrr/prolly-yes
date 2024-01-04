import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPmf } from "./actions";
import { BlockMath } from 'react-katex'

export default function PmfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pmf = await showPmf(formData)
      if (pmf) await vegaEmbed('#pmf', pmf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>Probability Mass Function (PMF)</h2>
    <div className="visualization">
      <div>
        <div className='plot' id='pmf' />
      </div>
      <div className="flex">
        <BlockMath math={expr[distr]} />
      </div>
    </div>
  </div>
}

const expr = {
  binom: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}'
}