import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.scss";
import Create from "../../Hooks/Create";
import useSuggest from "../../Hooks/useSuggest";
import useCheckExist from "../../Hooks/useCheckExist";
import UpImg from "../../../../../components/UpImg/UpImg";
export default function CreateForm({
    add,
    center,
    setCenter,
    setSearch,
    search,
}) {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [show, setShow] = useState(false);
    const suggest = useSuggest(search);
    const exist = useCheckExist(center, search);
    useEffect(() => {
        setShow(true);
    }, [search]);

    const handle = async (e) => {
        setSearch(e.name);
        setCenter({
            lat: e.lat,
            lng: e.lng,
        });
        setShow(false);
    };
    return (
        <div>
            <div
                className={`${styles.add} ${add ? styles.open : styles.close}`}
            >
                <label htmlFor="name">Tên địa điểm</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {exist && (
                    <div className={styles.existWarning}>
                        Địa danh đã tồn tại!
                    </div>
                )}
                {show && (
                    <div className={styles.suggest}>
                        {suggest.map((e, id) => (
                            <div
                                className={styles.sug}
                                key={id}
                                onClick={() => {
                                    handle(e);
                                }}
                            >
                                {e.name}
                            </div>
                        ))}
                    </div>
                )}

                <label htmlFor="description">Mô tả</label>
                <textarea
                    name="description"
                    e={description}
                    onChange={(e) => setDescription(e.target.e)}
                />

                <label htmlFor="category">Phân loại</label>
                <select
                    name="category"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                >
                    <option e="undefine"> undefine</option>
                    <option e="danh-lam">Danh lam thắng cảnh</option>
                    <option e="di-tich">Di tích lịch sử</option>
                    <option e="le-hoi">Lễ hội</option>
                </select>

                <label htmlFor="image">Hình ảnh</label>
                <UpImg />

                <button
                    type="submit"
                    onClick={() => {
                        if (
                            category !== "undefine" &&
                            description !== "" &&
                            search !== ""
                        ) {
                            Create(center, search, description);
                        }
                    }}
                >
                    Thêm địa danh
                </button>
            </div>
        </div>
    );
}
