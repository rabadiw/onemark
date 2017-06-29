// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

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
  getAll(): Promise<{}>
  get(id: string): Promise<{}>
  append(marks: any): Promise<{}>
  delete(marks: any): Promise<{}>
}

interface IMarksController {
  marksRepo: IMarksRepository
  getAll()
  get(id: string)
  create(marks)
  delete(marks)
}

export { IMarksModel, IMarkModel, IMarksRepository, IMarksController }
