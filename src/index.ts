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

const registry = new CommandRegistry()
const repository = new LocalEnvironmentRepository()

registry.set('upgrade', new UpgradeCommand())
registry.set('use', new UseCommand(repository))
registry.set('list', new ListCommand(repository))
registry.set('validate', new ValidateCommand(repository))
registry.set('version', new VersionCommand())
registry.set('ping', new PingCommand())

new WenviCli(registry).run(process.argv)