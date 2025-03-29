import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  /* 
  ** used these state var before when we did not created context logic so now we can delete it and use context var
  const [userData, setUserData] = useState({
    name: "Joe Geller",
    image: assets.profile_pic,
    email: "joegeller@gmail.com",
    countryCode: "+91",
    phone: "9999999999",
    address: {
      line1: "345,Block-M",
      line2: "Greater kailash-1,Delhi",
    },
    gender: "Male",
    dob: "07-10-2000",
  }); */

  //use context var now
  const { userData, setUserData, token, loadUserProfileData, backendUrl } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  //function of updating user profile in database by calling api
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("countryCode", userData.countryCode);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      //if user wants to update image or not
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // List of English-speaking countries with country codes
  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States", value: "US" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+64", name: "New Zealand" },
    { code: "+353", name: "Ireland" },
    { code: "+1", name: "Canada", value: "CA" }, // Now Canada and US have unique values
    { code: "+27", name: "South Africa" },
  ];

  return (
    userData && (
      <div className="flex flex-col max-w-lg gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 border "
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            name="Name"
          />
        ) : (
          <p className="text-neutral-800 font-medium text-3xl mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 border-none h-[1px]" />

        <div>
          <p className="text-neutral-500 mt-3 underline">CONTACT DETAILS</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-secondary">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <div className="flex items-center gap-2">
                {/* Country Code Dropdown */}
                <select
                  className="bg-gray-100 p-1 rounded border max-w-25"
                  value={userData.countryCode}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      countryCode: e.target.value,
                    }))
                  }
                >
                  {countryCodes.map((country) => (
                    <option
                      key={country.value || country.code}
                      value={country.code}
                    >
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <input
                  className="bg-gray-100 p-1 rounded border max-w-40"
                  type="number"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  name="phone number"
                />
              </div>
            ) : (
              <p className="text-secondary">
                {userData.countryCode ? userData.countryCode : "+91"}{" "}
                {userData.phone}
              </p>
            )}

            <p className="font-medium">Address: </p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />

                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 mt-3 underline">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 max-w-20"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer Not To Say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Date of Birth: </p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-28"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                name="date of birth"
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all  cursor-pointer"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
