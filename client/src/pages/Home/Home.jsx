/** @format */
import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import '@ant-design/v5-patch-for-react-19';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { FaRoute } from 'react-icons/fa';
import { RiGuideFill } from 'react-icons/ri';
export default function Home() {
    const navigate = useNavigate();

    const goToNextPage = () => {
        if (localStorage.getItem('userid')) {
            navigate('/profile');
        } else {
            console.log('oke');
            notification.info({
                message: 'Thông báo',
                description: 'Bạn cần đăng nhập để dùng chức năng này ',
            });
        }
    };
    return (
        <div className={styles.container}>
            {/* Hero */}
            <button
                className={styles.guide}
                onClick={() => navigate('/guide')}>
                {' '}
                <RiGuideFill />
                <span>Hướng dẫn dùng website</span>
            </button>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h2>Khám phá vùng đất An Giang</h2>
                    <p className={styles.miniDescribe}>
                        Nơi sơn thuỷ hải giao hoà một cõi
                    </p>
                    <p>
                        An Giang - vùng đất nổi tiếng với những cánh đồng lúa
                        bạt ngàn, những ngọn núi hùng vĩ và nền văn hóa đa dạng
                        của các dân tộc Kinh, Chăm, Hoa, Khmer.
                    </p>
                    <p>
                        Nơi đây không chỉ có cảnh quan thiên nhiên tươi đẹp mà
                        còn lưu giữ nhiều giá trị văn hóa, lịch sử đặc sắc của
                        vùng đồng bằng sông Cửu Long.
                    </p>
                    <div
                        className={styles.btn}
                        onClick={goToNextPage}>
                        <FaRoute /> Dựng chuyến du lịch An Giang
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <img
                        src='/imgs/licensed-image.jpg'
                        alt='Cảnh đẹp An Giang'
                    />
                </div>
            </section>

            {/* Features */}
            <h2 className={styles.sectionTitle}>Điểm Nổi Bật</h2>
            <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                    <img
                        src='/imgs/festival/kinh/1.jpg'
                        alt='Tổng quan An Giang'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Tổng quan</h3>
                        <p>
                            An Giang nằm ở vùng đồng bằng sông Cửu Long, giáp
                            biên giới Campuchia, nổi bật với cảnh quan sông nước
                            và núi non hùng vĩ.
                        </p>
                        <Link
                            to='/Location'
                            className={styles.btn}>
                            Khám phá
                        </Link>
                    </div>
                </div>

                <div className={styles.featureCard}>
                    <img
                        src='/imgs/KSAG-2.png'
                        alt='Lịch sử An Giang'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Lịch sử</h3>
                        <p>
                            Với hơn 200 năm hình thành, An Giang lưu giữ nhiều
                            di tích lịch sử quan trọng gắn liền với quá trình
                            khai phá miền Tây Nam Bộ.
                        </p>
                        <Link
                            to='/History'
                            className={styles.btn}>
                            Tìm hiểu
                        </Link>
                    </div>
                </div>

                <div className={styles.featureCard}>
                    <img
                        src='/Rectangle17.png'
                        alt='Địa điểm và món ăn đặc sản'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Địa điểm & Ẩm thực</h3>
                        <p>
                            Nổi tiếng với rừng tràm Trà Sư, núi Cấm, chợ nổi
                            Long Xuyên cùng những món ngon như mắm Châu Đốc, gỏi
                            sầu đâu, lẩu mắm.
                        </p>
                        <Link
                            to='/Explore/TinhHoa'
                            className={styles.btn}>
                            Khám phá
                        </Link>
                    </div>
                </div>

                <div className={styles.featureCard}>
                    <img
                        src='/imgs/KH.jpg'
                        alt='Khí hậu An Giang'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Khí hậu</h3>
                        <p>
                            Khí hậu nhiệt đới gió mùa, nắng ấm quanh năm, chia
                            thành mùa mưa và mùa khô rõ rệt, thích hợp cho nông
                            nghiệp và du lịch.
                        </p>
                        <Link
                            to='/Climate'
                            className={styles.btn}>
                            Tìm hiểu
                        </Link>
                    </div>
                </div>

                <div className={styles.featureCard}>
                    <img
                        src='/imgs/ethnic_4.png'
                        alt='Dân tộc và phong tục An Giang'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Dân tộc & Lễ Hội</h3>
                        <p>
                            Người Kinh, Khmer, Chăm và Hoa cùng chung sống hòa
                            thuận, tạo nên một nền văn hóa đa dạng với nhiều lễ
                            hội truyền thống đặc sắc.
                        </p>
                        <Link
                            to='/CulSoc'
                            className={styles.btn}>
                            Khám phá
                        </Link>
                    </div>
                </div>

                <div className={styles.featureCard}>
                    <img
                        src='/imgs/end/hoi/1.png'
                        alt='Tôn giáo và tín ngưỡng An Giang'
                        className={styles.featureImg}
                    />
                    <div className={styles.featureContent}>
                        <h3>Tôn giáo & Tín ngưỡng</h3>
                        <p>
                            An Giang là cái nôi của nhiều tôn giáo và tín
                            ngưỡng, nổi bật như Phật giáo Hòa Hảo, Bửu Sơn Kỳ
                            Hương, cùng các ngôi chùa cổ kính.
                        </p>
                        <Link
                            to='/Religion'
                            className={styles.btn}>
                            Tìm hiểu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Highlight */}
            <div className={styles.highlight}>
                <h2>An Giang qua những con số</h2>
                <p>
                    Khám phá những con số ấn tượng về vùng đất và con người An
                    Giang
                </p>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>4.9+</div>
                        <div className={styles.statLabel}>Triệu dân</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>9.889</div>
                        <div className={styles.statLabel}>km² diện tích</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
