export interface ILabel {
    userId: number;
    labelId: number;
    labelName: string;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}