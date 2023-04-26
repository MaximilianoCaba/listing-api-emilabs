import { Step } from '../models/Step'
import { StepBulk, StepRequest } from '../type/Step'

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

  public async bulkCreate(stepRequestList: StepRequest[], listingId: number): Promise<Step[]> {
    return Step.bulkCreate(stepRequestList.map((stepRequest) => ({
      listingId,
      flowId: stepRequest.flowId,
      name: stepRequest.name,
      step: stepRequest.step,
    })))
  }

  public async bulkUpdate(stepRequestList: StepRequest[]): Promise<Step[]> {
    return Step.bulkCreate(stepRequestList.map((stepRequest) => ({
      ...stepRequest
    })), { updateOnDuplicate: [ 'flowId', 'name', 'step' ] })
  }

  public async bulkCreateCsv(stepBulkList: StepBulk[]): Promise<Step[]> {
    return Step.bulkCreate(stepBulkList.map((stepRequest) => ({
      ...stepRequest
    })), { updateOnDuplicate: [ 'flowId', 'name', 'step' ] })
  }
}