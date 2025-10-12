import { Request, Response, NextFunction } from "express";
import * as employeeServices from "../services/employeeServices"
import { Employee } from "../models/employeeModel"
import { successResponse } from "../models/responseModel";

export const getAllEmployees = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const employees: Employee[] = await employeeServices.getAllEmployees();
        res.status(200).json(successResponse(employees));
    } catch (error) {
        next(error);
    }
};

export const getEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const id = Number(req.params.id);
        if (!id ) {
            res.status(400).json({ message: "Missing ID parameter" });
        }
        const employee: Employee | null = await employeeServices.getById(id);
        if (employee) {
            res.status(200).json(successResponse(employee));
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        next(error);
    }
}

export const createEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const created: Employee = await employeeServices.createEmployee(req.body);
        res.status(201).json(successResponse(created));
    } catch(error) {
        next(error);
    }
};

export const updateEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const updated: Employee | null = await employeeServices.updateEmployee(id, updateData);
        if (updated){
            res.status(200).json(successResponse(updated));
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

export const deleteEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const id = Number(req.params.id);
        const deleted: Employee | null = await employeeServices.deleteEmployee(id);
        if (deleted) {
            res.status(200).json(successResponse(deleted));
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

export const getByBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const branchIdRaw = req.query.branchId;
        if (!branchIdRaw ) {
            res.status(400).json({ message: "Missing branchId query parameter" });
        }
        const branchId = Number(branchIdRaw);
        const employees: Employee[] = await employeeServices.getByBranch(branchId);
        if (employees) {
            res.status(200).json(successResponse(employees));
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retriveving employee by branch",
        });
    }
};

export const getByDepartment = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const department  = req.query.department;
        if (!department) {
            res.status(400).json({ message: "Missing department query parameter" });
        }
        const dep = String(department);
        const employees: Employee[] = await employeeServices.getByDepartment(dep);
        if (employees) {
            res.status(200).json(successResponse(employees));
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retriveving employee by department",
        });
    }
};