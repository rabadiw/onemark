class OnemarkService {

    get markList() {
        return require("../../../src-api/data/urls.json")
    }

}

exports.OnemarkService = OnemarkService; 