"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marks_repo_1 = require("../context/file/marks.repo");
const marks_controller_1 = require("../marks/marks.controller");
const router = express_1.Router();
exports.MarksRouter = router;
const controller = new marks_controller_1.MarksController(new marks_repo_1.MarksListRepo());
const handleError = (err, res) => {
    console.log(err.message);
    res.status(400).json({ error: err.message });
};
router.use(function timeLog(req, res, next) {
    console.log(`Time: ${Date.now()} - ${req.method} - body(${JSON.stringify(req.body)})`);
    next();
});
router.route("/")
    .get((req, res) => {
    controller.getAll()
        .then((data) => {
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        res.send(data);
    })
        .catch((err) => handleError(err, res));
})
    .post((req, res) => {
    controller.post(req.body)
        .then((v) => res.send(v))
        .catch((err) => res.sendStatus(400).send(err));
});
router.route("/:id")
    .get((req, res) => {
    controller.get(req.params.id)
        .then((data) => {
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        if (!data.data || data.data.length === 0) {
            res.status(404);
        }
        res.send(data);
    })
        .catch((err) => handleError(err, res));
})
    .delete((req, res) => {
    controller.delete(req.params.id)
        .then(() => res.status(200).json())
        .catch((err) => handleError(err, res));
});
//# sourceMappingURL=marks.router.js.map