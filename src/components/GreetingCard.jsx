import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';


const GreetingCard = () => {
    const { user, partner, couple, milestonesList } = useContext(AppContext)

    console.log(user);

    const [userFetchedImage, setUserFetchedImage] = useState([]);
    const [partnerFetchedImage, setPartnerFetchedImage] = useState([]);
    const [coupleFetchedImage, setCoupleFetchedImage] = useState([]);

    const [fetchedImagesList, setFetchedImagesList] = useState([]);

    const userRef = ref(storage, `/images/${user}/`)
    const partnerRef = ref(storage, `/images/${partner}/`)
    const coupleRef = ref(storage, `/images/${couple}/`)

    const imageRef = ref(storage, `/images/`)

    useEffect(() => {
        listAll(imageRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setFetchedImagesList((prev) => [...prev, url]);
                });
            });
        });
        listAll(userRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setUserFetchedImage((prev) => [...prev, url]);
                });
            });
        });
        listAll(partnerRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setPartnerFetchedImage((prev) => [...prev, url]);
                });
            });
        });
        listAll(coupleRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setCoupleFetchedImage((prev) => [...prev, url]);
                });
            });
        });

        console.log(userFetchedImage, partnerFetchedImage, coupleFetchedImage);
    }, []);

    return (
        <>
            <div className="bg-pink-200 h-full w-full">
                <div className="flex flex-col items-center justify-center gap-y-5">
                    {/* top banner */}


                    <div className="flex justify-center items-center w-full bg-pink-500 py-8 rounded-full relative max-w-xl mx-auto mt-10">
                        {/* Left Image */}
                        <div className="absolute left-0 transform -translate-x-6">
                            <img
                                src={fetchedImagesList[0]}
                                alt="Profile Left"
                                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                        {/* Title */}
                        <h1 className="text-white text-2xl font-semibold">
                            When {user} met {partner}
                        </h1>
                        {/* Right Image */}
                        <div className="absolute right-0 transform translate-x-6">
                            <img
                                src={fetchedImagesList[1]}
                                alt="Profile Right"
                                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>



                    {/* middle part */}

                    {/* event 1 */}
                    {
                        milestonesList.map((item, index) => (
                            <>
                                {
                                    index % 2 == 0 ? (
                                        <div className="first-event w-[30%] px-4">
                                            <div className="image-text flex left-0 gap-x-2">
                                                <img className='h-24 w-24 rounded' src={fetchedImagesList[2]}
                                                    alt="image" />
                                                <div className="flex-col items-center">
                                                    <p className='text-2xl text-red-400'>{item.date}</p>
                                                    <p>{item.milestone}</p>
                                                </div>
                                            </div>
                                            <div className="svg text-center px-10">
                                                <img className='w-full h-full' src="https://loveto.greetsu.com/Vector%205.svg" alt="svg" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div div className="second-event w-[30%] px-4" >
                                            <div className="image-text flex justify-end right-0 gap-x-2">
                                                <div className="flex-col items-center">
                                                    <p className='text-2xl text-red-400'>{item.date}</p>
                                                    <p>{item.milestone}</p>
                                                </div>
                                                <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
                                            </div>
                                            <div className="svg text-center px-10">
                                                <img className={`w-full h-full`} src="https://loveto.greetsu.com/Vector%206.svg" alt="svg" />
                                            </div>
                                        </div>
                                    )
                                }


                            </>
                        ))
                    }

                    {/* couple event */}
                    {
                        milestonesList.length % 2 == 0 ? (
                            <div className="first-event w-[30%] px-4">
                                <div className={`image-text flex gap-x-3 ${milestonesList.length % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                    <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
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
                                    <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
                                </div>

                            </div>
                        )
                    }
                    <div className="w-[40%] my-10">
                        <p>share via</p>
                        <div className="share-with flex justify-evenly my-5 text-xl">
                            <button className='p-2 rounded-full bg-pink-400 text-black hover:bg-pink-600 hover:text-white transition'>whatsapp</button>
                            <button className='p-2 rounded-full bg-pink-400 text-black hover:bg-pink-600 hover:text-white transition'>link</button>
                        </div>
                        <div className="share-buttons flex items-center flex-col gap-y-5 text-xl">
                            <button className='w-3/4 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition'>download app</button>
                            <button className='w-3/4 hover:bg-transparent hover:text-black rounded h-10 bg-black text-white transition'>Explore more</button>
                        </div>
                    </div>
                </div>
            </div >

        </>

    );
}

export default GreetingCard;
