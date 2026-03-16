import React, { useState } from "react";
import styles from "./ToolBar.module.scss";
import { InputNumber, Slider, Input, DatePicker } from "antd";
import {
    SearchOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    UserOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import { MdOutlineBedroomChild } from "react-icons/md";

const { RangePicker } = DatePicker;

const DecimalStep = () => {
    const [inputValue, setInputValue] = useState(0);
    const onChange = (value) => {
        if (Number.isNaN(value)) return;
        setInputValue(value);
    };
    return (
        <div className={styles.slideBox}>
            <div className={styles.slide}>
                <Slider
                    min={0}
                    max={5}
                    onChange={onChange}
                    value={typeof inputValue === "number" ? inputValue : 0}
                    step={0.1}
                    tooltip={{ formatter: (value) => `${value} Triệu` }}
                />
            </div>
            <div className={styles.boxValue}>
                <InputNumber
                    min={0}
                    max={5}
                    style={{ width: "100%" }}
                    step={0.1}
                    value={inputValue}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default function ToolBar({ ListProvinces, addFilter, SortBy }) {
    const [dates, setDates] = useState([]);
    const [rooms, setRooms] = useState(0);
    const [nights, setNights] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [sortBy, setSortBy] = useState("DecreasePricing");
    const [guestCount, setGuestCount] = useState(2);

    return (
        <div className={styles.toolbarContainer}>
            {/* PRIMARY SEARCH BAR */} <div>MAP</div>
            <div className={styles.mainSearchPill}>
                {/* Location */}
                <div className={styles.searchBlock}>
                    <label>Địa điểm</label>
                    <div className={styles.inputWrapper}>
                        <EnvironmentOutlined className={styles.icon} />
                        <select
                            value={selectedProvince}
                            onChange={(e) => {
                                setSelectedProvince(e.target.value);
                                if (e.target.value && addFilter)
                                    addFilter(e.target.value);
                            }}
                            className={styles.nativeSelect}
                        >
                            <option value="">Bạn muốn đi đâu?</option>
                            {ListProvinces.map((province, id) => (
                                <option key={id} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.divider}></div>

                {/* Dates */}
                <div className={styles.searchBlock}>
                    <label>
                        Thời gian{" "}
                        {nights > 0 && (
                            <span className={styles.highlight}>
                                ({nights} đêm)
                            </span>
                        )}
                    </label>
                    <div className={styles.inputWrapper}>
                        <CalendarOutlined className={styles.icon} />
                        <RangePicker
                            format="DD/MM/YYYY"
                            placeholder={["Nhận phòng", "Trả phòng"]}
                            bordered={false} // Removes default AntD border to blend in
                            suffixIcon={null} // We use our own icon
                            onChange={(values) => {
                                if (values) {
                                    const diff = values[1].diff(
                                        values[0],
                                        "day",
                                    );
                                    setDates(values);
                                    setNights(diff);
                                    if (addFilter) addFilter(`${diff} đêm`);
                                } else {
                                    setNights(0);
                                }
                            }}
                            className={styles.datePicker}
                        />
                    </div>
                </div>

                <div className={styles.divider}></div>

                {/* Guests & Rooms */}
                <div className={styles.searchBlock}>
                    <label>Khách & Phòng</label>
                    <div className={styles.multiInputWrapper}>
                        <div className={styles.miniInput}>
                            <UserOutlined className={styles.icon} />
                            <Input
                                type="number"
                                placeholder="Khách"
                                value={guestCount}
                                bordered={false}
                                onChange={(e) => {
                                    setGuestCount(e.target.value);
                                    if (addFilter)
                                        addFilter(`${e.target.value} khách`);
                                }}
                                min={1}
                                max={10}
                            />
                        </div>
                        <div className={styles.miniInput}>
                            <MdOutlineBedroomChild className={styles.icon} />
                            <Input
                                type="number"
                                placeholder="Phòng"
                                value={rooms}
                                bordered={false}
                                onChange={(e) => {
                                    setRooms(e.target.value);
                                    if (addFilter)
                                        addFilter(`${e.target.value} phòng`);
                                }}
                                min={0}
                                max={10}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button className={styles.searchButton}>
                    <SearchOutlined className={styles.searchIcon} />
                    <span>Tìm kiếm</span>
                </button>
            </div>
            {/* SECONDARY FILTERS */}
            <div className={styles.secondaryFilters}>
                <div className={styles.filterCard}>
                    <div className={styles.filterHeader}>
                        <DollarOutlined className={styles.filterIcon} />
                        <span>Ngân sách của bạn</span>
                    </div>
                    <DecimalStep />
                </div>

                <div className={styles.filterCard}>
                    <div className={styles.filterHeader}>
                        {/* If you don't have SwapVertOutlined, just use text */}
                        <span>Sắp xếp kết quả</span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
                        {SortBy.map((item, id) => (
                            <option value={item.key} key={id}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
