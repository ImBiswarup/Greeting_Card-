import React from 'react';

const GreetingCard = () => {
    return (
        <>
            <div className="bg-pink-200 h-screen w-full">
                <div className="flex flex-col items-center justify-center gap-y-5">
                    {/* top banner */}

                    <div className="flex justify-center items-center w-full bg-pink-500 py-8 rounded-full relative max-w-xl mx-auto mt-10">
                        {/* Left Image */}
                        <div className="absolute left-0 transform -translate-x-6">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile Left"
                                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                        {/* Title */}
                        <h1 className="text-white text-2xl font-semibold">
                            When haha met haha
                        </h1>
                        {/* Right Image */}
                        <div className="absolute right-0 transform translate-x-6">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile Right"
                                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>


                    {/* middle part */}

                    {/* event 1 */}
                    <div className="first-event w-[30%] px-4">
                        <div className="image-text flex left-0 gap-x-2">
                            <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
                            <div className="flex-col items-center">
                                <p className='text-2xl text-red-400'>30 november 2020</p>
                                <p>When they fall in love</p>
                            </div>
                        </div>
                        <div className="svg text-center px-10">
                            <img className='w-full h-full' src="https://loveto.greetsu.com/Vector%205.svg" alt="svg" />
                        </div>
                    </div>

                    {/* event 2 */}
                    <div className="second-event w-[30%] px-4">
                        <div className="image-text flex justify-end right-0 gap-x-2">
                            <div className="flex-col items-center">
                                <p className='text-2xl text-red-400'>30 november 2020</p>
                                <p>When they fall in love</p>
                            </div>
                            <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
                        </div>
                        <div className="svg text-center px-10">
                            <img className='w-full h-full' src="https://loveto.greetsu.com/Vector%206.svg" alt="svg" />
                        </div>
                    </div>

                    {/* couple event */}
                    <div className="first-event w-[30%] px-4">
                        <div className="image-text flex left-0 gap-x-3">
                            <img className='h-24 w-24 rounded' src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg" alt="image" />
                            <div className="flex-col items-center">
                                <p className='text-2xl text-red-400'>couple name</p>
                                <p>Loveto for life</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    );
}

export default GreetingCard;
