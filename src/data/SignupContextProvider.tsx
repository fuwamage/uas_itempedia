import React, { PropsWithChildren, useState } from 'react';

import SignupContext, { Userdata, TokenData } from './signup-context';

import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const SignupContextProvider: React.FC<PropsWithChildren> = props => {
    const [userdata, setUserdata] = useState<Userdata[]>([]);
    const [tokendata, setTokenData] = useState<TokenData[]>([]);
    const [dummy, setDummy] = useState<String>('');

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

    const pushSQLite = (utoken: string) => {
        const sqlStorage = async () => {
            const store = new Storage({
                name: 'db_users',
                driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            });
            await store.defineDriver(CordovaSQLiteDriver);        
            await store.create();
            
            await store.set('access_token', btoa(utoken));
            const access_token = await store.get('access_token');

            const newToken: TokenData = {
                id: Math.random().toString(),
                access_token
            };
            setTokenData(curUserdata => {
                return curUserdata.concat(newToken);
            });
        }
        
        sqlStorage()
    }

    const testPush = () => {
        setDummy("asd");
    }


    return (
        <SignupContext.Provider
            value={{
                userdata,
                tokendata,
                dummy,
                addUserdata,
                removeUserdata,
                pushSQLite,
                testPush
            }}
        >
            {props.children}
        </SignupContext.Provider>
    );
};

export default SignupContextProvider;