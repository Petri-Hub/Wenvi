import PackageJsonProvider from "../core/PackageJsonProvider";
import { ICommand } from "../interfaces/ICommand";
import { IPackageProvider } from "../interfaces/IPackageProvider";
import open from 'open'

export class DocsCommand implements ICommand{
    constructor(private packageProvider: IPackageProvider = new PackageJsonProvider()){}

    public async execute(): Promise<void> {
        open(this.packageProvider.getDocumentationUrl())
    }
}