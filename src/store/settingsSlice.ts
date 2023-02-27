import { createSlice } from '@reduxjs/toolkit';
import click from '../assets/sounds/click.mp3'
import keyboard from '../assets/sounds/keyboard.mp3'


export type language = 'ru' | 'en'
export type sound = 'none' | 'click' | 'keyboard'
export enum fonts{
  DroidSans = 'Droid Sans',
  Chilanka ='Chilanka', 
  Atkinson = 'Atkinson Hyperligible',
  Helvetica =  'Helvetica',
  Courier = 'Courier',
  Montserrat =  'Montserrat',
  Ubuntu = 'Ubuntu',
  Inconsolata = 'Inconsolata'
}

export interface settingsState {
  lang: language,
  sound: sound,
  font: fonts
} 

const initialState: settingsState = JSON.parse(localStorage.getItem('config') as string) ?? {
  lang:'en',
  sound: 'none',
  font: 'Chilanka'
} 

export const setStateToLocalStorage = (state: settingsState) => {
  localStorage.setItem('config', JSON.stringify(state))
}

export const playSound = (sound :sound)=> {
  let audio: HTMLAudioElement
      switch (sound) {
        case 'click':
          audio = new Audio(click)
          audio.volume = 0.05
          break;
        case 'keyboard':
          audio = new Audio(keyboard)
          break;
        default:
          audio = new Audio
          break;
      }
    audio.play();
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage(state: settingsState, action: {payload: language, type: string}){
      state.lang = action.payload
      setStateToLocalStorage(state)
    },
    changeSound(state: settingsState, action: {payload: sound, type: string}){
      state.sound = action.payload
      setStateToLocalStorage(state)
    },
    changeFont(state: settingsState, action: {payload: fonts, type: string}){
      state.font = action.payload
      setStateToLocalStorage(state)
    }
  }
})

export const { changeLanguage, changeSound,changeFont } = settingsSlice.actions

export default settingsSlice.reducer