/** @format */
import React, { useEffect, useState } from 'react';
import styles from './SelectPlaces.module.scss';
import clsx from 'clsx';
import GetPlace from '../../../Hooks/GetPlace';
import { useTour } from '../../Contexts/useTour';
export default function SelectPlaces({ className }) {
    const Places = GetPlace();
    const { setLovePlaces, lovePlaces } = useTour();
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        setConfirm(lovePlaces.size === Places.length);
    }, [lovePlaces, Places]);
    return (
        <div className={className}>
            <h2>Địa điểm muốn đi</h2>

            <div className={styles.choosePlace}>
                <div className={styles.checkAll}>
                    <input
                        type='checkbox'
                        name='All'
                        id='All'
                        checked={confirm}
                        onChange={e => {
                            if (e.target.checked === true) {
                                const newMap = new Map();
                                for (const i of Places) {
                                    newMap.set(i.name, {
                                        pos: { lat: i.lat, lng: i.lng },
                                    });
                                }
                                setLovePlaces(newMap);

                                setConfirm(true);
                            } else {
                                setConfirm(false);
                                setLovePlaces(new Map());
                            }
                        }}
                    />
                    <label htmlFor='All'>
                        {' '}
                        <h3>Đánh dấu tất cả</h3>
                    </label>{' '}
                </div>
                <div className={styles.cards}>
                    {Places.map((value, id) => (
                        <div
                            className={clsx(styles.card, {
                                [styles.tick]: lovePlaces.has(value.name),
                            })}
                            key={id}
                            onClick={() => {
                                if (lovePlaces.has(value.name)) {
                                    setLovePlaces(prev => {
                                        const newMap = new Map(prev);
                                        newMap.delete(value.name);
                                        return newMap;
                                    });
                                } else {
                                    setLovePlaces(prev => {
                                        const newMap = new Map(prev);
                                        newMap.set(value.name, {
                                            pos: {
                                                lat: value.lat,
                                                lng: value.lng,
                                            },
                                        });
                                        return newMap;
                                    });
                                }
                            }}>
                            <img
                                src={value.img}
                                alt=''
                            />
                            <div className={styles.text}>
                                <h3>{value.name.split(',')[0]}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
