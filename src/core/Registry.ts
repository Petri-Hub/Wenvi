export abstract class Registry<T> {
    constructor(
        private registry = new Map<string, T>()
    ) {}

    public set(name: string, item: T): void {
        this.registry.set(name, item);
    }

    public get(name: string): T | null {
        return this.registry.get(name) ?? null;
    }
}