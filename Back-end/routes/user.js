import express from 'express';
import { changePassword,updateProfile, getMyProfile,logOut, login,signup, updatePic, forgetPassword, resetPassword } from '../controllers/user.js';
import { isAuthenticated } from '../middleware/auth.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.post("/login",login);
router.post("/new",singleUpload, signup);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/logout",isAuthenticated,logOut);
// update route
router.put("/updateprofile",isAuthenticated,updateProfile);
router.put("/changepassword",isAuthenticated,changePassword);
router.put("/updatepic",isAuthenticated,singleUpload,updatePic);

// forget and reset password and email
router.route("/forgetpassword").post(forgetPassword).put(resetPassword);

export default router;