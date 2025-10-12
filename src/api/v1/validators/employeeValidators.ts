import Joi from "joi";
import { Employee } from "../models/employeeModel";

export const createEmployeeSchema = Joi.object<Omit<Employee, "id">>({
    name: Joi.string().min(3).max(30).required(),
    position: Joi.string().min(3).max(30).required(),
    department: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(30).required(),
    branchId: Joi.number().required()
});