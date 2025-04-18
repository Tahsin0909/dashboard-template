// Enums
export enum UserRole {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    CLINICIAN = "CLINICIAN"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

// User Interface
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    userStatus: UserStatus;
    isDeleted: boolean;
    isVerified: boolean;
    otp?: number;
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
    Clinicians?: Clinicians;
}

// Clinicians Interface
export interface Clinicians {
    id: string;
    userId: string;
    email: string;
    name: string;
    practice?: string;
    image?: string;
    qualifications?: string;
    descriptions?: string;
    about?: string;
    portfolioLink?: string;
    therapeuticMethods: string[];
    specialities: string[];
    serviceTypes: string[];
    agesServed: string[];
    location?: string;
    availabilityDay?: string;
    availabilityTime?: string;
    telehealthOnly?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Service Interface
export interface Service {
    id: string;
    title: string;
    subtitle: string;
    descriptions: string;
    icon?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Blog Interface
export interface Blog {
    id: string;
    userId: string;
    title: string;
    descriptions: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

// Booking Interface
export interface Booking {
    id: string;
    clinicianId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    userName: string;
    phoneNumber: string;
    userEmail: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

// ContactUs Interface
export interface ContactUs {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}