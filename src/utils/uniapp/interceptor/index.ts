import { useShowToastInterceptor } from './prompt'

import {
  useNavigateToInterceptor,
  useRedirectToInterceptor,
  useSwitchTabInterceptor,
  useReLaunchInterceptor,
  useNavigateBackInterceptor
} from './router'

export function useUniappInterceptor() {
  useShowToastInterceptor()
  useNavigateToInterceptor()
  useRedirectToInterceptor()
  useSwitchTabInterceptor()
  useReLaunchInterceptor()
  useNavigateBackInterceptor()
}
