import React, { useContext, useState } from 'react';
import { Drivers, Storage } from '@ionic/storage';

// https://github.com/ionic-team/ionic-storage
export const storage = new Storage({
    name: '__mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});

const sqlStorage = async () => {
    await storage.create();
    await storage.set('name', 'Mr.Ionitron');
    const name = await storage.get('name');
}
sqlStorage()

export interface FieldData {
    id: number;
    email: string;
    access_token: string;
}

interface Context {
    fieldData: FieldData;
    addFieldData: (email: string, access_token: string) => void;
}

const LocaldbContext = React.createContext<Context>({
    fieldData: {
        id: 0,
        email: '',
        access_token: ''
    },
    addFieldData: () => {}
});

export default LocaldbContext;