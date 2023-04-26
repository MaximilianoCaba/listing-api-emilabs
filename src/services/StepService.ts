import { StepBulk, StepRequest } from '../type/Step'
import { StepRepository } from '../repository/StepRepository'
import csvParser from 'csv-parser'
import { Readable } from 'stream'
import { sequelize } from '../db'
import { getConfig } from '../config/config'
import { Transaction } from 'sequelize'

export class StepService {
  public async updateStepsByListingId(listingId: number, stepRequestList: StepRequest[], transaction: Transaction): Promise<void> {

    const stepRepository = new StepRepository(transaction)

    const allStepFromDb = await stepRepository.findAllByListingId(listingId)
    let stepsToDelete = [ ...allStepFromDb ]

    const stepsToUpdate = stepRequestList.filter( step => step.id && step.id > 0)
    const stepsToInsert = stepRequestList.filter( step => !step.id || (step.id && step.id < 0) )

    for (let i=0, len = stepRequestList.length; i < len; i++){
      stepsToDelete = stepsToDelete.filter( listingFlow => listingFlow.id !== stepRequestList[i].id)
    }

    const idStepsToDelete = stepsToDelete.map(step => step.id)

    await stepRepository.bulkCreate(stepsToInsert, listingId)

    await stepRepository.bulkDeleteByIds(idStepsToDelete)

    await stepRepository.bulkUpdate(stepsToUpdate)
  }

  public async uploadBatchCsv(buffer: Buffer): Promise<void> {
    const { csvChunkProcess } = getConfig()
    let rows: StepBulk[] = []
    const stepRepository = new StepRepository()

    await new Promise((resolve, reject) => {
      sequelize.transaction().then((transaction) => {
        Readable.from(buffer).pipe(csvParser())
          .on('data', async (row) => {
            rows.push(row)
            // process in chunk
            if (rows.length >= csvChunkProcess) {
              stepRepository.bulkCreateCsv(rows).then()
              rows = []
            }
          })
          .on('end', async () => {
            // process the last chunk
            if (rows.length > 0) {
              stepRepository.bulkCreateCsv(rows).then()
            }
          })
          .on('finish', async () => {
            console.log('finish to upload')
            transaction.commit().then()
            resolve('ok')
          })
          .on('error', async (err) => {
            console.log('unexpected error', err)
            transaction.rollback().then()
            reject(err)
          })
      })
    })
  }
}
