import { createContext, use, useState } from "react";
import { login, logout, register } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(() =>{
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setloading(false);
    },[]);

    const handleRegister = async (userData) => {
        try {
            const data = await register(userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            console.log("Registration successful:", data.user);
            // navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/company/dashboard');
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            throw new Error('Registration failed');
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            console.log("Registration successful:", data.user);
            //navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/company/dashboard');
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const handleLogout = async() => {
        try {
          await logout();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          navigate('/login');
        } catch (error) {
          console.error('Logout failed');
        }
    };

    return(
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}