export interface User {
    id: string;
    email: string;
}

export interface AuthResponse {
    user: User | null;
    error: string | null;
}

export interface SignUpData {
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}