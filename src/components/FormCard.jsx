import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { useLocalStorageState } from '../helper/useLocalStorageState';
import { CustomDropdown } from './CustomDropdown'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormCard = () => {
  const { user, setUser, partner, setPartner, couple, setCouple, userImage, setUserImage, partnerimage, setPartnerimage, coupleimage, setCoupleimage, milestonesList, setMilestonesList, milestoneOptions, setFetchedImagesList, fetchedImagesList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = milestoneOptions
    .filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));


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




  const handleMilestoneChange = (index, field, value) => {
    const updatedList = [...milestonesList];

    if (field === 'milestone') {
      const selectedMilestone = milestoneOptions.find(option => option.name === value);
      if (selectedMilestone) {
        updatedList[index].image = selectedMilestone.image;
      } else {
        updatedList[index].image = '';
      }
    }

    updatedList[index][field] = value;
    setMilestonesList(updatedList);

  };


  const handleDeleteMilestone = (index) => {
    const updatedList = milestonesList.filter((_, i) => i !== index);
    setMilestonesList(updatedList);

    if (updatedList.length <= 2) {
      toast("Atleast 2 Milestones is required")
    }
    return updatedList;
  };

  const addMilestone = () => {
    setMilestonesList((prevList) => {
      const updatedList = [...prevList, { milestone: '', date: '', image: '' }];

      if (updatedList.length === 10) {
        toast("You have added 10 milestones!");
      }

      return updatedList;
    });
  };

  const uploadAndFetchImageURL = async (image, prefix) => {
    if (!image) return null;
    const imageRef = ref(storage, `images/${user}/${prefix}_${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  const uploadItems = async () => {
    setLoading(true);
    // if (!user || !partner || !userImage || !partnerimage) {
    //   toast("No data specified!!!")
    // }
    if (!user || !partner) {
      toast("No username or partner name specified");
    }
    else if (!userImage || !partnerimage) {
      toast("no user image and partner image specified")
    }
    try {
      const [userURL, partnerURL, coupleURL] = await Promise.all([
        uploadAndFetchImageURL(userImage, "user"),
        uploadAndFetchImageURL(partnerimage, "partner"),
        uploadAndFetchImageURL(coupleimage, "couple")
      ]);
      setFetchedImagesList([userURL, partnerURL, coupleURL]);
      if (user && userImage && partner && partnerimage) {
        navigate(`/${user}`);
      }
    } catch (error) {
      console.error("Failed to upload images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // localStorage.removeItem('user');
    // localStorage.removeItem('partner');
    // localStorage.removeItem('couple');
    // localStorage.removeItem('milestonesList');
    setUser("");
    setPartner("");
    setCouple("");
    setMilestonesList([{ milestone: '', date: '', image: '' }]);
  }, []);


  return (
    <div>
      <div className="bg-purple-200 h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className='p-2 font-bold text-2xl'>Create your Love Timeline</h1>
          {/* first box */}
          <div className="border-dashed border-2 border-black p-5 mt-2 rounded-xl w-full sm:w-[65%]">
            <h2 className='text-center font-bold text-xl'>Add your details</h2>
            <p><span className='text-xl'>Your name</span></p>
            <input
              className='w-full rounded bg-transparent focus:bg-purple-300 h-12 pl-2'
              type="text"
              name="name"
              id="name"
              value={user}
              onChange={(e) => { setUser(e.target.value) }}
              placeholder='Ex: virat Kohli' />
            <p><span className='text-xl'>Partner name</span></p>
            <input
              className='w-full rounded bg-transparent focus:bg-purple-300 h-12 pl-2'
              type="text"
              name="partnername"
              id="partnername"
              value={partner}
              onChange={(e) => { setPartner(e.target.value) }}
              placeholder='Ex: Anushka Sharma' />
            <p><span className='text-xl'>Couple Name<span className="text-gray-500">(Optional)</span></span> </p>
            <input
              className='w-full rounded bg-transparent focus:bg-purple-300 h-12 pl-2'
              type="text"
              name="couplename"
              id="couplename"
              value={couple}
              onChange={(e) => { setCouple(e.target.value) }}
              placeholder='Ex: Virushka' />
            <div className="mt-4">
              <label className="block text-lg font-medium mb-2">
                Your Image <span className="text-gray-500">(recommended aspect ratio of image 1:1)</span>
              </label>
              <label className="flex items-center justify-between w-full h-12 px-4 rounded-lg border-dashed border-2 border-purple-400 bg-purple-200 text-gray-700 cursor-pointer hover:bg-purple-300 transition">
                <span>{userImage ? userImage.name : "No file chosen"}</span>
                <span>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setUserImage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-lg font-medium mb-2">
                Partner Image <span className="text-gray-500">(recommended aspect ratio of image 1:1)</span>
              </label>
              <label className="flex items-center justify-between w-full h-12 px-4 rounded-lg border-dashed border-2 border-purple-400 bg-purple-200 text-gray-700 cursor-pointer hover:bg-purple-300 transition">
                <span>{partnerimage ? partnerimage.name : "No file chosen"}</span>
                <span>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setPartnerimage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-lg font-medium mb-2">
                Couple Image <span className="text-gray-500">(Optional)</span>
              </label>
              <label className="flex items-center justify-between w-full h-12 px-4 rounded-lg border-dashed border-2 border-purple-400 bg-purple-200 text-gray-700 cursor-pointer hover:bg-purple-300 transition">
                <span>{coupleimage ? coupleimage.name : "No file chosen"}</span>
                <span>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setCoupleimage(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          {/* second box */}
          <div className="border-dashed border-2 border-black p-5 mt-5 rounded-xl w-full sm:w-[65%]">
            <h1 className='text-center font-bold text-xl'>Add your journey milestones</h1>

            {milestonesList.map((milestoneObj, index) => (
              <div key={index} className="flex items-center justify-between gap-x-5 mt-2">
                <div className="w-[45%]">
                  <CustomDropdown
                    options={milestoneOptions.sort((a, b) => a.name.localeCompare(b.name))}
                    selectedOption={milestoneObj.milestone}
                    onSelect={(value) => handleMilestoneChange(index, 'milestone', value)}
                  />
                </div>

                <div className="w-[45%] flex items-center">
                  <input
                    type="date"
                    value={milestoneObj.date || ""}
                    onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                    className="rounded h-10 pl-3 bg-purple-200 w-full"
                  />
                  <button onClick={() => handleDeleteMilestone(index)} className={`ml-2 ${milestonesList.length >= 3 ? "" : "hidden"}`}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            <button
              className={`flex mx-auto bg-purple-400 rounded mt-5 p-3 hover:bg-purple-700 transition hover:text-white text-xl font-bold  ${milestonesList.length >= 10 ? "hidden" : ""}`}
              onClick={addMilestone}
            >
              Add Milestone
            </button>
            <ToastContainer />
          </div>


          {/* submit button */}
          <div className={`button flex items-center justify-center my-8`}>
            <button
              onClick={uploadItems}
              disabled={loading}
              className={`p-3 bg-purple-400 hover:bg-purple-600 rounded transition hover:text-white font-bold text-xl`}>
              {loading ? 'Creating Timeline...' : 'Create Timeline'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
