import { StepCrud } from '../type/StepCrud'
import { StepRepository } from '../repository/StepRepository'

export class StepService {
  public async updateStepsByListingId(listingId: number, stepsCrud: StepCrud[] = []): Promise<void> {

    const stepRepository = new StepRepository()

    const allStepFromDb = await stepRepository.findAllByListingId(listingId)
    let stepsToDelete = [ ...allStepFromDb ]

    const stepsToUpdate = stepsCrud.filter( step => step.id && step.id > 0)
    const stepsToInsert = stepsCrud.filter( step => !step.id || (step.id && step.id < 0) )

    for (let i=0, len = stepsCrud.length; i < len; i++){
      stepsToDelete = stepsToDelete.filter( listingFlow => listingFlow.id !== stepsCrud[i].id)
    }

    const idStepsToDelete = stepsToDelete.map(step => step.id)

    await stepRepository.bulkCreate(stepsToInsert, listingId)

    await stepRepository.bulkDeleteByIds(idStepsToDelete)

    await stepRepository.bulkUpdate(stepsToUpdate)
  }
}
