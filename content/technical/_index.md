---
title: "Technical"
date: 2026-02-19
description: "Engineering analyses covering orbital mechanics, radiative cooling, radiation hardening, and optical inter-satellite links."
---

<div class="resource-grid">

<div class="resource-card card diagram-card" data-aos="fade-up">
  <h3 class="section-title">&#x1F6F0;&#xFE0F; Space Data Center Satellite — System Architecture</h3>
  <p>A conceptual diagram of a space data center satellite, highlighting the major subsystems and their relative cost contributions. Solar arrays and compute hardware account for the majority of hardware cost; radiators are uniquely critical in orbit where convective cooling is impossible.</p>
  <div class="diagram-wrapper" onclick="document.getElementById('diagram-modal').classList.add('active');document.getElementById('diagram-modal-backdrop').classList.add('active')">
    <img src="/assets/satellite-diagram.svg" alt="Space data center satellite diagram showing solar arrays, thermal radiators, compute module, ISL transceivers, structural bus, power conditioning unit, and attitude thrusters with cost breakdowns" loading="eager"/>
    <span class="diagram-expand-hint">click to expand</span>
  </div>

  <script>
    (function() {
      function closeModal() {
        document.getElementById('diagram-modal').classList.remove('active');
        document.getElementById('diagram-modal-backdrop').classList.remove('active');
      }

      // Backdrop
      var backdrop = document.createElement('div');
      backdrop.className = 'diagram-modal-backdrop';
      backdrop.id = 'diagram-modal-backdrop';
      backdrop.addEventListener('click', closeModal);

      // Modal card
      var modal = document.createElement('div');
      modal.className = 'diagram-modal';
      modal.id = 'diagram-modal';
      modal.innerHTML = '<div class="diagram-modal-header">'
        + '<button class="diagram-modal-close" aria-label="Close">&times;</button>'
        + '</div>'
        + '<img src="/assets/satellite-diagram.svg" alt="Space data center satellite diagram — expanded view"/>';

      // Append both directly to body so fixed positioning is never broken by a stacking context
      document.body.appendChild(backdrop);
      document.body.appendChild(modal);

      modal.querySelector('.diagram-modal-close').addEventListener('click', closeModal);

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
      });
    })();
  </script>
  <ul>
    <li><strong>Compute module (30–40% of hardware cost)</strong> — GPU/TPU racks with ECC memory and Triple Modular Redundancy (TMR); 3x compute overhead to guard against single-event upsets from cosmic rays</li>
    <li><strong>Deployable solar arrays (25–35%)</strong> — Multi-junction GaAs cells operating at ~30% efficiency; 1,366 W/m² constant irradiance in SSO vs. ~170 W/m² average on Earth</li>
    <li><strong>Thermal radiators (15–25%)</strong> — Passive radiation to ~3K deep space; PUE ~1.05 vs. 1.2–1.5 for terrestrial facilities; ammonia coolant loops transfer heat from compute racks to panels</li>
    <li><strong>Optical ISL transceivers</strong> — Free-space laser links up to 1.6 Tbps between satellites flying hundreds of meters apart; already demonstrated at scale on Starlink</li>
    <li><strong>Structural bus + shielding</strong> — Al-Li alloy frame with micrometeoroid protection; total launched mass is the primary driver of mission cost at current $/kg launch rates</li>
  </ul>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Sources: Starcloud Whitepaper (formerly LumenOrbit), IEEE DCiS Architecture, ASCEND Study, NASA ISS Thermal Systems.</p>
</div>

