export interface IContactTelephone {
    contactId: number;
    telephoneId: number;
    countryCode: string;
    number: number;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}