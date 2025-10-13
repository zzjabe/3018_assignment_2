import { Router, Request, Response } from "express";
import * as branchController from "../controllers/branchController"
import { validate } from "../middlewares/validateMiddleware"
import { createBranchSchema, updateBranchSchema } from "../validators/branchValidators"

const router = Router();

router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranch);

router.post("/", validate(createBranchSchema), branchController.createBranch);

router.put("/:id", validate(updateBranchSchema), branchController.updateBranch);

router.delete("/:id", branchController.deleteBranch)

export default router;