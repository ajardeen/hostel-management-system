import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const RoomForm = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("Shared");
  const [capacity, setCapacity] = useState("");
  const [occupied, setOccupied] = useState(0);
  const [availabilityStatus, setAvailabilityStatus] = useState(
    "Select Availability"
  );
  const [features, setFeatures] = useState({ AC: false, WIFI: true });
  const [preferences, setPreferences] = useState("");
  const [roomfees, setRoomfees] = useState("");

  //api url
  const admin_api = import.meta.env.VITE_ADMIN_API_URL;
  useEffect(() => {
    console.log("Capacity:", capacity);
    console.log("Occupied:", occupied);
    
  }, [occupied, capacity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomNumber, capacity, occupied, availabilityStatus, type);
   
    if (availabilityStatus === "Select Availability") {
      alert("Please select availability status");
      return;
    }
    const roomData = {
      roomNumber,
      type,
      capacity,
      occupied,
      availabilityStatus,
      features,
      preferences,
      roomfees,
    };
    console.log("Room Data:", roomData);
    // Handle form submission to login user
    try {
      await axios
        .post(admin_api + "/createroom", roomData)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    setRoomNumber("");
    setType("");
    setCapacity("");
    setOccupied("");
    setAvailabilityStatus("Available");
    setFeatures({ AC: false, WIFI: true });
    setPreferences("");
    setRoomfees("");
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#333] mb-4 uppercase">
        Add Room
      </h2>
      <hr />
      <form
        className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6"
        onSubmit={handleSubmit}
      >
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="eg.A101"
              required
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Type
            </label>
            <select
              name="type"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Shared">Shared</option>
            </select>
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={capacity}
              min={0}
              required
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="eg.2 or 4"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Occupied
            </label>
            <input
              type="number"
              name="occupied"
              min={0}
              value={occupied}
              required
              disabled
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setOccupied(newValue <= capacity ? newValue : capacity);
              }}
              placeholder="eg.0 or 1"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Availability Status
            </label>
            <select
              name="availabilityStatus"
              value={availabilityStatus}
              required
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            >
              <option value="Select Availability">Select Availability</option>
              {capacity > occupied || !capacity ? (
                <option value="Available">Available</option>
              ) : null}
              <option value="Occupied">Occupied</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Preferences
            </label>
            <input
              type="text"
              name="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Enter room preferences"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0">
              Room Fees ₹
            </label>
            <input
              type="number"
              name="roomfees"
              value={roomfees}
              min={1}
              onChange={(e) => setRoomfees(e.target.value)}
              placeholder="Enter your room fees ₹"
              required
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px]  top-[10px] left-0 mr-10">
              Features
            </label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="AC"
                  checked={features.AC}
                  onChange={() =>
                    setFeatures({ ...features, AC: !features.AC })
                  }
                  className="mr-2"
                />
                AC
              </label>
              <label>
                <input
                  type="checkbox"
                  name="WIFI"
                  checked={features.WIFI}
                  onChange={() =>
                    setFeatures({ ...features, WIFI: !features.WIFI })
                  }
                  className="mr-2"
                />
                WIFI
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 px-2 py-2.5 w-full rounded-sm text-sm bg-[#333] hover:bg-[#222] text-white"
        >
          Submit
        </button>
        <ToastContainer />
      </form>
    </>
  );
};

export default RoomForm;