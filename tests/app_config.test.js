
test('test OS platform Darwin or Linux', () => {

    const logic = () => {
        return ((/^darwin|^linux/.test(process.platform)))
    }

    if (process.platform === "darwin" ||
        process.platform === "linux") {
        expect(logic()).toBe(true);
    } else {
        expect(logic()).toBe(false);
    }
});

test('test auto updater', () => {

    // const { sendNotification, sendUpdateDownloaded } = require("./app-events");
    // const autoUpdater = {};
    // sendUpdateDownloaded(autoUpdater);

})