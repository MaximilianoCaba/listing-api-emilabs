import { FileParam, Path, POST } from 'typescript-rest'
import { StepService } from '../services/StepService'

@Path('/steps')
export class StepController {
  @POST
  @Path('/upload')
  public async testUploadFile(
    @FileParam('csv') file: Express.Multer.File
  ): Promise<string> {
    console.log(file)

    const stepService = new StepService()
    await stepService.uploadBatchCsv(file.buffer)
    return 'OK'
  }
}