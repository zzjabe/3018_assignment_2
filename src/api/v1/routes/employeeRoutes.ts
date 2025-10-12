import { Router, Request, Response } from "express";
import * as employeeController from "../controllers/employeeController"
import { createEmployeeSchema } from "../validators/employeeValidators"
import { validate } from "../middlewares/validateMiddleware"

const router = Router();

router.get("/", employeeController.getAllEmployees);
router.get("/byBranch", employeeController.getByBranch);
router.get("/byDepartment", employeeController.getByDepartment);
router.get("/:id", employeeController.getEmployee);

router.post("/", validate(createEmployeeSchema), employeeController.createEmployee);

router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee)

export default router;