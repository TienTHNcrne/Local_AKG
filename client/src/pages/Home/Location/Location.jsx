import React from "react";
import Maps from "../../../components/Maps/Maps";
import styles from "./Location.module.scss";
export default function Location() {
    // const file = localStorage.getItem("editor");
    return (
        <div className={styles.container}>
            <Maps className={styles.map} />
            {/* {<div dangerouslySetInnerHTML={{ __html: file }} />} */}
            <div className={styles.content}>
                {/*GEOGRAPHY */}
                <div className={styles.geography}>
                    <h3>Vị trí địa lí</h3>
                    <div className={styles.baby}>
                        {" "}
                        <p>
                            Tỉnh An Giang mới (An Giang và Kiên Giang) nằm phía
                            tây nam vùng Đồng bằng sông Cửu Long, cách Thành phố
                            Hồ Chí Minh 187km. Có vị trí địa lý
                        </p>{" "}
                        <ul>
                            <li>Phía đông giáp Đồng Tháp và Cần Thơ</li>
                            <li>Phía nam giáp Cà Mau</li>
                            <li>Phía bắc giáp Campuchia</li>
                            <li>Phía tây giáp Vịnh Thái Lan</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.area}>
                    <h3>Diện tích</h3>
                    <div className={styles.baby}>
                        <p>
                            9 888,91 km2 (Nguồn: nhà xuất bản tài nguyên - môi
                            trường và bản đồ Việt Nam)
                        </p>
                    </div>
                </div>
                <div className={styles.population}>
                    <h3>Dân số</h3>
                    <div className={styles.baby}>
                        <p>
                            4 952 238 người (Nguồn: nhà xuất bản tài nguyên -
                            môi trường và bản đồ Việt Nam)
                        </p>
                    </div>
                </div>
                <div className={styles.topography}>
                    <h3>Địa hình</h3>
                    <div className={styles.baby}>
                        <p>
                            Địa hình ở An Giang khá đa dạng, có đồng bằng, nhiều
                            sông rạch (đầu nguồn sông Cửu Long), có núi, có biên
                            giới, bờ biển dài (hơn 200km), với hơn 100 đảo lớn
                            nhỏ, nhiều sông núi, kênh rạch và hải đảo; phần đất
                            liền tương đối bằng phẳng, có hướng thấp dần theo
                            hướng đông bắc – tây nam. Đồng bằng An Giang có 2
                            dạng chính: đồng bằng phù sa, tiêu biểu là dạng cồn
                            bãi (cù lao); dạng thứ hai là đồng bằng ven núi, tập
                            trung quanh chân núi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
