import { Step } from '../models/Step'
import { StepCrud } from '../type/StepCrud'
import { StepRepository } from '../repository/StepRepository'

export class StepService {
  public async updateStepsByListingId(listingId: number, stepsCrud: StepCrud[] = []): Promise<void> {

    const stepRepository = new StepRepository()

    const allStepFromDb = await stepRepository.findAllByListingId(listingId)
    let stepsToDelete = [ ...allStepFromDb ]

    const stepsToUpdate = stepsCrud.filter( step => step.id && step.id > 0)
    const stepsToInsert = stepsCrud.filter( step => !step.id || (step.id && step.id < 0) )


    // que funcion tiene esto?
    for (let i=0, len = stepsCrud.length; i < len; i++){
      stepsToDelete = stepsToDelete.filter( listingFlow => listingFlow.id !== stepsCrud[i].id)
    }

    const idStepsToDelete = stepsToDelete.map(step => step.id)

    // TODO move to repository
    const stepInsertedResult = await Step.bulkCreate(stepsToInsert.map((stepCrud) => ({
      listingId,
      flowId: stepCrud.flowId,
      name: stepCrud.name,
      step: stepCrud.step,
    })))
    console.log('stepInsertedResult', stepInsertedResult)

    // TODO move to repository
    const resultDelete = await stepRepository.bulkDeleteByIds(idStepsToDelete)
    console.log('resultDelete', resultDelete)

    // TODO move to repositoru
    const stepUpdatedResult = await Step.bulkCreate(stepsToUpdate.map((stepCrud) => ({
      ...stepCrud
    })), { updateOnDuplicate: [ 'flowId', 'name', 'step' ] })
    console.log('stepUpdatedResult', stepUpdatedResult)
  }
}
