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
        });
    }
};

export const getEmployee = (req: Request, res: Response): void =>{
    try{
        const id = Number(req.params.id);
        const employee = employeeServices.getById(id);
        if (employee) {
            res.status(200).json({
                message: "Get employee",
                data: employee,
            });
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retriveving employee",
        });
    }
}

export const createEmployee = (req: Request, res: Response): void =>{
    try {
        const { name, position, department, email, phone, branchId } = req.body;
        if (!name || !position || !department || !email || !phone || !branchId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const created = employeeServices.createEmployee(req.body);
        res.status(201).json({
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
            });
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
            });
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