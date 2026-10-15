---
title: "Glossary"
date: 2026-10-15
description: "The terms this site uses for orbits, heat, failed hardware, and the status board."
---

Each entry is the meaning used on this site, then a place to read further. Outside articles come after that.

## Orbits

<h3 id="sso">Sun-synchronous orbit</h3>

A near-polar low Earth orbit whose plane keeps the same local solar time. A dawn-dusk sun-synchronous orbit holds the satellite near the day-night boundary. At roughly 600 km this site uses a solar duty cycle of about 96%, and an eclipse of about 4%. That is not sunlight every minute of the year, and it is not a power plant with no battery.

Further: [Power](/technical/#power).

<h3 id="eclipse-fraction">Eclipse fraction</h3>

The share of each orbit spent in Earth's shadow. In the dawn-dusk sun-synchronous orbit above, it is about 4%. Batteries cover that gap. They do not add energy across the day.

Further: [Power](/technical/#power).

<h3 id="leo">LEO, MEO, and GEO</h3>

Low Earth orbit is about 160–2,000 km. Most of the compute proposals on this site are there. Medium Earth orbit sits between that and geostationary orbit. Geostationary orbit, near 36,000 km, sees a fixed region of Earth and adds on the order of 600 ms of round trip, which is a poor fit for interactive compute.

Further: [Links](/technical/#links).

## Power and heat

<h3 id="pue">Power usage effectiveness</h3>

Total electrical power into a data center, divided by power that reaches the computers. 1.0 means no overhead. This site uses about 1.05 for a design that rejects heat by radiation, against about 1.2–1.5 for many ground data centers that run chillers and fans. A 1.05 PUE does not make the radiator small.

Further: [Heat](/technical/#heat).

<h3 id="radiative-cooling">Radiative cooling</h3>

How a spacecraft in vacuum rejects heat: infrared radiation from a radiator. There is no air to carry heat away. In low Earth orbit the radiator also sees the Sun and the Earth, so it is not a panel looking only at a 3 K sky. Radiated power scales with area and with the fourth power of temperature.

Further: [Heat](/technical/#heat).

<h3 id="kg-per-kw">Kilograms per kilowatt</h3>

Spacecraft mass divided by compute power. Solar arrays and radiators can be 65–70% of that mass, in IEEE Spectrum's June 2026 analysis. Launch price is dollars per kilogram. The two multiply.

Further: [Economics](/economics/#what-the-cost-is-made-of).

## Faults

<h3 id="cots">Commercial off-the-shelf</h3>

A terrestrial part flown without a full space-grade redesign. Starcloud-1 flew an NVIDIA H100. The bet is lower cost, with errors handled in software and memory, because a failed chip is not coming home.

Further: [A failed chip stays on orbit](/technical/#a-failed-chip-stays-on-orbit).

<h3 id="radiation">Radiation hardening and tolerance</h3>

Designing electronics so ionizing radiation does not flip bits or wear the part out. Hardening changes the chip. Tolerance keeps a commercial chip and adds shielding, spare runs, or memory that can correct a flip.

Further: [Stanford's note](http://large.stanford.edu/courses/2015/ph241/clark2/) is a tutorial. The site's use of the idea is on [Technical](/technical/#a-failed-chip-stays-on-orbit).

<h3 id="tmr">Triple modular redundancy</h3>

Three copies of a computation, and a vote. One wrong answer can be outvoted. The cost is about three times the hardware for that function.

<h3 id="ecc">Error-correcting memory</h3>

Memory that detects and corrects the common single-bit flip. Server-grade GPUs already use it. It is one of the tools for flying commercial chips.

## Links

<h3 id="isl">Inter-satellite link</h3>

A laser link between spacecraft, also called a free-space optical link. It moves data inside a constellation without a ground station on every hop. The Suncatcher paper's 1.6 Tbps figure is a paper result for satellites hundreds of meters apart, not a measurement from the prototype that flew.

Further: [Links](/technical/#links) and the [Suncatcher paper card](/technical/#suncatcher-paper).

## Words the status board uses

<h3 id="manifested">Manifested</h3>

Assigned to a named mission. That is not confirmation the spacecraft arrived, and it is not a license to operate.

Further: [Status](/status/#manifested).

<h3 id="filed">Filed</h3>

An application with a regulator. Not permission to launch, and not a factory plan.

Further: [Status](/status/#filed).

## Launch and power contracts

<h3 id="starship">Starship</h3>

SpaceX's fully reusable heavy-lift vehicle, still the stated path to a much lower price per kilogram. This site treats under $100/kg as that target. The working range used here for Falcon 9 is about $1,500–2,000/kg. The target is not today's price.

Further: [Launch price](/economics/#launch-price).

<h3 id="ppa">Power purchase agreement</h3>

A long contract that locks a ground data center's electricity price. Orbit has no meter on sunlight. The scarce inputs in the models here are launch mass, radiator mass, and lifetime, not a utility bill.

Further: [Economics](/economics/#what-the-cost-is-made-of).
