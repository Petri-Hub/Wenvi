import fs from 'fs'
import { PackageJson } from '../types/PackageJson'

export default class PackageJsonProvider {
   public getVersion(): string {
      return this.getJson().version
   }

   public getDocumentationUrl(): string {
      return this.getJson().repository.url
   }

   private getJson(): PackageJson {
      return JSON.parse(fs.readFileSync('package.json', 'utf8'))
   }
}
