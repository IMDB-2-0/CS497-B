import { celebrate, Joi, Segments } from 'celebrate';

export const moviesIn = celebrate({
    // TODO: Update queries
    [Segments.QUERY]: Joi.object().keys({
        limit: Joi.number().integer()
    })
});

export const userInGET = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
        email: Joi.string().required()
    })
});

export const likeInGET = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().required()
    })
});

export const dislikeInGET = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().required()
    })
});

export const likeInDELETE = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().required(),
        movieID: Joi.number().required()
    })
});

export const userInPOST = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required()
    })
});