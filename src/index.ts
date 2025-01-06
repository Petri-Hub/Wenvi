#!/usr/bin/env node

import { LocalEnvironmentRepository } from "./resources/LocalEnvironmentRepository";
import { WenviCli } from "./core/WenviCli";
import { RepositoryRegistry } from "./core/RepositoryRegistry";
import { CommandFactory } from "./core/CommandFactory";

const commands = new CommandFactory()
const repositories = new RepositoryRegistry()

repositories.set('local', new LocalEnvironmentRepository())

new WenviCli(commands, repositories).run(process.argv)