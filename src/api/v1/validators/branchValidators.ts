import Joi from "joi";
import { Branch } from "../models/branchModel";

export const createBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(1).max(30).required(),
    address: Joi.string().min(1).max(300).required(),
    phone: Joi.string().min(1).max(30).required()
});

export const updateBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(1).max(30).optional(),
    address: Joi.string().min(1).max(300).optional(),
    phone: Joi.string().min(1).max(30).optional()
});