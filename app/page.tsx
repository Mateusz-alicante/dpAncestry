"use client";

import Home from './Components/Home/Home'
import Results from "./Components/Results/Results"
import './utils/atoms'

import { useAtom } from 'jotai'
import {dataAtom} from './utils/atoms'


export default function HomePage() {
  const [data, setData] = useAtom(dataAtom)
  
  if (!data.ready) return <Home />;
  else return <Results />;

}
