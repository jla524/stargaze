# AGENTS.md - Stargaze Project Guidelines

This document provides guidelines for agentic coding agents working on this Hugo-based static website.

## Project Overview

- **Project**: Stargaze - A Hugo static site about space data centers
- **Theme**: PaperMod (Hugo theme as git submodule)
- **Language**: Markdown content + Go templates + CSS/JS

## Build Commands

### Development Server
```bash
hugo server -D        # Start dev server with drafts
hugo server -D -p 1313  # Custom port
hugo server -D --disableFastRender  # Full re-renders on changes
```

### Production Build
```bash
hugo                  # Build for production
hugo --cleanDestinationDir  # Clean before build
```

### Submodules
```bash
git submodule update --init --recursive  # Initialize theme submodule
```

## Code Style Guidelines

### General Principles
- Keep changes minimal and focused
- Prefer existing patterns in the codebase
- Test changes with `hugo server -D` before committing

### Content (Markdown)
- Use standard Markdown syntax
- Front matter: title, date, draft status
- Images go in `static/assets/` for direct serving
- Use `assets/` only for files requiring Hugo processing (SCSS, etc.)

### CSS (Custom Styles)
- Custom CSS lives in `assets/css/extended/0000-custom.css`
- Follow existing CSS structure and naming conventions
- Use CSS variables defined in `:root` when possible
- Keep animations subtle and performant

### Templates (Go/Hugo)
- Partial templates in `layouts/partials/`
- Shortcodes in `layouts/shortcodes/`
- Follow Hugo documentation for template syntax
- Use existing PaperMod patterns for consistency

### File Organization
```
/content/       - Markdown content files
/layouts/       - Custom layouts and partials
/static/        - Static files served directly (images, favicons)
/assets/        - Assets processed by Hugo (CSS, processed images)
/themes/        - Hugo themes (PaperMod submodule)
```

## Naming Conventions

- Content files: lowercase with hyphens (e.g., `my-post.md`)
- CSS classes: kebab-case (e.g., `.hero-wrapper`)
- Partials: snake_case (e.g., `extend_head.html`)
- Shortcodes: snake_case (e.g., `resource-card.html`)

## Error Handling

- Run `hugo` or `hugo -D` to check for build errors
- Common issues:
  - Broken links (404s) - verify URLs match content paths
  - Missing assets - place images in `static/` not `assets/`
  - Submodule not initialized - run `git submodule update --init`
  - Draft content not showing - use `-D` flag

## Common Tasks

### Adding a New Page
1. Create markdown file in appropriate `/content/` subdirectory
2. Add front matter with title and date
3. Link from existing pages

### Adding Custom CSS
1. Edit `assets/css/extended/0000-custom.css`
2. Use existing CSS variables and patterns

### Adding Images
1. Place in `static/assets/` for direct serving
2. Reference as `/assets/filename.jpg` in content

### Modifying Theme
- Override theme templates by creating same path in project root
- PaperMod provides extensive customization via `config.toml` params

## Configuration

Main config: `config.toml`
- Theme configuration
- Menu definitions
- Site params (title, description, theme settings)

## Notes

- This is a static site generator - no runtime tests needed
- No linting tools configured (standard Hugo build is the validation)
- `public/` directory is generated - do not commit it
- `.hugo_build.lock` is auto-generated - do not commit it

## Troubleshooting

### Server Won't Start
- Check if another process is using port 1313: `lsof -i :1313`
- Kill existing process: `pkill -f "hugo server"`
- Try a different port: `hugo server -D -p 1314`

### Page Not Found (404) Errors
- Verify URL paths match content directory structure
- Check that content files have correct front matter
- Ensure files are not marked as `draft: true` without `-D` flag

### Images Not Loading
- Place images in `static/` directory, not `assets/`
- Use `/assets/` prefix in references (e.g., `src="/assets/image.jpg"`)
- Run `hugo` and check `public/assets/` for generated files

### Theme Not Loading
- Ensure submodules are initialized: `git submodule update --init --recursive`
- Check that `theme = "PaperMod"` is in `config.toml`
- Verify theme directory exists in `themes/PaperMod/`

### Build Errors
- Run `hugo -D` to see all warnings and errors
- Check for missing templates or partials
- Verify YAML/TOML syntax in config files
- Ensure all referenced files exist

## Content Structure

### Front Matter Fields
- `title`: Page title (required)
- `date`: Publication date in YYYY-MM-DD format
- `draft`: Set to `true` to hide from production builds
- `description`: Meta description for SEO
- `slug`: Custom URL slug (optional)

### Content Directories
- `/content/_index.md` - Homepage content
- `/content/motivation/` - Why space data centers matter
- `/content/companies/` - Companies in the industry
- `/content/technical/` - Technical papers and engineering analyses
- `/content/economics/` - Cost models and feasibility analysis
- `/content/news/` - Recent developments and updates

## CSS Guidelines

### Variables (defined in :root)
```css
:root {
  --bg-gradient: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #000428 100%);
  --text-primary: #e8e8e8;
  --accent: #42a5f5;
  --accent-dark: #1976d2;
  --orbit-glow: 0 0 20px rgba(66, 165, 245, 0.3);
}
```

### Best Practices
- Use CSS variables for colors and spacing
- Keep specificity low to avoid overrides
- Use flexbox and grid for layouts
- Add responsive styles with media queries
- Test on mobile viewports

## Version Control

### What to Commit
- All source files in `content/`, `layouts/`, `assets/`, `static/`
- `config.toml` and `README.md`
- `.gitmodules` file

### What NOT to Commit
- `public/` directory (generated output)
- `.hugo_build.lock` file
- Any local development overrides
- IDE or editor config files

### Git Workflow
1. Create feature branch for changes
2. Test with `hugo server -D`
3. Commit with descriptive message
4. Push and create PR if applicable
