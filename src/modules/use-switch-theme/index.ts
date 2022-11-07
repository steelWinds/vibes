type ThemeTypes = 'dark' | 'light';
type ClassesForThemeType = {
  [key in ThemeTypes]: string;
};
type ThemeMode = ThemeTypes | 'default'

const useSwitchTheme = (classesForTheme: ClassesForThemeType) => {
  const themes = Object.values(classesForTheme)
	
  const handler = (theme: ThemeMode) => {
    if (!globalThis || !globalThis?.document) return;

    document.documentElement.classList.remove(...themes);

    let themeClass: string;

    if (theme === 'default') {
      const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches
      
      themeClass = isDark ? classesForTheme.dark : classesForTheme.light
    } else {
      themeClass = classesForTheme[theme]
    }

    document.documentElement.classList.add(themeClass);
  }

  return handler
};

export default useSwitchTheme;
export type { ThemeMode };
