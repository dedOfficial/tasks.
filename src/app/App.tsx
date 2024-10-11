import { useState, useEffect } from 'preact/hooks';
import { Session } from '@supabase/supabase-js';

// import TaskPage from '@/pages/TaskPage';
// import LogoutButton from '@/features/auth/LogoutButton';
import { supabase } from '@/shared/api/supabaseClient';
import AuthPage from '@/pages/AuthPage';
import Layout from '@/features/layout/desktop/Layout';
import { ErrorBoundary, lazy, LocationProvider, Route, Router } from 'preact-iso';

// Asynchronous (throws a promise)
const TasksPage = lazy(() => import('@/pages/TaskPage'));
// const Profile = lazy(() => import('./routes/profile.js'));
// const NotFound = lazy(() => import('./routes/_404.js'));

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
        <LocationProvider>
            <ErrorBoundary>
                {session ? (
                    <Layout>
                        <Router>
                            <Route
                                path='/'
                                component={() => <TasksPage userId={session?.user.id} />}
                            />
                            <Route
                                path='/tasks'
                                component={() => <TasksPage userId={session?.user.id} />}
                            />
                            {/* `default` prop indicates a fallback route. Useful for 404 pages */}
                            {/*<NotFound default />*/}
                        </Router>
                    </Layout>
                ) : (
                    <AuthPage />
                )}
            </ErrorBoundary>
        </LocationProvider>
    );
};

export default App;
