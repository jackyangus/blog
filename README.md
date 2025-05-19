# Personal Blog

This is a personal blog built with [Hexo](https://hexo.io/), a fast, simple and powerful blog framework.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12.0 or higher)
- [Git](https://git-scm.com/)

## Installation

1. Clone this repository:
```bash
git clone <your-repository-url>
cd blog
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Create a new post
```bash
hexo new "My New Post"
```

### Run server locally
```bash
hexo server
```
Visit `http://localhost:4000` to preview your blog.

### Generate static files
```bash
hexo generate
```

### Deploy to remote sites
```bash
hexo deploy
```

## Project Structure

```
.
├── _config.yml       # Site configuration
├── package.json      # Project dependencies
├── scaffolds/        # Post templates
├── source/          # Source files
│   ├── _drafts/     # Draft posts
│   ├── _posts/      # Published posts
│   └── _pages/      # Pages
└── themes/          # Theme files
```

## Writing Posts

Posts are written in Markdown format and stored in the `source/_posts` directory. Each post should include front-matter at the beginning of the file:

```markdown
---
title: Post Title
date: YYYY-MM-DD HH:mm:ss
tags: [tag1, tag2]
categories: [category1]
---
```

## Customization

- Edit `_config.yml` to configure your blog settings
- Modify theme files in the `themes` directory to customize the appearance
- Add custom plugins in `package.json`

## License

This project is licensed under the MIT License - see the LICENSE file for details. 