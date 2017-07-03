// import { Mark } from './marks-model';
import { MarkDesignData } from './MarkDesignData.js';
import { traceError } from '../lib/common.js';

interface IMarkServiceOption {
    baseApiUrl: string,
    isDesignMode: boolean
}

class MarkService {
    isDesignMode: boolean;
    baseApiUrl: string;

    constructor({ baseApiUrl, isDesignMode }: IMarkServiceOption) {
        this.baseApiUrl = baseApiUrl;
        this.isDesignMode = isDesignMode;
    }

    getMarks() {
        return new Promise((resolve, reject) => {

            if (this.isDesignMode) {
                resolve(MarkDesignData.data.map(v => {
                    if (!v.title) { v.title = v.domain; }
                    return v;
                }));
            } else {

                fetch(
                    this.baseApiUrl + "marks",
                    {
                        headers: { 'accept': 'application/json' }
                    }
                ).catch((error) => {
                    traceError(error);
                    reject(error);
                }).then((response) => {
                    if (response && response.json) {
                        response.json().then((data) =>
                            resolve(data.data)
                        );
                    }
                });

            }

            // Marks.map(v => {
            //     if (!v.title) { v.title = v.domain };
            //     return v;
            // }));
        });
    }
}

export default MarkService;