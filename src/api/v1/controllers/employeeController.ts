import { Request, Response } from "express";
import * as employeeServices from "../services/employeeServices"

export const getAllEmployees = (req: Request, res: Response): void =>{
    try {
        const employees = employeeServices.getAllEmployees();
        res.status(200).json({
        message: "Get all employees.",
        data: employees,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retriveving employees",
        })
    }
};

export const createEmployee = (req: Request, res: Response): void =>{
    try {
        const newEmployee = req.body;
        const created = employeeServices.createEmployee(newEmployee);
        res.status(200).json({
            message: "Employee added",
            data: created,
        });
    } catch(error) {
        res.status(500).json({
            message: "Error cteating employee",
        });
    }
};

export const updateEmployee = (req: Request, res: Response): void =>{
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const updated = employeeServices.updateEmployee(id, updateData);
        if (updated){
            res.status(200).json({
            message: "Employee updated",
            data: updated,
            });
        } else {
            res.status(404).json({
                message: "Employee not found",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating employee",
        });
    }
};

export const deleteEmployee = (req: Request, res: Response): void =>{
    try{
        const id = Number(req.params.id);
        const deleted = employeeServices.deleteEmployee(id);
        if (deleted) {
            res.status(200).json({
                message: "Employee deleted",
                data: deleted,
            })
        } else {
            res.status(404).json({
                message: "Employee not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting employee",
        });
    }
};