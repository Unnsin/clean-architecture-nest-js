import { CombinationSpecification } from '../shared/Specification';

export class EmptySpecification extends CombinationSpecification {
  constructor() {
    super();
  }

  isSatisfiedBy() {
    return {};
  }
}
