"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MarksController {
    constructor(repo) {
        this.marksRepo = repo;
    }
    getAll() {
        return this.marksRepo.getAll();
    }
    get(id) {
        return this.marksRepo.get(id);
    }
    post(marks) {
        return this.marksRepo.append(marks);
    }
    delete(marks) {
        return this.marksRepo.delete(marks);
    }
}
exports.MarksController = MarksController;
//# sourceMappingURL=marks.controller.js.map