import { celebrate, Joi, Segments } from 'celebrate';

export const moviesIn = celebrate({
    // TODO: Update queries
    [Segments.QUERY]: Joi.object().keys({
        limit: Joi.number().integer()
    })
});

// Modify to work with IDs instead
export const tempUserInGET = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        email: Joi.string().required()
    })
});

export const userInGET = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number().required()
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

export const likeInPOST = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        movieID: Joi.number().required(),
        rating: Joi.number().required()
    })
});

export const userInPOST = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required()
    })
});

export const loginUserPOST = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email_verified: Joi.boolean().required(), 
        name: Joi.string().required(), 
        email: Joi.string().required()
    })
});