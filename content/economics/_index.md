---
title: "Economics"
date: 2026-10-15
description: "What orbital compute costs, which comparisons measure different things, and what would have to move together."
---

These comparisons do not share one multiple. A comment that orbit is about 3× terrestrial compute, a GPU-hour model near 4×, and a deployment-cost range of 10–100× are different measurements. The [status board](/status/) says what has flown. This page says what would have to change before orbit is a cheaper place to run general compute.

- [What the cost is made of](#what-the-cost-is-made-of)
- [Published comparisons](#published-comparisons)
- [What would have to change](#what-would-have-to-change)
- [Forecasts](#forecasts)
- [Sources](#sources)

## What the cost is made of

Four inputs show up in every serious model on this page.

**Dollars per kilogram.** The [glossary](/glossary/#starship) uses about $1,500–2,000/kg as the working Falcon 9 range. Starship's stated target is under $100/kg. That target is not the price of a flight today. Google has described its Suncatcher design as competitive once launch approaches about $200/kg.

**Kilograms per kilowatt.** Solar arrays and radiators have to fly with the chips. IEEE Spectrum's June 2026 analysis, linked from [News](/news/ieee-spectrum-thermodynamics-rules-orbital-data-centers/), argues those two can be 65–70% of the satellite's mass. A lower launch price does not close the case if each kilowatt still weighs that much. See [kg per kW](/glossary/#kg-per-kw).

**Lifetime, with no repair.** A failed chip stays on orbit. Forethought's 2026 model uses about 9% compute loss per year and about 38% extra non-compute hardware for that reason. SemiAnalysis uses a 5-year orbital life against about 15 years on the ground.

**Bits that come back.** JPL's competitiveness model treats three limits together: deployed mass per kilowatt, space-to-ground data per unit of compute energy, and compute-years over the mission. Power that cannot be delivered as a result is not a product. The link budget is on [Technical](/technical/#links).

## Launch price

The chart is a historical $/kg series. The Falcon 9 point is an early figure in that dataset, not a current price. The Starship point is a target.

<div class="chart-section" data-aos="fade-up" style="margin: 2rem 0; padding: 2rem; background: rgba(0,0,0,0.6); border-radius: 12px; border: 1px solid rgba(176,98,235,0.2);">
  <h3 class="section-title" style="text-align: center; margin-bottom: 1.5rem;">Launch Cost Comparison ($/kg to LEO)</h3>
  <canvas id="launch-cost-chart" width="600" height="320"></canvas>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Inflation-adjusted 2021 USD/kg to LEO from CSIS Aerospace dataset.<br>Starship is a SpaceX reusability target. The Falcon 9 point is an early figure in this dataset, not a current price.</p>
</div>

## Published comparisons

Keep the metric attached to the number.

**Forethought, launch price for a 1 GW comparison.** Continuous off-grid orbital power reaches parity with terrestrial alternatives around $250/kg. The full data-center cost is nearer $100/kg if the spacecraft also gets lighter. A bullish case at about $50/kg can beat those terrestrial alternatives. The same model carries the 9% annual compute loss and the 38% extra hardware.

**SemiAnalysis, dollars per GPU-hour in 2026.** About $8.64 orbital against about $2.37 on the ground, roughly 4×, before a reliability gross-up that takes the levelized figures to about $10.91 and about $2.49. Their base case narrows toward parity around 2040. Early-2030s deployments in that model still carry a premium. This is not the Forethought launch-price threshold, and it is not a measurement of hardware that has flown.

**A roughly 3× comment.** A Varda analyst comment, reported by SpaceNews, puts orbital compute at about 3× terrestrial. That is one sentence in an industry piece, not a levelized GPU-hour.

**10–100× to deploy.** TechCrunch's look at the million-satellite proposal uses that range for deployment cost. It is a different metric again. Do not average it with the 3× or 4× figures.

**JPL.** The Turyshev model does not publish a single "orbit is N times the ground" result. It says terrestrial-user general compute needs Starship-era launch costs before the mass, the downlink, and the lifetime close together.

A separate 1 GW capex sketch, on Medium, puts space solar at about $51 billion against about $16 billion on the ground. That is another capex comparison, not the SpaceNews comment and not the SemiAnalysis GPU-hour.

## What would have to change

Launch price has to come down into the band those models actually use, about $100–250/kg depending on which parity is meant, from a Falcon 9 range of about $1,500–2,000/kg. Kilograms per kilowatt have to fall, which means less radiator and array mass per chip, or hotter radiators the chips can live with. Lifetime has to rise, or failed hardware has to be replaceable. Moving only one of those leaves the other two in the models above.

[Roadmap](/roadmap/) is the phase reading of that condition. Company production rates there are targets.

## Forecasts

A forecast is not a cost measurement.

ABI Research has said current total cost can be up to 78× terrestrial in some of its estimates, and it forecasts on the order of 18,600 space data centers and about 1.5 MW of orbital compute by 2035. That megawatt figure is not the scale of the constellation applications on the [spec sheet](/specs/).

A market note projects the orbital data-center market from $1.77 billion in 2029 to $39 billion in 2035. The [news post](/news/orbital-data-center-market-to-reach-39b-by-2035/) is the record. It is not a count of satellites.

A 2025 first-principles paper projects a 60–70% operating-cost advantage by 2035 if launch falls below about $500/kg. That is a conditional projection.

## Sources

### Models

- [NASA JPL, spacecraft constraints and economic viability](https://arxiv.org/pdf/2604.27197) — mass per kilowatt, downlink per compute energy, and compute-years.
- [Forethought, will we really put data centers in space?](https://www.forethought.org/research/will-we-really-put-data-centers-in-space) — $250/kg, $100/kg, and $50/kg cases for 1 GW.
- [SemiAnalysis, to boldly go](https://newsletter.semianalysis.com/p/to-boldly-go-the-case-for-space-datacenters) — 2026 GPU-hour comparison and the 5-year versus 15-year life.
- [Andrew McCalip, orbital versus terrestrial calculator](https://andrewmccalip.com/space-datacenters) — sliders for launch price, radiator mass, and replacement.
- [AI Grid Report, AI power stack](https://research.theaigridreport.com/ai-power-stack-economics-may-2026.pdf) — terrestrial routes the orbital case has to beat, including behind-the-meter power.
- [Reliability and risk in space-based data centers](https://www.mdpi.com/2076-3417/16/11/5247) — how shielding, redundancy, and the inability to maintain the spacecraft show up as cost.
- [UVA, evaluating space-based data center architectures](https://nationalsecurity.virginia.edu/sites/default/files/files/2026-05/00036_20260519%29_nsdpi_evaluating_space-based_data_center_architectures-capabilitites%2C_constraints%2C_and_trade-offs.pdf) — cost, constraints, and why a strategic use is separate from price parity.
- [Beyond Earth, the case for in-orbit compute](https://d11avd6t8zdcx0.cloudfront.net/uploads/2025/12/The-Case-for-In-Orbit-Compute-Paper-v1.2.pdf) — downlink savings against the cost of launching the computer.
- [IEEE, data center financial analysis](https://ieeexplore.ieee.org/document/9822795) — TCO and ROI framing for an extreme environment.
- [Medium, economics of space-based data centers](https://medium.com/@joe_62117/the-economics-of-space-based-data-centers-0f8d3d684501) — the $51 billion versus $16 billion 1 GW sketch.

### Comments that quote a multiple

- [SpaceNews](https://spacenews.com/with-attention-on-orbital-data-centers-the-focus-turns-to-economics/) — the roughly 3× analyst comment.
- [TechCrunch](https://techcrunch.com/2026/02/11/why-the-economics-of-orbital-ai-are-so-brutal/) — the 10–100× deployment-cost range.
- [Tom's Hardware, orbital calculator](https://www.tomshardware.com/tech-industry/big-tech/new-calculator-helps-evaluate-the-economics-of-datacenters-in-space) — an interactive cost model.

### Critiques and company claims

- [Angadh Nanjangud on a 40 MW single-launch claim](https://angadh.com/space-data-centers-1) — solar arrays, radiators, and racks may take many launches, not one.
- [Starcloud on Bitcoin mining in orbit](https://forklog.com/en/starcloud-to-pioneer-bitcoin-mining-in-space/) — a company argument that mining closes once launch is under $100/kg. That threshold is a target.

### Forecasts

- [ABI Research](https://www.abiresearch.com/blog/data-centers-in-space) — the 78× estimate and the 2035 unit and megawatt forecast.
- [First-principles market paper](https://402t.com/reports/space-based-data-centers-state-of-the-art-economics-and-outlook.pdf) — 60–70% operating-cost advantage by 2035 if launch is below about $500/kg.

### Context

- [CSIS launch-cost dataset](https://aerospace.csis.org/data/space-launch-to-low-earth-orbit-how-much-does-it-cost/) — the historical series behind the chart.
- [Kardashev scale](https://en.wikipedia.org/wiki/Kardashev_scale) — a civilizational-energy framing, not a cost model.

<script>
(function() {
  function initChart() {
    if (typeof Chart === 'undefined' || typeof ChartDataLabels === 'undefined') { setTimeout(initChart, 50); return; }
    Chart.register(ChartDataLabels);
    const ctx = document.getElementById('launch-cost-chart');
    if (!ctx) return;

    // Colors by category
    const LEGACY    = '#7c5cbf';  // muted purple
    const CURRENT   = '#b062eb';  // accent purple
    const PROJECTED = '#42f5a7';  // bright green

    // align alternates above/below to reduce overlap within each category
    const rockets = [
      { name: 'Saturn V',      year: 1967, cost: 22000, cap: '130,000 kg', src: 'NASA/NTRS',       cat: LEGACY,    align: 'bottom' },
      { name: 'Space Shuttle', year: 1981, cost: 54500, cap: '27,500 kg',  src: 'NASA/NTRS',       cat: LEGACY,    align: 'bottom' },
      { name: 'Ariane 5',      year: 1996, cost: 6500,  cap: '21,000 kg',  src: 'CSIS',            cat: LEGACY,    align: 'top'    },
      { name: 'Atlas V',       year: 2002, cost: 13000, cap: '18,814 kg',  src: 'CSIS',            cat: LEGACY,    align: 'top'    },
      { name: 'Soyuz',         year: 2004, cost: 5000,  cap: '7,000 kg',   src: 'NSF Forum',       cat: LEGACY,    align: 'top'    },
      { name: 'Falcon 9',      year: 2010, cost: 2700,  cap: '22,800 kg',  src: 'NASA/NTRS',       cat: CURRENT,   align: 'top'    },
      { name: 'Falcon Heavy',  year: 2018, cost: 1100,  cap: '63,800 kg',  src: 'SpaceX',          cat: CURRENT,   align: 'bottom' },
      { name: 'New Glenn',     year: 2025, cost: 250,   cap: '45,000 kg',  src: 'Blue Origin',     cat: CURRENT,   align: 'top'    },
      { name: 'Starship',      year: 2026, cost: 80,    cap: '100,000 kg', src: 'SpaceX (target)', cat: PROJECTED, align: 'top'    },
    ];

    // Trend line: connect all points in year order (same order as rockets array)
    const trendData = rockets.map(r => ({ x: r.year, y: r.cost }));

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Legacy',
            data: rockets.filter(r => r.cat === LEGACY).map(r => ({ x: r.year, y: r.cost, rocket: r })),
            backgroundColor: LEGACY,
            pointRadius: 8,
            pointHoverRadius: 11,
            datalabels: {
              color: LEGACY,
              font: { size: 11, weight: '600' },
              formatter: (v) => v.rocket.name,
              align: (ctx) => ctx.dataset.data[ctx.dataIndex].rocket.align,
              offset: 6,
            }
          },
          {
            label: 'Current',
            data: rockets.filter(r => r.cat === CURRENT).map(r => ({ x: r.year, y: r.cost, rocket: r })),
            backgroundColor: CURRENT,
            pointRadius: 8,
            pointHoverRadius: 11,
            datalabels: {
              color: CURRENT,
              font: { size: 11, weight: '600' },
              formatter: (v) => v.rocket.name,
              align: (ctx) => ctx.dataset.data[ctx.dataIndex].rocket.align,
              offset: 6,
            }
          },
          {
            label: 'Projected',
            data: rockets.filter(r => r.cat === PROJECTED).map(r => ({ x: r.year, y: r.cost, rocket: r })),
            backgroundColor: PROJECTED,
            pointRadius: 8,
            pointHoverRadius: 11,
            datalabels: {
              color: PROJECTED,
              font: { size: 11, weight: '600' },
              formatter: (v) => v.rocket.name,
              align: (ctx) => ctx.dataset.data[ctx.dataIndex].rocket.align,
              offset: 6,
            }
          },
          {
            label: 'Trend',
            data: trendData,
            type: 'line',
            borderColor: 'rgba(255,255,255,0.25)',
            borderDash: [6, 4],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0.3,
            datalabels: { display: false }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#e8e8e8',
              filter: item => item.text !== 'Trend',
              usePointStyle: true,
            }
          },
          tooltip: {
            backgroundColor: 'rgba(10,10,20,0.95)',
            borderColor: 'rgba(176,98,235,0.4)',
            borderWidth: 1,
            callbacks: {
              title: items => {
                const r = items[0].raw.rocket;
                return r ? r.name : '';
              },
              label: item => {
                const r = item.raw.rocket;
                if (!r) return '';
                return [
                  `Year: ${r.year}`,
                  `$/kg: $${r.cost.toLocaleString()} (2021 USD)`,
                  `Payload: ${r.cap}`,
                  `Source: ${r.src}`,
                ];
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: 1960,
            max: 2030,
            grid: { color: 'rgba(176,98,235,0.1)' },
            ticks: { color: '#e8e8e8', stepSize: 10, callback: v => v },
            title: { display: true, text: 'First Flight Year', color: '#e8e8e8' }
          },
          y: {
            type: 'logarithmic',
            grid: { color: 'rgba(176,98,235,0.1)' },
            ticks: {
              color: '#e8e8e8',
              callback: v => '$' + v.toLocaleString()
            },
            title: { display: true, text: '$/kg to LEO', color: '#e8e8e8' }
          }
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', initChart);
})();
</script>

