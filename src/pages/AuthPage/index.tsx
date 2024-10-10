import type { FunctionComponent } from 'preact';

import AuthForm from '@/features/auth/AuthForm';

const AuthPage: FunctionComponent = () => {
    return (
        <div class={'m-auto w-120 h-60'}>
            <AuthForm />
        </div>
    );
};

export default AuthPage;
