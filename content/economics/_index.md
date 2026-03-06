---
title: "Economics"
date: 2026-02-19
description: "Orbital compute is currently ~3x the cost of terrestrial. Here's what the numbers say, and what would need to change."
---

<div class="chart-section" data-aos="fade-up" style="margin: 2rem 0; padding: 2rem; background: rgba(0,0,0,0.6); border-radius: 12px; border: 1px solid rgba(176,98,235,0.2);">
  <h3 class="section-title" style="text-align: center; margin-bottom: 1.5rem;">Launch Cost Comparison ($/kg to LEO)</h3>
  <canvas id="launch-cost-chart" width="600" height="320"></canvas>
</div>

<div class="resource-grid">
{{< resource-card title="Space-Based Data Centers: First Principles Deconstruction and Market Analysis" summary="A comprehensive 2025 research paper evaluating orbital data centers through a first-principles economic framework. The analysis concludes that orbital facilities could achieve a 60-70% operational cost advantage over terrestrial data centers by 2035, strictly contingent on launch costs falling below specific thresholds." bullets="60–70% lower operating costs projected by 2035 | Only viable if launch costs fall below ~$500/kg | Contingent on Starship-era heavy lift availability" link="https://402t.com/reports/space-based-data-centers-state-of-the-art-economics-and-outlook.pdf" icon="📉" >}}
{{< resource-card title="Beyond Earth: The Case for In-Orbit Compute" summary="An industry whitepaper analyzing the unit economics of moving from localized satellite edge computing to full-scale orbital data centers. It focuses on the cost savings of reduced downlink bandwidth versus the capital expenditure of deploying heavy compute nodes." bullets="Saves on the high cost of beaming data from space to Earth | Distributed satellites vs. centralized orbital facility tradeoffs | High upfront hardware cost vs. ongoing operational savings | How long before an orbital constellation pays for itself" link="https://d11avd6t8zdcx0.cloudfront.net/uploads/2025/12/The-Case-for-In-Orbit-Compute-Paper-v1.2.pdf" icon="🛰️" >}}
{{< resource-card title="IEEE: Data Center Financial Analysis, ROI, and TCO" summary="An IEEE standard chapter adapted for space applications, examining the Total Cost of Ownership (TCO) and Return on Investment (ROI) complications when evaluating extreme environments. It provides a baseline mathematical framework for calculating the true lifetime costs of space facilities." bullets="How to calculate the true lifetime cost of a space facility | When does a space data center start turning a profit? | Cost premiums for radiation-hardened, vacuum-rated hardware" link="https://ieeexplore.ieee.org/document/9822795" icon="📘" >}}
{{< resource-card title="TechCrunch: Why the Economics of Orbital AI Are So Brutal" summary="Analysis of SpaceX's 1M satellite proposal, $100GW compute plans, and fundamental economic challenges." bullets="SpaceX/xAI targeting 100 GW orbital compute — more than all current cloud combined | Orbital compute currently ~10–100x more expensive to deploy | SpaceX–xAI merger context | Heat dissipation limits how dense you can pack compute in space" link="https://techcrunch.com/2026/02/11/why-the-economics-of-orbital-ai-are-so-brutal/" icon="💰" >}}
{{< resource-card title="SpaceNews: Economics Focus" summary="Industry analysis on whether AI infrastructure in space makes financial sense, with attention to recent developments." bullets="SpaceX pitching orbital compute to justify $1.5T IPO valuation | Varda analyst: orbital compute currently ~3x cost of terrestrial | Blue Origin pivoting to 'TeraWave' connectivity vs. raw compute | Microsoft water usage tripling by 2030 drives search for alternatives" link="https://spacenews.com/with-attention-on-orbital-data-centers-the-focus-turns-to-economics/" icon="📊" >}}
{{< resource-card title="Space Launch to Low Earth Orbit: How Much Does It Cost?" summary="Interactive dataset tracking launch costs per kilogram to Low Earth Orbit from 1957–2022. Shows the steep cost decline driven by commercial reusability, providing the historical baseline for current economic models." bullets="$/kg cost comparison across 100+ vehicles | Reusability-driven cost decline since 2005 | Historical baseline for Starship targets (<$100/kg) | Payload class breakdowns" link="https://aerospace.csis.org/data/space-launch-to-low-earth-orbit-how-much-does-it-cost/" icon="🚀" >}}
{{< resource-card title="Tom's Hardware: Orbital Calculator" summary="Running the numbers on orbital computing reveals brutal reality - new calculator evaluates economics." bullets="Cost per kilowatt-hour of compute power in orbit vs. on the ground | How launch cost per kg directly drives the economics | Why heat removal limits power density in space | At what scale and cost does orbital compute become competitive?" link="https://www.tomshardware.com/tech-industry/big-tech/new-calculator-helps-evaluate-the-economics-of-datacenters-in-space" icon="🧮" >}}
{{< resource-card title="Medium: Economics of Space-Based Data Centers" summary="First-principles analysis comparing orbital vs terrestrial data centers for compute workloads." bullets="5-year financial model for a 1 GW orbital facility | Space solar power costs $51B vs $16B terrestrial — still 3x more expensive | Key assumptions: launch cost, PUE, hardware lifetime | Conclusion: not yet viable, but viable under specific cost conditions" link="https://medium.com/@joe_62117/the-economics-of-space-based-data-centers-0f8d3d684501" icon="⚖️" >}}
  </div>

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
            title: { display: true, text: '$/kg to LEO (2021 USD, log scale)', color: '#e8e8e8' }
          }
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', initChart);
})();
</script>
