---
title: AI CLI Tools Setup Guide
categories: Programming
date: 2025-11-19 22:22:52
tags:
  - AI
  - CLI
  - Setup
---

This guide covers the installation and configuration of various AI command-line interfaces and their dependencies.

## Prerequisites

Before installing the AI tools, ensure you have the necessary system dependencies.

### [Rust](https://rust-lang.org/learn/get-started/)

Required for some Python and system tools.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### [UV](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer)

A fast Python package installer and resolver.

```bash
brew install uv
```

### [Oh My Zsh](https://jumping-code.com/2024/04/30/mac-terminal-settings/#2-install-oh-my-zsh)

Shell enhancements for a better terminal experience.

```bash
brew install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Add to your `~/.zshrc`:

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-z)
```

## Global Installations

Install the core AI CLI tools via npm.

```bash
npm install -g task-master-ai
npm install -g @anthropic-ai/claude-code
npm install -g @google/gemini-cli
npm install -g @openai/codex
npm install -g @upstash/context7-mcp
```

## Tool Configuration

### [Task Master AI](https://www.task-master.dev/)

Initialize the task master configuration:

```bash
tm init
```

### [Claude Code](https://github.com/anthropics/claude-code)

Configure the Serena MCP server for Claude:

```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project "$(pwd)"
```

### [Gemini CLI](https://github.com/google-gemini/gemini-cli)

Configure `~/.gemini/settings.json` to include MCP servers like Context7 and Serena.

**File:** `~/.gemini/settings.json`

```json
{
  "ide": {
    "hasSeenNudge": true
  },
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "serena": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/oraios/serena",
        "serena",
        "start-mcp-server",
        "--context",
        "ide-assistant",
        "--project",
        "PROJECT"
      ]
    }
  }
}
```

### [Codex](https://github.com/openai/codex)

Configure `~/.codex/config.toml`.

**File:** `~/.codex/config.toml`

```toml
[mcp_servers.serena]
command = "uvx"
args = ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "codex"]
trust_level = "trusted"
startup_timeout_ms = 20000

[mcp_servers.context7]
command = "npx"
args = [
    "--yes",
    "@upstash/context7-mcp",
    "--api-key",
    "api-key"
]
startup_timeout_ms = 20000

[notice]
hide_gpt5_1_migration_prompt = true

[startup_messages]
messages = [
    { role = "user", content = "Activate the current dir as project using serena" }
]
```

## Shell Environment

Add these aliases to your `~/.zshrc` for easier access to your AI tools.

```bash
alias google="antigravity"
alias gemini2="gemini --yolo"
alias codex2="codex --yolo"
alias tm="task-master"
alias claude2="claude --dangerously-skip-permissions"
```
