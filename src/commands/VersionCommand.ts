import { ICommand } from "../interfaces/ICommand";
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from "../logging/Logger";
import PackageJsonProvider from "../core/PackageJsonProvider";

export class VersionCommand implements ICommand {
    constructor(private packageProvider = new PackageJsonProvider()) {}
    
    public async execute(): Promise<void> {
        Logger.log(`Using version ${this.packageProvider.getVersion()}`);
    }
}