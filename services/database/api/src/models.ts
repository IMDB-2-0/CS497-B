import { celebrate, Joi, Segments } from 'celebrate';

export const moviesIn = celebrate({
    [Segments.BODY]: Joi.object().keys({
        user: Joi.string().required(),
        limit: Joi.number().integer()
    })
});