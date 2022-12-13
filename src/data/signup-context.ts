import React from 'react';

export interface Userdata {
    id: string;
    email: string;
    otpServer: string;
}

interface Context {
    userdata: Userdata[];
    addUserdata: (email: string, otpServer: string) => void;
    removeUserdata: () => void;
}

const SignupContext = React.createContext<Context>({
    userdata: [],
    addUserdata: () => { },
    removeUserdata: () => { }
});

export default SignupContext;