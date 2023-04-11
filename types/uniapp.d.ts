interface ShowToastOptions extends UniNamespace.ShowToastOptions {
  onDelay?: () => void
}

declare interface Uni {
  showToast(options: string): void
  showToast(options: ShowToastOptions): void
}
