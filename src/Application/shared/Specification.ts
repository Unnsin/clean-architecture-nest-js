import { FilterQuery } from 'mongoose';

export interface ISpecification {
  isSatisfiedBy<T>(...args: any): FilterQuery<T>;
  and(specification: ISpecification): ISpecification;
  or(specification: ISpecification): ISpecification;
  not(): ISpecification;
}

export abstract class CombinationSpecification implements ISpecification {
  abstract isSatisfiedBy<T>(...args: any): FilterQuery<T>;

  and(specification: ISpecification): ISpecification {
    return new AndSpecification(this, specification);
  }

  or(specification: ISpecification): ISpecification {
    return new OrSpecification(this, specification);
  }

  not(): ISpecification {
    return new NotSpecification(this);
  }
}

class AndSpecification extends CombinationSpecification {
  private left: ISpecification;
  private right: ISpecification;

  constructor(left: ISpecification, right: ISpecification) {
    super();
    this.left = left;
    this.right = right;
  }

  isSatisfiedBy<T>(...args: any): FilterQuery<T> {
    return {
      ...this.left.isSatisfiedBy(),
      ...this.right.isSatisfiedBy(),
    };
  }
}

class OrSpecification extends CombinationSpecification {
  private left: ISpecification;
  private right: ISpecification;

  constructor(left: ISpecification, right: ISpecification) {
    super();
    this.left = left;
    this.right = right;
  }

  isSatisfiedBy<T>(...args: any): FilterQuery<T> {
    return {
      $or: [this.left.isSatisfiedBy(), this.right.isSatisfiedBy()],
    };
  }
}

class NotSpecification extends CombinationSpecification {
  private specification: ISpecification;
  constructor(specification: ISpecification) {
    super();
    this.specification = specification;
  }

  isSatisfiedBy<T>(...args: any): FilterQuery<T> {
    return {
      $ne: this.specification.isSatisfiedBy(),
    };
  }
}
