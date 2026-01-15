/** @format */
import React from "react";
import styles from "./About.module.scss";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className={styles.about}>
            <section className={styles.intro}>
                <h1>AGiLand — Hành trình khám phá An Giang </h1>
                <p>
                    Chào bạn! Chúng tôi là <strong>Nguyễn Quốc Tiến</strong> và{" "}
                    <strong>Trần Mai Ái My</strong>, những học sinh cấp 3 với
                    đam mê công nghệ và khao khát mang đến một góc nhìn mới mẻ,
                    sống động về quê hương An Giang sau sáp nhập. Dự án này
                    không chỉ là một bài thi Khoa học Kỹ thuật, mà còn là tấm
                    bản đồ du lịch số do chính cộng đồng kiến tạo.
                </p>
            </section>

            <div className={styles.container}>
                {/* 1. Câu chuyện */}
                <section className={styles.section}>
                    <h2>01. Câu Chuyện: Từ Ý Tưởng Đến Hành Trình</h2>
                    <p>
                        Là người con An Giang, chúng tôi hiểu rằng vẻ đẹp thực
                        sự của một vùng đất không nằm trong sách vở, mà nằm ở
                        những trải nghiệm chân thật nhất. Từ đó, ý tưởng về một
                        trang web <strong>tương tác hai chiều</strong> ra đời,
                        nơi mọi du khách không chỉ <strong>nhận</strong> thông
                        tin mà còn có thể <strong>chia sẻ</strong> và{" "}
                        <strong>đóng góp</strong> trải nghiệm của chính mình,
                        cùng nhau vẽ nên bức tranh toàn cảnh và chân thực nhất
                        về An Giang.
                    </p>
                </section>

                {/* 2. Sứ mệnh & Tầm nhìn */}
                <section className={styles.section}>
                    <h2>02. Sứ Mệnh &amp; Tầm Nhìn</h2>
                    <div className={styles.gridTwo}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                <span className={styles.icon}>🎯</span>
                                <h3> Sứ Mệnh</h3>
                            </div>{" "}
                            <p>
                                Tạo ra một <strong>nền tảng mở</strong> – nơi
                                bất kỳ ai yêu mến An Giang cũng có thể cùng nhau
                                xây dựng, cập nhật và sở hữu một cẩm nang du
                                lịch số khổng lồ, đáng tin cậy và miễn phí.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                <span className={styles.icon}>🌱</span>{" "}
                                <h3> Tầm Nhìn</h3>
                            </div>{" "}
                            <p>
                                Trở thành điểm hẹn của cộng đồng những người đam
                                mê khám phá, biến An Giang thành một điểm đến
                                luôn mới mẻ và hấp dẫn thông qua những đánh giá,
                                bình luận và đóng góp không ngừng nghỉ.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Điểm khác biệt */}
                <section className={styles.section}>
                    <h2>03. Điểm Khác Biệt: Sức Mạnh Đến Từ Cộng Đồng</h2>
                    <div className={styles.gridThree}>
                        <div className={styles.feature}>
                            <div className={styles.title}>
                                <span className={styles.icon}>🗺️</span>
                                <h4>Bản Đồ Động</h4>
                            </div>
                            <p>
                                Mỗi địa điểm đều “thở” bằng{" "}
                                <strong>
                                    đánh giá sao, bình luận và ảnh thật
                                </strong>
                                từ cộng đồng, giúp bạn có cái nhìn khách quan
                                trước khi ghé thăm.
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.title}>
                                <span className={styles.icon}>➕</span>
                                <h4>Kho Dữ Liệu Mở</h4>
                            </div>
                            <p>
                                Phát hiện quán ăn ngon hay góc sống ảo vô danh?
                                Hãy <strong>thêm địa điểm mới</strong> và cùng
                                quảng bá vẻ đẹp An Giang đến với muôn người.
                            </p>
                        </div>{" "}
                        <div className={styles.feature1}>
                            <div className={styles.title}>
                                <span className={styles.icon}>🤖</span>
                                <h4>AI Xây Dựng Hành Trình</h4>
                            </div>
                            <p>
                                Công cụ AI giúp dựng hành trình chi tiết chỉ với
                                1 cú click. AI học từ{" "}
                                <strong>
                                    đánh giá, bình luận, gợi ý của cộng đồng
                                </strong>{" "}
                                để đưa ra lịch trình thông minh, cảnh báo thời
                                tiết và gợi ý thực tế về trang phục, phong cách
                                chụp ảnh, ứng xử văn hoá.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Bạn có thể làm gì */}
                <section className={styles.section}>
                    <h2>04. Những Gì Bạn Có Thể Làm Ở Đây</h2>
                    <ul className={styles.checklist}>
                        <li>
                            Tận hưởng chuyến đi trọn vẹn với lịch trình thông
                            minh.
                        </li>
                        <li>Khám phá hàng trăm địa điểm, món ăn, lễ hội.</li>
                        <li>Đánh giá và bình luận về nơi bạn đã đến.</li>
                        <li>Chia sẻ hành trình, trải nghiệm cá nhân.</li>
                        <li>
                            Đóng góp địa điểm yêu thích vào kho dữ liệu chung.
                        </li>
                    </ul>
                </section>

                {/* 5. Team */}
                <section className={styles.section}>
                    <h2>05. Đội Ngũ Phát Triển</h2>
                    <div className={styles.team}>
                        <div className={styles.memberHD}>
                            <h4>Giáo viên hướng dẫn: Nguyễn Thị Vành Khuyên</h4>
                            <p>
                                “Mình là giáo viên hướng dẫn, hỗ trợ định hướng
                                dự án, góp ý kỹ thuật và đảm bảo dự án hoàn
                                thiện, chuyên nghiệp.”
                            </p>
                        </div>
                        <div className={styles.mini}>
                            <div className={styles.member}>
                                <h4>Nguyễn Quốc Tiến</h4>
                                <p>
                                    “Mình là người xây dựng{" "}
                                    <strong>‘bộ não’</strong> cho trang web: lập
                                    trình AI, xử lý dữ liệu cộng đồng và đảm bảo
                                    mọi tính năng mượt mà.”
                                </p>
                            </div>
                            <div className={styles.member}>
                                <h4>Trần Mai Ái My</h4>
                                <p>
                                    “Mình phụ trách thiết kế giao diện và kết
                                    nối cộng đồng – đảm bảo trang web hữu ích,
                                    đẹp mắt, thân thiện và cởi mở để mọi người
                                    thoải mái chia sẻ.”
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CTA */}
                <section className={styles.cta}>
                    <h3>
                        Hãy Cùng Chúng Tôi Viết Nên Câu Chuyện Của An Giang!
                    </h3>
                    <p>
                        An Giang là của tất cả chúng ta. Hành trình này sẽ không
                        trọn vẹn nếu thiếu đi tiếng nói của bạn.
                    </p>
                    <div className={styles.actions}>
                        <Link to="/Explore/map" className={styles.btnPrimary}>
                            🚀 Khám Phá Ngay
                        </Link>
                        <a
                            href="https://forms.office.com/r/rE7K2eM27C"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnGhost}
                        >
                            📢 Đóng góp ngay
                        </a>
                    </div>
                    <p className={styles.note}>
                        💌 Dự án vẫn đang phát triển — mọi góp ý của bạn là{" "}
                        <strong>“tài nguyên quý giá”</strong> giúp chúng tôi
                        hoàn thiện hơn.
                    </p>
                </section>
            </div>
        </div>
    );
}
