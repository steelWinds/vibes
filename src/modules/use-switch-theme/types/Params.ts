import type { ThemeVariantsTypes } from './Types'

type ClassesForThemeParam = {
	[key in ThemeVariantsTypes]: string;
};

export type { ClassesForThemeParam }