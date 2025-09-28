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
        });
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

export const updateBranch = (req: Request, res: Response): void =>{
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const updated = branchServices.updateBranch(id, updateData);
        if (updated){
            res.status(200).json({
            message: "Branch updated",
            data: updated,
            });
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating branch",
        });
    }
};

export const deleteBranch = (req: Request, res: Response): void =>{
    try{
        const id = Number(req.params.id);
        const deleted = branchServices.deleteBranch(id);
        if (deleted) {
            res.status(200).json({
                message: "Branch deleted",
                data: deleted,
            });
        } else {
            res.status(404).json({
                message: "Branch not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting branch",
        });
    }
};