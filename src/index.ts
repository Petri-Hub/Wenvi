#!/usr/bin/env node

import { CommandRegistry } from "./CommandRegistry"
import { ListCommand } from "./commands/ListCommand";
import { LocalEnvironmentRepository } from "./resources/LocalEnvironmentRepository";
import { VersionCommand } from "./commands/VersionCommand";
import { WenviCli } from "./WenviCli";
import { PingCommand } from "./commands/PingCommand";
import { UseCommand } from "./commands/UseCommand";

const registry = new CommandRegistry()
const repository = new LocalEnvironmentRepository()

registry.set('use', new UseCommand(repository))
registry.set('list', new ListCommand(repository))
registry.set('version', new VersionCommand())
registry.set('ping', new PingCommand())

new WenviCli(registry).run(process.argv)