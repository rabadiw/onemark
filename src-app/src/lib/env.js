export const AppName = "OneMark";
export const IsDesign = process.env.NODE_ENV != "production";

export function initRenderer() {
    isElectron().then(() => {
        require(require.resolve('../public/renderer.js'));
    }).catch(e => console.log(e));
}

export function isElectron() {
    return new Promise((resolve, reject) => {
        if (!window.process) {
            reject("No electron found");
        } else {
            let { electron } = window.process.versions;
            console.log(electron);
            if (electron && electron.length > 0) {
                resolve(true);
            }
        }
    });
}

export function isBrowser() {
    return window.process.env.BROWSER;
}

// export interface Mark {
//     url: string;
//     title: string;
// }
export function openUrl(props) {
    isElectron().then(() => {
        global.electronPort.openUrl({ url: props.url, title: props.url });
    }).catch(() => {
        window.open(props.url, props.url);
    })
}
