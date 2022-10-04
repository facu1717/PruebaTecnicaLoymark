export interface User {
    id?: number,
    name: string,
    surname: string,
    email: string,
    dateOfBirth: Date,
    phoneNumber?: number,
    residenceCountry: string,
    contactInfo: boolean
}
