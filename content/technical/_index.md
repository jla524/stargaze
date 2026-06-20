---
title: "Technical"
date: 2026-02-19
description: "Engineering analyses covering orbital mechanics, radiative cooling, radiation hardening, and optical inter-satellite links."
---

<div class="resource-grid">

<div class="resource-card card diagram-card" data-aos="fade-up">
  <h3 class="section-title">&#x1F6F0;&#xFE0F; AI1-Class Orbital Compute Satellite — System Architecture</h3>
  <p>A conceptual diagram updated around SpaceX's AI1 disclosure: a rack-scale orbital AI satellite with a 120 kW sustained compute payload, 150 kW peak power, a 70 m deployed wingspan, and up to 110 m² of deployable liquid radiators. The exact SpaceX design is proprietary; this diagram captures the subsystem implications for AI1-class spacecraft.</p>
  <div class="diagram-wrapper" onclick="document.getElementById('diagram-modal').classList.add('active');document.getElementById('diagram-modal-backdrop').classList.add('active')">
    <img src="/assets/satellite-diagram.svg" alt="AI1-class orbital compute satellite diagram showing 70-meter solar arrays, 120 kilowatt compute payload, deployable liquid radiators, optical inter-satellite links, structural bus, power conditioning, and attitude thrusters" loading="eager"/>
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
        + '<img src="/assets/satellite-diagram.svg" alt="AI1-class orbital compute satellite diagram — expanded view"/>';

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
    <li><strong>Interchangeable AI payload</strong> — SpaceX's AI1 reference targets 120 kW sustained compute and 150 kW peak power, roughly one high-power AI rack packaged for LEO</li>
    <li><strong>Deployable solar arrays</strong> — AI1's announced 70 m deployed wingspan makes power collection the dominant visible feature; orbit provides 1,366 W/m² solar irradiance before array and pointing losses</li>
    <li><strong>Deployable liquid radiators</strong> — AI1 reports up to 110 m² of radiator area with redundant pumping loops; heat rejection, not raw solar availability, is the central rack-scale design constraint</li>
    <li><strong>Optical ISL transceivers</strong> — Compute-first satellites lean on laser mesh links for cluster networking and data return, while avoiding the large user-terminal phased arrays used by broadband satellites</li>
    <li><strong>Structural bus + shielding</strong> — Solar arrays, radiators, propulsion, shielding, and launch-survivable structure turn a single AI rack into a multi-ton spacecraft whose economics depend on Starship-class launch costs</li>
  </ul>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Sources: SpaceX AI1 technical update coverage, Starcloud Whitepaper (formerly LumenOrbit), IEEE DCiS Architecture, ASCEND Study, NASA ISS Thermal Systems.</p>
</div>

<div class="resource-card card diagram-card" data-aos="fade-up">
  <h3 class="section-title">💻 Interchangeable Compute Payload — Internal Architecture</h3>
  <p>Detailed view of the radiation-tolerant compute bay. AI1-style spacecraft separate the satellite bus from the compute payload, allowing GPU/TPU or future accelerator modules to change across generations while retaining redundant memory, fault tolerance, and liquid cooling interfaces.</p>
  <div class="diagram-wrapper" onclick="document.getElementById('compute-modal').classList.add('active');document.getElementById('compute-modal-backdrop').classList.add('active')">
    <img src="/assets/compute-module-diagram.svg" alt="Interchangeable compute payload diagram showing GPU/TPU racks, TMR redundancy layers, ECC memory, coolant loops, power distribution, and modular bays" loading="eager"/>
    <span class="diagram-expand-hint">click to expand</span>
  </div>

  <script>
    (function() {
      function closeModal() {
        const modal = document.getElementById('compute-modal');
        const backdrop = document.getElementById('compute-modal-backdrop');
        if (modal) modal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
      }

      var backdrop = document.createElement('div');
      backdrop.className = 'diagram-modal-backdrop';
      backdrop.id = 'compute-modal-backdrop';
      backdrop.addEventListener('click', closeModal);

      var modal = document.createElement('div');
      modal.className = 'diagram-modal';
      modal.id = 'compute-modal';
      modal.innerHTML = '<div class="diagram-modal-header">' +
        '<button class="diagram-modal-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<img src="/assets/compute-module-diagram.svg" alt="Space data center compute module — expanded view"/>';

      document.body.appendChild(backdrop);
      document.body.appendChild(modal);

      modal.querySelector('.diagram-modal-close').addEventListener('click', closeModal);

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
      });
    })();
  </script>
  <ul>
    <li><strong>GPU/TPU or accelerator racks</strong> — Interchangeable payload bays can start with COTS AI hardware and shift to newer or radiation-tolerant accelerators as supply chains mature</li>
    <li><strong>Radiation Mitigation</strong> — Triple Modular Redundancy (TMR) + ECC memory; 3× compute overhead for SEU tolerance</li>
    <li><strong>Thermal Management</strong> — Ammonia coolant loops transfer heat from chips to external deployable radiators (~1.05 PUE)</li>
    <li><strong>Power & Modularity</strong> — Redundant power conversion and standardized payload interfaces let the spacecraft bus outlive individual chip generations</li>
  </ul>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Sources: Google Suncatcher Paper, Stanford Radiation Hardening, LumenOrbit Whitepaper, NASA ISS Thermal Systems.</p>
