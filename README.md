<div align="center">
  <h1>🌄 Wenvi</h1>
  <p><b>Wenvi is a simple CLI to organize and manage .env files in whitelabel applications</b></p>

  ![GitHub package.json version](https://img.shields.io/github/package-json/v/Petri-Hub/Wenvi)
  ![NPM Version](https://img.shields.io/npm/v/wenvi)
  ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Petri-Hub/Wenvi/deploy.yml)
  ![GitHub top language](https://img.shields.io/github/languages/top/Petri-Hub/Wenvi)
  ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Petri-Hub/Wenvi)
</div>

## Table of Contents

- [About](#About)
- [Features](#Features)
- [Glossary](#Glossary)
- [Installation](#Installation)
- [Commands](#Commands)
- [Use Cases](#UseCases)
- [License](#License)

<h2 id="About">About</h2>

Wenvi is a Node.js CLI tool written in TypeScript designed to manage `.env` files in whitelabel applications. It simplifies the process of handling environment variables across different subjects and environments, making it easier to manage configurations for various deployments.

<h2 id="Glossary">Glossary</h2>

- **Subject:** The entity that requires its own set of environments, in most cases, a company you're working for.
- **Environment:** A collection of variables that typically represents a stage of deployment such as development or production.

<h2 id="Features">Features</h2>

- Create, delete and list subjects and environments.
- Open subjects and environments in your favorite editor.
- Validate all your environments variables with an example file.
- Display subjects and environments in a friendly table format.
- Quickly switch your current environment.

<h2 id="Installation">Installation</h2>

To install Wenvi, you need to have **Node.js** and **npm** installed on your machine. Then, run the following npm command:

```sh
npm install -g wenvi
```

<h2 id="Commands">Commands</h2>

| Command  | Descritiption                                                                             | Format                                                          |
|----------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **init**     | Creates the repository folder where the subjects and environments are going to be stored. | `wenvi init`                                                    |
| **create**   | Creates a subject or environment.                                                         | `wenvi create <subject>`<br>`wenvi create <subject> <environment>` |
| **list**     | Lists all the registered subjects its environments.                                       | `wenvi list`<br>`wenvi list <subject-1> <subject-2> ...`           |
| **use**      | Switch your curent .env file with the selected environment.                               | `wenvi use <subject> <environment>`                             |
| **view**     | Outputs an environment variables into the console.                                        | `wenvi view <subject> <environment>`                            |
| **open**     | Opens an environment with your default text editor.                                       | `wenvi open <subject> <environment>`                            |
| **delete**   | Deletes a subject or environment.                                                         | `wenvi delete <subject>`<br>`wenvi delete <subject> <environment>` |
| **table**    | Shows a table that compares which subject has which environment.                          | `wenvi table`<br>`wenvi table <subject-1> <subject-2> ...`         |
| **example**  | Setups the .env.example file that allows environments validation.                         | `wenvi example`                                                 |
| **validate** | Validates all your environments following the .env.example file structure.                | `wenvi validate`                                                |
| **version**  | Outputs the current Wenvi version installed.                                              | `wenvi version`                                                 |
| **upgrade**  | Upgrades the Wenvi CLI to the latest version.                                             | `wenvi upgrade`                                                 |
| **docs**     | Open the Wenvi in your browser.                                                           | `wenvi docs`                                                    |

<h2 id="UseCases">Use Cases</h2>

<h2 id="License">License</h2>

This project is licensed under the MIT License.
