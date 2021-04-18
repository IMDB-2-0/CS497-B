import { celebrate, Joi, Segments } from 'celebrate';

export const moviesIn = celebrate({
    // TODO: Update queries
    [Segments.QUERY]: Joi.object().keys({
        limit: Joi.number().integer()
    })
});

export const userInGET = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        email: Joi.string().required()
    })
});

export const userInPOST = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    })
});