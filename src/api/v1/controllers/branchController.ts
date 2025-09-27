import { Request, Response } from "express";
import * as branchServices from "../services/branchServices"

export const getAllBranches = (req: Request, res: Response): void =>{
    try {
        const branches = branchServices.getAllBranches();
        res.status(200).json({
        message: "Get all branches.",
        data: branches,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retriveving branches",
        })
    }
};

export const createBranch = (req: Request, res: Response): void =>{
    try {
        const newBranch = req.body;
        const created = branchServices.createBranch(newBranch);
        res.status(200).json({
            message: "Branch added",
            data: created,
        });
    } catch(error) {
        res.status(500).json({
            message: "Error cteating branch",
        });
    }
};