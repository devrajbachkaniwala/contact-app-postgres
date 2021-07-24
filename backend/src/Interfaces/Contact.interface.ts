import { IContactAddress } from "./contact-address.interface";
import { IContactEmailAddress } from "./contact-email-address.interface";
import { IContactLabel } from "./contact-label.interface";
import { IContactNote } from "./contact-note.interface";
import { IContactSocial } from "./contact-social.interface";
import { IContactTelephone } from "./contact-telephone.interface";
import { IContactWebsite } from "./contact-website.interface";
import { ILabel } from "./label.interface";

export interface IContact {
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
    company?: string | null;
    jobTitle?: string | null;
    department?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}

export interface IContactModel {
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
    company?: string | null;
    jobTitle?: string | null;
    department?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
    telephones?: IContactTelephone[];
    addresses?: IContactAddress[];
    emailAddresses?: IContactEmailAddress[];
    notes?: IContactNote[];
    socials?: IContactSocial[];
    websites?: IContactWebsite[];
    labels?: ILabel[];
}