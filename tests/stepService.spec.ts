import * as fs from 'fs'
import { StepService } from '../src/services/StepService'
import { Step } from '../src/models/Step'
import path from 'path'

const csvBulkBuffer = fs.readFileSync(path.resolve(__dirname,'./files/stepBulk.csv'))

describe('StepService', () => {
  test('when a csv with contains 9000 rows, process in batch and bulk in sequelize', async () => {
    const stepService = new StepService()
    await stepService.uploadBatchCsv(csvBulkBuffer)
    const count = await Step.count()
    expect(count).toEqual(9000)
  })
})