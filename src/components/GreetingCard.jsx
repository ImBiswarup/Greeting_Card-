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
            <div className="bg-pink-200 h-full w-full">
                <div className="flex flex-col items-center justify-center gap-y-5">
                    {/* top banner */}

                    <div className="flex flex-col items-center w-full bg-pink-500 py-8 rounded-full relative max-w-xl mx-auto mt-10">
                        {/* Left Image */}
                        <div className="absolute left-0 transform -translate-x-16 sm:-translate-x-20 md:-translate-x-28 lg:-translate-x-32">
                            <img
                                src={fetchedImagesList[2]}
                                alt="Profile Left"
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                        {/* Title */}
                        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center mt-12 sm:mt-0">
                            When {user} met {partner}
                        </h1>
                        {/* Right Image */}
                        <div className="absolute right-0 transform translate-x-16 sm:translate-x-20 md:translate-x-28 lg:translate-x-32">
                            <img
                                src={fetchedImagesList[1]}
                                alt="Profile Right"
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>

                    {/* middle part */}
                    {/* event 1 */}
                    {
                        milestonesList.map((item, index) => (
                            <div className='flex items-center justify-center' key={index}>
                                {
                                    index % 2 == 0 ? (
                                        <div className="first-event w-[30%] px-4">
                                            <div className="image-text flex left-0 gap-x-2">
                                                <img className='h-24 w-24 rounded-full object-fit' src={item.image}
                                                    alt="image" />
                                                <div className="flex-col items-center">
                                                    <p className='text-2xl text-red-400'>{formatDate(item.date)}</p>
                                                    <p>{item.milestone}</p>
                                                </div>
                                            </div>
                                            <div className="svg text-center px-10">
                                                <img className='w-screen h-full' src="https://loveto.greetsu.com/Vector%205.svg" alt="svg" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="second-event w-[30%] px-4" >
                                            <div className="image-text flex justify-end right-0 gap-x-2">
                                                <div className="flex-col items-center">
                                                    <p className='text-2xl text-red-400'>{formatDate(item.date)}</p>
                                                    <p>{item.milestone}</p>
                                                </div>
                                                <img className='h-24 w-24 rounded-full' src={item.image} alt="image" />
                                            </div>
                                            <div className="svg text-center px-10">
                                                <img className='w-screen h-full' src="https://loveto.greetsu.com/Vector%206.svg" alt="svg" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                    {/* couple event */}
                    {
                        milestonesList.length % 2 == 0 ? (
                            <div className="first-event w-[30%] px-4">
                                <div className={`image-text flex gap-x-3 ${milestonesList.length % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                    <img className='h-32 w-32 rounded-full' src={fetchedImagesList[0]} alt="image" />
                                    <div className="flex-col items-center">
                                        <p className='text-2xl text-red-400'>{couple}</p>
                                        <p>Loveto for life</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="first-event w-[30%] px-4">
                                <div className={`image-text flex gap-x-3 ${milestonesList.length % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                    <div className="flex-col items-center">
                                        <p className='text-2xl text-red-400'>{couple}</p>
                                        <p>Loveto for life</p>
                                    </div>
                                    <img className='h-32 w-32 rounded-full' src={fetchedImagesList[0]} alt="image" />
                                </div>

                            </div>
                        )
                    }
                    <div className="w-[40%] my-10 mx-auto">
                        <p className="text-center">share via</p>
                        <div className="share-with flex justify-center items-center gap-x-5 my-5 text-xl py-2">
                            <button
                                className="p-2 rounded-full bg-pink-400 text-black hover:bg-pink-600 hover:text-white transition"
                                onClick={sendInWhatsapp}
                            >
                                <FaWhatsapp size={30} />
                            </button>
                            <button
                                className="p-2 rounded-full bg-pink-400 text-black hover:bg-pink-600 hover:text-white transition"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast("URL copied to clipboard!");
                                }}
                            >
                                <CiShare2 size={30} />
                            </button>
                            <ToastContainer />
                        </div>
                        <div className="share-buttons flex items-center flex-col gap-y-5 text-xl">
                            <button className="w-3/4 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition">download app</button>
                            <button className="w-3/4 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition">Explore more</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default GreetingCard;
