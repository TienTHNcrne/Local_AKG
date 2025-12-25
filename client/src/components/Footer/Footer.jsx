/** @format */

// Footer.jsx
import React, { use } from 'react';
import styles from './Footer.module.scss';
import { FaPhone, FaEnvelope, FaAngleRight } from 'react-icons/fa';
import { MdEditNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Section 1 */}
                <div className={styles.footerSection}>
                    <h3>Tài nguyên văn hoá</h3>
                    <ul className={styles.footerLinks}>
                        <li>
                            <Link to='/Explore/TinhHoa'>
                                <FaAngleRight /> Tinh Hoa An Giang
                            </Link>
                        </li>
                        <li>
                            <Link to='/CulSoc'>
                                <FaAngleRight />
                                Dân tộc và lễ hội
                            </Link>
                        </li>
                        <li>
                            <Link to='/Religion'>
                                <FaAngleRight />
                                Tôn Giáo và Tín ngưỡng
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div className={styles.footerSection}>
                    <h3>Liên kết nhanh</h3>
                    <ul className={styles.footerLinks}>
                        <li>
                            <Link to='/'>
                                <FaAngleRight /> Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to='/Explore/map'>
                                <FaAngleRight /> Bản đồ
                            </Link>
                        </li>

                        <li>
                            <Link to='/About'>
                                <FaAngleRight /> Giới thiệu
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 3 */}
                {/* Section 3 */}
                <div className={styles.footerSection}>
                    <h3>Thông tin liên hệ</h3>
                    <ul className={styles.footerLinks}>
                        <li>
                            <a href='tel:+84ABC'>
                                <FaPhone /> +84 0836816673
                            </a>
                        </li>
                        <li>
                            <a href='mailto:tienguyen3541@gmail.com'>
                                <FaEnvelope /> tienguyen3541@gmail.com
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://forms.gle/WDhh3EqcmEmwry9q6'
                                target='_blank'
                                rel='noopener noreferrer'>
                                <MdEditNote style={{ fontSize: '22px' }} /> Gửi
                                góp ý / hỗ trợ
                            </a>
                        </li>{' '}
                        <li>
                            <a href='/guide'>
                                <MdEditNote style={{ fontSize: '22px' }} />
                                Hướng dẫn sử dụng website
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>© 2025 - Dự án Du lịch An Giang.</p>
            </div>
        </footer>
    );
}
