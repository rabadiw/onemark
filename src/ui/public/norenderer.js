// open link event
window.document.addEventListener("open_link", function (args) {
    let { url, title } = args.detail;
    if (url) {
        window.open(url, title);
    }
});

// copy link event
window.document.addEventListener("copy_link", function (args) {
    let { url } = args.detail;
    navigator.clipboard.writeText(url)
});