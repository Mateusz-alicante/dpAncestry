import { TextInput, rem } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import styles from "./Chat.module.css";

import { ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

import { useState } from 'react';

import { useAtom } from 'jotai'
import {dataAtom} from '../../../utils/atoms'

export default () => {

    const [data, setData] = useAtom(dataAtom)
    const [loading, setLoading] = useState(false);

    const [currentInput, setCurrentInput] = useState('');
    const [messages, setMessages] = useState([]); // [ { message: "Hello", from: "user" }, { message: "Hi", from: "bot" } ]
  const icon = <IconBrandHipchat style={{ width: rem(16), height: rem(16) }} />;

  const fetchMessage = async (message) => {
    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { message: currentInput, from: "user" }]);
    setCurrentInput('');
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ currentInput, data }),
        headers: {
            'Content-Type': 'application/json',
        },
        });

    const responseData = await response.json();
    console.log(responseData);
    setMessages((prevMessages) => [...prevMessages, { message: responseData.message.content[0].text.replace(/\n/g, '<br>'), from: "bot" }]);
    setLoading(false);
  };
  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.chatzone}>
            {messages.map((msg, index) => (
                <div key={index} className={styles.message}>
                <div className={styles[msg.from]}>
                    <p dangerouslySetInnerHTML={msg}></p>
                </div>
                </div>
            ))}
        </div>
        <div className={styles.inputContainer}>
            <TextInput
            style={{
                width: "50em",
                margin: "0 1em",
            }}
            leftSectionPointerEvents="none"
            leftSection={icon}
            label="Ask about your results"
            placeholder="Prompt"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.currentTarget.value)}
        />

<ActionIcon
      variant="gradient"
      size="55"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      onClick={fetchMessage}
      loading={loading}
    >
      <IconSend />
    </ActionIcon>

        
        </div>
      </div>
    </>
  );
}