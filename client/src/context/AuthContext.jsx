import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const init = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await authService.getCurrentUser();

                setUser(response);

            } catch {

                localStorage.removeItem("token");

            }

            setLoading(false);

        };

        init();

    }, []);

    const login = async (credentials) => {

        const response = await authService.login(credentials);

        localStorage.setItem("token", response.data.token);

        setUser(response.data.user);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);