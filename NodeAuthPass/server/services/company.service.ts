import { BaseService } from './base/base.service';
import { Company } from '../models/company.model';

export const CompanyService = () => {
  const { all, findOne, create, update, remove } = BaseService(Company);

  return { all, findOne, create, update, remove };
};
