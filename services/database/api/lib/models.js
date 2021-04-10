"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesIn = void 0;
var celebrate_1 = require("celebrate");
exports.moviesIn = celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
    // user: Joi.string().required(),
    // limit: Joi.number().integer()
    }),
    _a));
