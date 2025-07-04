import React from "react";
import MapView from "../../../components/common/MapView";

// Dữ liệu mẫu: bạn thay bằng API hoặc json thật
const foodPlaces = [
    {
        id: 1,
        name: "Bún cá Cần Thơ",
        lat: 10.045,
        lng: 105.746,
        description: "Món ăn nổi tiếng khu vực trung tâm.",
    },
    {
        id: 2,
        name: "Nem nướng Ngã Bảy",
        lat: 10.05,
        lng: 105.77,
        description: "Đặc sản Hậu Giang.",
    },
];

const Food = () => {
    return (
        <div style={{ padding: "24px" }}>
            <h1>Ẩm thực đặc sản</h1>
            <MapView data={foodPlaces} />
            <div style={{ marginTop: "20px" }}>
                {foodPlaces.map((place) => (
                    <div key={place.id} style={{ marginBottom: "12px" }}>
                        <strong>{place.name}</strong>: {place.description}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Food;
