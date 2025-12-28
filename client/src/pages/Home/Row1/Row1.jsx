import React, { useEffect, useState } from "react";
import styles from "./Row1.module.scss";
export default function Row1() {
  const [picture, setPicture] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i <= 3; i++) {
      arr.push(new URL(`../../../assets/test/${i}.jpg`, import.meta.url).href);
    }
    setPicture(arr);
  }, []);
  const Duration = 10;
  console.log(picture);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/*------- LEFT ------  */}

        <div className={styles.left}>
          <h1>
            Khám phá vùng đất <strong>An Giang</strong>
          </h1>
          <p>
            AGiland là website du lịch, mở ra cánh cửa đến với tỉnh An Giang hợp
            nhất - nơi tinh hoa sơn, thuỷ, hải hội tụ.
          </p>
          <p>
            Với sự kết hợp của vùng đất bảy núi huyền bí và vùng biển Tây Nam
            trù phú, website cung cấp hành trình khám phá đa dạng, từ Cổng Trời
            Tri Tôn đến đảo ngọc Phú Quốc rực nắng. Du khách có thể dễ dàng tìm
            thấy các tuyến đường du lịch tâm linh, sinh thái sông nước đặc trưng
            của miền Tây, cùng các trải nghiệm ẩm thực độc đáo tiện lợi.
          </p>
          <p>
            Hãy truy cập ngay để lên kế hoạch cho chuyến đi tới một An Giang đầy
            mới mẻ và hấp dẫn!
          </p>
        </div>
        {/*------- RIGHT ------  */}
        <div className={styles.right}>
          <div className={styles.col}>
            {picture.map((value, id) => (
              <img
                src={value}
                className={styles.imageDown}
                style={{
                  animationDelay: `-${(Duration / picture.length) * id}s`,
                }}
              />
            ))}
          </div>
          <div className={styles.col}>
            {picture.map((value, id) => (
              <img
                src={value}
                className={styles.imageUp}
                style={{
                  animationDelay: `-${(Duration / picture.length) * id}s`,
                }}
              />
            ))}
          </div>
          <div className={styles.col}>
            {picture.map((value, id) => (
              <img
                src={value}
                className={styles.imageDown}
                style={{
                  animationDelay: `-${(Duration / picture.length) * id}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={styles.button}>Tinh hoa An Giang</button>{" "}
        <button className={styles.button} disabled>
          Bản đồ tương tác
        </button>
        <button className={styles.button} disabled>
          Dựng hành trình
        </button>
      </div>
    </div>
  );
}
