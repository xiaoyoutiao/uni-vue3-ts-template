import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

import { theme } from './tailwind.config.cjs'

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({})
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center'
    }
  ],
  transformers: [
    transformerDirectives(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify({
      prefix: 'ui-',
      prefixedOnly: true,
      attributes: [
        'w',
        'h',
        'bg',
        'flex',
        'border',
        'text',
        'font',
        'p',
        'm',
        'animate',
        'class',
        'className'
      ]
    }),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ],
  theme
})
