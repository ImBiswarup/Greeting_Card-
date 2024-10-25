import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';


const FormCard = () => {
  const { user } = useContext(AppContext)

  console.log(user);
  return (
    <div>
      <div className="bg-purple-200 h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className='p-2 font-bold text-2xl'>Create your Love Timeline</h1>
          {/* first box */}
          <div className="border-dashed border-2 border-black p-5 mt-2 rounded-xl w-[54%]">
            <h2 className='text-center font-bold text-xl'>Add your details</h2>
            <p><span className='text-xl'>Your name</span></p>
            <input className='w-full rounded bg-pink-200 h-10' type="text" name="name" id="name" placeholder='Enter name here' />
            <p><span className='text-xl'>Partner name</span></p>
            <input className='w-full rounded bg-pink-200 h-10' type="text" name="partnername" id="partnername" placeholder='Enter partner name here' />
            <p><span className='text-xl'>Couple Name</span> </p>
            <input className='w-full rounded bg-pink-200 h-10' type="text" name="couplename" id="couplename" placeholder='Enter name here' />
            <p><span className='text-xl'>Your Image </span>(recomemded aspect ratio of image 1:1)</p>
            <input className='w-full rounded bg-pink-200 h-10' type="file" name="image" id="image" />
            <p><span className='text-xl'>Partner Image</span> (recomemded aspect ratio of image 1:1)</p>
            <input className='w-full rounded bg-pink-200 h-10' type="file" name="partnerimage" id="partnerimage" />
            <p><span className='text-xl'>Couple Image</span> (recomemded aspect ratio of image 1:1)</p>
            <input className='w-full rounded bg-pink-200 h-10' type="file" name="coupleimage" id="coupleimage" />
          </div>
          {/* second box */}
          <div className="border-dashed border-2 border-black p-5 mt-5 rounded-xl">
            <h1 className='text-center font-bold text-xl'>Add your journey milestone</h1>
            <div className="flex gap-x-3 mt-2">
              <div className="">
                <label htmlFor="milestone" className="text-xl">Milestone</label>
                <select name="milestone" id="milestone" className="border border-gray-300 rounded-lg w-full">
                  <option value="" disabled selected>Select a milestone</option>

                  <option value="first meet">first meet</option>
                  <option value="fall in love">fall in love</option>
                  <option value="first date">first date</option>
                  <option value="deep love">deep love</option>
                </select>
              </div>

              <div className="">
                <p className='txl'>date of milestone 1</p>
                <input className='rounded' type="date" name="date" id="date" placeholder='dd-mm-yyyy' />
              </div>
            </div>
            <button className='flex mx-auto bg-purple-400 rounded mt-5 p-3 hover:bg-purple-700 transition hover:text-white text-xl font-bold'>Add milestone</button>
          </div>
          {/* submit button */}
          <div className="button flex items-center justify-center my-8">
          <button className='p-3 bg-purple-400 hover:bg-purple-600 rounded transition hover:text-white font-bold text-xl'>Create Timeline</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
