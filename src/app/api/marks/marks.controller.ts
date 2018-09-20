// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { IMarksModel, IMarksRepository, IMarksController } from "./marks.domain"

class MarksController implements IMarksController {
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

  create(marks) {
    return this.marksRepo.append(marks)
  }

  delete(marks) {
    return this.marksRepo.delete(marks)
  }
}

export { MarksController }