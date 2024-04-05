
export interface Contact {
    id?: string;
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
}

export interface ApiResponse {
    success: boolean;
    data: Contact[];
    error: string;
}  