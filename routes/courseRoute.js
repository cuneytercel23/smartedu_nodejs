import  express  from "express";
import * as courseController from "../controllers/courseController.js";
import { checkRoles } from "../middlewares/roleMiddleware.js";



const router = express.Router();
// /courses
router.route("/").post(checkRoles(["teacher", "admin"]),courseController.createCourse); // Senin yetkin teacher ve adminse sen kurs oluşturabilirsin.
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getACourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);
router.route("/:slug").delete(courseController.deleteCourse);
router.route("/:slug").patch(courseController.updateCourse);



export default router;