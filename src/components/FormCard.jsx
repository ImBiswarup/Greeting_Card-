import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { Link, useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { useLocalStorageState } from '../helper/useLocalStorageState';




const FormCard = () => {
  const { user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestonesList, setMilestonesList, milestoneOptions, setFetchedImagesList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(milestoneOptions);


  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) setUser(storedUser);
  // }, [setUser]);

  // useEffect(() => {
  //   if (user) localStorage.setItem('user', user);
  // }, [user]);

  // useEffect(() => {
  //   const storedPartner = localStorage.getItem('partner');
  //   if (storedPartner) setPartner(storedPartner);
  // }, [setPartner]);

  // useEffect(() => {
  //   if (partner) localStorage.setItem('partner', partner);
  // }, [partner]);

  // useEffect(() => {
  //   const storedCouple = localStorage.getItem('couple');
  //   if (storedCouple) setCouple(storedCouple);
  // }, [setPartner]);

  // useEffect(() => {
  //   if (couple) localStorage.setItem('couple', couple);
  // }, [couple]);

  // useEffect(() => {
  //   const storedMilestoneList = JSON.parse(localStorage.getItem('milestonelist'));
  //   if (storedMilestoneList) setMilestonesList(storedMilestoneList);
  // }, [setMilestonesList]);

  // useEffect(() => {
  //   if (milestonesList.length) {
  //     localStorage.setItem('milestonelist', JSON.stringify(milestonesList));
  //   }
  // }, [milestonesList]);


  // const useLocalStorageState = (key, state, setState) => {
  //   useEffect(() => {
  //     const storedValue = localStorage.getItem(key);
  //     if (storedValue) setState(storedValue);
  //   }, [setState]);

  //   useEffect(() => {
  //     if (state) localStorage.setItem(key, state);
  //   }, [key, state]);
  // };

  useLocalStorageState('user', user, setUser);
  useLocalStorageState('partner', partner, setPartner);
  useLocalStorageState('couple', couple, setCouple);
  // useLocalStorageState('milestonesList', milestonesList, setMilestonesList);





  const handleMilestoneChange = (index, field, value) => {
    const updatedList = [...milestonesList];

    if (field === 'milestone') {
      // Find the image URL for the selected milestone
      const selectedMilestone = milestoneOptions.find(option => option.name === value);
      if (selectedMilestone) {
        updatedList[index].image = selectedMilestone.image;
        console.log(`Milestone selected: ${value}, Image URL set: ${selectedMilestone.image}`);
      } else {
        updatedList[index].image = '';
        console.log(`Milestone selected: ${value}, No image URL found.`);
      }
    }

    updatedList[index][field] = value;
    setMilestonesList(updatedList);

    console.log("Updated milestonesList:", updatedList); // Check the updated milestonesList
  };


  const handleDeleteMilestone = (index) => {
    const updatedList = milestonesList.filter((_, i) => i !== index);
    setMilestonesList(updatedList);
  };

  const addMilestone = () => {
    setMilestonesList([...milestonesList, { milestone: '', date: '', image: '' }]);
  };

  const uploadAndFetchImageURL = async (image, prefix) => {
    if (!image) return null;
    const imageRef = ref(storage, `images/${user}/${prefix}_${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  const uploadItems = async () => {
    setLoading(true);
    try {
      const [userURL, partnerURL, coupleURL] = await Promise.all([
        uploadAndFetchImageURL(userImage, "user"),
        uploadAndFetchImageURL(partnerimage, "partner"),
        uploadAndFetchImageURL(coupleimage, "couple")
      ]);
      setFetchedImagesList([userURL, partnerURL, coupleURL]);
      navigate(`/${user}`);
    } catch (error) {
      console.error("Failed to upload images:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(userImage, partnerimage, coupleimage);

  return (
    <div>
      <div className="bg-purple-200 h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className='p-2 font-bold text-2xl'>Create your Love Timeline</h1>
          {/* first box */}
          <div className="border-dashed border-2 border-black p-5 mt-2 rounded-xl w-[45%]">
            <h2 className='text-center font-bold text-xl'>Add your details</h2>
            <p><span className='text-xl'>Your name</span></p>
            <input
              className='w-full rounded bg-pink-200 h-10 pl-2'
              type="text"
              name="name"
              id="name"
              value={user}
              onChange={(e) => { setUser(e.target.value) }}
              placeholder='Enter name here' />
            <p><span className='text-xl'>Partner name</span></p>
            <input className='w-full rounded bg-pink-200 h-10 pl-2'
              type="text"
              name="partnername"
              id="partnername"
              value={partner}
              onChange={(e) => { setPartner(e.target.value) }}
              placeholder='Enter partner name here' />
            <p><span className='text-xl'>Couple Name</span> </p>
            <input
              className='w-full rounded bg-pink-200 h-10 pl-2'
              type="text"
              name="couplename"
              id="couplename"
              value={couple}
              onChange={(e) => { setCouple(e.target.value) }}
              placeholder='Enter name here' />
            <p><span className='text-xl'>Your Image </span>(recomemded aspect ratio of image 1:1)</p>
            <input
              className='w-full rounded bg-pink-200 h-10'
              type="file"
              name="image"
              id="image"
              onChange={(e) => { setUserImage(e.target.files[0]) }} />
            <p><span className='text-xl'>Partner Image</span> (recomemded aspect ratio of image 1:1)</p>
            <input
              className='w-full rounded bg-pink-200 h-10'
              type="file"
              name="partnerimage"
              id="partnerimage"
              onChange={(e) => { setPartnerimage(e.target.files[0]) }} />
            <p><span className='text-xl'>Couple Image</span> (recomemded aspect ratio of image 1:1)</p>
            <input
              className='w-full rounded bg-pink-200 h-10'
              type="file"
              name="coupleimage"
              id="coupleimage"
              onChange={(e) => { setCoupleimage(e.target.files[0]) }} />
          </div>
          {/* second box */}
          <div className="border-dashed border-2 border-black p-5 mt-5 rounded-xl w-[45%]">
            <h1 className='text-center font-bold text-xl'>Add your journey milestones</h1>

            {milestonesList.map((milestoneObj, index) => (
              <div key={index} className="flex items-center justify-between gap-x-5 mt-2">
                <div className="w-[45%]">
                  <select
                    value={milestoneObj.milestone || ""}
                    onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)}
                    className="border border-gray-300 rounded-lg w-full h-10 pl-3 bg-purple-200"
                  >
                    <option value="" disabled>Select a milestone</option>
                    {milestoneOptions.map((option, i) => (
                      <option key={i} value={option.name || option}>{option.name || option}</option>
                    ))}
                  </select>
                </div>
                <div className="w-[45%] flex items-center">
                  <input
                    type="date"
                    value={milestoneObj.date || ""}
                    onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                    className="rounded h-10 pl-3 bg-purple-200 w-full"
                  />
                  <button onClick={() => handleDeleteMilestone(index)} className="ml-2">
                    🗑️
                  </button>
                </div>
              </div>
            ))}


            <button
              className='flex mx-auto bg-purple-400 rounded mt-5 p-3 hover:bg-purple-700 transition hover:text-white text-xl font-bold'
              onClick={addMilestone}
            >
              Add Milestone
            </button>

          </div>
          {/* submit button */}
          <div className="button flex items-center justify-center my-8">
            {/* <Link to={`/${user}`}> */}
            <button
              onClick={uploadItems}
              disabled={loading}
              className='p-3 bg-purple-400 hover:bg-purple-600 rounded transition hover:text-white font-bold text-xl'>
              {loading ? 'Creating Timeline...' : 'Create Timeline'}
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
