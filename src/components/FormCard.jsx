import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { Link, useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';



const FormCard = () => {
  const { user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestonesList, setMilestonesList, milestoneOptions, setFetchedImagesList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadAndFetchImageURL = async (image, path) => {
    if (!image) return null;
    const imageRef = ref(storage, `${path}/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };


  const handleMilestoneChange = (index, field, value) => {
    const updatedList = [...milestonesList];
    updatedList[index][field] = value;
    setMilestonesList(updatedList);
  };

  const handleDeleteMilestone = (index) => {
    const updatedList = milestonesList.filter((_, i) => i !== index);
    setMilestonesList(updatedList);
  };

  const addMilestone = () => {
    setMilestonesList([...milestonesList, { milestone: '', date: '' }]);
  };

  const uploadUserImage = () => {
    if (!userImage) return;

    const userImageRef = ref(storage, `images/${user}/${userImage.name + v4()}}`);
    uploadBytes(userImageRef, userImage)
      .then(() => alert('user image uploaded'))
  }
  const uploadPartnerImage = () => {
    if (!partnerimage) return;

    const partnerImageRef = ref(storage, `images/${partnerimage.name + v4()}}`);
    uploadBytes(partnerImageRef, userImage)
      .then(() => alert('partner image uploaded'))
  }
  const uploadCoupleImage = () => {
    if (!coupleimage) return;

    const coupleImageRef = ref(storage, `images/${coupleimage.name + v4()}}`);
    uploadBytes(coupleImageRef, userImage)
      .then(() => alert('couple image uploaded'))
  }

  const uploadItems = async () => {
    setLoading(true);
    const userURL = await uploadAndFetchImageURL(userImage, `images/${user}`);
    const partnerURL = await uploadAndFetchImageURL(partnerimage, `images/${partner}`);
    const coupleURL = await uploadAndFetchImageURL(coupleimage, `images/${couple}`);

    setFetchedImagesList([userURL, partnerURL, coupleURL]);
    setLoading(false);
    navigate(`/${user}`);
  };

  // console.log(user, partner, couple, milestone, milestonesList);
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
                    value={milestoneObj.milestone}
                    onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)}
                    className="border border-gray-300 rounded-lg w-full h-10 pl-3 bg-purple-200"
                  >
                    <option value="" disabled>Select a milestone</option>
                    {milestoneOptions.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="w-[45%] flex items-center">
                  <input
                    type="date"
                    value={milestoneObj.date}
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
