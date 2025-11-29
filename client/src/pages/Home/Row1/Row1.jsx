/** @format */
import React from 'react';
import styles from './Row1.module.scss';
import { useAuth } from '../../../Contexts/Auth/Auth';
import video from '../../../assets/BackgroundHome.mp4';
export default function Row1() {
    const { userId } = useAuth();
    const Month = new Date().getMonth() + 1;
    const ReturnMonth = month => {
        if (month === 12) return 12;

        month = month - 12 * Math.floor(month / 12);
        if (month < 10) {
            return '0' + month;
        }
        return month;
    };
    return (
        <div className={styles.container}>
            <video
                autoPlay
                loop
                muted
                className={styles.video}>
                <source
                    src={video}
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
            <div className={styles.backgroundOverlay}>
                <div className={styles.left}>
                    <div className={styles.Text}>
                        <div className={styles.Title}>
                            <h1>
                                <strong>Khám phá</strong> vùng đất An Giang
                            </h1>
                            <p>Nơi sơn thuỷ hải giao hoà một cõi</p>
                        </div>

                        <p>
                            An Giang - vùng đất nổi tiếng với những cánh đồng
                            lúa bạt ngàn, những ngọn núi hùng vĩ và nền văn hóa
                            đa dạng của các dân tộc Kinh, Chăm, Hoa, Khmer.
                        </p>
                        <p>
                            Nơi đây không chỉ có cảnh quan thiên nhiên tươi đẹp
                            mà còn lưu giữ nhiều giá trị văn hóa, lịch sử đặc
                            sắc của vùng đồng bằng sông Cửu Long.
                        </p>
                        <button
                            className={styles.ExtendExplore}
                            onClick={() => {
                                window.scrollTo({
                                    top: 900,
                                    behavior: 'smooth',
                                });
                            }}>
                            Khám phá ngay
                        </button>
                    </div>
                    {!userId ?
                        <div className={styles.register}>
                            <h3>Lợi ích của việc đăng kí: </h3>
                            <div className={styles.advantages}>
                                <ul>
                                    <li>Lưu trữ địa điểm yêu thích</li>
                                    <li>
                                        AI tự động tạo hành trình cá nhân hóa
                                    </li>
                                    <li>Đóng góp nội dung cho cộng đồng</li>
                                    <li>Nhận đề xuất phù hợp với bạn</li>
                                    <li>Đánh giá và chia sẻ trải nghiệm</li>
                                </ul>
                            </div>
                            {/*------ ADVANTAGES OF LOGIN ------*/}
                            <div className={styles.function}>
                                <button> Đăng nhập</button>
                                <button className={styles.SU}>Đăng ký</button>
                            </div>{' '}
                        </div>
                    :   <div className={styles.AfterRes}>
                            <div className={styles.card}>
                                <h4>Khám phá bản đồ </h4>

                                <div className={styles.benefits}>
                                    <ul>
                                        <li>Tìm địa điểm theo khu vực</li>
                                        <li>Lưu địa điểm yêu thích</li>
                                        <li>Đánh giá và chia sẻ</li>
                                        <li>Đóng góp địa điểm mới</li>
                                    </ul>
                                </div>
                                <button
                                    className={styles.btn}
                                    onClick={() =>
                                        (window.location.href = '/explore/map')
                                    }>
                                    Mở Bản đồ
                                </button>
                            </div>
                            <div className={styles.card}>
                                <h4>AI Tạo Hành Trình</h4>

                                <div className={styles.benefits}>
                                    <ul>
                                        <li>Cá nhân hóa theo sở thích</li>
                                        <li>Tối ưu thời gian di chuyển</li>
                                        <li>Đề xuất thông minh</li>
                                    </ul>
                                </div>
                                <button
                                    className={styles.btn}
                                    onClick={() =>
                                        (window.location.href = '/ai-journey')
                                    }>
                                    Tạo Hành Trình AI
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.right}>
                    {' '}
                    <h2>Tháng</h2>
                    <div className={styles.fi}>
                        <h3>{ReturnMonth(Month - 2)}</h3>
                        <h3>{ReturnMonth(Month - 1)}</h3>
                        <h3 className={styles.main}>{Month}</h3>{' '}
                        <h3>{ReturnMonth(Month + 1)}</h3>{' '}
                        <h3>{ReturnMonth(Month + 2)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
