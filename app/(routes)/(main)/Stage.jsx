'use client'

import Pdf from "./Pdf"
import Cdf from "./Cdf"
import Attributes from "./Attributes"
import Sampling from "./Sampling"
import { useProbabilityStore } from "./store"

export default function Stage() {
  const { showPlot, type } = useProbabilityStore()

  return <>
    {showPlot.includes('moments') && <div style={{ order: showPlot.indexOf('moments') + 1 }}> <Attributes /></div>}
    {showPlot.includes('pdf') && <div style={{ order: showPlot.indexOf('pdf') + 1 }}><Pdf pmf={type === 'discrete'} /></div>}
    {showPlot.includes('cdf') && <div style={{ order: showPlot.indexOf('cdf') + 1 }}><Cdf pmf={type === 'discrete'} /></div>}
    {showPlot.includes('sampling') && <div style={{ order: showPlot.indexOf('sampling') + 1 }}><Sampling /></div>}
    {showPlot.length === 0 && <h2>{"You didn't select any visualizations."}</h2>}
  </>
}