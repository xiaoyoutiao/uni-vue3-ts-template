// 利用 bradlc.vscode-tailwindcss 拓展做 theme 指令提示

/* eslint-env node */
function toRpx(obj) {
  return Object.keys(obj).forEach((key) => {
    obj[key] = obj[key] = Array.isArray(obj[key])
      ? obj[key].map((i) => i + 'rpx')
      : obj[key] + 'rpx'
  })
}

module.exports = {
  theme: {
    fontSize: toRpx({
      xs: [20, 30],
      sm: [24, 36],
      base: [28, 42],
      lg: [30, 45],
      xl: [32, 48],
      '2xl': [36, 54],
      '3xl': [48, 72],
      '4xl': [56, 84],
      '5xl': [64, 96]
    }),
    colors: {
      primary: '#ff6402',
      currency: '#dc2017',
      white: {
        full: '#fff',
        lightblue: '#f8faff',
        offwhite: '#f9f9f9',
        whitesmoke: '#f5f5f5'
      },
      black: {
        full: '#000',
        dark: '#333',
        medium: '#666',
        light: '#999'
      },
      gray: {},
      error: '#dc2017',
      warning: '#ff9901',
      success: '#07c261',
      info: '#017fe6'
    }
  }
}
