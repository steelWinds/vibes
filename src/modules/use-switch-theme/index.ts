type ThemeMode = 'tw-dark' | 'default';

const themes = ['tw-dark', 'default'];

const useSwitchTheme = (theme: ThemeMode) => {
	if (!globalThis || !globalThis?.document) return;

	document.documentElement.classList.remove(...themes);

	document.documentElement.classList.add(theme);
};

export default useSwitchTheme;
export type { ThemeMode };
