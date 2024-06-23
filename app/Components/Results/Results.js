import { useAtom } from 'jotai'
import { dataAtom } from '../../utils/atoms';

import Navbar from "./Navbar/Navbar";
import { useState } from 'react';

import styles from './Results.module.css'

import {
    IconBrandHipchat,
    IconWorld,
    IconHealthRecognition,
  } from '@tabler/icons-react';

import AncestryResults from './Ancestry/Ancestry';
import Chat from './Chat/Chat'
import Diseases from './Diseases/Diseases'


export default () => {
    const [data, setData] = useAtom(dataAtom)

    const [activeTab, setActiveTab] = useState("Ancestry");

    const tabs = [
        { icon: IconBrandHipchat, label: 'Chat', onClick: () => setActiveTab("Chat") },
        { icon: IconWorld, label: 'Ancestry', onClick: () => setActiveTab("Ancestry") },
        { icon: IconHealthRecognition, label: 'Health', onClick: () => setActiveTab("Health") },
      ];

    return (
    <>
        <div className={styles.resultsContainer}>
        <Navbar tabs={tabs} />
        <div className={styles.resultsTabs}>
            {activeTab === "Ancestry" && <AncestryResults />}
            {activeTab === "Chat" && <Chat />}
            {activeTab === "Health" && <Diseases />}
        </div>
        </div>
        
    </>
    )
}