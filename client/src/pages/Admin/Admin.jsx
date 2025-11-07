/** @format */
import React, { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import axios from 'axios';

export default function Admin() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v2/api/checkAll`
                );
                setData(response.data || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async id => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            await axios.delete(
                `${import.meta.env.VITE_BE_URL}/v2/api/delete/${id}`
            );
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (err) {
            console.error('Error deleting item:', err);
            alert('Failed to delete item');
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>{error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Dashboard</h1>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tọa độ</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                        data.map(item => (
                            <tr key={item.id || item._id}>
                                <td>
                                    {item.lat && item.lng ?
                                        `${item.lat}, ${item.lng}`
                                    :   'N/A'}
                                </td>
                                <td>{item.name || 'No name'}</td>
                                <td className={styles.description}>
                                    {item.description ?
                                        item.description.length > 100 ?
                                            `${item.description.substring(0, 100)}...`
                                        :   item.description
                                    :   'No description'}
                                </td>
                                <td>
                                    <div className={styles.imgs}>
                                        {item.img?.length > 0 ?
                                            item.img.map((imageUrl, index) => (
                                                <img
                                                    key={index}
                                                    src={imageUrl}
                                                    alt={`${item.name} - ${index + 1}`}
                                                    className={styles.preview}
                                                    onError={e => {
                                                        e.target.src =
                                                            '/placeholder-image.jpg';
                                                    }}
                                                />
                                            ))
                                        :   <span className={styles.noImage}>
                                                No images
                                            </span>
                                        }
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className={`${styles.status} ${styles[item.status]}`}>
                                        {item.status || 'Unknown'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDelete(item.id || item._id)
                                        }
                                        className={styles.deleteBtn}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    :   <tr>
                            <td
                                colSpan='6'
                                className={styles.empty}>
                                No data available
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
