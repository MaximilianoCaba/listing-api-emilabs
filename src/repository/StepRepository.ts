import { Step } from '../models/Step'
import { StepBulk, StepRequest } from '../type/Step'
import { Transaction } from 'sequelize'

export class StepRepository {
  
  private readonly transaction: Transaction | undefined

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction
    }
  }
  
  public async findAllByListingId(listingId: number): Promise<Step[]> {
    return Step.findAll({
      where: {
        listingId,
      }
    })
  }

  public async bulkDeleteByIds(ids: number[]): Promise<number> {
    return Step.destroy({
      where: {
        id: ids
      },
      transaction: this.transaction
    })
  }

  public async bulkCreate(stepRequestList: StepRequest[], listingId: number): Promise<Step[]> {
    return Step.bulkCreate(stepRequestList.map((stepRequest) => ({
      listingId,
      flowId: stepRequest.flowId,
      name: stepRequest.name,
      step: stepRequest.step,
    })), { transaction: this.transaction })
  }

  public async bulkUpdate(stepRequestList: StepRequest[]): Promise<Step[]> {
    return Step.bulkCreate(stepRequestList.map((stepRequest) => ({
      ...stepRequest
    })), { updateOnDuplicate: [ 'flowId', 'name', 'step' ], transaction: this.transaction })
  }

  public async bulkCreateCsv(stepBulkList: StepBulk[]): Promise<Step[]> {
    return Step.bulkCreate(stepBulkList.map((stepRequest) => ({
      ...stepRequest
    })), { transaction: this.transaction })
  }
}