import type { ExtractCanvas } from './types/ExtractCanvas.type'
import type { ColorDepth } from './types/ColorDepth.type'

import Color from 'color'
import { median } from '@/modules/median-cut';

interface Props extends ExtractCanvas {
  type: 'hex',
  colorDepth?: ColorDepth
}

const getColorWithType = (props: Props) => {
  const { image, canvas, type, colorDepth } = props

  const RGBColor = median({
    image,
    canvas,
    colorDepth
  });

	return Color(RGBColor?.[0])?.[type]();
}

export default getColorWithType