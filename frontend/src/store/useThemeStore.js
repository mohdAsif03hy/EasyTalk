import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("EasyTalk-theme") || "coffee",

  setTheme: (theme) => {
    localStorage.setItem("EasyTalk-theme",theme);
  set({theme})
},
}));
