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
            name: 'Went to a Movie',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569084/went_to_a_movie_pe1s3y.svg'
        },
        {
            name: 'Went to a Long Drive',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569084/went_to_a_long_drive_ww6aiw.svg'
        },
        {
            name: 'Not a Good Time',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569083/not_good_time_a5lcjn.svg'
        },
        {
            name: 'Very Bad Time',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/very_bad_time_rykma6.svg'
        },
        {
            name: 'Night Out',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/night_out_qqoz3n.svg'
        },
        {
            name: 'Long Drive',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/long_drive_epemob.svg'
        },
        {
            name: 'Start Talking',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/start_talking_fgnjho.svg'
        },
        {
            name: 'Madly in Love',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/madly_in_love_itcizc.svg'
        },
        {
            name: 'Find Each Other',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569082/finds_each_other_o5a9fv.svg'
        },
        {
            name: 'First Date',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569088/first_date_uzt2zk.svg'
        },
        {
            name: 'First Kiss',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569087/first_kiss_ntyc3v.svg'
        },
        {
            name: 'First Trip',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569087/first_trip_ii9wcb.svg'
        },
        {
            name: 'First Time Away',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569087/first_trip_ii9wcb.svg'
        },
        {
            name: 'Went on a Date',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569087/went_to_a_date_h9tlee.svg'
        },
        {
            name: 'Deeply in Love',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569087/deeply_in_love_btt7ix.svg'
        },
        {
            name: 'Drive with Partner',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569086/drive_with_partner_umwem5.svg'
        },
        {
            name: 'Meet First Time',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569085/met_first_time_a2ho2h.svg'
        },
        {
            name: 'Fall in Love',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569085/fall_in_love_efwjst.svg'
        },
        {
            name: 'Nice Date',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569084/nice_data_uh2vvy.svg'
        },
        {
            name: 'Movie Plan',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569084/movie_plan_lc1exh.svg'
        },
        {
            name: 'Married',
            image: 'https://res.cloudinary.com/djrdw0sqz/image/upload/v1730569084/married_vnwqx3.svg'
        }
    ];




    return (
        <AppContext.Provider value={{ user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestonesList, setMilestonesList, milestoneOptions, fetchedImagesList, setFetchedImagesList }}>
            {children}
        </AppContext.Provider>
    );
};
