/** @format */

import React from 'react';
import styles from './ReqCreatingTour.module.scss';
import { useTour } from '../../Contexts/useTour';
import useSendReq from '../../../Hooks/useReq';
import { toast } from 'react-toastify';

export default function ReqCreatingTour({ className }) {
    const { days, setDays, budget, setBudget, startPlace, setStartPlace } =
        useTour();
    const sendRequest = useSendReq();

    const onSubmit = async () => {
        // Kiểm tra form
        let missingFields = [];
        if (!days) missingFields.push('số ngày bạn muốn đi');
        if (!budget) missingFields.push('số tiền bạn có thể chi');
        if (!startPlace) missingFields.push('nơi bạn bắt đầu');

        if (missingFields.length > 0) {
            toast.warning(`Hãy nhập ${missingFields.join(', ')}`);
            return;
        }

        try {
            await sendRequest();
            toast.success('Tạo tour thành công!');
        } catch (err) {
            toast.error(`Tạo tour thất bại: ${err.message}`);
        }
    };

    return (
        <div className={className}>
            <div className={styles.row1}>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <label>Số ngày bạn muốn đi</label>
                        <input
                            type='number'
                            min='1'
                            value={days}
                            onChange={e => setDays(e.target.value)}
                            placeholder='Nhập số ngày'
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Số tiền bạn muốn chi (triệu đồng)</label>
                        <input
                            type='number'
                            min='1'
                            value={budget}
                            onChange={e => setBudget(e.target.value)}
                            placeholder='Nhập số tiền'
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Nơi bạn bắt đầu</label>
                        <input
                            type='text'
                            value={startPlace}
                            onChange={e => setStartPlace(e.target.value)}
                            placeholder='Nhập địa điểm'
                            required
                        />
                    </div>

                    <button
                        onClick={onSubmit}
                        type='button'
                        className={styles.ReqCreating}>
                        Tạo hành trình
                    </button>
                </div>
            </div>
        </div>
    );
}
