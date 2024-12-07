import { EnvironmentFile } from "../types/EnvironmentFile";

export interface EnvironmentRepository {
   get(subject: string, environment: string): Promise<EnvironmentFile | null>
   list(): Promise<EnvironmentFile[]>
}