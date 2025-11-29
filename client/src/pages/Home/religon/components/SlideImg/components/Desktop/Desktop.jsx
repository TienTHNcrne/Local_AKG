import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./Desktop.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Desktop() {
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button
                className={`${styles.arrow} ${styles.prev}`}
                onClick={onClick}
                style={{ ...style }}
                aria-label="Previous slide"
            >
                ‹
            </button>
        );
    }

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button
                className={`${styles.arrow} ${styles.next}`}
                onClick={onClick}
                style={{ ...style }}
                aria-label="Next slide"
            >
                ›
            </button>
        );
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false, // Ẩn mũi tên trên mobile
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                },
            },
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const [phat, setPhat] = useState([
        "/imgs/end/phat/1.png",
        "/imgs/end/phat/2.png",
        "/imgs/end/phat/3.png",
        "/imgs/end/phat/4.png",
        "/imgs/end/phat/5.png",
        "/imgs/end/phat/6.png",
        "/imgs/end/phat/7.png",
    ]);
    const [tc, setTc] = useState([
        "/imgs/end/tc/1.png",
        "/imgs/end/tc/2.png",
        "/imgs/end/tc/3.png",
        "/imgs/end/tc/4.png",
    ]);
    const [cd, setCd] = useState([
        "/imgs/end/cd/1.png",
        "/imgs/end/cd/2.png",
        "/imgs/end/cd/3.png",
        "/imgs/end/cd/4.png",
    ]);
    const [hh, setHh] = useState([
        "/imgs/end/HH/1.png",
        "/imgs/end/HH/2.png",
        "/imgs/end/HH/3.png",
    ]);
    const [hoi, setHoi] = useState([
        "/imgs/end/hoi/1.png",
        "/imgs/end/hoi/2.png",
        "/imgs/end/hoi/3.png",
        "/imgs/end/hoi/4.png",
        "/imgs/end/hoi/5.png",
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Tôn Giáo</h2>
                <p className={styles.intro}>
                    An Giang là tỉnh giàu bản sắc tôn giáo của vùng đồng bằng
                    sông Cửu Long, nơi nhiều tôn giáo và tín ngưỡng cùng tồn
                    tại, hòa quyện với đời sống cộng đồng các dân tộc. Phật giáo
                    chiếm vị trí quan trọng với cả hệ phái Bắc tông và Nam tông
                    Khmer gắn liền với đồng bào Khmer; Công giáo, Tin Lành, Cao
                    Đài, Phật giáo Hòa Hảo, Hồi giáo của người Chăm cùng nhiều
                    tôn giáo, tín ngưỡng bản địa như Tịnh độ Cư sĩ Phật hội Việt
                    Nam, Tứ Ân Hiếu Nghĩa, Bửu Sơn Kỳ Hương, Minh sư đạo, Minh
                    lý đạo, Baha'i, Đạo Bà-la-môn hay Giáo hội Các Thánh hữu
                    Ngày sau của Chúa Giêsu Kitô. Mỗi tôn giáo đều có hệ thống
                    cơ sở thờ tự, lễ hội và nghi thức đặc trưng, vừa đáp ứng đời
                    sống tâm linh, vừa góp phần giữ gìn, lan tỏa giá trị văn
                    hóa, tạo nên một không gian sinh hoạt tôn giáo phong phú,
                    đậm tính cộng đồng.
                </p>
            </div>
            <div className={styles.sliderContainer}>
                <Slider {...settings}>
                    <div className={styles.item}>
                        <h3>Đạo Phật</h3>
                        <div className={styles.phatImgs}>
                            <div className={styles.PhatRow1}>
                                <img
                                    src={phat[1]}
                                    alt="Hình ảnh Đạo Phật"
                                    className={styles.ColPhat11}
                                />
                                <img
                                    src={phat[0]}
                                    alt="Hình ảnh Đạo Phật"
                                    className={styles.ColPhat21}
                                />
                            </div>
                            <div className={styles.PhatRow2}>
                                <img src={phat[2]} alt="Hình ảnh Đạo Phật" />
                                <img src={phat[3]} alt="Hình ảnh Đạo Phật" />
                                <img src={phat[4]} alt="Hình ảnh Đạo Phật" />
                            </div>
                            <div className={styles.PhatRow3}>
                                <img
                                    src={phat[5]}
                                    alt="Hình ảnh Đạo Phật"
                                    className={styles.ColPhat13}
                                />
                                <img
                                    src={phat[6]}
                                    alt="Hình ảnh Đạo Phật"
                                    className={styles.ColPhat23}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Đạo Hồi</h3>
                        <div className={styles.gridHoi}>
                            <div className={styles.HoiRow1}>
                                <img
                                    src={hoi[0]}
                                    alt="Hình ảnh Đạo Hồi"
                                    className={styles.HoiCol11}
                                />
                                <div className={styles.HoiCol12}>
                                    <img src={hoi[1]} alt="Hình ảnh Đạo Hồi" />
                                    <img src={hoi[2]} alt="Hình ảnh Đạo Hồi" />
                                </div>
                            </div>
                            <div className={styles.HoiRow2}>
                                <img src={hoi[3]} alt="Hình ảnh Đạo Hồi" />
                                <img src={hoi[4]} alt="Hình ảnh Đạo Hồi" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Đạo Cao Đài</h3>
                        <div className={styles.gridCd}>
                            <img
                                src={cd[3]}
                                alt="Hình ảnh Đạo Cao Đài"
                                className={styles.cdRow1}
                            />
                            <div className={styles.cdRow2}>
                                <img
                                    src={cd[0]}
                                    alt="Hình ảnh Đạo Cao Đài"
                                    className={styles.cdCol1}
                                />
                                <div className={styles.cdCol2}>
                                    <img
                                        src={cd[2]}
                                        alt="Hình ảnh Đạo Cao Đài"
                                    />
                                    <img
                                        src={cd[1]}
                                        alt="Hình ảnh Đạo Cao Đài"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Đạo Hoà Hảo</h3>
                        <div className={styles.gridhh}>
                            <div className={styles.hhcol1}>
                                <img src={hh[2]} alt="Hình ảnh Đạo Hoà Hảo" />
                                <img src={hh[1]} alt="Hình ảnh Đạo Hoà Hảo" />
                            </div>
                            <div className={styles.hhcol2}>
                                <img src={hh[0]} alt="Hình ảnh Đạo Hoà Hảo" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Đạo Thiên Chúa</h3>
                        <div className={styles.gridTc}>
                            <img
                                src={tc[0]}
                                alt="Hình ảnh Đạo Thiên Chúa"
                                className={styles.col1}
                            />
                            <div className={styles.col2}>
                                <img
                                    src={tc[3]}
                                    alt="Hình ảnh Đạo Thiên Chúa"
                                    className={styles.row1}
                                />
                                <div className={styles.row2}>
                                    <img
                                        src={tc[2]}
                                        alt="Hình ảnh Đạo Thiên Chúa"
                                    />
                                    <img
                                        src={tc[1]}
                                        alt="Hình ảnh Đạo Thiên Chúa"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}
