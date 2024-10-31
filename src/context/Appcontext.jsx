import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [partner, setPartner] = useState('');
    const [couple, setCouple] = useState('');
    const [userImage, setUserImage] = useState('');
    const [partnerimage, setPartnerimage] = useState('');
    const [coupleimage, setCoupleimage] = useState('');
    // const [milestone, setMilestone] = useState([]);
    // const [milestoneDate, setMilestoneDate] = useState([]);
    const [milestonesList, setMilestonesList] = useState([]);
    const [fetchedImagesList, setFetchedImagesList] = useState([]);



    const milestoneOptions = [
        {
            name: 'First Meet',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
        },
        {
            name: 'Fall in Love',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
        },
        {
            name: 'First Date',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
        },
        {
            name: 'Deep Love',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
        }
    ];



    return (
        <AppContext.Provider value={{ user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestonesList, setMilestonesList, milestoneOptions, fetchedImagesList, setFetchedImagesList }}>
            {children}
        </AppContext.Provider>
    );
};
