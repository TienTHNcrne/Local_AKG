/** @format */

import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './Layout.module.scss';
import AI from '../components/AI/AI';
export default function Before_Login({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.extra}>
                <AI />
            </div>
            <div className={styles.content}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
}
