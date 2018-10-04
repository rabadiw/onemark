// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

interface IMarksModel {
  version: string
  //ISO Format
  updated: string
  data: [IMarkModel]
}

interface IMarkModel {
  id: string
  created: string
  domain: string
  favIconUrl: string
  title: string
  //ISO Format
  updated: string
  url: string
  browser: string
  favIcon: string
  tags: [string]
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
