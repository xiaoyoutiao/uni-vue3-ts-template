type UniImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export interface UniImageProps {
  mode: UniImageMode
  webp: boolean
  lazyLoad: boolean
  src: string
  showMenuByLongpress: boolean
}

export type BasicSizeType = number | string
/** [宽, 高, 圆角] */
export type BasicSizeTuple = [BasicSizeType, BasicSizeType, BasicSizeType?]
