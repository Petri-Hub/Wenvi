<div align="center">
  <h1>🌄 Wenvi</h1>
  <p><b>Wenvi is a simple CLI to organize and manage .env files in whitelabel applications</b></p>

  ![GitHub package.json version](https://img.shields.io/github/package-json/v/Petri-Hub/Wenvi)
  ![NPM Version](https://img.shields.io/npm/v/wenvi)
  ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Petri-Hub/Wenvi/deploy.yml)
  ![GitHub top language](https://img.shields.io/github/languages/top/Petri-Hub/Wenvi)
  ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Petri-Hub/Wenvi)
</div>

<br>
<h2>Table of Contents</h2>

- [About](#About)
- [Glossary](#Glossary)
- [Features](#Features)
- [Showcase](#Showcase)
- [Installation](#Installation)
- [Quick Start](#QuickStart)
- [Commands](#Commands)
- [License](#License)

<br>
<h2 id="About">About</h2>

Wenvi is a Node.js CLI tool written in TypeScript designed to manage `.env` files in whitelabel applications. It simplifies the process of handling environment variables across different subjects and environments, making it easier to manage configurations for various deployments.

<br>
<h2 id="Glossary">Glossary</h2>

- **Subject:** The entity that requires its own set of environments, in most cases, a company you're working for.
- **Environment:** A collection of variables that typically represents a stage of deployment such as development or production.

<br>
<h2 id="Features">Features</h2>

- Create, delete and list subjects and environments.
- Open subjects and environments in your favorite editor.
- Validate all your environments variables with an example file.
- Display subjects and environments in a friendly table format.
- Quickly switch your current environment.
- Export and import subjects and environments.

<br>
<h2 id="Showcase">Showcase</h2>

[INSERT_IMAGES_HERE]

<br>
<h2 id="Installation">Installation</h2>

To install Wenvi, you need to have **Node.js** and **npm** installed on your machine. Then, run the following npm command:

```sh
npm install -g wenvi
```

<br>
<h2 id="QuickStart">Quick Start</h2>

1. Open a terminal in your project root.

2. Initialize your Wenvi repository with:

```sh
wenvi init
```

3. Create your first environment

```sh
wenvi create company-a development
```

4. Use your first environment

```sh
wenvi use company-a development
```

5. Enjoy!

<br>
<h2 id="Commands">Commands</h2>

<h3 id="command_init">init</h3>

Creates the repository folder where the subjects and environments are going to be stored.

- Usage: `wenvi init`

<h3 id="command_create">create</h3>

Creates a subject or environment.

- Usage:
  - `wenvi create <subject>`
  - `wenvi create <subject> <environment>`
  - `wenvi create <subject> <environment> <variables>"`
- Example: `wenvi create company-a production "SECRET=123..."`

<h3 id="command_list">list</h3>

Lists all the registered subjects and their environments.

- Usage: 
  - `wenvi list`
  - `wenvi list <subject-1> <subject-2> ...`
- Example:
  - `wenvi list`
  - `wenvi list company-a company-b`

<h3 id="command_use">use</h3>

Switch your current .env file with the selected environment.

- Usage: `wenvi use <subject> <environment>`
- Example: `wenvi use company-a production`

<h3 id="command_current">current</h3>

See the environment you're currently using.

- Usage: `wenvi current`

<h3 id="command_copy">copy</h3>

Copy the variables of an environment file to your clipboard.

- Usage: `wenvi copy <subject> <environment>`
- Example: `wenvi copy company-a production`

<h3 id="command_view">view</h3>

Outputs environment variables into the console.

- Usage: `wenvi view <subject> <environment>`
- Example: `wenvi view company-a production`

<h3 id="command_open">open</h3>

Opens an environment with your default text editor.

- Usage: `wenvi open <subject> <environment>`
- Example: `wenvi open company-a production`

<h3 id="command_update">update</h3>

Updates an environment with new variables.

- Usage: `wenvi update <subject> <environment> <variables>`
- Example: `wenvi update company-a dev "SECRET=123..."`

<h3 id="command_update-key">update-key</h3>

Updates an environment key with a new value.

- Usage: `wenvi update-key <subject> <environment> <key> <value>`
- Example: `wenvi update-key company-a dev SECRET 123`

<h3 id="command_delete">delete</h3>

Deletes a subject or environment.

- Usage: 
  - `wenvi delete <subject>`
  - `wenvi delete <subject> <environment>`
- Example: 
  - `wenvi delete company-a`
  - `wenvi delete company-a production`

<h3 id="command_get-key">get-key</h3>

Returns the value of a key in an environment.

- Usage: `wenvi get-key <subject> <environment> <key>`
- Example: `wenvi get-key company-a production SECRET`

<h3 id="command_delete-key">delete-key</h3>

Deletes a key of an environment.

- Usage: `wenvi delete-key <subject> <environment> <key>`
- Example: `wenvi delete-key company-a production SECRET`

<h3 id="command_table">table</h3>

Shows a table that compares which subject has which environment.

- Usage: 
  - `wenvi table`
  - `wenvi table <subject-1> <subject-2> ...`
- Example: 
  - `wenvi table`
  - `wenvi table company-a company-b`

<h3 id="command_example">example</h3>

Setups the .env.example file that allows environments validation.

- Usage: `wenvi example`

<h3 id="command_export">export</h3>

Export all your subjects and environments into a local file.

- Usage: `wenvi export`

<h3 id="command_import">import</h3>

Import an exported Wenvi configuration.

- Usage: `wenvi import`

<h3 id="command_validate">validate</h3>

Validates all your environments following the .env.example file structure.

- Usage: `wenvi validate`

<h3 id="command_version">version</h3>

Outputs the current Wenvi version installed.

- Usage: `wenvi version`

<h3 id="command_upgrade">upgrade</h3>

Upgrades the Wenvi CLI to the latest version.

- Usage: `wenvi upgrade`

<h3 id="command_docs">docs</h3>

Open the Wenvi documentation in your browser.

- Usage: `wenvi docs`

<h3 id="command_help">help</h3>

Outputs the available Wenvi commands.

- Usage: `wenvi help`

<br>
<h2 id="License">License</h2>

This project is licensed under the MIT License.
