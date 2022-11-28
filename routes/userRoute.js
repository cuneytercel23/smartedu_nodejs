import  express  from "express";
import {body} from "express-validator";
import * as authController from "../controllers/authController.js";
import { checkUser } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(checkUser,authController.getDashboardPage);
router.route("/:id").delete(authController.deleteUser);

export default router;