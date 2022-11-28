import  express  from "express";
import * as categoryController from "../controllers/categoryController.js";


const router = express.Router();

router.route("/").post(categoryController.createCategory);
router.route("/").delete(categoryController.deleteCategory);

export default router;