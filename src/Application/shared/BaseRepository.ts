import { ISpecification } from './Specification';

export interface BaseRepository<TEntity> {
  Get(param: GetParams<TEntity>): Promise<TEntity[]>;
  Save(entity: TEntity): Promise<TEntity>;
  Update(entity: TEntity): Promise<TEntity>;
  Delete(entity: TEntity): Promise<boolean>;
  GetOne(specification: ISpecification): Promise<TEntity | undefined>;
}

export interface GetParams<TEntity> {
  page?: number;
  limit?: number;
  specification: ISpecification;
}
