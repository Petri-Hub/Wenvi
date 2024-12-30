import PackageJsonProvider from "../core/PackageJsonProvider";
import { ICommand } from "../interfaces/ICommand";
import open from 'open'
import { Logger } from "../logging/Logger";

export class DocsCommand implements ICommand{
    constructor(private packageProvider = new PackageJsonProvider()){}

    public async execute(): Promise<void> {
        await open(this.packageProvider.getDocumentationUrl())
        Logger.log('Opened documentation in browser.')
    }
}