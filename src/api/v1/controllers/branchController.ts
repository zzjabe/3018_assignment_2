import { Request, Response, NextFunction } from "express";
import * as branchServices from "../services/branchServices"
import { Branch } from "../models/branchModel"
import { successResponse } from "../models/responseModel"

export const getAllBranches = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const branches: Branch[] = await branchServices.getAllBranches();
        res.status(200).json(successResponse(branches));
    } catch (error) {
        next(error);
    }
};

export const getBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const id = Number(req.params.id);
        const branch: Branch | null = await branchServices.getById(id);
        if (branch) {
            res.status(200).json(successResponse(branch));
        } else {
            res.status(404).json({
                message: "Branch not found"
            });
        }
    } catch (error) {
        next(error);
    }
}

export const createBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const created: Branch = await branchServices.createBranch(req.body);
        res.status(201).json(successResponse(created));
    } catch(error) {
        next(error);
    }
};

export const updateBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const updated: Branch | null = await branchServices.updateBranch(id, updateData);
        if (updated){
            res.status(200).json(successResponse(updated));
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
) =>{
    try{
        const id = Number(req.params.id);
        const deleted: Branch | null = await branchServices.deleteBranch(id);
        if (deleted) {
            res.status(200).json(successResponse(deleted));
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        next(error);
    }
};