# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a personal tech blog built with Hexo, a static site generator. The codebase follows Hexo's standard structure with custom theme integration.

**Key Components:**
- **Hexo Core**: Static site generator handling content compilation and deployment
- **JSimpIe Theme**: Custom theme located in `themes/hexo-theme-jsimple/` providing the visual layout
- **Content Management**: Markdown posts in `source/_posts/` with front-matter metadata
- **Asset Pipeline**: CSS/JS assets compiled and served from theme's `source/` directory

**Configuration Hierarchy:**
- Root `_config.yml`: Site-wide Hexo configuration (URL, pagination, plugins, etc.)
- Theme `_config.yml`: Theme-specific settings (appearance, navigation, social links)
- Package.json scripts: Build and deployment workflows

## Common Development Commands

**Local Development:**
```bash
npm run server          # Start development server (localhost:4000)
hexo server             # Alternative development server command
```

**Content Creation:**
```bash
hexo new "Post Title"   # Create new post in source/_posts/
hexo new page "about"   # Create new page
```

**Build and Deploy:**
```bash
npm run build          # Generate static files (hexo generate)
npm run clean          # Clean generated files (hexo clean)
npm run deploy         # Standard hexo deploy
npm run deploy2        # Custom deployment: build + scp to server
```

**Maintenance Scripts:**
```bash
node add-categories.js  # Bulk add categories to posts missing them
node fix-posts.js      # Fix malformed front-matter categories
node fix-tags.js       # Fix malformed front-matter tags
```

## Content Structure

**Post Front-matter Template:**
```yaml
---
title: Post Title
date: YYYY-MM-DD HH:mm:ss
categories: Programming
tags:
  - tag1
  - tag2
---
```

**Site Organization:**
- Posts are categorized under "Programming" (mapped to "top1" in navigation)
- Tag system with predefined mappings in root `_config.yml`
- Asset folders can be created alongside posts for images and media

## Theme Architecture

The JSimpIe theme uses:
- **EJS Templates**: Layout files in `layout/` directory
- **CSS Build System**: Source SCSS/CSS compiled to minified versions
- **JavaScript Components**: Core functionality in `js/lib/SimpleCore.js`
- **Font Integration**: FontAwesome icons and custom font modules

**Theme Configuration Points:**
- Navigation menus in theme `_config.yml`
- Color themes (day/night mode support)
- Social links and author information
- Search functionality via hexo-generator-searchdb

## Deployment

The site uses a custom deployment script (`deploy.sh`) that:
1. Generates static files via Hexo
2. Transfers files via SCP to remote server at `blog.qooeo.com`
3. Deploys to `/opt/www/blog.qooeo.com/` directory

**Deployment Flow:**
- `npm run deploy2` → `yarn build` → `sh deploy.sh`
- Requires SSH access to the target server

## Important Files

- `_config.yml`: Primary site configuration
- `package.json`: Dependencies and npm scripts  
- `deploy.sh`: Production deployment script
- `themes/hexo-theme-jsimple/_config.yml`: Theme settings
- `source/_posts/`: All blog post content
- `scaffolds/`: Template files for new content creation