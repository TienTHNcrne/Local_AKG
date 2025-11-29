/** @format */

import React from 'react';
import Maps from '../../../components/Maps/Maps';
import styles from './Location.module.scss';
export default function Location() {
    return (
        <div className={styles.container}>
            <Maps className={styles.map} />
            <div className={styles.content}>
                {/*GEOGRAPHY */}
                <div className={styles.item}>
                    <p>
                        {' '}
                        <h3>Thông tin khái quát</h3>
                        <strong>Ngày 12/6/2025</strong>, Quốc hội đã thông qua
                        Nghị quyết
                        <strong> 202/2025/QH15</strong> về sắp xếp đơn vị hành
                        chính cấp tỉnh năm 2025 (hay có thể gọi là ghị quyết sáp
                        nhập tỉnh năm 2025). Theo đó, Quốc hội đã thống nhất
                        Việt Nam sẽ có 34 tỉnh thành từ việc sáp nhập 63 tỉnh
                        thành.
                    </p>
                    <p>
                        Sắp xếp toàn bộ diện tích tự nhiên, quy mô dân số của
                        tỉnh <strong>Kiên Giang</strong> và tỉnh{' '}
                        <strong>An Giang</strong> thành tỉnh mới có tên gọi là
                        tỉnh <strong>An Giang</strong>.
                    </p>
                    <p>
                        <strong>
                            <a
                                target='blank'
                                href='https://qc.nhansu.vn/phap-luat-viet-nam/toan-van-nghi-quyet-202-2025-qh15-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-nghi-quyet-sap-nhap-tinh-nam-2025-31214.html'>
                                (Nguồn: Nhân sự)
                            </a>
                        </strong>{' '}
                    </p>{' '}
                    <p>
                        <strong>
                            <a
                                target='blank'
                                href='https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Nghi-quyet-202-2025-QH15-sap-xep-don-vi-hanh-chinh-cap-tinh-648951.aspx'>
                                Văn bản chính thức của Nghị quyết số:
                                202/2025/QH15
                            </a>
                        </strong>{' '}
                    </p>
                </div>
                <div className={styles.col}>
                    <div className={styles.item}>
                        <h3>Vị trí địa lí</h3>
                        <div className={styles.baby}>
                            {' '}
                            <p>
                                Tỉnh An Giang mới (An Giang và Kiên Giang) nằm
                                phía tây nam vùng Đồng bằng sông Cửu Long, cách
                                Thành phố Hồ Chí Minh 187km. Có vị trí địa lý
                            </p>{' '}
                            <ul>
                                <div>
                                    <li>Phía đông giáp Đồng Tháp và Cần Thơ</li>
                                    <li>Phía nam giáp Cà Mau</li>
                                    <li>Phía bắc giáp Campuchia</li>
                                    <li>Phía tây giáp Vịnh Thái Lan</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <h3>Diện tích</h3>
                        <div className={styles.baby}>
                            <p>
                                Theo Quyết định 759-QĐ-TTg năm 2025, sau sáp
                                nhập tỉnh, tỉnh An Giang có diện tích tự nhiên
                                là 9 888,91 km² .
                            </p>{' '}
                            <p>
                                <strong>
                                    <a
                                        target='blank'
                                        href='https://thuvienphapluat.vn/hoi-dap-phap-luat/dan-so-va-dien-tich-tinh-an-giang-sau-sap-nhap-tinh-theo-quyet-dinh-759-qd-ttg-138047672.html#dan-so-va-dien-tich-tinh-an-giang-sau-sap-nhap-tinh-theo-quyet-dinh-759-qd-ttg-0'>
                                        (Nguồn: Thư viện pháp luật)
                                    </a>
                                </strong>
                            </p>{' '}
                            <br />
                            <p>
                                <strong>
                                    Các bạn hãy bấm vào tường địa điểm trên bản
                                    đồ để biết thông tin chi tiết về diện tích
                                    tường khu vực nhé!
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.col2}>
                    <div className={styles.item}>
                        <h3>Dân số</h3>
                        <div className={styles.baby}>
                            <p>
                                {' '}
                                Theo Quyết định 759-QĐ-TTg năm 2025, sau sáp
                                nhập tỉnh, tỉnh An Giang có dân số là 3.679.200
                                người.
                            </p>
                            <p>
                                <strong>
                                    <a
                                        target='blank'
                                        href='https://thuvienphapluat.vn/hoi-dap-phap-luat/dan-so-va-dien-tich-tinh-an-giang-sau-sap-nhap-tinh-theo-quyet-dinh-759-qd-ttg-138047672.html#dan-so-va-dien-tich-tinh-an-giang-sau-sap-nhap-tinh-theo-quyet-dinh-759-qd-ttg-0'>
                                        (Nguồn: Thư viện pháp luật)
                                    </a>
                                </strong>
                            </p>{' '}
                            <br />
                            <p>
                                <strong>
                                    Các bạn hãy bấm vào từng địa điểm trên bản
                                    đồ để biết thông tin chi tiết về dân số từng
                                    khu vực nhé!
                                </strong>
                            </p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <h3>Địa hình</h3>
                        <div className={styles.baby}>
                            <p>
                                Địa hình ở An Giang khá đa dạng, có đồng bằng,
                                nhiều sông rạch (đầu nguồn sông Cửu Long), có
                                núi, có biên giới, bờ biển dài (hơn 200km), với
                                hơn 100 đảo lớn nhỏ, nhiều sông núi, kênh rạch
                                và hải đảo; phần đất liền tương đối bằng phẳng,
                                có hướng thấp dần theo hướng đông bắc – tây nam.
                                Đồng bằng An Giang có 2 dạng chính: đồng bằng
                                phù sa, tiêu biểu là dạng cồn bãi (cù lao); dạng
                                thứ hai là đồng bằng ven núi, tập trung quanh
                                chân núi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
