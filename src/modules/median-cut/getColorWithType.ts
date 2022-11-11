import type { IGetColorWithTypeParams } from './types/Params';
import type { median } from '@/modules/median-cut';

import Color from 'color';

const getColorWithType = async (
	medianFn: ReturnType<typeof median>,
	props: IGetColorWithTypeParams
) => {
	const { type } = props;

	if (!medianFn) return;

	const RGBColor = await medianFn(props);

	return Color(RGBColor?.[0])?.[type]();
};

export default getColorWithType;
