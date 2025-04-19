import {Router} from "express";
const router = Router();
import { register,login } from "../controllers/userController.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_activity");
router.route("/get_activity");
export default router;