import { FilterQuery } from 'mongoose';
import { CombinationSpecification } from '../shared/Specification';

export class IdSpecification extends CombinationSpecification {
  private _id: string;

  constructor(id: string) {
    super();
    this._id = id;
  }

  isSatisfiedBy<T>(...args: any): FilterQuery<T> {
    return {
      _id: this._id,
    };
  }
}
