# Changelog

All notable changes to svelte-webcomponent will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `preview-index.html` template for production preview
- Automatic preview template copying during build
- CHANGELOG.md for version tracking

### Changed
- **BREAKING:** Replaced deprecated `rollup-plugin-terser` with `@rollup/plugin-terser`
- Updated all dependencies to latest stable versions
- Updated README.md with accurate bundle sizes and workflow

### Fixed
- Web components now render correctly in production preview mode
- Components load properly when served from dist/ folder
- Eliminated deprecated package warnings during install
- Resolved security vulnerabilities in dependencies
- Build process now automatically copies preview template

## [0.0.0] - 2025-10-29

### Added
- Initial release
- Svelte 5 web component boilerplate
- TypeScript support
- Vite 6 build configuration
- ES and UMD output formats
