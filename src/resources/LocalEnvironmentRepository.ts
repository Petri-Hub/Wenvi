import { EnvironmentFileListingError } from "../errors/EnvironmentFileListingError";
import { EnvironmentFileRetrievalError } from "../errors/EnvironmentFileRetrievalError";
import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";
import { EnvironmentFile } from "../types/EnvironmentFile";

export class LocalEnvironmentRepository implements IEnvironmentRepository{
    public async get(subject: string, environment: string): Promise<EnvironmentFile | null> {
        try{
            return {
                environment: environment,
                subject: subject,
                content: "SECRET=COMPANY_A_SECRET_VARIABLE"
            }
        } catch(error){
            throw new EnvironmentFileRetrievalError(error)
        }
    }

    public async list(): Promise<EnvironmentFile[]> {
        try{
            return [
                {
                    environment: "development",
                    subject: "company_a",
                    content: "SECRET=COMPANY_A_SECRET_VARIABLE"
                },
                {
                    environment: "production",
                    subject: "company_a",
                    content: "SECRET=COMPANY_A_SECRET_VARIABLE"
                },
                {
                    environment: "development",
                    subject: "company_b",
                    content: "SECRET=COMPANY_B_SECRET_VARIABLE"
                },
                {
                    environment: "production",
                    subject: "company_b",
                    content: "SECRET=COMPANY_B_SECRET_VARIABLE"
                }
            ]
        } catch(error){
            throw new EnvironmentFileListingError(error)
        }
    
    }
}