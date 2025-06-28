export const USER_ROLE = {
    PATIENT: "patient",
    DOCTOR: "doctor",
    ADMIN: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;