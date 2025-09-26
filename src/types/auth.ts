
export interface AuthState {
    user: {
        uid: string;
        displayName: string | null;
        email: string | null;
        photoUrl: string | null;
    } | null;
    isloading: boolean;
    error: string | null;
}