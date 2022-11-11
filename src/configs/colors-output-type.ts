import type { ConfigObj } from './Types';

type OutputColorType = 'hex' | 'rgb' | 'hsl';

const colorsOutputType: ConfigObj<OutputColorType>[] = [
	{
		value: 'hex'
	},
	{
		value: 'rgb'
	},
	{
		value: 'hsl'
	}
];

export default colorsOutputType;
export type { OutputColorType };
