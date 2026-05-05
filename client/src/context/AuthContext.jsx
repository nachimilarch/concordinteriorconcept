import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("cc_token"));
    const [admin, setAdmin] = useState(() => localStorage.getItem("cc_admin"));

    const login = (token, username) => {
        setToken(token);
        setAdmin(username);
        localStorage.setItem("cc_token", token);
        localStorage.setItem("cc_admin", username);
    };

    const logout = () => {
        setToken(null);
        setAdmin(null);
        localStorage.removeItem("cc_token");
        localStorage.removeItem("cc_admin");
    };

    return (
        <AuthContext.Provider value={{ token, admin, login, logout, isAuth: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);