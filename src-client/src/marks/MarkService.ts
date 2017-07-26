import { Mark } from './MarkModel'
import { MarkDesignData } from './MarkDesignData.js'
import { traceError } from '../lib/common.js'

interface MarkServiceOption {
    baseApiUrl: string
    isDesignMode: boolean
    // repo: IMarkRepo
}

interface MarkRepo {
    query: () => [Mark]
}

class MarkService {
    getMarksInternal: () => Promise<[Mark]>
    isDesignMode: boolean
    baseApiUrl: string

    // constructor({ repo }: MarkServiceOption) { }

    constructor({ baseApiUrl, isDesignMode }: MarkServiceOption) {
        this.baseApiUrl = baseApiUrl
        this.isDesignMode = isDesignMode

        if (isDesignMode === true) {
            this.getMarksInternal = () => this.getMarksInDesignMode()
        } else {
            this.getMarksInternal = () => this.getMarksProd()
        }
    }

    getMarks() {
        return this.getMarksInternal()
    }

    getMarksProd() {
        return new Promise<[Mark]>((resolve, reject) => {

            fetch(
                `${this.baseApiUrl}api/marks`,
                {
                    headers: { 'accept': 'application/json' }
                }
            ).catch((error) => {
                traceError(error)
                reject(error)
            }).then((response) => {
                if (response && response.json) {
                    response.json().then((data) =>
                        resolve(data.data)
                    )
                }
            })
        })
    }
    getMarksInDesignMode() {
        return new Promise<[Mark]>((resolve, reject) => {
            return MarkDesignData.data.map(v => {
                if (!v.title || v.title.trim().length === 0) {
                    v.title = v.domain
                }
                return v
            })
        })
    }

    deleteMarks(marks: [Mark]) {

        let deleteMark = (id: string) => {
            return fetch(
                `${this.baseApiUrl}api/marks/${id}`, { method: 'delete' }
            )
        }
        // delete one at a time
        return new Promise<void>((resolve, reject) => {
            Promise
                .all(marks.map(v => deleteMark(v.id)))
                .catch((error) => {
                    traceError(error)
                })
            resolve()
        })
    }
}

export default MarkService
export { MarkServiceOption }