export class Mark {
  id: string
  title: string
  url: string
  favIconUrl: string
  domain: string
  created: string
  updated: string
}

export class MarkGroup {
  title: string
  items: Mark[]
}