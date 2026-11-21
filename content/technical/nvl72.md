---
title: "How a Vera Rubin NVL72 is stacked"
date: 2026-11-20
description: "Nvidia’s documented Vera Rubin NVL72 rack, and the Kessel midplane reported for the same 72 GPUs."
hideAuthor: true
hideMeta: true
ShowReadingTime: false
build:
  list: never
  render: always
---

Nvidia’s DGX Vera Rubin NVL72 puts 72 Rubin GPUs and 36 Vera CPUs in one NVLink domain. The ground drawings follow the [DGX hardware guide](https://docs.nvidia.com/dgx/dgxvr-user-guide/hardware.html). The Kessel drawings are schematics of a SemiAnalysis report from 11 November 2026, [written up by Tom’s Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/spacex-develops-its-own-kessel-rack-scale-system-featuring-72-nvidia-rubin-gpus-for-data-centers-in-space-report-claims-replaces-conventional-nvlink-cable-assemblies-with-a-massive-84-layer-printed-circuit-board). SpaceX and Nvidia have not published a Kessel mechanical drawing, and neither has confirmed the report.

The August 2026 flight statement is a separate record. Musk and Nvidia described a space-optimized Vera Rubin NVL72 for launch in the fourth quarter of 2027, with significant scale in 2028, and called that design simpler, denser, lighter, and lower cost than a traditional rack. SemiAnalysis did not say Kessel is that machine. The [16 September 2026 AI1 design](/specs/#ai1--starmind) is a third record: the spacecraft, not a measured Kessel rack.

{{< nvl72 mode="preview" >}}

{{< nvl72 mode="full" >}}
