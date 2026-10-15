---
title: "Primer"
date: 2026-10-14
description: "What an orbital data center is, the physics and cost constraints behind it, and which systems have actually flown."
ShowToc: true
TocOpen: true
ShowReadingTime: true
hideAuthor: true
---

An orbital data center is a spacecraft that turns sunlight into compute and returns the result to Earth. Companies use the same phrase for a single GPU on a small satellite, a cluster of edge processors on an imaging constellation, and an application for a million spacecraft. This page separates those cases.

Figures below are the ones already documented on this site. The [news log](/news/) runs through 1 October 2026. When a design has been revised in public, the latest disclosure is the one quoted, and the earlier figure is named.

## Three different systems

**A power-and-radiator spacecraft.** Solar arrays and radiators are sized for tens or hundreds of kilowatts of accelerators, and the job of the satellite is to be a computer. SpaceX's Starmind / AI1 design, Starcloud's larger spacecraft, and Google's multi-satellite cluster studies sit here. This is what "orbital data center" means when people talk about gigawatts.

**Edge compute on a satellite that already has another job.** A handful of GPUs process sensor data in orbit so the satellite can downlink a result instead of the raw stream. Kepler's cluster, Aethero's demonstrators, and Alibaba's Qwen-3 running on ADA Space's Star-Compute constellation are this category. The hardware is real and the power is measured in kilowatts or less, sometimes much less.

**Off-world storage.** Lonestar's Freedom payload, flown in 2025 toward lunar distance, is an archive: disaster-resilient copies of data, not a training cluster. Storage and compute share a launch vehicle and a radiation environment. They do not share a power budget or a customer.

The rest of this page is about the first category, with the second used as the record of what has flown.

## Why it is being proposed

Terrestrial data centers are running into electricity, water, land, and permits. The IEA's 2026 review puts data-center electricity at about 485 TWh in 2025, roughly 1.5% of global electricity, and about 945 TWh in 2030 in its base case. Operators also draw cooling water at a scale that was already controversial before the current AI buildout. [Motivation](/motivation/) collects the demand charts and the papers.

Orbit is being proposed as a way around those four constraints:

- A dawn-dusk sun-synchronous orbit stays in sunlight about 96% of each orbit, so the energy source does not wait on a grid interconnection.
- Waste heat leaves by radiation into deep space, so the design has no operational cooling water.
- The site is a launch manifest, so the permit is a spectrum and space-traffic filing rather than a local power and water approval.

Those are the claims. The constraints that replace the terrestrial ones are mass, heat rejection, hardware lifetime, and the link back to Earth.

## Sunlight

A dawn-dusk sun-synchronous orbit keeps the orbital plane near the day-night boundary. At roughly 600 km the satellite is in sunlight for about 96% of each orbit. The other about 4% is eclipse. Sunlight at the top of the atmosphere is about 1,366 W/m² before cell efficiency, temperature, pointing loss, and degradation.

Against an average fixed array on the ground, the same collecting area yields about 4–5× more energy over a year. Weather and night are what that multiple is measuring. It is a duty cycle of about 96%, not continuous power every minute of the year.

Batteries cover the eclipse. On a high-power design they also cover short compute spikes above the solar array's average output. They do not add energy across a full day. If the chips draw the peak load for long, the array and the radiators have to grow. The [July AI1 note](/technical/ai1-power/) works through that split for the power budget.

## Heat

There is no air in orbit, so a processor cannot be cooled by convection. Electrical power that enters the chips leaves as heat, and the heat leaves the spacecraft as infrared radiation. Radiated power scales with radiator area and with the fourth power of temperature. A hotter radiator can be smaller. The chips, the coolant, and the batteries have to live with that temperature.

A power usage effectiveness (PUE) near 1.05 means almost every watt of electricity reaches the computers. The rest is pumps and power conditioning. Ground data centers are often in the 1.2–1.5 range because chillers and fans are a large share of the bill. A 1.05 PUE does not make the radiator small. IEEE Spectrum's June 2026 analysis argues that solar arrays and radiators can be 65–70% of the mass of this kind of satellite. Operational water use is zero. Radiator mass takes the place of the cooling plant.

## What decides the cost

A watt of compute in orbit is cheaper than a watt on the ground only if three things close at the same time. [Economics](/economics/) collects the models. They do not agree on a single multiple, and they are explicit about why.

**Mass you have to launch.** You pay for every kilogram of array, radiator, structure, battery, and shielding. Google has described its design as competitive once launch approaches about $200/kg. Forethought's 2026 comparison puts continuous off-grid orbital power near parity with terrestrial alternatives around $250/kg, and the full data-center cost nearer $100/kg if the spacecraft also gets lighter. Starship's stated target is under $100/kg. The glossary's working range for Falcon 9 is about $1,500–2,000/kg. The target is not the price on today's flights.

