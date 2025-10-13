import Joi from "joi";
import { Employee } from "../models/employeeModel";

export const createEmployeeSchema = Joi.object<Omit<Employee, "id">>({
    name: Joi.string().min(3).max(30).required(),
    position: Joi.string().min(3).max(300).required(),
    department: Joi.string().min(1).max(30).optional(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(30).optional(),
    branchId: Joi.number().required()
});

export const updateEmployeeSchema = Joi.object<Omit<Employee, "id">>({
    name: Joi.string().min(3).max(30).optional(),
    position: Joi.string().min(3).max(300).optional(),
    department: Joi.string().min(1).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(3).max(30).optional(),
    branchId: Joi.number().optional()
});