{{< resource-card title="Data Center in Space (DCiS) Architecture (IEEE Xplore)" summary="An IEEE paper proposing a software architecture for space data centers that reuses existing cloud software stacks (think AWS or GCP patterns) rather than building from scratch. The goal is 30+ year operational reliability — far longer than typical cloud hardware refresh cycles of 3-5 years on Earth — requiring robust redundancy and radiation-tolerant design." bullets="Reuses existing cloud software (AWS/GCP patterns) rather than custom space OS | 30-year target lifespan vs. 3-5 year refresh cycles on Earth | Radiation shielding and hardware redundancy built into the architecture | Proposes tiered storage: hot (in-orbit), warm (relay), cold (ground)" link="https://ieeexplore.ieee.org/document/8900609" icon="🖥️" >}}
{{< resource-card title="Towards Space-Based Computing Infrastructure Network (arXiv)" summary="An academic paper proposing a three-tier network architecture for orbital compute: edge satellites that collect and pre-process data, relay nodes that aggregate and route it, and ground gateways that interface with terrestrial cloud networks. The hierarchy reduces latency and downlink bandwidth by filtering data close to the source." bullets="Three-tier hierarchy: edge satellites → relay nodes → ground gateways | Processing data in orbit reduces what needs to be sent to Earth — cutting downlink bandwidth costs | Constellation integration: works across multiple satellite operators | Key challenge: orchestrating workloads across satellites with intermittent connectivity" link="https://arxiv.org/abs/2103.04547" icon="🕸️" >}}
{{< resource-card title="The Development of Carbon-Neutral Data Centres in Space (Nature)" summary="A peer-reviewed Nature paper examining whether space data centers can genuinely achieve net-zero carbon — factoring in not just operational energy, but rocket launch emissions. The finding is nuanced: orbital facilities can eliminate operational carbon, but launch vehicle emissions could add an order of magnitude more carbon than they save, unless reusable rockets drastically cut launch footprint." bullets="Operational carbon: near-zero (solar power, no grid) | Launch emissions could outweigh operational savings unless reusable rockets are used | Starship-class reusability is the key variable in the net-zero equation | Provides a mathematical framework for comparing terrestrial vs. orbital carbon over a facility's lifetime" link="https://www.nature.com/articles/s43247-023-00977-1" icon="🌱" >}}
{{< resource-card title="Google Suncatcher System Design" summary="Google Research's full engineering paper behind Project Suncatcher. The most interesting result: Trillium TPU chips were tested in a proton beam and survived radiation doses 3x higher than expected for a 5-year mission. The paper also details how satellites flying hundreds of meters apart can use free-space optical links to achieve 1.6 Tbps inter-satellite bandwidth — comparable to transoceanic fiber cables." bullets="Trillium TPUs survived 3x the expected 5-year radiation dose in proton beam testing | Satellites fly 100s of meters apart, using lasers to achieve 1.6 Tbps inter-satellite links | Formation flying: keeping satellites in precise relative positions requires continuous station-keeping thruster burns | Economics viable below ~$200/kg launch cost — projected mid-2030s with Starship" link="https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/" icon="📊" >}}
{{< resource-card title="LumenOrbit Whitepaper" summary="The original engineering whitepaper by Starcloud (then LumenOrbit) that sparked the space data center movement. It quantifies the orbital advantage: 1,366 W/m² of solar irradiance is available continuously in SSO (vs. an average ~170 W/m² on Earth's surface accounting for day/night and weather). Radiative cooling to deep space achieves PUE of ~1.05 — meaning only 5% of power is wasted on cooling, vs. 20-50% in typical terrestrial facilities." bullets="1,366 W/m² solar constant in orbit vs. ~170 W/m² average terrestrial (accounting for night and weather) | PUE ~1.05: only 5% of power wasted on cooling overhead vs. 20–50% on Earth | Cosmic ray mitigation via Triple Modular Redundancy (TMR) — three copies of each computation, majority vote decides the result | Full system architecture: solar arrays → power conditioning → compute racks → radiator panels" link="https://lumenorbit.github.io/wp.pdf" icon="📈" >}}
{{< resource-card title="ASCEND Hyper-Structures" summary="A European Space Agency-funded study proposing orbital data centers assembled robotically in space from hundreds of launches. The structures would be too large to launch in one piece — the ISS took 13 years and 42 flights to assemble at ~420 tonnes; ASCEND envisions facilities orders of magnitude larger, assembled by autonomous robots. Designed to serve Europe's data sovereignty goals — keeping EU data off US/Chinese-owned cloud infrastructure." bullets="ISS weighs ~420 tonnes and took 42 launches to build — ASCEND targets thousands of tonnes | Robotic assembly: autonomous construction in orbit, no astronaut EVAs required | Data sovereignty: EU-owned infrastructure in space, outside any national jurisdiction | Hundreds of Starship-class launches per year required — feasible only with full reusability" link="https://ascend-horizon.eu" icon="🏗️" >}}
{{< resource-card title="ISS Thermal Control Systems" summary="NASA's technical documentation on how the International Space Station manages heat — the same fundamental challenge space data centers must solve at much larger scale. The ISS rejects ~70–80 kW of waste heat via large radiator panels. A 1 MW data center would need roughly 12x more radiator area; a 1 GW facility would need radiators covering several square kilometres." bullets="ISS rejects ~70–80 kW via radiators — a 1 MW data center needs ~12x more | Radiator panels must face away from the Sun to radiate heat effectively | Active thermal control uses ammonia coolant loops to move heat from equipment to radiators | The Stefan-Boltzmann law limits how much heat a given radiator area can reject: ~100–350 W/m²" link="https://nasa.gov/missions/station/managing-heat" icon="🌡️" >}}
{{< resource-card title="Stanford: Radiation Hardening" summary="A Stanford academic tutorial on how space radiation damages electronics — and how to design around it. Two key failure modes: Single-Event Upsets (a cosmic ray flips a single bit in memory, causing silent data corruption or a crash) and Total Ionizing Dose (cumulative radiation damage that permanently degrades transistor performance over years). Modern GPUs use Error-Correcting Memory (ECC) and software redundancy rather than expensive space-grade chips." bullets="Single-Event Upset (SEU): a cosmic ray flips one bit — can corrupt data or crash a system silently | Total Ionizing Dose (TID): cumulative radiation degrades transistors over years, shortening hardware lifetime | ECC memory detects and corrects single-bit errors automatically — standard in server-grade hardware | Triple Modular Redundancy (TMR): run the same computation 3 times, take the majority result" link="http://large.stanford.edu/courses/2015/ph241/clark2/" icon="🎓" >}}
{{< resource-card title="SpaceX Starlink Architecture" summary="SpaceX's Starlink product overview page, which shows what a mass-produced satellite constellation looks like in practice. For space data centers, Starlink is the most important proof-of-concept: laser inter-satellite links are already operational across thousands of satellites, flat-panel phased array antennas are manufactured at scale for a few hundred dollars each, and SpaceX has demonstrated rapid iteration (replacing entire satellite generations within years)." bullets="Laser ISLs already operational at scale — proves the connectivity layer for orbital data centers | Flat-panel phased array antennas mass-produced at ~$500/unit — key to affordable user terminals | SpaceX replaces entire satellite generations every 2-3 years — demonstrates rapid orbital hardware iteration | ~6,000 Starlink satellites operational today — largest constellation ever deployed" link="https://starlink.com/technology" icon="🛰️" >}}
{{< resource-card title="Orbital Mechanics" summary="A free Khan Academy primer on the orbital mechanics fundamentals that underpin space data center design. Orbit selection is not arbitrary: a sun-synchronous orbit (SSO) at ~600 km altitude provides a ~96% solar duty cycle, while a standard 400 km circular orbit has 35-minute eclipse periods per 90-minute orbit. Higher orbits mean longer communication delays but more continuous coverage." bullets="Sun-synchronous orbit (SSO) at ~600 km: ~96% solar duty cycle — near-continuous power | Standard LEO at 400 km: 35-min eclipse per 90-min orbit — requires batteries to bridge the gap | Higher altitude = longer signal latency (ISS at 400 km: ~2.7 ms round-trip; GEO at 36,000 km: ~600 ms) | Understanding orbital mechanics is essential for evaluating solar power, cooling, and connectivity claims" link="https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation" icon="🪐" >}}
</div>