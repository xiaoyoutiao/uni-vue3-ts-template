interface ShowToastOptions extends UniNamespace.ShowToastOptions {
  onDelay?: () => void
}

interface NavigateToOptions extends UniNamespace.NavigateToOptions {
  query: AnyObject
  /** 储存在状态管理库中的对象数据 */
  storedQuery: AnyObject
}

declare interface Uni {
  showToast(options: ShowToastOptions): void
  showToast(title: string): void

  navigateTo(options: ShowToastOptions): void
  navigateTo(url: string): void
}
