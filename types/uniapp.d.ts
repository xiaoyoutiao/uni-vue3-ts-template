interface UniShowToastOptions extends UniNamespace.ShowToastOptions {
  onDelay?: () => void
}
interface CustomRouterOptions {
  /** query会和url中的查询字符串合并, 重复的字段query会覆盖url的值 */
  query?: AnyObject
  /** 储存在状态管理库中的对象数据 */
  storedQuery?: AnyObject
}

interface UniNavigateToOptions extends UniNamespace.NavigateToOptions, CustomRouterOptions {}
interface UniRedirectToOptions extends UniApp.RedirectToOptions, CustomRouterOptions {}
interface UniReLaunchOptions extends UniApp.ReLaunchOptions, CustomRouterOptions {}
interface UniSwitchTabOptions extends UniApp.SwitchTabOptions, Omit<CustomRouterOptions, 'query'> {}
interface UniNavigateBackOptions
  extends UniApp.NavigateBackOptions,
    Omit<CustomRouterOptions, 'query'> {}

declare interface Uni {
  showToast(title: string): void
  showToast(options: UniShowToastOptions): void

  navigateTo(url: string): void
  navigateTo(options: UniNavigateToOptions): void

  redirectTo(url: string): void
  redirectTo(options: UniRedirectToOptions): void

  reLaunch(url: string): void
  reLaunch(options: UniReLaunchOptions): void

  switchTab(url: string): void
  switchTab(options: UniSwitchTabOptions): void

  navigateBack(options: UniNavigateBackOptions | undefined): void
}
