import { Request, Response } from "express";
import User from "../models/User.js";
export const searchContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm) {
      res.status(400).json({ error: "SearchTerm is required" });
      return;
    }
    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const reg = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await User.find({
      $and: [
        { id: { $ne: req.userId } },
        { $or: [{ firstName: reg }, { lastName: reg }, { email: reg }] },
      ],
    });
    res.status(200).json({contacts});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
