export interface IContactNote {
    contactId: number;
    noteId: number;
    content?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}