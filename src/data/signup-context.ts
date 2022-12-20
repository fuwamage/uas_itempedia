import React from 'react';

export interface Userdata {
    id: string;
    email: string;
    otpServer: string;
}

export interface TokenData {
    id: string;
    access_token: string
}

interface Context {
    userdata: Userdata[];
    tokendata: TokenData[];
    dummy: String;
    addUserdata: (email: string, otpServer: string) => void;
    removeUserdata: () => void;
    pushSQLite: (token: string) => void;
    testPush: () => void;
}

const SignupContext = React.createContext<Context>({
    userdata: [],
    tokendata: [],
    dummy: '',
    addUserdata: () => { },
    removeUserdata: () => { },
    pushSQLite: () => { },
    testPush: () => { }
});

export default SignupContext;