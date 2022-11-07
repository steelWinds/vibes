import type { IGetColorWithTypeParams } from './types/Params';

import Color from 'color';
import { median } from '@/modules/median-cut';

const getColorWithType = async (props: IGetColorWithTypeParams) => {
	const { type } = props;

	const RGBColor = await median(props);

	return Color(RGBColor?.[0])?.[type]();
};

export default getColorWithType;
