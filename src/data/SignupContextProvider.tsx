import React, { PropsWithChildren, useState } from 'react';

import SignupContext, { Userdata } from './signup-context';

const SignupContextProvider: React.FC<PropsWithChildren> = props => {
    const [userdata, setUserdata] = useState<Userdata[]>([]);

    const addUserdata = (email: string, otpServer: string) => {
        const newUserdata: Userdata = {
            id: Math.random().toString(),
            email,
            otpServer
        };

        setUserdata(curUserdata => {
            return curUserdata.concat(newUserdata);
        });
    };

    const removeUserdata = () => {
        const empty: any = []
        setUserdata(empty);
    };


    return (
        <SignupContext.Provider
            value={{
                userdata,
                addUserdata,
                removeUserdata
            }}
        >
            {props.children}
        </SignupContext.Provider>
    );
};

export default SignupContextProvider;