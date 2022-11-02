import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';

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
        login
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;