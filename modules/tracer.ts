interface ITracer extends Object {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
  success: (msg: string) => void
}

let tracer: ITracer = {} as ITracer

tracer.info = (msg) => { console.log(msg) }
tracer.warn = (msg) => { console.log(msg) }
tracer.error = (msg) => { console.log(msg) }
tracer.success = (msg) => { console.log(msg) }

export { ITracer, tracer }
