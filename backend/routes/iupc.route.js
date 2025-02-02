import { Router } from "express";
import { getIUPCs, addIUPC } from "../controllers/iupc.controller.js";

const iupcRouter = Router();
iupcRouter.route("/get-iupc").get(getIUPCs);
iupcRouter.route("/add-iupc").post(addIUPC);

export default iupcRouter;
// prettier-ignore
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   changeCurrentPassword,
//   getCurrentUser,
//   updateAccountDetails,
//   updateUserAvatar,
// } from "../controllers/users.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const userRouter = Router();

// userRouter.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );

// userRouter.route("/login").post(loginUser);

// userRouter.route("/logout").post(verifyJWT, logoutUser);

// userRouter.route("/refreshAcessToken").post(refreshAccessToken);

// userRouter.route("/changePassword").patch(verifyJWT, changeCurrentPassword);

// userRouter
//   .route("/updateAccountDetails")
//   .patch(verifyJWT, updateAccountDetails);

// userRouter.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

// userRouter
//   .route("/updateAvatar")
//   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// export default userRouter;
