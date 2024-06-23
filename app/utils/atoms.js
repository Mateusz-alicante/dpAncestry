import { atom } from 'jotai'

export const dataAtom = atom({
    ready: false,
    code: "",
    countries: [],
    diseases: [],
})