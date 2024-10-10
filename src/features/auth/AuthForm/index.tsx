import { useState } from 'preact/hooks';
import { signUp, signIn } from '@/shared/api/userApi';
import { SignUpData, SignInData } from '@/entities/User';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Переключение между режимами авторизации и регистрации
    const [errorMessage, setErrorMessage] = useState('');

    // Обработка отправки формы
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setErrorMessage('');

        if (isLogin) {
            const data: SignInData = { email, password };
            const { error } = await signIn(data);
            if (error) {
                setErrorMessage(error);
            }
        } else {
            const data: SignUpData = { email, password };
            const { error } = await signUp(data);
            if (error) {
                setErrorMessage(error);
            }
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form class={'flex flex-column gap-2'} onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onInput={e => setEmail((e.target as HTMLInputElement).value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onInput={e => setPassword((e.target as HTMLInputElement).value)}
                />
                <button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button class={'mt-2'} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AuthForm;
