# Stargaze

A Hugo-based static website about space data centers — exploring orbital data centers as infrastructure for the AI era.

## Overview

Terrestrial data centers are hitting hard limits: strained power grids, years-long permitting, and billions of liters of cooling water. Orbital facilities offer a physics-based alternative:
- **~96% solar duty cycle** in dawn/dusk sun-synchronous orbits
- **Passive radiative cooling** — zero operational water use
- **4–5x energy yield per m²** vs. average fixed terrestrial solar
- **PUE as low as 1.05** vs 1.2+ on Earth

## Tech Stack

- **Hugo** — Static site generator
- **PaperMod** — Theme
- **Custom CSS** — Dark space theme with animations

## Getting Started

```bash
# Install Hugo
brew install hugo

# Initialize submodules
git submodule update --init --recursive

# Start dev server
hugo server -D

# Build for production
hugo
```

## Content

- **Motivation** — Why space data centers make sense
- **Companies** — Players in the space data center industry
- **Technical** — Deep technical papers and engineering analyses
- **Economics** — Cost models and feasibility analysis
- **News** — Recent developments and updates

## License

MIT
