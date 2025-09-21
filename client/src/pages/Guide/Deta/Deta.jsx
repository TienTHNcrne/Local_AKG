import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Deta.module.scss";
const love = [
    {
        way1: [
            {
                img: "/guide/deta/love/1.png",
                detail: "Chọn mục Bản đồ trong Khám phá",
            },
            {
                img: "/guide/deta/love/2.png",
                detail: "Trong Bản đồ, lựa chọn địa điểm mong muốn tham quan để website dựng hành trình cho bạn",
            },
            {
                img: "/guide/deta/love/3.png",
                detail: "Có thể thay các loại bản đồ khác nhau và phóng to, thu nhỏ bản đồ sao cho phù hợp với bạn nhất ",
            },
            {
                img: "/guide/deta/love/4.png",
                detail: "Chọn 1 điểm đỏ bất kỳ trên bản đồ sẽ xuất hiện thông tin về vị trí đó, nhấp vào icon 🖤 để thêm địa điểm vào mục yêu thích",
            },
        ],
        way2: [
            {
                img: "/guide/deta/love/image 9.png",
                detail: "Vào mục Tinh hoa An Giang",
            },
            {
                img: "/guide/deta/love/image 10.png",
                detail: "Nhấp vào hoặc tìm kiếm một địa điểm bất kỳ",
            },
            {
                img: "/guide/deta/love/image 11.png",
                detail: "Nhấn vào biểu tượng những ngôi sao để thêm vào yêu thích",
            },
        ],
    },
];
const tour = [
    {
        img: "/guide/deta/tour/image 5.png",
        detail: "Nhấp vào biểu tượng ngôi sao ở góc phải màn hình",
    },
    {
        img: "/guide/deta/tour/image 6.png",
        detail: "Sau khi nhấp vào biểu tượng ngôi sao, một khung mới sẽ nhảy lên. Ở bước này, các bạn chỉ cần tick vào những nơi mình muốn dựng lịch trình bên trái, sau đó điền thông tin vào nhưng ô trống bên phải rồi nhấn Run, AI sẽ dựng một hành trình cho bạn",
    },
    {
        img: "/guide/deta/tour/image 7.png",
        detail: "Kết quả mà AI, trả về. AI sẽ đưa cho bạn một hành trình dựa theo mong muốn của bạn. Đòng thời, AI còn đưa ra những lưu ý về thời tiết, trang phục,v.v..Sau khi nhận kết quả từ AI, người dùng có thể lưu lại để có thể dễ dàng tím kiếm bằng nút Save ở góc dưới bên phải",
    },
    {
        img: "/guide/deta/tour/image 8.png",
        detail: "Đặt tên cho lịch trình và nhấn lưu",
    },
];
const check = [
    {
        img: "/guide/deta/tour/image 12.png",
        detail: "Chọn mục Profile ở góc phải màn hình",
    },
    {
        img: "/guide/deta/tour/image 13.png",
        detail: "Hành trình của bạn đã lưu sẽ xuất hiện ở đây",
    },
];
export default function Deta() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentGallery, setCurrentGallery] = useState([]);

    const openLightbox = (images, index) => {
        setCurrentGallery(images);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? currentGallery.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === currentGallery.length - 1 ? 0 : prevIndex + 1
        );
    };
    return (
        <div className={styles.container}>
            {/*THÊM YÊU THICH */}
            <div className={styles.love}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            <h2>Thêm địa điểm yếu thích</h2>
                        </Typography>{" "}
                    </AccordionSummary>{" "}
                    <div className={styles.con}>
                        <div className={styles.loveC1}>
                            <AccordionDetails>
                                <Typography>
                                    <h3>Cách 1:</h3>
                                    <div className={styles.stepsL}>
                                        {love[0].way1.map((value, id) => (
                                            <div
                                                className={styles.step}
                                                key={id}
                                            >
                                                <h4>Bước {id + 1}</h4>
                                                <img
                                                    src={value.img}
                                                    alt={`Bước ${id + 1}`}
                                                />
                                                <p>{value.detail}</p>{" "}
                                            </div>
                                        ))}
                                    </div>{" "}
                                </Typography>
                            </AccordionDetails>
                        </div>{" "}
                        <div className={styles.loveC1}>
                            <h3>Cách 2:</h3>
                            <div className={styles.stepsL}>
                                {love[0].way2.map((value, id) => (
                                    <div className={styles.step} key={id}>
                                        <h4>Bước {id + 1}</h4>
                                        <img
                                            src={value.img}
                                            alt={`Bước ${id + 1}`}
                                        />
                                        <p>{value.detail}</p>{" "}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>{" "}
                </Accordion>{" "}
            </div>
            {/* TOUR */}
            <div className={styles.tour}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            <h2>Dựng hành trình bằng AI</h2>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.steps}>
                            {tour.map((value, id) => (
                                <div className={styles.step} key={id}>
                                    <h4>Bước {id + 1}</h4>
                                    <img
                                        src={value.img}
                                        alt={`Bước ${id + 1}`}
                                    />
                                    <p>{value.detail}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            {/* CHECK */}
            <div className={styles.check}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            <h2>Kiểm tra các hành trình đã dựng</h2>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.steps}>
                            {check.map((value, id) => (
                                <div className={styles.step} key={id}>
                                    <h4>Bước {id + 1}</h4>
                                    <img
                                        src={value.img}
                                        alt={`Bước ${id + 1}`}
                                    />
                                    <p>{value.detail}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            <h2>
                Bây giờ thì bạn chỉ cần xách balo lên và đi thôi vì mọi chuyện
                đã có website của chúng mính lo hết rồi😉😉
            </h2>
        </div>
    );
}
