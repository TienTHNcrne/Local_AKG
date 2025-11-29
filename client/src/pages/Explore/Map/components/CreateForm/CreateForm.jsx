/** @format */
import React, { useEffect, useState } from 'react';
import styles from './CreateForm.module.scss';
import Create from '../../Hooks/Create';
import useSuggest from '../../Hooks/useSuggest';
import useCheckExist from '../../Hooks/useCheckExist';
import UpImg from '../../../../../components/UpImg/UpImg';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FiMapPin, FiCalendar, FiTag, FiImage } from 'react-icons/fi';
import { MdMyLocation } from 'react-icons/md';
import GetGps from '../../../../../Hooks/GetGps/GetGps';
export default function CreateForm({
    add,
    center,
    setCenter,
    setSearch,
    search,
    AddNewLocal,
    setShow,
}) {
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [time, setTime] = useState('');
    const [check, setCheck] = useState([]);
    const suggest = useSuggest(search);
    let e = useCheckExist(center, search);
    const [exist, setExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cor, setCor] = useState(false);
    useEffect(() => {
        setExist(e);
    }, [e]);
    const choose = [
        'Biển đảo',
        'Du lịch tâm linh',
        'Danh lam thắng cảnh',
        'Di tích lịch sử',
        'Lễ hội',
        'Sở thú',
        'Khu vui chơi - giải trí',
        'Khu đô thị',
        'Chợ',
    ];

    useEffect(() => {
        if (center && search) return;
        setShowSuggest(true);
    }, [search]);

    const handleSelect = e => {
        setSearch(e.name);
        setCenter({ lat: e.lat, lng: e.lng });
        setShowSuggest(false);
    };

    const handleSubmit = async () => {
        if (check.length > 0 && description && search) {
            setLoading(true);

            try {
                if (cor) {
                    let s = search;
                    s += `, ${address}`;
                    console.log(s);
                    setSearch(s);
                }
                const categories = check.map(value => choose[value]);
                await Create({
                    center,
                    search: `${search} , ${address}`,
                    description,
                    category: categories,
                    AddNewLocal,
                    images,
                    time,
                });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setAddress('');
        setExist(false);
        setSearch('');
        setDescription('');
        setTime('');
        setCheck('');
        setImages([]);
        setCenter({ lat: null, lng: null });
        let loc = null;
        const fec = async () => {
            if (cor) {
                loc = await GetGps();
                setCenter({ lat: loc.lat, lng: loc.lng });
            }
        };
        fec();
    }, [cor]);
    return (
        <div className={`${styles.add} ${add ? styles.open : styles.close}`}>
            <div className={styles.header}>
                <h2>Thêm địa danh mới</h2>
                <button
                    className={styles.closeBtn}
                    onClick={() => {
                        setShow(false);
                    }}>
                    &times;
                </button>
            </div>

            <div className={styles.formSection}>
                <div className={styles.inputGroup}>
                    <MdMyLocation
                        onClick={() => {
                            setCor(!cor);
                        }}
                        className={`${styles.cor} ${cor && styles.activeCor}`}
                    />
                    <label htmlFor='name'>
                        <FiMapPin />
                        Tên địa điểm
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Nhập tên địa điểm'
                    />
                    {exist && (
                        <div className={styles.existWarning}>
                            Địa danh đã tồn tại!
                        </div>
                    )}
                    {cor === false && showSuggest && suggest.length > 0 && (
                        <div className={styles.suggests}>
                            {suggest.map((e, id) => (
                                <div
                                    className={styles.suggest}
                                    key={id}
                                    onClick={() => handleSelect(e)}>
                                    {e.name}
                                </div>
                            ))}
                        </div>
                    )}{' '}
                    {cor && (
                        <div className={styles.inputGroup}>
                            <label htmlFor='name'>Địa chỉ </label>{' '}
                            <input
                                type='text'
                                name='name'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder='Nhập địa chỉ'
                            />{' '}
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='description'>Mô tả</label>
                    <textarea
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Mô tả về địa điểm này...'
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='time'>
                        <FiCalendar />
                        Thời điểm thích hợp đi du lịch
                    </label>
                    <textarea
                        name='time'
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        placeholder='Ví dụ: Tháng 11 đến tháng 4 năm sau...'
                        className={styles.timeInput}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='category'>
                        <FiTag />
                        Phân loại
                    </label>
                    <div className={styles.checkboxGroup}>
                        {choose.map((value, id) => (
                            <label
                                key={id}
                                className={styles.checkboxLabel}>
                                <input
                                    type='checkbox'
                                    value={id}
                                    checked={check.includes(id)}
                                    onChange={e => {
                                        const number = Number(e.target.value);
                                        if (e.target.checked) {
                                            setCheck(p => [...p, number]);
                                        } else {
                                            setCheck(p =>
                                                p.filter(v => v !== number)
                                            );
                                        }
                                    }}
                                />
                                <span className={styles.checkmark}></span>
                                {value}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='image'>
                        <FiImage />
                        Hình ảnh
                    </label>
                    <UpImg
                        setImages={setImages}
                        className={styles.uploader}
                    />

                    {images.length > 0 && (
                        <div className={styles.imageGrid}>
                            {images.map((value, id) => (
                                <div
                                    className={styles.imageContainer}
                                    key={id}>
                                    <img
                                        src={value.URL}
                                        alt=''
                                    />
                                    <button
                                        type='button'
                                        className={styles.deleteBtn}
                                        onClick={() =>
                                            setImages(
                                                images.filter(
                                                    (_, index) => index !== id
                                                )
                                            )
                                        }>
                                        <RiDeleteBin6Fill />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                type='button'
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={
                    loading ||
                    exist ||
                    !search ||
                    !description ||
                    check.length === 0 ||
                    (cor && !address)
                }>
                {loading ?
                    <div className={styles.buttonLoading}>
                        <span className={styles.spinner}></span>
                        Đang xử lý...
                    </div>
                :   'Thêm địa danh'}
            </button>
        </div>
    );
}
