/** @format */

import React, { useCallback, useState } from "react";
import styles from "./UpImg.module.scss";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useEffect } from "react";
export default function UpImg({ setImages }) {
    const [img, setImg] = useState([]);
    const onDrop = useCallback((files) => {
        let data = [];
        files.forEach((value) => {
            if (value.size > 10 * 1024 * 1024) {
                alert(`${value.name} quá lớn! Vui lòng chọn ảnh dưới 10MB.`);
                return;
            }
            data.push({ File: value, URL: URL.createObjectURL(value) });
        });
        setImg((pre) => [...data, ...pre]);
    }, []);

    useEffect(() => {
        setImages(img);
    }, [img]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    return (
        <div className={styles.container}>
            <div
                className={styles.upload}
                {...getRootProps()}
                style={{
                    backgroundColor: isDragActive ? "#e6f7ff" : "#fafafa",
                }}
            >
                <input
                    {...getInputProps()}
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const res = Array.from(e.target.files);
                        const file = res
                            .filter((f) => {
                                if (f.size > 10 * 1024 * 1024) {
                                    alert(
                                        `${f.name} quá lớn! Vui lòng chọn ảnh dưới 10MB.`
                                    );
                                    return false;
                                }
                                return true;
                            })
                            .map((value) => ({
                                File: value,
                                URL: URL.createObjectURL(value),
                            }));
                        setImg((prev) => [...prev, ...file]);
                    }}
                />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <>
                        <FiUpload />
                        <p>
                            Upload or drop some files here! Maximum size per
                            image: 10MB
                        </p>
                    </>
                )}{" "}
            </div>
            {/*HANDLE */}
        </div>
    );
}
