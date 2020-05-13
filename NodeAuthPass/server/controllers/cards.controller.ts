import { Company } from "../models/company.model";
import { Router, Request, Response } from "express";

export const CompanyController = () =>{
    const router = Router()

    const create = async (req: Request, res: Response) => {
        const {  compName, content, compContact, compStatus } = req.body;
    
        const company = await Company.create({ compName, content, compContact, compStatus });
    
        return res.status(201).json(company);
      };
    
      const findAll = async (req: Request, res: Response) => {
        const companys = await Company.findAll();
    
        return res.status(200).json(companys);
      };
    
      const findOne = async (req: Request, res: Response) => {
        const { id } = req.params;
    
        const company = await Company.findOne({ where: { id } });
    
        if (!Company) return res.status(404).end();
        return res.status(200).json(Company);
      };
    
      const deleteOne = async (req: Request, res: Response) => {
        const { id } = req.params;
    
        const deleteCompany = await Company.destroy({ where: { id } });
    
        if (!deleteCompany) {
          return res.status(404).end();
        }
    
        return res.status(200);
      };
    
      const update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const {  compName, content, compContact, compStatus } = req.body;
    
        const updateCompany = await Company.update(
          {  compName, content, compContact, compStatus },
          { returning: true, where: { id } }
        );
    
        return res.status(200).json(updateCompany);
      };
    
      router.post("/", create);
      router.get("/", findAll);
      router.get("/:id", findOne);
      router.delete("/:id", deleteOne);
      router.put("/:id", update);
    
      return router;
}