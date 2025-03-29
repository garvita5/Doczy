import express from "express";
import {
  appointmentsDoctor,
  doctorList,
  doctorLogin,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  updateDoctorProfile,
  profileData,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/doctor-dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/doctor-profile", authDoctor, profileData);
doctorRouter.post("/update-doctor-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
