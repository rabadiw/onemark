// import { Mark } from './marks-model';
import { MarkDesignData } from './MarkDesignData.js';
import { IsDesign } from '../lib/env.js';
import { traceError } from '../lib/common.js';

class MarkService {
    baseApiUrl: string;

    constructor(baseApiUrl: string) {
        this.baseApiUrl = baseApiUrl;
    }

    getMarks() {
        return new Promise((resolve, reject) => {

            if (IsDesign) {
                resolve(MarkDesignData.data.map(v => {
                    if (!v.title) { v.title = v.domain; }
                    return v;
                }));
            } else {

                fetch(
                    this.baseApiUrl,
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