**How long the hardware survives.** Nobody flies up to swap a failed GPU. Forethought's model assumes about 9% of the compute is lost each year, and about 38% extra non-compute hardware to cope with that. SemiAnalysis uses a five-year orbital life against about fifteen years in a ground hall. On those assumptions, a 2026 orbital GPU-hour is about $8.64 against about $2.37 on the ground, roughly four times, and higher again after a reliability markup. Another analyst comment cited on the Economics page puts the near-term multiple nearer three. TechCrunch has described the cost to deploy as 10–100×. Those are different measurements. The direction is the same: at current launch prices, the orbital GPU is the expensive one.

**Bits that can come home.** Laser links between satellites can run at hundreds of gigabits per second. The radio hop from a gateway satellite to a ground station is much smaller, and it caps how much data leaves the constellation. Batch inference, reduction of data that was collected in orbit, and long training jobs fit that cap. A chat product that streams tokens to a user fits it poorly. A JPL competitiveness model states the same three limits together: kilograms per kilowatt, data returned per unit of compute energy, and compute-years delivered over the life of the spacecraft.

The latest public AI1 figures show how large the mass term already is. A SpaceX ex parte filing recorded here on 16 September 2026 describes each Starmind satellite at up to 4,000 kg, with a solar array above 1,500 m², 250 kW peak and 175 kW average compute, a 75 m wingspan, and 160 m² of liquid radiators. An earlier 2026 disclosure was 120 kW sustained, 150 kW peak, and a 70 m wingspan. Treat the September figures as the current public design, and expect another revision. The dated rows, including the 16 July 2026 power revision and the 25 August 2026 note that still quotes the June design, are on the [spec sheet](/specs/).

## What has flown

No rack-scale orbital data center is operating. What has flown is pathfinders and edge clusters. "Largest" in this table means largest on the record collected here, which for commercial edge compute is Kepler's.

<div class="primer-table">
<table>
  <thead>
    <tr>
      <th scope="col">System</th>
      <th scope="col">Recorded flight</th>
      <th scope="col">Compute on the public record</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Starcloud-1</td>
      <td>November 2025</td>
      <td>One NVIDIA H100. A Gemma training run was reported the following month. First data-center GPU reported to train a model in orbit.</td>
    </tr>
    <tr>
      <td>Kepler cluster</td>
      <td>Opened commercially in April 2026</td>
      <td>40 Jetson Orin GPUs on 10 laser-linked satellites. Edge inference and hosted workloads, sold as a service.</td>
    </tr>
    <tr>
      <td>Axiom nodes</td>
      <td>11 January 2026</td>
      <td>Two nodes with 2.5 Gbps optical links into Kepler's relay network. Described by Axiom as dedicated data-center nodes.</td>
    </tr>
    <tr>
      <td>Aethero Phobos</td>
      <td>March 2026</td>
      <td>157 TFLOPS demonstrator, after Deimos in 2024. Titan, a much larger module, was scheduled for October 2026; this site has no separate confirmation that it reached orbit.</td>
    </tr>
    <tr>
      <td>Suncatcher prototype</td>
      <td>1 October 2026</td>
      <td>Google and Planet. Four TPUs and about 1 kW of solar power. Google confirmed contact. Heat limits runs to about 15 minutes. A research pathfinder.</td>
    </tr>
    <tr>
      <td>ADA Space Star-Compute</td>
      <td>12-satellite testbed in May 2025</td>
      <td>Alibaba's Qwen-3 was reported running on the constellation in January 2026. On-orbit inference for Earth observation.</td>
    </tr>
    <tr>
      <td>Xingshu first batch</td>
      <td>July 2026</td>
      <td>First launched batch of Shanghai's program. The verification phase is sized at 2 computing satellites and 12 edge satellites, toward a stated goal of about 1,000.</td>
    </tr>
  </tbody>
</table>
</div>

Lonestar's Freedom payload (2025) belongs in the storage row beside this table. StarVault, its commercial storage service, was announced in April 2026 with further hardware still on the manifest.

## What is on a schedule

Dates in this list are company statements, not a forecast.

