import React from "react";
import styles from "./Belief.module.scss";
import { FaCaretRight } from "react-icons/fa";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Belief() {
    const items = [
        {
            title: "Tín ngưỡng thờ Mẫu và Thánh Mẫu vùng Thất Sơn",
            text: "Thờ Diêu Trì Kim Mẫu, Cửu Thiên Huyền Nữ, Ngũ Nương, Bà Thiên Hậu, Cửu Nương, Cô Tiên… gắn với các truyền thuyết bảo hộ mùa màng, sức khỏe, bình an. Tập trung tại các núi như Núi Kéc, Núi Cấm.",
            imgs: ["/imgs/belief/1.png", "/imgs/belief/2.png"],
        },
        {
            title: "Núi Cấm và các am, điện thờ dân gian",
            text: "Nhiều điểm thờ tự như vồ Bồ Hong (thờ Ngọc Hoàng), vồ Bà, vồ Thiên Tuế.",
            imgs: ["/imgs/belief/3.png", "/imgs/belief/4.png"],
        },
        {
            title: "Thờ anh hùng dân tộc",
            text: "Lăng Thoại Ngọc Hầu (thờ Thoại Ngọc Hầu và phu nhân), Đình Châu Phú (thờ Nguyễn Hữu Cảnh), Đền Trà Sư (thờ các anh hùng chống giặc ngoại xâm); - Nguyễn Trung Trực (Rạch Giá) – thờ anh hùng dân tộc Nguyễn Trung Trực; - Đền thờ Quản cơ Trần Văn Thành;",
            imgs: [
                "/imgs/belief/5.png",
                "/imgs/belief/6.png",
                "/imgs/belief/7.png",
                "/imgs/belief/8.png",
                "/imgs/belief/9.png",
                "/imgs/belief/10.png",
                "/imgs/belief/11.png",
                "/imgs/belief/12.png",
            ],
        },
        {
            title: "Đình thần",
            text: "- Đình Bình Đức, Đình Mỹ Phước, Đình Vĩnh Phước… thờ Thành hoàng, Tiền hiền, Hậu hiền; tổ chức Lễ Kỳ yên cầu an. - Đình thần An Hòa, Đình thần Tắc Cậu – thờ Thành hoàng, Tiền hiền.",
            imgs: ["/imgs/belief/13.png", "/imgs/belief/14.png"],
        },
        {
            title: "Miếu thờ",
            text: " - Miếu Bà Chúa Xứ Châu Phú, Miếu Bà Cô, Miếu Bà Ngũ Hành… gắn với tín ngưỡng thờ nữ thần và cầu an. - Miếu Bà Thủy Long Thánh Mẫu, Miếu Bà Chúa Xứ Phú Quốc, Miếu Quan Thánh Đế Quân Hà Tiên – thờ thần biển, nữ thần, quan võ theo tín ngưỡng Hoa – Việt. - Miếu Bà Chúa Xứ Núi Sam: Lễ Vía Bà (23–27/4 âm lịch) là lễ hội lớn nhất An Giang, thu hút hàng triệu du khách.",
            imgs: [
                "/imgs/belief/15.png",
                "/imgs/belief/16.png",
                "/imgs/belief/17.png",
                "/imgs/belief/18.png",
            ],
        },
        {
            title: "Lễ hội Nghinh Ông, Dinh Cậu",
            text: "Thờ Cá Ông, cầu bình an cho ngư dân.15–16 tháng Giêng âm lịch; cầu thuận buồm xuôi gió, tổ chức múa lân, rước đèn, đua thuyền.",
            imgs: ["/imgs/belief/19.png", "/imgs/belief/20.png"],
        },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Tín Ngưỡng </h2>
            <p className={styles.intro}>
                Khám phá các tín ngưỡng, tâm linh đặc sắc tại vùng đất An Giang
            </p>

            {items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className={styles.summary}
                        >
                            {" "}
                            <Typography>
                                <h3 className={styles.title}>{item.title}</h3>{" "}
                            </Typography>{" "}
                        </AccordionSummary>

                        <AccordionDetails className={styles.content}>
                            <Typography>
                                <p className={styles.text}>{item.text}</p>
                                <div
                                    className={styles[`imageGallery${idx + 1}`]}
                                >
                                    {item.imgs.map((src, i) => (
                                        <div
                                            key={i}
                                            className={styles.imageContainer}
                                        >
                                            <img
                                                src={src}
                                                alt=""
                                                className={styles.image}
                                            />
                                        </div>
                                    ))}
                                </div>{" "}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
    );
}
