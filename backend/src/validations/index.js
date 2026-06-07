import Joi from 'joi';

// User validation schemas
export const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  name: Joi.string().optional()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

export const projectCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Project name is required'
  }),
  description: Joi.string().optional()
});

export const taskCreateSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Task title is required'
  }),
  description: Joi.string().optional(),
  projectId: Joi.string().required().messages({
    'any.required': 'Project ID is required'
  }),
  assignedToId: Joi.string().required().messages({
    'any.required': 'Assignee ID is required'
  })
});

export const taskUpdateSchema = Joi.object({
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').required().messages({
    'any.required': 'Status is required',
    'any.only': 'Status must be one of TODO, IN_PROGRESS, or DONE'
  })
});

export const projectMemberSchema = Joi.object({
  projectId: Joi.string().required().messages({
    'any.required': 'Project ID is required'
  }),
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required'
  })
});

export default {
  userRegisterSchema,
  userLoginSchema,
  projectCreateSchema,
  taskCreateSchema,
  taskUpdateSchema,
  projectMemberSchema
};