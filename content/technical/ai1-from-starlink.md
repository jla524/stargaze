---
title: "From Starlink to the June 2026 AI1 design"
date: 2026-10-15
description: "Manufacturing delta, data path, and diagrams for the June 2026 AI1 disclosure. The September 2026 design is on the spec sheet."
hideAuthor: true
hideMeta: true
ShowReadingTime: false
---

These notes describe the June 2026 AI1 disclosure: 120 kW sustained, 150 kW peak, a 70 m wingspan, and up to 110 m² of radiators, at roughly 600 km. They are not the current public design. Use the [spec sheet](/specs/#ai1--starmind) for the 16 September 2026 figures, and the [July power note](/technical/ai1-power/) for the later peak-power revision.

<h3 class="section-title">From Starlink V3 to Starmind AI1 — Manufacturing Delta &amp; Data Path</h3>
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
  <p class="figure-note">Sources: SpaceX Starmind / AI1 disclosures, Starlink V3 specifications, FCC Starmind filing (Jan 2026), Teslarati Starmind vs. Starlink analysis, HyperFRAME Research AI1 manufacturing coverage.</p>

<h3 class="section-title">AI1-Class Orbital Compute Satellite — System Architecture</h3>
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
  <p class="figure-note">Sources: SpaceX AI1 technical update coverage, Starcloud Whitepaper (formerly LumenOrbit), IEEE DCiS Architecture, ASCEND Study, NASA ISS Thermal Systems.</p>

<h3 class="section-title">Interchangeable Compute Payload — Internal Architecture</h3>
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
  <p class="figure-note">Sources: Google Suncatcher Paper, Stanford Radiation Hardening, LumenOrbit Whitepaper, NASA ISS Thermal Systems.</p>
