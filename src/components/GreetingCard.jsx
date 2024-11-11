import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useLocalStorageState } from '../helper/useLocalStorageState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";



const GreetingCard = () => {

    const [fetchedImagesList, setFetchedImagesList] = useState([]);

    const { user, setUser,
        partner, setPartner,
        couple, setCouple,
        milestonesList, setMilestonesList,
        userImage,
        partnerimage,
        coupleimage,
    } = useContext(AppContext);


    useEffect(() => {
        const imageRef = ref(storage, `/images/${user}`);

        listAll(imageRef)
            .then((res) =>
                Promise.all(res.items.map((item) => getDownloadURL(item)))
            )
            .then((urls) => setFetchedImagesList(urls))
            .catch((error) => console.error("Failed to fetch images:", error));
    }, [user]);

    const sendInWhatsapp = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const whatsappWebUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`;
            window.open(whatsappWebUrl, "_blank");
        }).catch((err) => {
            console.error("Copy failed:", err);
        });
    };



    useEffect(() => {
        const storedUserImage = localStorage.getItem('userImage');
        const storedPartnerImage = localStorage.getItem('partnerimage');
        const storedCoupleImage = localStorage.getItem('coupleimage');
        const storedFetchedImagesList = localStorage.getItem('fetchedImagesList');


        if (storedUserImage) setUser(storedUserImage);
        if (storedPartnerImage) setPartner(storedPartnerImage);
        if (storedCoupleImage) setCouple(storedCoupleImage);
        if (storedFetchedImagesList) setFetchedImagesList(storedFetchedImagesList);

    }, [setUser, setPartner, setCouple, setFetchedImagesList]);


    useEffect(() => {
        if (userImage) localStorage.setItem('userImage', userImage);
    }, [userImage]);

    useEffect(() => {
        if (partnerimage) localStorage.setItem('partnerimage', partnerimage);
    }, [partnerimage]);

    useEffect(() => {
        if (coupleimage) localStorage.setItem('coupleimage', coupleimage);
    }, [coupleimage]);


    useLocalStorageState('user', user, setUser);
    useLocalStorageState('partner', partner, setPartner);
    useLocalStorageState('couple', couple, setCouple);
    useLocalStorageState('imageList', fetchedImagesList, setFetchedImagesList)


    useEffect(() => {
        const storedMilestonesList = localStorage.getItem('milestonesList');
        if (storedMilestonesList) setMilestonesList(JSON.parse(storedMilestonesList));

    }, [setMilestonesList])

    useEffect(() => {
        if (milestonesList) localStorage.setItem('milestonesList', JSON.stringify(milestonesList));
    }, [milestonesList]);


    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };



    return (
        <>
            <div className="bg-pink-200 min-h-screen w-full">
                <div className="flex flex-col items-center justify-center gap-y-5 px-4">

                    {/* Top Banner */}
                    <div className="flex flex-col items-center w-full bg-pink-500 py-8 rounded-full max-w-3xl mx-auto mt-10">
                        {/* Content Container */}
                        <div className="flex items-center justify-between w-full px-4 md:px-8">
                            {/* Left Image */}
                            <img
                                src={fetchedImagesList[2]}
                                alt="Profile Left"
                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-4 border-white object-cover"
                            />

                            {/* Title */}
                            <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center flex-grow mx-4 sm:mx-6 md:mx-8">
                                When {user} met {partner}
                            </h1>

                            {/* Right Image */}
                            <img
                                src={fetchedImagesList[1]}
                                alt="Profile Right"
                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>


                    {/* Middle Part - Events */}
                    {milestonesList.map((item, index) => (
                        <div className="flex justify-center w-full px-4 mt-8" key={index}>
                            {index % 2 === 0 ? (
                                <div className="first-event w-full md:w-[45%] px-4 mb-5">
                                    <div className="image-text flex gap-x-4 items-center">
                                        <img
                                            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full object-cover"
                                            src={item.image}
                                            alt="Milestone Image"
                                        />
                                        <div className="flex flex-col items-start">
                                            <p className="font-semibold text-lg sm:text-xl text-red-400">{formatDate(item.date)}</p>
                                            <p className="font-semibold text-sm sm:text-base">{item.milestone}</p>
                                        </div>
                                    </div>
                                    <div className="svg text-center px-5 md:px-10">
                                        <img className="w-full h-auto" src="https://loveto.greetsu.com/Vector%205.svg" alt="svg" />
                                    </div>
                                </div>
                            ) : (
                                <div className="second-event w-full md:w-[45%] px-4 mb-5">
                                    <div className="image-text flex gap-x-4 items-center justify-end">
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold text-lg sm:text-xl text-red-400">{formatDate(item.date)}</p>
                                            <p className="font-semibold text-sm sm:text-base">{item.milestone}</p>
                                        </div>
                                        <img
                                            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full object-cover"
                                            src={item.image}
                                            alt="Milestone Image"
                                        />
                                    </div>
                                    <div className="svg text-center px-5 md:px-10">
                                        <img className="w-full h-auto" src="https://loveto.greetsu.com/Vector%206.svg" alt="svg" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Couple Event */}
                    <div className="w-full max-w-xl px-4 mb-5">
                        <div className="first-event w-full md:w-[45%] px-4">
                            <div className={`image-text flex gap-x-3 ${milestonesList.length % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                {milestonesList.length % 2 === 0 ? (
                                    <>
                                        <img className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover" src={fetchedImagesList[0]} alt="Couple Image" />
                                        <div className="flex flex-col items-start">
                                            <p className=" font-semibold text-lg sm:text-xl text-red-400">{couple}</p>
                                            <p className='font-semibold'>Loveto for life</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-end">
                                            <p className="text-lg sm:text-xl text-red-400">{couple}</p>
                                            <p>Loveto for life</p>
                                        </div>
                                        <img className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover" src={fetchedImagesList[0]} alt="Couple Image" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="w-full max-w-xl px-4 my-10 mx-auto">
                        <p className="text-center text-2xl font-bold">Share Via</p>
                        <div className="share-with flex justify-center items-center gap-x-5 my-5 text-xl py-2">
                            <button
                                className="p-2 rounded-full bg-green-100 text-black hover:bg-pink-600 hover:text-white transition"
                                onClick={sendInWhatsapp}
                            >
                                <FaWhatsapp color="green" size={30} />
                            </button>
                            <button
                                className="p-2 rounded-full text-black hover:bg-pink-600 hover:text-white transition"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast("URL copied to clipboard!");
                                }}
                            >
                                <CiShare2 color="blue" size={30} />
                            </button>
                            <ToastContainer />
                        </div>
                        <div className="share-buttons flex flex-col items-center gap-y-5 text-xl">
                            <button className="w-3/4 md:w-2/3 lg:w-1/2 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition">
                               Download App
                            </button>
                            <button className="w-3/4 md:w-2/3 lg:w-1/2 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition">
                                Explore More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default GreetingCard;
