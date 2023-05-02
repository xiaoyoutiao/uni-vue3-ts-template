import { logMiddleware } from './modules/log'
import { authMiddleware } from './modules/auth'

export const middlewares = [logMiddleware, authMiddleware]
