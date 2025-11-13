import { Router, Request, Response } from "express";
import * as employeeController from "../controllers/employeeController"
import { createEmployeeSchema, updateEmployeeSchema } from "../validators/employeeValidators"
import { validate } from "../middlewares/validateMiddleware"

const router = Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /api/v1/employees/byBranch:
 *   get:
 *     summary: Retrieve employees by branch
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID to filter employees
 *     responses:
 *       200:
 *         description: Employees in the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/byBranch", employeeController.getByBranch);

/**
 * @openapi
 * /api/v1/employees/byDepartment:
 *   get:
 *     summary: Retrieve employees by department
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name to filter employees
 *     responses:
 *       200:
 *         description: Employees in the specified department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateEmployee'
 */
router.get("/byDepartment", employeeController.getByDepartment);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEmployee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployee);

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEmployee'
 *       400:
 *         description: Invalid input
 */
router.post("/", validate(createEmployeeSchema), employeeController.createEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEmployee'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Employee not found
 */
router.put("/:id", validate(updateEmployeeSchema), employeeController.updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee)

export default router;