"use client";



import { PinInput } from '@mantine/core';
import AncestryDropBox from './AncestryFileInput';

import styles from './Home.module.css';

import { useAtom } from 'jotai'
import { dataAtom } from '../../utils/atoms';

import Logo from '../Common/logo.png'

import Image from 'next/image'

export default () => {
  const [data, setData] = useAtom(dataAtom)

  const setUserData = (pin) => {

    setData({
      ready: true,
      code: pin,
      countries: [["Poland", 0.5], ["Germany", 0.3], ["France", 0.2]], 
      diseases: [["Albinism", 0.1], ["Cystic fibrosis", 0.2], ["Sickle cell anemia", 0.3]]
    })
  }

  return (
    <div className={styles.container}>
      <Image
      src={Logo}
      width={300}
      height={300}
      alt="Logo"
    />
      <h1>Get your results</h1>
      <PinInput length={6} onComplete={setUserData} />
      <p>or</p>
      <AncestryDropBox />
    </div>
  )
}