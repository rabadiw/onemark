import { IMarksModel, IMarkModel, IMarksRepository } from "./marks.domain"

class MarksController {
  marksRepo: IMarksRepository

  constructor(repo: IMarksRepository) {
    this.marksRepo = repo
  }

  getAll() {
    return this.marksRepo.getAll() as Promise<IMarksModel[]>
  }

  get(id: string) {
    return this.marksRepo.get(id) as Promise<IMarksModel>
  }

  post(marks) {
    return this.marksRepo.append(marks)
  }

  delete(marks) {
    return this.marksRepo.delete(marks)
  }
}

export { MarksController }