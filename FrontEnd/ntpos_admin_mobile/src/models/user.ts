
export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    groups: [
        name: string,
    ],
    roles: [
        roleName: string
    ],
    registeredAt: string;
}