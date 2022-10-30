import { writable } from 'svelte/store';
import useSwitchTheme, {type ThemeMode} from '@/modules/use-switch-theme'

interface ISettings {
  darkTheme: boolean;
}

const defaultSettings: ISettings = {
  darkTheme: false
}

const createThemeStore = () => {
  const { subscribe, update, set } = writable(defaultSettings)

  subscribe(({ darkTheme }) => {
    const theme: ThemeMode = darkTheme ? 'tw-dark' : 'default' 
    
    useSwitchTheme(theme)
  })

  return {
    subscribe,
    update,
    set
  }
}

const themeStore = createThemeStore()

export default themeStore