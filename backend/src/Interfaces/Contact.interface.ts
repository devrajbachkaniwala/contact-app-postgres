export interface IContact {
    companyId?: number | null;
    userId: number;
    contactId: number;
    contactPhoto?: string | null;
    prefix?: string | null;
    firstName: string;
    middleName?: string | null;
    lastName?: string | null;
    suffix?: string | null;
    phoneticFirst?: string | null;
    phoneticMiddle?: string | null;
    phoneticLast?: string | null;
    nickname?: string | null;
    fileAs?: string | null;
    dateOfBirth?: Date | null;
    relationship?: string | null;
    chat?: string | null;
    internetCall?: string | null;
    customField?: string | null;
    event?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}
