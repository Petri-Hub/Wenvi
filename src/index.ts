#!/usr/bin/env node

import { CommandRegistry } from "./core/CommandRegistry"
import { ListCommand } from "./commands/ListCommand";
import { LocalEnvironmentRepository } from "./resources/LocalEnvironmentRepository";
import { VersionCommand } from "./commands/VersionCommand";
import { WenviCli } from "./core/WenviCli";
import { PingCommand } from "./commands/PingCommand";
import { UseCommand } from "./commands/UseCommand";
import { ValidateCommand } from "./commands/ValidateCommand";
import { UpgradeCommand } from "./commands/UpdateCommand";
import { RepositoryRegistry } from "./core/RepositoryRegistry";
import { DocsCommand } from "./commands/DocsCommand";

const commands = new CommandRegistry()
const repositories = new RepositoryRegistry()

repositories.set('local', new LocalEnvironmentRepository())

commands.set('use', new UseCommand())
commands.set('list', new ListCommand())
commands.set('validate', new ValidateCommand())
commands.set('version', new VersionCommand())
commands.set('upgrade', new UpgradeCommand())
commands.set('docs', new DocsCommand())
commands.set('ping', new PingCommand())

new WenviCli(commands, repositories).run(process.argv)