import { Router, Request, Response } from "express";
import * as branchController from "../controllers/branchController"
import { validate } from "../middlewares/validateMiddleware"
import { createBranchSchema, updateBranchSchema } from "../validators/branchValidators"

const router = Router();

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateBranch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranch);

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch'
 *       400:
 *         description: Invalid input
 */
router.post("/", validate(createBranchSchema), branchController.createBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBranch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBranch'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Branch not found
 */
router.put("/:id", validate(updateBranchSchema), branchController.updateBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch)

export default router;