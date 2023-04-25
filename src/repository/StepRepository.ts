import { Step } from '../models/Step'
import { StepCrud } from '../type/StepCrud'

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

  public async bulkCreate(stepsCrud: StepCrud[], listingId: number): Promise<Step[]> {
    return Step.bulkCreate(stepsCrud.map((stepCrud) => ({
      listingId,
      flowId: stepCrud.flowId,
      name: stepCrud.name,
      step: stepCrud.step,
    })))
  }

  public async bulkUpdate(stepsCrud: StepCrud[]): Promise<Step[]> {
    return Step.bulkCreate(stepsCrud.map((stepCrud) => ({
      ...stepCrud
    })), { updateOnDuplicate: [ 'flowId', 'name', 'step' ] })
  }
}