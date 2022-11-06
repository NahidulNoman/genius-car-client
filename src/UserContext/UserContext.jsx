import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({children}) => {
    const [user , setUser] = useState({});
    const [loading , setLoading] = useState(true);

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    };
    const login = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    };
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect( () => {
        const unSubsCript = onAuthStateChanged(auth, (logUser) => {
            setUser(logUser);
            setLoading(false);
        })
        return ()=> {
            unSubsCript();
        }
    },[])

    const authInfo ={
        user,
        loading,
        createUser,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;