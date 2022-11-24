import  express  from "express";
import * as courseController from "../controllers/courseController.js";


const router = express.Router();

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getACourse);

export default router;