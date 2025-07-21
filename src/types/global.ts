export const USER_ROLE = {
    USER:"user"
} as const;

export type TUserRole = keyof typeof USER_ROLE;