export interface IContactAddress {
    contactId: number;
    addressId: number;
    country?: string | null;
    state?: string | null;
    city?: string | null;
    streetAddress?: string | null;
    streetAddressLine2?: string | null;
    pincode?: number | null;
    poBox?: string | null;
    type?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}