import {
  useShowToastInterceptor,
  useShowLoadingInterceptor,
  useShowModalInterceptor
} from './prompt'

import {
  useNavigateToInterceptor,
  useRedirectToInterceptor,
  useSwitchTabInterceptor,
  useReLaunchInterceptor,
  useNavigateBackInterceptor
} from './router'

export function useUniappInterceptor() {
  useShowToastInterceptor()
  useShowLoadingInterceptor()
  useNavigateToInterceptor()
  useRedirectToInterceptor()
  useSwitchTabInterceptor()
  useReLaunchInterceptor()
  useNavigateBackInterceptor()
  useShowModalInterceptor()
}
