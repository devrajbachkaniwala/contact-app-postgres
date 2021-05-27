export interface IContactCompany {
    companyId: number;
    company: string;
    jobTitle: string;
    department: string;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}