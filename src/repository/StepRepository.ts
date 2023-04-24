import { Step } from '../models/Step'

export class StepRepository {
  public async findAllByListingId(listingId: number): Promise<Step[]> {
    return Step.findAll({
      where: {
        listingId,
      },
    })
  }

  public async bulkDeleteByIds(ids: number[]): Promise<number> {
    return Step.destroy({
      where: {
        id: ids
      }
    })
  }
}