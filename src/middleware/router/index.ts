import { logMiddleware } from './log'
import { authMiddleware } from './auth'

export const middlewares = [logMiddleware, authMiddleware]
