import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone?: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactFormSubmission>>;
    submitContactForm(name: string, email: string, phone: string | null, message: string): Promise<void>;
}
