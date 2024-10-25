import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState("biswa");
    const [partner, setPartner] = useState('');
    const [couple, setCouple] = useState('');
    const [userImage, setUserImage] = useState(null);
    const [partnerimage, setPartnerimage] = useState(null);
    const [coupleimage, setCoupleimage] = useState(null);


    return (
        <AppContext.Provider value={{ user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage }}>
            {children}
        </AppContext.Provider>
    );
};
