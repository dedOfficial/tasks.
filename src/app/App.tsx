import { useState, useEffect } from 'preact/hooks';
import { Session } from '@supabase/supabase-js';

import TaskPage from '@/pages/TaskPage';
import LogoutButton from '@/features/auth/LogoutButton';
import { supabase } from '@/shared/api/supabaseClient';
import AuthPage from '@/pages/AuthPage';

import './App.css';

const App = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        let unsubscribe = () => {};

        (async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);

            const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
                setSession(session);
            });

            unsubscribe = () => {
                authListener?.subscription.unsubscribe();
            };
        })();

        return unsubscribe;
    }, []);

    return (
        <>
            {session ? (
                <>
                    <TaskPage userId={session.user.id} />
                    <LogoutButton />
                </>
            ) : (
                <AuthPage />
            )}
        </>
    );
};

export default App;
