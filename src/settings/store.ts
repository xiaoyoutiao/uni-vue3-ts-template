import { getDefinedEnvs } from '@/utils/config'

const Envs = getDefinedEnvs()

export const PINIA_PERSIST_KEY_PREFIX = `PP_${Envs.VITE_MP_ENV.toUpperCase().slice(0, 3)}_`
