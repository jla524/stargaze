---
title: "Economics"
date: 2026-02-19
description: "Orbital compute is currently ~3x the cost of terrestrial. Here's what the numbers say, and what would need to change."
---

<div class="chart-section" data-aos="fade-up" style="margin: 2rem 0; padding: 2rem; background: rgba(0,0,0,0.6); border-radius: 12px; border: 1px solid rgba(176,98,235,0.2);">
  <h3 class="section-title" style="text-align: center; margin-bottom: 1.5rem;">Launch Cost Comparison ($/kg to LEO)</h3>
  <canvas id="launch-cost-chart" width="600" height="320"></canvas>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Inflation-adjusted 2021 USD/kg to LEO from CSIS Aerospace dataset.<br>Starship is SpaceX reusability target projection.</p>
</div>

<div class="resource-grid">
{{< resource-card title="Orbital Data Centers: Spacecraft Constraints and Economic Viability (NASA JPL)" summary="A physics-based competitiveness model from JPL's Slava Turyshev that derives the necessary cluster-level conditions for ODCs to compete with terrestrial data centers. The model maps delivered IT power into three coupled constraints: deployed mass per kW, space-to-ground data per unit compute energy, and delivered compute-years over mission life. Finds that terrestrial-user general compute requires launch costs below critical thresholds to close economically." bullets="First physics-based ODC competitiveness model from NASA JPL | Derives mass/power/comms closure conditions — not just solar flux | Three coupled constraints: mk/W, Γ, and lifetime penalty Πlife | Base case: 1 MW anchor, hi-sunlight orbit, beginning-of-life PV sizing | Separates subsystem floor (PV, eclipse, radiator) from architecture choices | Terrestrial-user general compute requires Starship-era launch costs to close" link="https://arxiv.org/pdf/2604.27197" icon="📐" >}}
{{< resource-card title="Forethought: Will We Really Put Data Centers in Space?" summary="A detailed 2026 cost model comparing three terrestrial data center buildout scenarios against three orbital scenarios for 1 GW of compute. The analysis treats orbital data centers as an alternative to off-grid terrestrial builds, not just grid-connected hyperscale facilities." bullets="Models Earth grid, Earth microgrid, Earth solar+gas, and three ODC launch-cost scenarios | Space solar reaches continuous off-grid power parity around ~$250/kg to orbit | Overall ODC cost parity emerges around ~$100/kg with modest mass reductions | Bullish ODC case at ~$50/kg can beat terrestrial alternatives | Models ~9% annual compute loss and ~38% extra non-compute hardware from lack of chip replacement | Strong source for comparing orbital compute against realistic terrestrial workarounds" link="https://www.forethought.org/research/will-we-really-put-data-centers-in-space" icon="🧮" >}}
{{< resource-card title="SemiAnalysis: To Boldly Go — The Case for Space Datacenters" summary="A first-principles levelized cost of compute analysis comparing orbital and terrestrial AI data centers. SemiAnalysis models GPU-hour TCO, LCOC, useful life, capex, WACC, reliability gross-up, and the terrestrial grid-queue context." bullets="2026 orbital deployment: ~$8.64/hr/GPU TCO vs ~$2.37/hr/GPU terrestrial | LCOC after reliability/SLA gross-up: ~$10.91/hr/GPU orbital vs ~$2.49/hr/GPU terrestrial | Space deployment starts ~4x higher cost in 2026 under current assumptions | Base case narrows toward parity around 2040, with early-2030s deployments still carrying a premium | Highlights 5-year orbital useful life vs 15-year terrestrial data center life | Useful for translating ODC claims into GPU-hour economics" link="https://newsletter.semianalysis.com/p/to-boldly-go-the-case-for-space-datacenters" icon="📊" >}}
{{< resource-card title="Andrew McCalip: Economics of Orbital vs Terrestrial Data Centers" summary="An interactive first-principles calculator for testing orbital compute assumptions against a terrestrial data center benchmark. The model reduces the debate to cost per usable watt of compute while exposing launch cost, satellite hardware, radiator, replacement, and terrestrial power assumptions." bullets="Interactive sliders for launch cost, satellite hardware cost, operations, and terrestrial benchmark | Baseline compares orbital solar against a boring tilt-wall data center tied to cheap power | Makes radiator sizing and bifacial solar/radiator thermal constraints explicit | Shows why vertical integration is central: margin stack and mass tax can erase the thesis | Public model/code enables transparent sensitivity testing | Widely referenced by analysts and journalists covering ODC economics" link="https://andrewmccalip.com/space-datacenters" icon="⚙️" >}}
{{< resource-card title="ABI Research: Data Centers in Space Analyst Q&A" summary="A commercial feasibility overview from ABI Research covering ODC use cases, market timing, cost limitations, and deployment forecasts. It is useful as a market-facing counterweight to both startup claims and purely academic models." bullets="Forecasts up to 18,600 space data centers active by 2035 | Effective orbital compute power forecast reaches ~1.5 MW by 2035 | Financial backing exceeded $3B as of April 2026 | Current TCO can be up to 78x terrestrial in some ABI estimates | Expects orbital $/W convergence with terrestrial benchmarks by 2035 | Emphasizes mission-critical customers and deep-pocketed early adopters" link="https://www.abiresearch.com/blog/data-centers-in-space" icon="📈" >}}
{{< resource-card title="Angadh Nanjangud: Critique of Starcloud's 40 MW Cost Claims" summary="A skeptical engineering-economics critique of Starcloud-style claims that a 40 MW space data center could fit in a single Starship launch for roughly $8.2M. The analysis uses ISS solar array, radiator, and server-rack benchmarks to stress-test mass and launch assumptions." bullets="Argues a 40 MW SDC may require up to 22 launches, not one | Solar arrays, radiators, and server racks dominate launch mass | Notes Starcloud's stated launch-cost arithmetic appears inconsistent ($30/kg vs $50/kg) | Shows sensitivity to Starship cost assumptions from $500/kg to $1,000/kg | Excludes additional MMOD/radiation shielding and assembly propellant, making it a conservative critique | Useful counterweight to highly optimistic startup whitepapers" link="https://angadh.com/space-data-centers-1" icon="⚖️" >}}
{{< resource-card title="AI Grid Report: AI Power Stack Economics" summary="A terrestrial power benchmark comparing the routes hyperscalers are using to secure power now: solar+BESS+gas, behind-the-meter fuel cells, nuclear restarts, and SMRs. This matters because ODCs should be compared against the best terrestrial workaround, not just ordinary grid power." bullets="Solar+BESS+gas provides the lowest non-nuclear firm-power cost in the report | Bloom fuel cells cost more but can deliver power in 12-18 months by bypassing grid queues | Nuclear restarts can be competitive where existing sites and licenses are available | SMRs carry first-of-a-kind uncertainty with much higher capex ranges | Speed-to-power is treated as an economic variable, not just an engineering schedule | Provides realistic terrestrial baselines for ODC parity claims" link="https://research.theaigridreport.com/ai-power-stack-economics-may-2026.pdf" icon="⚡" >}}
{{< resource-card title="Reliability and Risk in Space-Based Data Centers (Applied Sciences)" summary="A 2026 lifecycle risk assessment arguing that reliability is the central determinant of space-based data center viability. The paper traces how launch loads, radiation faults, thermal extremes, subsystem single points of failure, maintenance limits, and end-of-life disposal propagate into cost and operational risk." bullets="Lifecycle framework: launch, orbital operations, maintenance, and end-of-life | Risk chain links shielding, redundancy, mass, launch cost, and revenue per kg | Radiation hardening improves reliability but increases mass and power draw | Lower-reliability designs reduce capex but create financial and operational risk | Compute-centric SBDC focus with storage treated as a support resource | Useful for evaluating whether claimed low-cost designs are actually maintainable" link="https://www.mdpi.com/2076-3417/16/11/5247" icon="🧯" >}}
{{< resource-card title="Evaluating Space-Based Data Center Architectures (UVA NSDPI)" summary="A 2026 policy and engineering report evaluating orbital data center architectures through capability, constraint, cost, and national security lenses. It argues ODCs are unlikely to beat terrestrial data centers on near-term cost, but may still matter for resilient, physically separated, mission-critical compute." bullets="Frames ODCs as strategic infrastructure, not just cheap cloud capacity | Reviews power, thermal, launch, communications, and maintenance constraints | Notes heat rejection can account for a major share of total ODC cost | 1 GW scenarios remain expensive unless launch, hardware cost, specific power, and failure rates improve sharply | Highlights China's orbital computing efforts as part of geopolitical competition | Good source for separating economic parity from strategic value" link="https://nationalsecurity.virginia.edu/sites/default/files/files/2026-05/00036_20260519%29_nsdpi_evaluating_space-based_data_center_architectures-capabilitites%2C_constraints%2C_and_trade-offs.pdf" icon="🛡️" >}}
{{< resource-card title="Bitcoin Mining Economics: Space vs Earth (Starcloud)" summary="Starcloud demonstrates Bitcoin mining TCO advantage in orbit: free solar eliminates electricity costs, PUE 1.05 via radiative cooling reduces opex vs Earth. Low ASIC capex supports shifting 20 GW mining load when launch costs hit Starship targets." bullets="ASIC capex ~$1,000/kW (30x cheaper than GPUs) | ~20 GW terrestrial Bitcoin mining power | Space: $0/kWh + PUE 1.05 vs Earth ~$0.05/kWh + PUE 1.3 (~$570/kW-yr opex) | Profitability requires launch amortized below $100/kg with Starship reusability" link="https://forklog.com/en/starcloud-to-pioneer-bitcoin-mining-in-space/" icon="⛏️" >}}
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
            title: { display: true, text: '$/kg to LEO', color: '#e8e8e8' }
          }
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', initChart);
})();
</script>
