import Joi from "joi";
import { Branch } from "../models/branchModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: Branch name
 *           example: "Vancouver Branch"
 *         address:
 *           type: string
 *           description: Branch address
 *           example: "1300 Burrard St, Vancouver, BC, V6Z 2C7"
 *         phone:
 *           type: string
 *           description: Branch contact phone number
 *           example: "604-456-0022"
 */
export const createBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(1).max(30).required(),
    address: Joi.string().min(1).max(300).required(),
    phone: Joi.string().min(1).max(30).required()
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Branch name
 *           example: "Vancouver Branch"
 *         address:
 *           type: string
 *           description: Branch address
 *           example: "1300 Burrard St, Vancouver, BC, V6Z 2C7"
 *         phone:
 *           type: string
 *           description: Branch contact phone number
 *           example: "604-456-0022"
 */
export const updateBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(1).max(30).optional(),
    address: Joi.string().min(1).max(300).optional(),
    phone: Joi.string().min(1).max(30).optional()
});