---
title: "How the July 2026 AI1 power revision uses batteries"
date: 2026-10-15
description: "The 16 July 2026 AI1 figures are about 250 kW peak and about 160 kW average. Battery-mass estimates on this page are this site's analysis."
hideAuthor: true
hideMeta: true
ShowReadingTime: false
---

This page records the 16 July 2026 power revision: about 250 kW peak, battery-assisted, and about 160 kW average. It does not restate mass, wingspan, solar area, or radiator area. The [current public design](/specs/#ai1--starmind) is the 16 September 2026 set. Battery mass and the NVL72 draw used below are this site's analysis, not a SpaceX figure.

<h3 class="section-title">Battery-Assisted Peak Power — How Starmind AI1 Reaches ~250 kW</h3>
  <p>In July 2026, Elon Musk revised the AI1 power budget: ~250 kW peak (battery-assisted) and ~160 kW average — up from the original 120 kW sustained / 150 kW peak disclosure. The change is not a larger solar array alone; onboard batteries buffer short power spikes so the satellite can host a full NVIDIA NVL72 Rubin rack (~190–230+ kW peak draw depending on Max-Q vs. Max-P profile) while solar remains sized for the time-averaged load.</p>

  <p><strong>Why batteries, not just bigger solar?</strong></p>
  <p>AI accelerator racks draw highly variable power. Musk noted that even efficient 24-hour inference workloads average roughly two-thirds of peak chip power — but individual forward passes, batch launches, and memory-bandwidth bursts still hit peak draw for seconds to minutes. Solar panels in SSO deliver near-continuous irradiance (~96% duty cycle at ~600 km), yet their instantaneous output still tracks pointing angle, temperature, and any brief eclipse. Batteries decouple <em>instantaneous</em> compute demand from <em>instantaneous</em> solar generation — the same peak-shaving role grid-scale data centers use UPS and battery banks for, but in orbit the "grid" is the local solar bus.</p>

  <p><strong>Operating cycle (charge / discharge)</strong></p>
  <ul>
    <li><strong>Solar-sized for average load (~160 kW)</strong> — Arrays and power conditioning target the time-averaged inference duty cycle, not the worst-case GPU spike; this avoids scaling wingspan and mass linearly with 250 kW peak</li>
    <li><strong>Discharge during compute spikes</strong> — When rack draw exceeds ~160 kW (training bursts, large-batch inference, all-GPU sync points), the battery pack supplements the solar bus up to ~250 kW combined output</li>
    <li><strong>Recharge during headroom</strong> — When compute load drops below solar output, surplus power recharges the pack; net energy balance must close over each orbit — batteries add no net energy, only time-shifting</li>
    <li><strong>Eclipse bridging (secondary)</strong> — SSO at ~600 km still has ~4% shadow time; Starlink already ships lithium-ion packs for eclipse survival, and AI1 inherits that bus heritage. Peak-shaving dominates the sizing rationale; eclipse is a smaller contributor than GPU burst buffering</li>
  </ul>

  <p><strong>Design impacts on the satellite</strong></p>
  <ul>
    <li><strong>More compute per node</strong> — Battery assist closes the gap to a full NVL72 Rubin rack on one spacecraft instead of a derated partial rack or splitting workloads across two nodes. One Starship launch delivers one complete rack-scale AI server rather than a power-limited subset</li>
    <li><strong>Battery mass &amp; volume</strong> — Covering a ~100 kW deficit for ~10 minutes requires ~17 kWh usable energy; at ~220 Wh/kg pack-level density and ~40% depth-of-discharge for cycle life, the pack adds roughly 75–85 kg. Sustaining high load for ~30 minutes pushes toward ~225–280 kg — a meaningful bus allocation traded against radiator area and propellant</li>
    <li><strong>More cooling capacity required</strong> — Compute waste heat tracks electrical draw. At 250 kW peak, the thermal subsystem must reject up to ~250 kW (near-unity heat-to-power ratio for silicon). The original AI1 disclosure cited 110 m² of deployable liquid radiators for ~120 kW sustained; a 250 kW peak budget implies either expanded radiator area (~2× if peaks are sustained), upgraded coolant loops with higher flow rates, or thermal buffering in the ammonia loop for brief spikes — analogous to the electrical battery on the thermal side</li>
    <li><strong>Battery thermal management</strong> — Li-ion performance and lifetime degrade at the temperature swings of sun-facing hardware in LEO. The pack needs its own thermal isolation, heaters for cold eclipse edges, and radiative or loop coupling so it does not share junction temperatures with GPU hot spots</li>
    <li><strong>Power electronics upgrade</strong> — Bidirectional DC-DC conversion, battery management (BMS), state-of-charge telemetry, and fault isolation add bus mass and software complexity. SpaceX can leverage Tesla cell and BMS heritage, but orbital radiation and single-failure tolerance impose harder requirements than terrestrial Megapacks</li>
    <li><strong>Workload scheduling coupling</strong> — Orbital orchestration can intentionally run burst workloads when state-of-charge is high and throttle during deep discharge — linking the constraint-aware execution planners (power + thermal + comms windows) to battery SOC as a schedulable resource</li>
  </ul>

  <p><strong>What does not change</strong></p>
  <ul>
    <li><strong>Net energy still comes from solar</strong> — Batteries raise peak power, not average energy throughput over a day; sustained 250 kW operation requires solar and radiator upgrades, not just a larger pack</li>
    <li><strong>Heat rejection remains the long-term ceiling</strong> — Electrical peak-shaving does not reduce waste heat; it can worsen the thermal problem if operators run hotter chips more often because power is available</li>
    <li><strong>Launch mass budget</strong> — Every kilogram of battery trades against compute, radiator, or propellant margin on a Starship-class deployment; the ~160 kW average / ~250 kW peak split is an optimization point, not a free upgrade</li>
  </ul>
  <p class="figure-note">Sources: Elon Musk post on AI1 power revision (July 16, 2026), NextBigFuture battery mass analysis, SpaceX Starmind / AI1 disclosures, NVIDIA NVL72 rack power profiles, Starlink eclipse battery heritage.</p>
