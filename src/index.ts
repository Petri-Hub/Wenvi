#!/usr/bin/env node

import { register } from "module";
import { CommandRegistry } from "./CommandRegistry"
import { ListCommand } from "./commands/ListCommand";
import { LocalEnvironmentRepository } from "./resources/LocalEnvironmentRepository";
import { VersionCommand } from "./commands/VersionCommand";
import { WenviCli } from "./WenviCli";

const registry = new CommandRegistry()
const repository = new LocalEnvironmentRepository()

registry.set('list', new ListCommand(repository))
registry.set('version', new VersionCommand())

new WenviCli(registry).run(process.argv)