</div>

{{< resource-card title="SpaceX AI1 Orbital Compute Satellite" summary="SpaceX's AI1 disclosure gives the first concrete rack-scale reference design for orbital AI compute: a 70 m deployed spacecraft operating around 600 km LEO with 120 kW sustained compute payload, 150 kW peak power, interchangeable AI hardware, optical links, and deployable liquid radiators." bullets="120 kW sustained / 150 kW peak compute payload — comparable to one high-power AI rack | 70 m deployed wingspan for large solar collection area | Up to 110 m² of deployable liquid radiators with redundant pumping loops | Interchangeable compute payload avoids locking the spacecraft to one chip vendor | Compute-first design avoids the large phased-array user antennas of broadband Starlink satellites | Depends on Starship-scale launch economics and high-volume satellite manufacturing" link="https://www.tomshardware.com/tech-industry/spacex-details-its-ai1-compute-satellite" icon="🚀" >}}
{{< resource-card title="Data Center in Space (DCiS) Architecture (IEEE Xplore)" summary="An IEEE paper proposing a software architecture for space data centers that reuses existing cloud software stacks (think AWS or GCP patterns) rather than building from scratch. The goal is 30+ year operational reliability — far longer than typical cloud hardware refresh cycles of 3-5 years on Earth — requiring robust redundancy and radiation-tolerant design." bullets="Reuses existing cloud software (AWS/GCP patterns) rather than custom space OS | 30-year target lifespan vs. 3-5 year refresh cycles on Earth | Radiation shielding and hardware redundancy built into the architecture | Proposes tiered storage: hot (in-orbit), warm (relay), cold (ground)" link="https://ieeexplore.ieee.org/document/8900609" icon="🖥️" >}}
{{< resource-card title="Reduced-Mass Orbital AI Inference via Integrated Panels (arXiv)" summary="A 2026 architecture paper proposing satellites where solar cells, vapor-chamber radiators, and compute modules are integrated into the same deployable panel structure. The goal is to reduce duplicated structural mass and improve heat transport, enabling inference-focused orbital compute at Starship payload scale." bullets=">100 kW compute power per launched tonne target | Integrated solar, compute, and radiator panels reduce separate support structure | Vapor chamber radiator panels keep IC junction temperatures near ~40 C | Reference design: 16 MW compute, 150 tonnes, 20 m x 2,200 m deployed grid | 512-panel subarrays support representative long-context LLM inference workloads | Useful counterpoint to rack-in-a-box satellite designs" link="https://arxiv.org/abs/2604.07760" icon="🧊" >}}
{{< resource-card title="Deep Tech to Space: Space Data Centers and AI Revolution at the Edge (arXiv)" summary="A 2026 systems paper defining space data centers as multi-tenant, software-driven AI service platforms in LEO. It covers constellation orbital design, inter-satellite links, network topology, compute resource organization, software orchestration, and technology-roadmap forecasting." bullets="LEO SDC constellation architecture from orbit design to service orchestration | Multi-tenant AI platform model for client satellites and ground users | Considers ISL topology, computational resource pooling, and software scheduling | Uses technology-roadmap forecasting for feasibility and cost trends | Earth observation and lunar exploration use cases ground the architecture | Good overview paper for moving from component claims to an end-to-end system" link="https://arxiv.org/abs/2605.19892" icon="🛰️" >}}
{{< resource-card title="Toward Communication-Efficient Space Data Centers (arXiv)" summary="A communications-focused 2026 paper arguing that orbital data centers are constrained less by raw solar power than by the gap between petabit-scale internal data center exchange and gigabit-scale ground-space links. It proposes semantic communication to transmit compact task-relevant representations instead of raw data." bullets="Identifies communication as a primary bottleneck for SDC viability | Multi-layer architecture: orbital compute nodes, relay satellites, and ground access | Semantic communication reduces uplink/downlink pressure by sending task-relevant representations | Models coupled power, compute, and radiative cooling constraints | Compares SemCom against conventional bit-level communication | Strong complement to workload-first semantic reduction papers" link="https://arxiv.org/abs/2605.12681" icon="📡" >}}
{{< resource-card title="Lightspeed Data Compute for the Space Era: SpaceCoMP (arXiv)" summary="A distributed-systems paper proposing SpaceCoMP, a MapReduce-inspired model for LEO satellite mesh networks. Satellites collect data, run map tasks near the sensing region, aggregate with reduce tasks over laser inter-satellite links, and downlink only final results." bullets="Collect-MapReduce model adapted to orbital mesh networks | Simulates 1,000-10,000 satellite constellations | 61-79% improvement in map placement efficiency over baselines | 67-72% reduction in aggregation cost through orbital-aware scheduling | Distance-aware routing exploits changing cross-plane ISL geometry | Useful for EO, wildfire monitoring, and other data-born-in-space workloads" link="https://arxiv.org/abs/2601.17589" icon="🕸️" >}}
{{< resource-card title="Constraint-Aware Execution Planning for Hybrid Space-Ground Workloads (arXiv)" summary="A 2026 execution-planning paper for deciding which steps of a workload run onboard, which run on the ground, and how transfers fit into orbital contact windows. It models SGP4 propagation, eclipse periods, ground-station passes, FEC overhead, security overhead, and joint power/thermal/compute/communication constraints." bullets="Takes workload DAGs and produces physically grounded execution plans | Schedules around orbital windows, eclipse, power, thermal, compute, and communications limits | Inserts adaptive FEC and security overhead into transfer plans | Evaluated across onboard inference, distributed training, multi-pass downlink, privacy-preserving learning, and relay patterns | Produces feasible plans in under two seconds for tested cases | Practical bridge between ODC theory and workload orchestration" link="https://arxiv.org/abs/2605.04052" icon="🗓️" >}}
{{< resource-card title="Towards Space-Based Computing Infrastructure Network (arXiv)" summary="An academic paper proposing a three-tier network architecture for orbital compute: edge satellites that collect and pre-process data, relay nodes that aggregate and route it, and ground gateways that interface with terrestrial cloud networks. The hierarchy reduces latency and downlink bandwidth by filtering data close to the source." bullets="Three-tier hierarchy: edge satellites → relay nodes → ground gateways | Processing data in orbit reduces what needs to be sent to Earth — cutting downlink bandwidth costs | Constellation integration: works across multiple satellite operators | Key challenge: orchestrating workloads across satellites with intermittent connectivity" link="https://arxiv.org/abs/2103.04547" icon="🕸️" >}}
{{< resource-card title="The Development of Carbon-Neutral Data Centres in Space (Nature)" summary="A peer-reviewed Nature paper examining whether space data centers can genuinely achieve net-zero carbon — factoring in not just operational energy, but rocket launch emissions. The finding is nuanced: orbital facilities can eliminate operational carbon, but launch vehicle emissions could add an order of magnitude more carbon than they save, unless reusable rockets drastically cut launch footprint." bullets="Operational carbon: near-zero (solar power, no grid) | Launch emissions could outweigh operational savings unless reusable rockets are used | Starship-class reusability is the key variable in the net-zero equation | Provides a mathematical framework for comparing terrestrial vs. orbital carbon over a facility's lifetime" link="https://www.nature.com/articles/s43247-023-00977-1" icon="🌱" >}}
{{< resource-card title="Google Suncatcher System Design" summary="Google Research's full engineering paper behind Project Suncatcher. The most interesting result: Trillium TPU chips were tested in a proton beam and survived radiation doses 3x higher than expected for a 5-year mission. The paper also details how satellites flying hundreds of meters apart can use free-space optical links to achieve 1.6 Tbps inter-satellite bandwidth — comparable to transoceanic fiber cables." bullets="Trillium TPUs survived 3x the expected 5-year radiation dose in proton beam testing | Satellites fly 100s of meters apart, using lasers to achieve 1.6 Tbps inter-satellite links | Formation flying: keeping satellites in precise relative positions requires continuous station-keeping thruster burns | Economics viable below ~$200/kg launch cost — projected mid-2030s with Starship" link="https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/" icon="📊" >}}
{{< resource-card title="LumenOrbit Whitepaper" summary="The original engineering whitepaper by Starcloud (then LumenOrbit) that sparked the space data center movement. It quantifies the orbital advantage: 1,366 W/m² of solar irradiance is available continuously in SSO (vs. an average ~170 W/m² on Earth's surface accounting for day/night and weather). Radiative cooling to deep space achieves PUE of ~1.05 — meaning only 5% of power is wasted on cooling, vs. 20-50% in typical terrestrial facilities." bullets="1,366 W/m² solar constant in orbit vs. ~170 W/m² average terrestrial (accounting for night and weather) | PUE ~1.05: only 5% of power wasted on cooling overhead vs. 20–50% on Earth | Cosmic ray mitigation via Triple Modular Redundancy (TMR) — three copies of each computation, majority vote decides the result | Full system architecture: solar arrays → power conditioning → compute racks → radiator panels" link="https://lumenorbit.github.io/wp.pdf" icon="📈" >}}
{{< resource-card title="ASCEND Hyper-Structures" summary="A European Space Agency-funded study proposing orbital data centers assembled robotically in space from hundreds of launches. The structures would be too large to launch in one piece — the ISS took 13 years and 42 flights to assemble at ~420 tonnes; ASCEND envisions facilities orders of magnitude larger, assembled by autonomous robots. Designed to serve Europe's data sovereignty goals — keeping EU data off US/Chinese-owned cloud infrastructure." bullets="ISS weighs ~420 tonnes and took 42 launches to build — ASCEND targets thousands of tonnes | Robotic assembly: autonomous construction in orbit, no astronaut EVAs required | Data sovereignty: EU-owned infrastructure in space, outside any national jurisdiction | Hundreds of Starship-class launches per year required — feasible only with full reusability" link="https://ascend-horizon.eu" icon="🏗️" >}}
{{< resource-card title="ISS Thermal Control Systems" summary="NASA's technical documentation on how the International Space Station manages heat — the same fundamental challenge space data centers must solve at much larger scale. The ISS rejects ~70–80 kW of waste heat via large radiator panels. A 1 MW data center would need roughly 12x more radiator area; a 1 GW facility would need radiators covering several square kilometres." bullets="ISS rejects ~70–80 kW via radiators — a 1 MW data center needs ~12x more | Radiator panels must face away from the Sun to radiate heat effectively | Active thermal control uses ammonia coolant loops to move heat from equipment to radiators | The Stefan-Boltzmann law limits how much heat a given radiator area can reject: ~100–350 W/m²" link="https://nasa.gov/missions/station/managing-heat" icon="🌡️" >}}
{{< resource-card title="Stanford: Radiation Hardening" summary="A Stanford academic tutorial on how space radiation damages electronics — and how to design around it. Two key failure modes: Single-Event Upsets (a cosmic ray flips a single bit in memory, causing silent data corruption or a crash) and Total Ionizing Dose (cumulative radiation damage that permanently degrades transistor performance over years). Modern GPUs use Error-Correcting Memory (ECC) and software redundancy rather than expensive space-grade chips." bullets="Single-Event Upset (SEU): a cosmic ray flips one bit — can corrupt data or crash a system silently | Total Ionizing Dose (TID): cumulative radiation degrades transistors over years, shortening hardware lifetime | ECC memory detects and corrects single-bit errors automatically — standard in server-grade hardware | Triple Modular Redundancy (TMR): run the same computation 3 times, take the majority result" link="http://large.stanford.edu/courses/2015/ph241/clark2/" icon="🎓" >}}
{{< resource-card title="SpaceX Starlink Architecture" summary="SpaceX's Starlink product overview page, which shows what a mass-produced satellite constellation looks like in practice. For space data centers, Starlink is the most important proof-of-concept: laser inter-satellite links are already operational across thousands of satellites, flat-panel phased array antennas are manufactured at scale for a few hundred dollars each, and SpaceX has demonstrated rapid iteration (replacing entire satellite generations within years)." bullets="Laser ISLs already operational at scale — proves the connectivity layer for orbital data centers | Flat-panel phased array antennas mass-produced at ~$500/unit — key to affordable user terminals | SpaceX replaces entire satellite generations every 2-3 years — demonstrates rapid orbital hardware iteration | ~6,000 Starlink satellites operational today — largest constellation ever deployed" link="https://starlink.com/technology" icon="🛰️" >}}
{{< resource-card title="Orbital Mechanics" summary="A free Khan Academy primer on the orbital mechanics fundamentals that underpin space data center design. Orbit selection is not arbitrary: a sun-synchronous orbit (SSO) at ~600 km altitude provides a ~96% solar duty cycle, while a standard 400 km circular orbit has 35-minute eclipse periods per 90-minute orbit. Higher orbits mean longer communication delays but more continuous coverage." bullets="Sun-synchronous orbit (SSO) at ~600 km: ~96% solar duty cycle — near-continuous power | Standard LEO at 400 km: 35-min eclipse per 90-min orbit — requires batteries to bridge the gap | Higher altitude = longer signal latency (ISS at 400 km: ~2.7 ms round-trip; GEO at 36,000 km: ~600 ms) | Understanding orbital mechanics is essential for evaluating solar power, cooling, and connectivity claims" link="https://www.khanacademy.org/science/physics/centripetal-force-and-gravitation" icon="🪐" >}}
{{< resource-card title="O-RAID: Satellite Constellation for Ultra-Resilient Global Data Backup (Scientific Reports)" summary="A Nature Scientific Reports paper proposing a novel Satellite-RAID architecture where clusters of satellites operate as a distributed redundant array of independent disks (RAID) in orbit. Formal design for orbital storage redundancy, inter-satellite parity exchange, latency-tolerant RAID protocols, and power provisioning via geostationary solar beam. CTMC-based reliability framework shows technical readiness projected by 2035 for national archives and disaster-resilient storage." bullets="First formal RAID-in-orbit architecture — distributed parity across satellite clusters | CTMC reliability model for orbital storage survivability analysis | Three satellite classes: compute, storage, relay with distinct roles | Geostationary solar energy beam for continuous power | 2035 technical readiness timeline for national archives & disaster backup | Complements terrestrial storage with physically independent orbital layer" link="https://www.nature.com/articles/s41598-026-38784-1" icon="💾" >}}
{{< resource-card title="Which Workloads Belong in Orbit? A Workload-First Framework (arXiv)" summary="A practical framework for deciding which computing tasks belong in orbit versus terrestrial cloud, grounded with in-orbit semantic-reduction prototypes. An Earth-observation pipeline on Sentinel-2 imagery achieves 99.7-99.99% payload reduction by converting raw imagery to compact semantic artifacts. A multi-pass stereo reconstruction prototype reduces ~306 MB to ~1.57 MB (99.49% reduction). Argues semantic abstraction — not raw compute scale — drives early workload suitability." bullets="Workload-first framework: semantic abstraction, not raw TFLOPS | Sentinel-2 EO pipeline: 99.7–99.99% payload reduction in orbit | Stereo reconstruction: 306 MB → 1.57 MB (99.49% reduction) | Phased adoption model tied to ODC maturity levels | Validated on Seattle and Bengaluru Sentinel-2 imagery | Core insight: reduction ratio determines which workloads justify orbital compute" link="https://doi.org/10.48550/arXiv.2603.20317" icon="🎯" >}}
{{< resource-card title="From Connectivity to Multi-Orbit Intelligence: SBDC Architectures for 6G (arXiv)" summary="A paper introducing a hierarchical multi-orbit architecture where LEO satellites handle radio access and real-time inference, while MEO and GEO layers provide regional aggregation, global orchestration, and compute-aware routing. Direct handset-to-satellite (DHTS) communication emerges as a core 6G capability, with in-orbit data centers enabling energy-aware scheduling and AI-driven hierarchical control across the constellation." bullets="Hierarchical LEO/MEO/GEO architecture for 6G non-terrestrial networks | LEO: direct handset access + real-time inference | MEO/GEO: regional aggregation, global orchestration, compute-aware routing | DHTS enables standard devices to connect directly to orbital compute | In-orbit data centers evolve constellation from passive relay to intelligent system | Addresses mobility, interference, and energy constraints at scale" link="https://arxiv.org/abs/2603.18601" icon="📡" >}}
</div>
