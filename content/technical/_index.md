---
title: "Technical"
date: 2026-02-19
description: "Engineering analyses covering orbital mechanics, radiative cooling, radiation hardening, and optical inter-satellite links."
---

<div class="resource-grid">

<div class="resource-card card diagram-card" data-aos="fade-up">
  <h3 class="section-title">🔋 Battery-Assisted Peak Power — How Starmind AI1 Reaches ~250 kW</h3>
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
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Sources: Elon Musk post on AI1 power revision (July 16, 2026), NextBigFuture battery mass analysis, SpaceX Starmind / AI1 disclosures, NVIDIA NVL72 rack power profiles, Starlink eclipse battery heritage.</p>
</div>

<div class="resource-card card diagram-card" data-aos="fade-up">
  <h3 class="section-title">🔄 From Starlink V3 to Starmind AI1 — Manufacturing Delta &amp; Data Path</h3>
  <p>Starmind is SpaceX's orbital AI compute constellation; AI1 is its first production satellite design. SpaceX describes AI1 as <em>simpler</em> than a Starlink V3 satellite because it drops the broadband user-facing payload — but it is not a stripped-down comms sat. Mass and surface area shift from phased-array antennas and RF backhaul toward interchangeable GPU/TPU racks, deployable liquid radiators, and redundant coolant loops. Most of the bus, power, propulsion, and laser-link stack is inherited from V3 hardware already in production at Redmond and the Gigasat campus in Bastrop, Texas.</p>

  <p><strong>Reused from Starlink V3 (manufacturing carry-over)</strong></p>
  <ul>
    <li><strong>Structural bus &amp; propulsion</strong> — Same Starship-deployed bus class (~1.5–2 t dry mass on V3); argon Hall thrusters for station-keeping in sun-synchronous orbit (~600 km)</li>
    <li><strong>Deployable solar arrays</strong> — V3-scale cell manufacturing; AI1 expands deployed wingspan to 70 m to feed ~150 kW peak / 120 kW sustained compute payload</li>
    <li><strong>Laser inter-satellite links (ISLs)</strong> — Same optical transceiver heritage as V3 (six ~400 Gbps links per V3 node); AI1 routes cluster traffic and backhaul through the existing Starlink laser mesh rather than dedicated ground antennas</li>
    <li><strong>Power conditioning &amp; avionics</strong> — Bus electronics, battery/eclipse bridging, and radiation-shielded enclosures adapted from high-volume Starlink lines</li>
    <li><strong>Gigasat vertical integration</strong> — Bastrop factory scales solar ingot-to-cell, PCB, structure, and satellite final assembly — the same production base V3 depends on, extended for AI1 volume targets (1,000+ sats/year by late 2027 per SpaceX)</li>
  </ul>

  <p><strong>Removed vs. Starlink V3 (what makes comms sats complex)</strong></p>
  <ul>
    <li><strong>Ku/Ka/E/V/W-band phased-array user antennas</strong> — V3 carries 2,048 independently steerable downlink beams and 2,048 uplink beams; AI1 omits the entire user-terminal-facing array stack</li>
    <li><strong>SpaceX beamformer ASICs &amp; modem silicon</strong> — Custom beamforming and ~64× throughput-per-chip modem fabric built for 1 Tbps downlink / 160 Gbps uplink per V3 node; not needed when the satellite is a compute server, not a broadband pipe</li>
    <li><strong>Multi-band RF backhaul antennas</strong> — V3's ~1.2 Tbps aggregate Ka/E/V/W RF gateway links; AI1 returns results via laser ISL through Starlink instead of per-satellite RF gateway capacity</li>
    <li><strong>Direct-to-cell (D2D) payloads</strong> — V3 prototypes integrate satellite-to-handset broadcast hardware; AI1 has no mandate to serve moving user terminals on S-band/L-band</li>
    <li><strong>Dynamic capacity steering logic</strong> — Metropolitan vs. rural beam allocation, handoff between 4,096 steerable beams — replaced by batch/inference job scheduling on fixed compute hardware</li>
  </ul>

  <p><strong>Added for Starmind AI1 (new manufacturing &amp; integration)</strong></p>
  <ul>
    <li><strong>Interchangeable compute payload bay</strong> — Modular GPU/TPU/accelerator racks (~120 kW sustained, vendor-agnostic interfaces); initial disclosures cite NVIDIA, with a path to in-house radiation-tolerant chips (Terafab)</li>
    <li><strong>Deployable liquid radiators</strong> — Up to 110 m² radiator area with redundant ammonia (or equivalent) coolant loops; rejects ~120 kW waste heat in vacuum — the dominant new subsystem V3 comms sats do not need at this scale</li>
    <li><strong>Radiation mitigation layer</strong> — ECC memory, TMR or equivalent fault tolerance, and payload-level redundancy on COTS AI hardware</li>
    <li><strong>Cluster networking software</strong> — Orchestration across Starmind nodes and hybrid ground-orbit workloads (inference scheduling, checkpointing, semantic result downlink)</li>
    <li><strong>Starship-only launch integration</strong> — Rack-scale mass and volume assume Starship payload bay and cadence; Falcon 9 cannot economically deploy V3-class or AI1-class nodes at target volume</li>
  </ul>

  <p><strong>Earth ↔ Starmind data path</strong></p>
  <p>Starmind nodes do not downlink directly to user dishes. Traffic rides the Starlink laser mesh as backhaul — the same infrastructure V3 ISLs provide — with AI1 acting as a compute endpoint rather than a relay.</p>
  <ul>
    <li><strong>Uplink (Earth → AI1)</strong> — User/app → terrestrial fiber → Starlink ground gateway → RF uplink to nearest Starlink relay sat → 1–4 laser ISL hops through the constellation mesh → target Starmind AI1 node</li>
    <li><strong>On-orbit compute</strong> — Query, model weights (cached or streamed), and intermediate tensors processed on AI1 GPU/TPU racks; only task outputs or compact semantic representations need to return (not raw training sets)</li>
    <li><strong>Downlink (AI1 → Earth)</strong> — AI1 → laser ISL → Starlink relay/gateway sat → gateway RF downlink → fiber → user/app. Results may also fan out to other Starmind nodes via ISL for distributed training</li>
    <li><strong>Bandwidth hierarchy</strong> — Internal ISL mesh: ~400 Gbps–1 Tbps per link; ground-space RF gateway links remain the bottleneck (orders of magnitude below in-rack NVLink/InfiniBand speeds) — workloads must minimize bits crossing the atmosphere</li>
  </ul>

  <p><strong>Latency estimates (600–800 km SSO, propagation-dominated)</strong></p>
  <ul>
    <li><strong>Vacuum propagation (overhead pass)</strong> — ~2.0 ms one-way at 600 km altitude; ~4.0 ms round-trip speed-of-light minimum before routing or compute</li>
    <li><strong>SpaceX cited end-to-end RTT</strong> — ~6–8 ms ground round-trip at operational SSO altitudes (includes atmospheric path, gateway RF link, and minimal routing — not multi-hop mesh extremes)</li>
    <li><strong>Each additional ISL hop</strong> — +~1.7–3.3 ms one-way per ~500–1,000 km inter-satellite link (speed of light); a 3-hop mesh path adds ~10–20 ms propagation alone vs. an overhead single-hop</li>
    <li><strong>Ground segment</strong> — +1–30 ms depending on user-to-gateway fiber distance (same order as terrestrial cloud routing to a nearby region)</li>
    <li><strong>Compute time</strong> — Workload-dependent and often dominant: token streaming inference may add 10 ms–s; large batch jobs run seconds to hours onboard before any downlink</li>
    <li><strong>Contact-window scheduling</strong> — Non-overhead passes or congested gateway queues can add seconds to minutes of queueing — constraint-aware planners must schedule transfers around pass geometry (see hybrid workload execution papers below)</li>
  </ul>
  <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #888; opacity: 0.8;">Sources: SpaceX Starmind / AI1 disclosures, Starlink V3 specifications, FCC Starmind filing (Jan 2026), Teslarati Starmind vs. Starlink analysis, HyperFRAME Research AI1 manufacturing coverage.</p>
</div>

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
