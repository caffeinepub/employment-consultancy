import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Consultation {
    id: bigint;
    status: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone?: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllConsultations(): Promise<Array<Consultation>>;
    getPageVisitCount(): Promise<bigint>;
    recordPageVisit(): Promise<void>;
    submitConsultation(name: string, email: string, phone: string | null, message: string): Promise<bigint>;
    updateConsultationStatus(id: bigint, newStatus: string): Promise<boolean>;
}
