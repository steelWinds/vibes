import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
import useSwitchTheme, { type ThemeMode } from '@/modules/use-switch-theme';

interface ISettings {
  darkTheme: boolean;
  systemPreferences: boolean;
}

const defaultSettings: ISettings = {
  darkTheme: false,
  systemPreferences: true
};

const createThemeStore = () => {
  const switchTheme = useSwitchTheme({
    dark: 'tw-dark',
    light: 'tw-light'
  })

	const { subscribe, update, set } = persist(
		writable(defaultSettings),
		createLocalStorage(),
		'theme'
	);

	subscribe((store) => {
    let selectedThemeMode: ThemeMode = 'default'; 
    
    if (store.systemPreferences) {
      store.darkTheme = false;
    } else {
      selectedThemeMode = store.darkTheme ? 'dark' : 'light';
    }

    switchTheme(selectedThemeMode)
  });

	return {
		subscribe,
		update,
		set
	};
};

const themeStore = createThemeStore();

export default themeStore;
