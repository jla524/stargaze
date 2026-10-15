---
title: "Technical"
date: 2026-10-15
description: "Power, heat, failed chips, and the link back to Earth. Papers and the June 2026 AI1 notes sit underneath."
---

Dated public figures for AI1, Suncatcher, Starcloud, and Project Sunrise are on the [spec sheet](/specs/). This page is the engineering argument. A paper below is not a flight. Flights are on the [status board](/status/).

- [Power](#power)
- [Heat](#heat)
- [A failed chip stays on orbit](#a-failed-chip-stays-on-orbit)
- [Links](#links)
- [Flown hardware and papers](#flown-hardware-and-papers)
- [Go deeper](#go-deeper)

## Power

A dawn-dusk [sun-synchronous orbit](/glossary/#sso) keeps the satellite in sunlight for about 96% of each orbit at roughly 600 km. The other about 4% is [eclipse](/glossary/#eclipse-fraction). Sunlight at the top of the atmosphere is about 1,366 W/m² before cell efficiency, temperature, pointing loss, and degradation. Against an average fixed array on the ground, the same area yields about 4–5× more energy over a year. That multiple is weather and night. It is not power every minute of the year.

Batteries cover the eclipse. On a high-power design they also cover short peaks above the array's average. They do not add energy across a full day. If the chips hold the peak for long, the array and the radiators have to grow.

For AI1, the 16 July 2026 revision is about 250 kW peak, battery-assisted, and about 160 kW average. It does not restate mass, wingspan, or radiators. The [July note](/technical/ai1-power/) works through that split. The [16 September 2026 design](/specs/#ai1--starmind) is the current public set.

<p id="ai1-july-2026">The July note used to live on this page. It is now <a href="/technical/ai1-power/">its own page</a>.</p>

## Heat

There is no air in orbit, so a processor cannot be cooled by a fan. Electrical power that enters the chips leaves as heat, and the heat leaves the spacecraft by [radiation](/glossary/#radiative-cooling). Radiated power scales with area and with the fourth power of temperature. A hotter radiator can be smaller. The chips, the coolant, and the batteries have to live at that temperature.

A [PUE](/glossary/#pue) near 1.05 means almost every watt reaches the computers. Ground data centers are often in the 1.2–1.5 range because chillers and fans are a large share of the bill. A 1.05 PUE does not make the radiator small. IEEE Spectrum's June 2026 analysis argues that solar arrays and radiators can be 65–70% of the mass of this kind of satellite. The [news post](/news/ieee-spectrum-thermodynamics-rules-orbital-data-centers/) is the record of that argument.

The ISS rejects on the order of 70–80 kW from its radiators. That is a useful scale check, not a design for these satellites. See the NASA note in the sources.

## A failed chip stays on orbit

Nobody swaps a GPU in this fleet. [COTS](/glossary/#cots) hardware is the bet: an H100 has flown on Starcloud-1, and the Suncatcher prototype is flying TPUs. Tolerance is shielding, [error-correcting memory](/glossary/#ecc), and spare capacity, not a truck roll.

Forethought's cost model turns that into about 9% compute loss per year and about 38% extra non-compute hardware. Those are economics inputs. They are explained on [Economics](/economics/#what-the-cost-is-made-of).

## Links

Inside the constellation, the path is a laser [inter-satellite link](/glossary/#isl). The Suncatcher paper's figures for a close formation — hundreds of meters apart, and 1.6 Tbps — are summarized in the card below. They are paper figures. The flown prototype is a separate, much smaller spacecraft. See the [spec sheet](/specs/#project-suncatcher).

The narrow pipe is the one back to Earth. A 2026 communications paper puts internal data-center exchange at petabit scale and the ground link at gigabit scale. Workloads that must return raw data are a poor fit. Workloads that can return a small result are the ones these designs are drawn around.

## Flown hardware and papers

The [status board](/status/) is the list of what this site records as flying, manifested, filed, or only announced. The sources below are papers, tutorials, and the June 2026 AI1 write-up. Do not read a paper's megawatt sketch as a satellite on orbit.

## Go deeper

- [July 2026 AI1 power revision](/technical/ai1-power/) — batteries, the 250 kW peak, and what that does not change. Battery mass on that page is this site's analysis.
- [June 2026 AI1 design notes](/technical/ai1-from-starlink/) — manufacturing delta, data path, and diagrams for the earlier 120 kW / 70 m disclosure. The September design is not drawn there.

## Sources

<div class="resource-grid">
{{< resource-card id="suncatcher-paper" title="Google Suncatcher System Design" summary="Google Research's engineering paper behind Project Suncatcher. Trillium TPU chips were tested in a proton beam and survived radiation doses 3× higher than expected for a 5-year mission. Satellites flying hundreds of meters apart are described with free-space optical links at 1.6 Tbps. Those are paper figures. The prototype that flew is on the spec sheet." bullets="Trillium TPUs survived 3× the expected 5-year dose in a proton beam | Hundreds of meters apart, with a stated 1.6 Tbps optical link | Formation flying needs continuous station-keeping | The paper's economics case uses launch near $200/kg" link="https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/" icon="📊" >}}
</div>

### Papers

- [June 2026 AI1 disclosure, Tom's Hardware](https://www.tomshardware.com/tech-industry/spacex-details-its-ai1-compute-satellite) — 120 kW sustained, 150 kW peak, 70 m. Earlier than the [spec sheet](/specs/#ai1--starmind).
- [Integrated solar, radiator, and compute panels](https://arxiv.org/abs/2604.07760) — a paper architecture aimed at more than 100 kW of compute per launched tonne.
- [Data centers in space, DCiS architecture](https://ieeexplore.ieee.org/document/8900609) — reusing a cloud software stack, with a long design life as the goal.
- [Deep tech to space](https://arxiv.org/abs/2605.19892) — an end-to-end LEO system paper, from orbit design to orchestration.
- [Communication-efficient space data centers](https://arxiv.org/abs/2605.12681) — the gap between internal exchange and the ground link.
- [SpaceCoMP](https://arxiv.org/abs/2601.17589) — map and reduce over a laser mesh, so the downlink is a result.
- [Constraint-aware execution planning](https://arxiv.org/abs/2605.04052) — which steps run on orbit once eclipse, power, and contact windows are included.
- [Which workloads belong in orbit](https://doi.org/10.48550/arXiv.2603.20317) — semantic reduction of Earth-observation data, including a Sentinel-2 example.
- [Towards a space-based computing network](https://arxiv.org/abs/2103.04547) — edge satellites, relay nodes, and ground gateways.
- [Multi-orbit architectures for 6G](https://arxiv.org/abs/2603.18601) — LEO for access and inference, MEO and GEO for aggregation.
- [Carbon-neutral data centres in space, Nature](https://www.nature.com/articles/s43247-023-00977-1) — operational energy versus the carbon of launch.
- [O-RAID](https://www.nature.com/articles/s41598-026-38784-1) — a paper design for storage redundancy across satellites.
- [LumenOrbit whitepaper](https://lumenorbit.github.io/wp.pdf) — Starcloud's earlier note. It uses 1,366 W/m² and a PUE near 1.05.
- [ASCEND](https://ascend-horizon.eu) — an ESA study of large structures assembled in orbit.

### References

- [ISS thermal control](https://nasa.gov/missions/station/managing-heat) — on the order of 70–80 kW rejected by the station's radiators.
- [Stanford, radiation hardening](http://large.stanford.edu/courses/2015/ph241/clark2/) — single-event upsets and total ionizing dose.
- [Starlink technology](https://starlink.com/technology) — laser links already flying on a communications constellation.
- [Khan Academy, orbits](https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation) — the mechanics underneath an orbit choice.
