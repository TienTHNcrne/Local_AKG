/** @format */

import React from 'react';
import styles from './After.module.scss';
export default function After() {
    const highlights = [
        {
            title: 'Bải sao',
            desc: 'Đảo nổi tiếng, biển xanh, cát trắng, hải sản tươi ngon.',
            img: '/imgs/bai-sao	.jpg',
        },
        {
            title: 'Nam Du',
            desc: 'Quần đảo hoang sơ, trải nghiệm câu cá, lặn biển.',
            img: '/imgs/Nam-du.jpg',
        },
        {
            title: 'Hòn Sơn',
            desc: 'Thành phố biển gần biên giới, cảnh quan núi non, lịch sử văn hóa.',
            img: '/imgs/hon-son.jpg',
        },
        {
            title: 'Miếu Bà Chúa Xứ',
            desc: 'Điểm tâm linh nổi tiếng ở An Giang.',
            img: '/imgs/chua-xu.jpg',
        },
        {
            title: 'Rừng Tràm Trà Sư',
            desc: 'Du thuyền ngắm thiên nhiên, chim, động vật hoang dã.',
            img: '/imgs/rung-tram.jpg',
        },
        {
            title: 'Hồ Soài So',
            desc: 'Sinh thái miền Tây sông nước, trải nghiệm dân dã.',
            img: '/imgs/ho-soai-so.jpg',
        },
    ];
    return (
        <div className={styles.container}>
            {/*BASIC */}
            <div className={styles.basic}>
                <h3>Thông tin khái quát</h3>
                <p>
                    Sau khi sáp nhập An Giang có diện tích lớn nhất Đồng bằng
                    sông Cửu Long: 9.888 km², dân số khoảng 5 triệu người.
                </p>
                <p>
                    Trung tâm hành chính: <strong>Rạch Giá</strong>
                </p>
                <p>
                    Đặc khu nổi bật:{' '}
                    <strong>Phú Quốc, Kiên Hải, Thổ Châu</strong>
                </p>
            </div>
            {/*Địa điểm đáng chú ý */}
            <div className={styles.highlights}>
                <h3>Điểm nhấn du lịch</h3>
                <p>
                    Tỉnh mới giờ vừa có biển đảo (Phú Quốc, Nam Du, Hà Tiên) vừa
                    có núi non, tâm linh (Châu Đốc, Núi Cấm, Miếu Bà Chúa Xứ).
                    <br />
                    Đa dạng văn hóa: Chăm, Khmer, Hoa, Kinh.
                    <br />
                    Ẩm thực phong phú: hải sản Phú Quốc – Hà Tiên + đặc sản miền
                    núi An Giang.
                </p>
                <div className={styles.cards}>
                    {highlights.map((h, idx) => (
                        <div
                            key={idx}
                            className={styles.card}>
                            <img
                                src={h.img}
                                alt={h.title}
                            />
                            <h4>{h.title}</h4>
                            <p>{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
