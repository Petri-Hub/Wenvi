export interface IPackageProvider {
    getVersion(): string
    getDocumentationUrl(): string
}