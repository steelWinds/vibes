import type { ThemeModeType } from '@/modules/use-switch-theme/types/Types';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
import useSwitchTheme from '@/modules/use-switch-theme';

interface ThemeProps {
	darkTheme: boolean;
	systemPreferences: boolean;
}

const defaultSettings: ThemeProps = {
	darkTheme: false,
	systemPreferences: true
};

const createThemeStore = () => {
	const switchTheme = useSwitchTheme({
		dark: 'tw-dark',
		light: 'tw-light'
	});

	const { subscribe, update, set } = persist(
		writable(defaultSettings),
		createLocalStorage(),
		'theme'
	);

	subscribe((store) => {
		let selectedThemeMode: ThemeModeType = 'default';

		if (store.systemPreferences) {
			store.darkTheme = false;
		} else {
			selectedThemeMode = store.darkTheme ? 'dark' : 'light';
		}

		switchTheme(selectedThemeMode);
	});

	return {
		subscribe,
		update,
		set
	};
};

const themeStore = createThemeStore();

export default themeStore;
