// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import { Router } from "express";
import { IMarksController } from "../marks/marks.domain";
import { ITracer } from "../../modules/tracer"

import { MarksListRepo as MarksRepo } from "../context/file/marks.repo";
import { MarksController as Controller } from "../marks/marks.controller";

const MarksRouteHandler = (controller: IMarksController, tracer: ITracer) => {

  const router = Router();

  const handleError = (err, res) => {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  };

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    if (tracer) {
      //tracer.info(`Time: ${Date.now()} - ${req.method} - body(${JSON.stringify(req.body)})`);
      tracer.info(`${req.method} - body(${JSON.stringify(req.body)})`);
    }
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
      controller.create(req.body)
        .then((v) => res.send(v))
        .catch((err) => res.sendStatus(400).send(err));
    });

  router.route("/:id")
    .get((req, res) => {
      controller.get(req.params.id)
        .then((data) => {
          res.setHeader("Content-Type", "application/json;charset=utf-8");
          if (!data.data || data.data.length === 0) {
            res.status(404); // not found
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

  return router
}

export const MarksRouter = (tracer) => {
  return MarksRouteHandler(new Controller(new MarksRepo(tracer)), tracer)
}
