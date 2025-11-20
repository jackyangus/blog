---
title: ai cli install
categories: Programming
date: 2025-11-19 22:22:52
tags:
---

## install ai cli

```bash
npm install -g task-master-ai
npm install -g @anthropic-ai/claude-code
npm install -g @google/gemini-cli
npm install -g @openai/codex
npm install -g @upstash/context7-mcp
```

## ~/.zshrc

```bash
alias google="antigravity"
alias gemini2="gemini --yolo"
alias codex2="codex --yolo"
alias tm="task-master"
alias claude2="claude --dangerously-skip-permissions"

```

## [task-master-ai](https://www.task-master.dev/)

```
tm init
```

## [claude code](https://github.com/anthropics/claude-code)

```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project "$(pwd)"
```

## [gemini-cli](https://github.com/google-gemini/gemini-cli)

~/.gemini/settings.json

```bash
gemini mcp add serena \
  uvx --from git+https://github.com/oraios/serena \
  serena start-mcp-server \
  --transport stdio \
  --context ide-assistant \
  --project "$(pwd)"
```

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

## [codex](https://github.com/openai/codex)

~/.codex/config.toml

```text
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
