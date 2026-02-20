# Stargaze

Orbital data centers

<img src="assets/stargaze.jpg" alt="Dudu and Bubu stargazing" width="50%">


## Motivation

- [Why we should train AI in space](https://lumenorbit.github.io/wp.pdf)
  - constant sunlight and sun-synchronous orbit
  - deep space is a near-perfect heat-sink
  - dramatically lower CO2 and zero fresh water use for cooling
- [Towards a future space-based, highly scalable AI infrastructure system design](https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/)
  - the sun emits ~$3.86*10^{26}$ W
  - solar panels in orbit can be up to 8x more productive than on Earth
  - build gigawatt-scale, solar-powered AI cluster in low Earth orbit using Google TPUs, connected by free-space optical (laser) links
- [ASCEND feasibility study](https://ascend-horizon.eu)
  - on-orbit processing reduces latency for space-based data and allows only processed data to be downlinked
  - protected from terrestrical disasters
  - modular, robotic-assembly "hyper-structures"

## Foundational Knowledge

- Orbital mechanics & satellite systesm
- Data center basics
  - hyperscale design
  - power usage effectiveness (PUE)
  - cooling (liquid, immersion)
  - AI accelerators (GPUs/TPUs)
- Space environment hazards
  - radiation effects on electronics
  - thermal management in vaccum (radiative cooling)
  - microgravity effects

## Companies

- [Starcloud](https://www.starcloud.com)
- [Google](https://research.google)
- [Axiom Space](https://www.axiomspace.com)
- [Lonestar Data Holdings](https://www.lonestarlunar.com)
- [SpaceX](https://www.spacex.com)
- [Blue Origin](https://www.blueorigin.com)

## Challenges

- [Space Data Centers are Dumb](https://www.youtube.com/watch?v=-w6G7VEwNq0)
  - can't dump heat with conduction or convection in space, and radiation is inefficient
  - scaling up solar arrays require impactical mass to be launched to orbit
  - cosmic radiation would corrupt memory and electronics
