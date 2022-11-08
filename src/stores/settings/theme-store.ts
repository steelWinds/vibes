import type { ThemeModeType } from '@/modules/use-switch-theme/types/Types';

import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable, get } from 'svelte/store';
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
	const themeSwitcher = useSwitchTheme({
		dark: 'tw-dark',
		light: 'tw-light'
	});

	const { subscribe, update, set } = persist(
		writable(defaultSettings),
		createLocalStorage(),
		'theme'
  );
  
  const switchTheme = (store: ThemeProps) => {
    let selectedThemeMode: ThemeModeType = 'default';

		if (store.systemPreferences) {
			store.darkTheme = false;
		} else {
			selectedThemeMode = store.darkTheme ? 'dark' : 'light';
		}

		themeSwitcher(selectedThemeMode);
  }

  const init = () => {
    switchTheme(get({ subscribe }))
  }

	subscribe(switchTheme);

	return {
		subscribe,
		update,
    init,
    set
	};
};

const themeStore = createThemeStore();

export default themeStore;
