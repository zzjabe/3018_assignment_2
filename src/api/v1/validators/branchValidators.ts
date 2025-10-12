import Joi from "joi";
import { Branch } from "../models/branchModel";

export const createBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(3).max(30).required()
});

export const updateBranchSchema = Joi.object<Omit<Branch, "id">>({
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(3).max(30).required()
});