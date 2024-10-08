import { signOut } from '@/shared/api/userApi';

const LogoutButton = () => {
    const handleLogout = async () => {
        const error = await signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;