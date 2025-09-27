import { Request, Response } from "express";
import * as employeeServices from "../services/employeeServices"

export const getAllEmployee = (req: Request, res: Response): void =>{
    const employees = employeeServices.getAllEmployees;
    res.status(200).json({
        message: "Get all employees.",
        data: employees,
    });
};

export const createEmployee = (req: Request, res: Response): void =>{
    const newEmployee = req.body;
    const createEmployee = employeeServices.createEmployee(newEmployee);
    res.json({
        message: "Employee added",
        data: createEmployee,
    })
};
    