- **Starcloud-2** was still described in September 2026 as a later-2026 flight, with GPUs and a plan to fly Bitcoin ASICs. Starcloud has ordered Starlink laser terminals for this spacecraft and later ones. A lunar-orbit demo with Firefly is manifested no earlier than 2028.
- **SpaceX** has said compute payloads will fly on Starlink satellites as canaries, with AI1 first flights in late 2027 (Gwynne Shotwell, at the 2026 IPO). Elon Musk and Nvidia have separately described a space-optimized Vera Rubin NVL72 aimed at the fourth quarter of 2027, and significant scale in 2028. Both dates depend on Starship's flight rate.
- **Google** is targeting a two-satellite optical-link test in 2027. On the October 2026 prototype, Google said it does not expect usefully operational orbital AI for several years.
- **Sophia Space** plans a TILE demonstration in 2027. The $300 million satellite-lease announcement in September 2026 is a non-binding letter of support.

## What is only a filing

A filing asks a regulator to open a docket. It is not permission to launch, and it is not a factory plan.

- **SpaceX Starmind.** An application for up to one million satellites has been accepted for filing and has not been authorized. Environmental groups have asked the FCC for a full environmental impact statement. The per-satellite design is the September 2026 description in the previous section.
- **Starcloud.** An application for up to 88,000 satellites and 20 GW.
- **Blue Origin, Project Sunrise.** An application for up to 51,600 satellites in sun-synchronous orbit.
- **Orbital.** An application for up to 100,000 satellites and 10 GW. As of the September 2026 bus partnership, that application was still pending. The company's pathfinder is a 2027 rideshare with a single GPU.

Adding those applications together does not produce a capacity forecast. [Status](/status/) keeps each system on its own row: flying, manifested, filed, or announced. [Companies](/companies/) is the directory of who filed, who builds buses, and who has flown hardware. [Roadmap](/roadmap/) is the phase view, with SpaceX's production targets labeled separately from the rest of the industry.

## Objections that are still open

Each of these has a sourced treatment elsewhere on the site. None of them is resolved by a successful pathfinder.

- **Heat at rack scale.** A 15-minute run on a 1 kW prototype does not demonstrate a 175 kW average load held for years. Radiator area, coolant loops, and the temperature of the chips are the engineering problem. See [Technical](/technical/) and the IEEE Spectrum piece linked from [News](/news/).
- **Lifetime and repair.** A five-year life with no servicing is an assumption in the cost models, and it is also the assumption behind the debris arithmetic. If GPUs fail faster, both the price and the disposal rate get worse.
- **The night sky.** Large arrays are bright. Astronomers warned in June 2026 that parking-orbit glints and, at million-satellite scale, aggregate sky brightness could interfere with optical surveys. A brightness analysis in Monthly Notices of the Royal Astronomical Society is linked from [Motivation](/motivation/).
- **Disposal and materials.** Ars Technica's August 2026 analysis takes a five-year life and a million-satellite fleet and gets on the order of 200,000 retirements a year, with a materials load that includes copper, palladium, and gold, plus aluminum reentry. SpaceX's filing discusses how satellites would leave orbit. The rate is what the objection is about.
- **A split regulatory review.** Spectrum (FCC), launch (FAA), and environmental review are separate processes. The Brookings note linked from News argues that the split lets a design advance before anyone has reviewed feasibility, debris, and market power together. The NEPA request on the Starmind docket is the concrete version of that argument.
- **Unit cost.** The models on [Economics](/economics/) leave orbit more expensive than the ground until launch price, kilograms per kilowatt, and lifetime move together. A lower launch price on its own does not close the case if the radiator mass and the failure rate stay where they are.

## Keep going

<div class="primer-next">
  <a href="/motivation/"><strong>Motivation</strong><span>Electricity demand, water, and the papers behind the terrestrial constraint.</span></a>
  <a href="/technical/"><strong>Technical</strong><span>AI1 power, radiators, the Starlink heritage, and the path back to Earth.</span></a>
  <a href="/specs/"><strong>Spec sheet</strong><span>Dated figures for AI1, Suncatcher, Starcloud, and Project Sunrise. Older revisions stay on their own rows.</span></a>
  <a href="/economics/"><strong>Economics</strong><span>Launch-cost chart and the models, with their assumptions attached.</span></a>
  <a href="/companies/"><strong>Companies</strong><span>Who has flown hardware, who sells buses, and who has filed a constellation.</span></a>
  <a href="/news/"><strong>News</strong><span>The dated log this primer was checked against.</span></a>
  <a href="/status/"><strong>Status</strong><span>What is flying, what is on a manifest, and what is only a filing.</span></a>
  <a href="/roadmap/"><strong>Roadmap</strong><span>Four phases. Company production targets are marked as targets.</span></a>
  <a href="/glossary/"><strong>Glossary</strong><span>Sun-synchronous orbit, PUE, radiative cooling, optical links, COTS.</span></a>
</div>
