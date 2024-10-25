import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [partner, setPartner] = useState('');
    const [couple, setCouple] = useState('');
    const [userImage, setUserImage] = useState('');
    const [partnerimage, setPartnerimage] = useState('');
    const [coupleimage, setCoupleimage] = useState('');
    const [milestone, setMilestone] = useState([]);
    const [milestoneDate, setMilestoneDate] = useState([]);
    const [milestonesList, setMilestonesList] = useState([]);

    const milestoneOptions = [
        'First Meet', 
        'Fall in Love', 
        'First Date', 
        'Deep Love'
    ];


    return (
        <AppContext.Provider value={{ user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestone, setMilestone, milestoneDate, setMilestoneDate, milestonesList, setMilestonesList, milestoneOptions }}>
            {children}
        </AppContext.Provider>
    );
};
