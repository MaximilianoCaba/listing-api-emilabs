import { FileParam, Path, POST } from 'typescript-rest'
import { StepService } from '../services/StepService'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'

@Path('/steps')
export class StepController {
  @POST
  @Path('/upload')
  public async testUploadFile(
    @FileParam('csv') file?: Express.Multer.File
  ): Promise<string> {
    if (!file) {
      throw new BadRequestError('csv file doesnt present in request')
    }
    if(file.mimetype !=='text/csv') {
      throw new BadRequestError('the file is not a csv')
    }
    const stepService = new StepService()
    await stepService.uploadBatchCsv(file.buffer)
    return 'OK'
  }
}