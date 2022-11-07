import type { ClassesForThemeParam } from './types/Params'
import type { ThemeModeType } from './types/Types'

const useSwitchTheme = (classesForTheme: ClassesForThemeParam) => {
	const themes = Object.values(classesForTheme);

	const handler = (theme: ThemeModeType) => {
		if (!globalThis || !globalThis?.document) return;

		document.documentElement.classList.remove(...themes);

		let themeClass: string;

		if (theme === 'default') {
			const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

			themeClass = isDark ? classesForTheme.dark : classesForTheme.light;
		} else {
			themeClass = classesForTheme[theme];
		}

		document.documentElement.classList.add(themeClass);
	};

	return handler;
};

export default useSwitchTheme;
