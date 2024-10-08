import {AuthResponse, SignInData, SignUpData } from '@/entities/User';
import { supabase } from './supabaseClient';

// Регистрация нового пользователя
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    const { email, password } = data;
    const { data: { user }, error } = await supabase.auth.signUp({ email, password });

    return {
        user: user ? { id: user.id, email: user.email } : null,
        error: error ? error.message : null,
    };
};

// Вход пользователя
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
    const { email, password } = data;
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });

    return {
        user: user ? { id: user.id, email: user.email } : null,
        error: error ? error.message : null,
    };
};

// Выход пользователя
export const signOut = async (): Promise<string | null> => {
    const { error } = await supabase.auth.signOut();
    return error ? error.message : null;
};