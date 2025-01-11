import PackageJsonProvider from "../core/PackageJsonProvider";
import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";

export class VersionCommand implements IExecutableCommand {
    constructor(private packageProvider = new PackageJsonProvider()) {}
    
    public async execute(): Promise<void> {
        Logger.log(`Using version ${this.packageProvider.getVersion()}`);
    }
}