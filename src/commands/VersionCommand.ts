import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import PackageJsonProvider from "../core/PackageJsonProvider";

export class VersionCommand implements IExecutableCommand {
    constructor(private packageProvider = new PackageJsonProvider()) {}
    
    public async execute(): Promise<void> {
        Logger.log(`Using version ${this.packageProvider.getVersion()}`);
    }
}