import { IPackageProvider } from "../interfaces/IPackageProvider";
import { PackageJson } from "../types/PackageJson";
import fs from 'fs'

export default class PackageJsonProvider implements IPackageProvider{
    public getVersion(): string {
        return this.getPackageJson().version
    }

    public getDocumentationUrl(): string {
        return this.getPackageJson().repository.url
    }

    private getPackageJson(): PackageJson {
        return JSON.parse(fs.readFileSync('package.json', 'utf8'))
    }
}