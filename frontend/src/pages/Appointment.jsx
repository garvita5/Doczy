import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]); //setting previous slots to empty(clearing)

    //getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedtime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        //removing slots that are booked
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedtime;

        //checking if it is already in doc info slots booked array and do not push in timeslots arrat
        const isSlotAvailable =
          docInfo &&
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        //check if slot is avialable then only put in array
        if (isSlotAvailable) {
          //adding slots to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedtime,
          });
        }

        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]); //[] for array {} for objects
    }
  };

  //book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth() + 1; // ye 0 se shruu hota h we want 1 for ja so + 1
      const year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* ------------- doctor details-------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ----------doc info:name, degree,experience-------- */}
            <p className="flex items-center text-2xl font-medium gap-2 text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} />
            </p>

            <div className="flex items-center text-sm mt-1 gap-2 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              {/*-----------doctor about --------- */}
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} />{" "}
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4 ">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*--------booking slots------- */}
        <div className="sm:ml-74 sm:pl-4 mt-4 font-medium text-gray-600">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {docSlots.length > 0 &&
              docSlots.map(
                (item, index) =>
                  item.length > 0 && ( // Ensure item is not an empty array
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index
                          ? "bg-primary text-white "
                          : "border border-gray-200"
                      }`}
                      key={index}
                    >
                      <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p>{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  )
              )}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer 
                     ${
                       item.time === slotTime
                         ? "bg-primary text-white"
                         : "text-gray-400 border border-gray-300"
                     }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="items-center bg-primary text-sm text-white font-light px-14 py-3 rounded-full my-6 cursor-pointer"
          >
            Book Your Appointment
          </button>
        </div>

        {/*----listing related doctors----- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
