import React, { PropsWithChildren, useState } from 'react';

import LocalDBContext, { FieldData } from './localdb-context';

const LocalDBContextProvider: React.FC<PropsWithChildren> = props => {
    const [fieldData, setFieldData] = useState<FieldData>(Object);

    const addFieldData = (email: string, access_token: string) => {
        const newFieldData: FieldData = {
            id: Number(Math.random().toString()),
            email: email,
            access_token: access_token
        };

        setFieldData(e => {
            return e = newFieldData;
        });
    };

    return (
        <LocalDBContext.Provider
            value={{
                fieldData: {
                    id: 0,
                    email: '',
                    access_token: ''
                },
                addFieldData
            }}
        >
            {props.children}
        </LocalDBContext.Provider>
    );
};

export default LocalDBContextProvider;