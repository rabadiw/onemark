interface IMarksModel {
  version: string;
  updated: string;
  data: [IMarkModel];
}

interface IMarkModel {
  id: string;
  created: string;
  domain: string;
  favIconUrl: string;
  title: string;
  updated: string;
  url: string;
}

interface IMarksRepository {
  getAll(): Promise<any[]>
  get(id: string): Promise<any>
  append(marks: any): Promise<any[]>
  delete(marks: any): Promise<any[]>
}

interface IMarksController {
  marksRepo: IMarksRepository
  getAll()
  get(id: string)
  create(marks)
  delete(marks)
}

export { IMarksModel, IMarkModel, IMarksRepository, IMarksController }
