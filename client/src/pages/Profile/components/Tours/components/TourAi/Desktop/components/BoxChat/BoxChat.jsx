/** @format */

import React, { useEffect, useRef, useState } from 'react';
import styles from './BoxChat.module.scss';
import ReactMarkDown from 'react-markdown';
import { useTour } from '../../Contexts/useTour';
import clsx from 'clsx';
export default function BoxChat({ className }) {
    const { chatPresent } = useTour();
    const contentRef = useRef(null);
    const [isNew, setIsNew] = useState(false);
    const assistantAi = chatPresent.filter(v => v.role === 'assistant');

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
        setIsNew(true);
    }, [chatPresent]);

    return (
        <div className={className}>
            <div
                ref={contentRef}
                className={styles.ChatAiContainer}>
                <div className={styles.ChatAi}>
                    {assistantAi.map((value, id) => (
                        <div
                            className={clsx(styles.answer, {
                                [styles.new]:
                                    isNew && id === assistantAi.length - 1,
                            })}
                            key={id}>
                            <ReactMarkDown>{value.text}</ReactMarkDown>
                            <button
                                type='button'
                                className={styles.SaveTour}>
                                Lưu chuyến đi
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
