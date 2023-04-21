import { useShowToastInterceptor } from './showToast'
import { useNavigateToInterceptor } from './navigateTo'

export function useUniappInterceptor() {
  useShowToastInterceptor()
  useNavigateToInterceptor()
}
