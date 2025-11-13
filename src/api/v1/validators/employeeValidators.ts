import Joi from "joi";
import { Employee } from "../models/employeeModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmployee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - email
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           description: Employee full name
 *           example: "Alice Johnson"
 *         position:
 *           type: string
 *           description: Job title or position
 *           example: "Branch Manager"
 *         department:
 *           type: string
 *           description: Department name
 *           example: "Management"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "alice.johnson@pixell-river.com"
 *         phone:
 *           type: string
 *           description: Contact phone number
 *           example: "604-555-0148"
 *         branchId:
 *           type: integer
 *           description: Related branch ID
 *           example: 1
 */
export const createEmployeeSchema = Joi.object<Omit<Employee, "id">>({
    name: Joi.string().min(3).max(30).required(),
    position: Joi.string().min(3).max(300).required(),
    department: Joi.string().min(1).max(30).optional(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(30).optional(),
    branchId: Joi.number().required()
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateEmployee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Employee full name
 *           example: "Alice Johnson"
 *         position:
 *           type: string
 *           description: Job title or position
 *           example: "Branch Manager"
 *         department:
 *           type: string
 *           description: Department name
 *           example: "Management"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "alice.johnson@pixell-river.com"
 *         phone:
 *           type: string
 *           description: Contact phone number
 *           example: "604-555-0148"
 *         branchId:
 *           type: integer
 *           description: Related branch ID
 *           example: 1
 */
export const updateEmployeeSchema = Joi.object<Omit<Employee, "id">>({
    name: Joi.string().min(3).max(30).optional(),
    position: Joi.string().min(3).max(300).optional(),
    department: Joi.string().min(1).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(3).max(30).optional(),
    branchId: Joi.number().optional()
});