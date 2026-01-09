import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Climate.module.scss";
import KH from "./KH/KH.jsx";
import TQ from "./TQ/TQ.jsx";
import DL from "./DL/DL.jsx";
import Title from "./Title/Title.jsx";
export default function Climate() {
    const [areaClimate, setAreaClimate] = useState("mountain");
    const [climateSeason, setClimateSeason] = useState("dry");
    const [selectedArea, setSelectedArea] = useState(null);
    const [typeInfo, setTypeInfo] = useState("TQ");
    // Update selected area when region changes
    useEffect(() => {
        const area = climateData.find((item) => item.id === areaClimate);
        setSelectedArea(area);
    }, [areaClimate]);

    return (
        <div className={styles.container}>
            <Title />
            {/* Area selector */}
            <div className={styles.buttonAreaClimate}>
                {TopoGraphicRegions.map((region) => (
                    <button
                        key={region.id}
                        style={{ "--primary": region.color }}
                        className={clsx(
                            areaClimate === region.id && styles.active,
                        )}
                        onClick={() => setAreaClimate(region.id)}
                    >
                        {region.name}{" "}
                        <span className={styles.activeIndicator}></span>
                    </button>
                ))}
            </div>

            {/* Area content */}
            <div className={styles.areaClimate}>
                {selectedArea && (
                    <div className={styles.overview}>
                        {/* Area header */}
                        <div className={styles.areaHeader}>
                            <div className={styles.areaTitle}>
                                <span>{selectedArea.icon}</span>
                                <div className={styles.areaName}>
                                    <h3>{selectedArea.name}</h3>
                                    <div className={styles.areaRatio}>
                                        Chiếm {selectedArea.ratioArea}% diện
                                        tích
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                        {/* Area overview */}
                        <div className={styles.areaOverview}>
                            <div className={styles.overviewText}>
                                <h4>Tổng quan</h4>
                                <p>{selectedArea.overview}</p>
                            </div>
                            <div>
                                <div className={styles.climateSummary}>
                                    {selectedArea.climateSummary &&
                                        selectedArea.climateSummary.map(
                                            (highlight, index) => (
                                                <div
                                                    key={index}
                                                    className={styles.card}
                                                >
                                                    <h3
                                                        className={
                                                            styles.statLabel
                                                        }
                                                    >
                                                        {highlight.key}
                                                    </h3>
                                                    <p
                                                        className={
                                                            styles.statValue
                                                        }
                                                    >
                                                        {highlight.value}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                </div>
                            </div>{" "}
                        </div>{" "}
                    </div>
                )}
                {/*Type Information */}{" "}
                <div className={styles.ContainerBtn}>
                    <div className={styles.selectorLabel}>
                        <h3>Thông tin chi tiết</h3>
                        <p>Chọn loại thông tin cần xem</p>
                    </div>
                    <div className={styles.typeInfoContainer}>
                        {TypeInfo.map((type) => (
                            <button
                                key={type.hex}
                                className={clsx(
                                    styles.typeInfo,
                                    typeInfo === type.hex && styles.active,
                                )}
                                onClick={() => setTypeInfo(type.hex)}
                            >
                                <span className={styles.activeIndicator}></span>
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Season toggle */}
                {typeInfo === "KH" && (
                    <KH
                        climateSeason={climateSeason}
                        setClimateSeason={setClimateSeason}
                    />
                )}
                {typeInfo === "TQ" && <TQ selectedArea={selectedArea} />}
                {typeInfo === "DL" && <DL selectedArea={selectedArea} />}
            </div>
        </div>
    );
}

const TypeInfo = [
    { hex: "TQ", name: "Tổng quan" },
    { hex: "KH", name: "Khí hậu" },
    { hex: "DL", name: "Du lịch" },
];
const TopoGraphicRegions = [
    { id: "plain", name: "Đồng bằng", color: "#F9A825" },
    { id: "mountain", name: "Đồi núi thấp", color: "#2E7D32" },
    { id: "costal", name: "Ven biển", color: "#2196F3" },
    { id: "island", name: "Hải đảo", color: "#26C6DA" },
];
const climateData = [
    {
        id: "plain",
        name: "Vùng Đồng bằng ",
        ratioArea: 70,
        icon: "🌾",

        overview:
            "Khu vực đồng bằng thấp, bằng phẳng, là trung tâm nông nghiệp với hệ thống sông ngòi chằng chịt.",

        highlights: [
            "Mạng lưới sông ngòi dày đặc",
            "Đất phù sa màu mỡ",
            "Vựa lúa lớn của Đồng bằng sông Cửu L     ong",
            "Chịu ảnh hưởng lũ sông Mekong",
        ],

        climateSummary: [
            { key: "Nhiệt độ", value: "≈ 27°C" },
            { key: "Lượng mưa", value: "1.500 – 1.800 mm/năm" },
            { key: "Độ ẩm", value: "80 – 90%" },
        ],
        suggestedPlaces: [
            {
                name: "Chợ nổi Long Xuyên",
                type: "Văn hóa",
                icon: "🛶",
                desc: "Trải nghiệm chợ nổi độc đáo trên sông",
            },
            {
                name: "Làng nổi Tân Lập",
                type: "Thiên nhiên",
                icon: "🌿",
                desc: "Khám phá rừng tràm ngập nước",
            },
            {
                name: "Khu di tích Óc Eo",
                type: "Lịch sử",
                icon: "🏺",
                desc: "Di chỉ khảo cổ văn hóa Óc Eo",
            },
            {
                name: "Cánh đồng lúa Mỹ Hòa Hưng",
                type: "Nông nghiệp",
                icon: "🌾",
                desc: "Ngắm cánh đồng lúa bát ngát",
            },
        ],
        seasons: {
            dry: {
                name: "Mùa khô",
                icon: "☀️",
                months: "Tháng 12 – Tháng 4",
                desc: "Nắng nhiều, ít mưa, thuận lợi cho tham quan và lễ hội.",
            },
            wet: {
                name: "Mùa mưa",
                icon: "🌧️",
                months: "Tháng 5 – Tháng 11",
                desc: "Mưa nhiều, nước sông dâng cao, xuất hiện mùa nước nổi đặc trưng.",
            },
        },

        travel: {
            bestTime:
                "Từ tháng 1 - tháng 3 (mùa khô) và từ tháng 8 - tháng 10 (mùa nước nổi)",
            tips: [
                "Mang quần áo nhẹ, kem chống nắng vào mùa khô.",
                "Chuẩn bị áo mưa, giày chống nước vào mùa mưa.",
            ],
            activities: [
                "Tham quan cánh đồng lúa, vườn cây ăn trái.",
                "Trải nghiệm mùa nước nổi.",
                "Khám phá ẩm thực và lễ hội địa phương.",
            ],
        },
    },
    {
        id: "mountain",
        name: "Vùng đồi núi (Thất Sơn)",
        ratioArea: 5,
        icon: "⛰️",

        overview:
            "Vùng đồi núi thấp hiếm hoi của Nam Bộ, địa hình cao tạo khí hậu mát mẻ hơn đồng bằng.",
        suggestedPlaces: [
            {
                name: "Núi Cấm",
                type: "Tâm linh",
                icon: "⛰️",
                desc: "Ngọn núi cao nhất miền Tây",
            },
            {
                name: "Núi Sam",
                type: "Văn hóa",
                icon: "🏞️",
                desc: "Quần thể di tích lịch sử",
            },
            {
                name: "Miếu Bà Chúa Xứ",
                type: "Tín ngưỡng",
                icon: "🙏",
                desc: "Di tích tôn giáo nổi tiếng",
            },
            {
                name: "Núi Tô",
                type: "Thiên nhiên",
                icon: "🌄",
                desc: "Cảnh quan núi non hùng vĩ",
            },
        ],
        highlights: [
            "Địa hình cao 200–700 m",
            "Nhiệt độ mát hơn đồng bằng",
            "Cảnh quan tâm linh – sinh thái",
        ],

        climateSummary: [
            { key: "Nhiệt độ", value: "≈ 23 – 25°C" },
            { key: "Lượng mưa", value: "1.600 – 1.900 mm/năm" },
            { key: "Độ ẩm", value: "75 – 85%" },
        ],

        seasons: {
            dry: {
                name: "Mùa khô",
                icon: "☀️",
                months: "Tháng 12 – Tháng 4",
                desc: "Thời tiết mát mẻ, thích hợp leo núi, hành hương.",
            },
            wet: {
                name: "Mùa mưa",
                icon: "🌧️",
                months: "Tháng 5 – Tháng 11",
                desc: "Mưa nhiều, sương mù, cảnh quan xanh tươi.",
            },
        },

        travel: {
            bestTime: "Quanh năm, đặc biệt từ tháng 11 đến tháng 4",
            tips: [
                "Mang áo khoác mỏng vào sáng sớm.",
                "Cẩn thận đường trơn vào mùa mưa.",
            ],
            activities: [
                "Du lịch tâm linh – sinh thái.",
                "Tham quan núi Cấm, Núi Tô.",
            ],
        },
    },
    {
        id: "costal",
        name: "Vùng ven biển",
        ratioArea: 15,
        icon: "🌊",
        suggestedPlaces: [
            {
                name: "Hà Tiên",
                type: "Biển",
                icon: "🌅",
                desc: "Thành phố biển xinh đẹp",
            },
            {
                name: "Bãi biển Mũi Nai",
                type: "Nghỉ dưỡng",
                icon: "🏖️",
                desc: "Bãi biển đẹp, nước trong xanh",
            },
            {
                name: "Rạch Giá",
                type: "Đô thị",
                icon: "🏙️",
                desc: "Trung tâm kinh tế biển",
            },
            {
                name: "Chợ hải sản Hà Tiên",
                type: "Ẩm thực",
                icon: "🦀",
                desc: "Thưởng thức hải sản tươi sống",
            },
        ],
        overview:
            "Khu vực chịu ảnh hưởng mạnh của biển, khí hậu ôn hòa và gió mát quanh năm.",

        highlights: [
            "Biển nông, bãi bồi ven bờ",
            "Nhiệt độ ổn định",
            "Ảnh hưởng gió mùa Tây Nam",
        ],

        climateSummary: [
            { key: "Nhiệt độ", value: "≈ 26 – 27°C" },
            { key: "Lượng mưa", value: "1.800 – 2.000 mm/năm" },
            { key: "Độ ẩm", value: "80 – 90%" },
        ],

        seasons: {
            dry: {
                name: "Mùa khô",
                icon: "☀️",
                months: "Tháng 12 – Tháng 4",
                desc: "Biển êm, thời tiết thuận lợi cho du lịch.",
            },
            wet: {
                name: "Mùa mưa",
                icon: "🌧️",
                months: "Tháng 5 – Tháng 11",
                desc: "Gió mạnh, mưa nhiều, biển động.",
            },
        },

        travel: {
            bestTime: "Từ tháng 1 - tháng 4 (biển êm, ít mưa)",
            tips: [
                "Theo dõi thời tiết biển vào mùa mưa.",
                "Chuẩn bị kem chống nắng, mũ.",
            ],
            activities: [
                "Du lịch biển – chợ hải sản.",
                "Tham quan Hà Tiên, Rạch Giá.",
            ],
        },
    },
    {
        id: "island",
        name: "Vùng hải đảo",
        ratioArea: 10,
        icon: "🏝️",
        suggestedPlaces: [
            {
                name: "Đảo Phú Quốc",
                type: "Du lịch",
                icon: "🏝️",
                desc: "Đảo ngọc nổi tiếng",
            },
            {
                name: "Đảo Nam Du",
                type: "Hoang sơ",
                icon: "🐠",
                desc: "Quần đảo hoang sơ đẹp",
            },
            {
                name: "Đảo Hải Tặc",
                type: "Lịch sử",
                icon: "🏴‍☠️",
                desc: "Đảo có lịch sử hấp dẫn",
            },
            {
                name: "Đảo Thổ Chu",
                type: "Thiên nhiên",
                icon: "🐢",
                desc: "Vườn quốc gia biển",
            },
        ],
        overview:
            "Vùng đảo xa bờ với khí hậu biển rõ nét, độ ẩm cao và lượng mưa lớn.",

        highlights: [
            "Bao quanh bởi biển",
            "Khí hậu ổn định",
            "Lượng mưa cao nhất khu vực",
        ],

        climateSummary: [
            { key: "Nhiệt độ", value: "≈ 27°C" },
            { key: "Lượng mưa", value: "2.400 – 2.800 mm/năm" },
            { key: "Độ ẩm", value: "85 – 95%" },
        ],
        seasons: {
            dry: {
                name: "Mùa khô",
                icon: "☀️",
                months: "Tháng 12 – Tháng 4",
                desc: "Biển xanh, nắng đẹp, cao điểm du lịch.",
            },
            wet: {
                name: "Mùa mưa",
                icon: "🌧️",
                months: "Tháng 5 – Tháng 11",
                desc: "Mưa lớn, biển động, hạn chế di chuyển.",
            },
        },

        travel: {
            bestTime: "Tháng 12 - 3 (mực nước thấp, dễ di chuyển)",
            tips: ["Tránh đi biển xa vào mùa mưa.", "Đặt vé sớm mùa cao điểm."],
            activities: [
                "Tắm biển, lặn ngắm san hô.",
                "Du lịch nghỉ dưỡng – sinh thái.",
            ],
        },
    },
];
