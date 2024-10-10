import { useState, useEffect } from 'preact/hooks';
import TaskPage from '@/pages/TaskPage/TaskPage';
import AuthForm from '@/features/auth/AuthForm';
import LogoutButton from '@/features/auth/LogoutButton';
import { supabase } from '@/shared/api/supabaseClient';
import { Session } from '@supabase/supabase-js';

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
        <div>
            {session ? (
                <>
                    <TaskPage userId={session.user.id} />
                    <LogoutButton />
                </>
            ) : (
                <AuthForm />
            )}
        </div>
    );
};

export default App;
