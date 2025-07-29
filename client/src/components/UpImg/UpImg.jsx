import React, { useCallback, useState } from "react";
import styles from "./UpImg.module.scss";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { RiDeleteBin6Fill } from "react-icons/ri";
export default function UpImg() {
    const [img, setImg] = useState([]);
    const onDrop = useCallback((useActive) => {
        console.log(useActive);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div className={styles.container}>
            <div
                className={styles.upload}
                {...getRootProps()}
                style={{
                    border: "2px dashed gray",
                    padding: "40px",
                    textAlign: "center",
                    borderRadius: "10px",
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
                        const file = res.map((value) => ({
                            File: value,
                            URL: URL.createObjectURL(value),
                        }));
                        setImg((e) => [...e, ...file]);
                    }}
                />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <>
                        <FiUpload />
                        <p>
                            Drag & drop some files here, or click to select
                            files
                        </p>
                    </>
                )}{" "}
            </div>
            {/*HANDLE */}
            {img && (
                <div className={styles.img}>
                    {img.map((value, id) => (
                        <div className={styles.containerImg}>
                            <img src={value.URL} alt="" />
                            <button
                                type="button"
                                className={styles.delete}
                                onClick={() => {
                                    const newImg = [];
                                    img.forEach((value1, id1) => {
                                        if (id1 !== id) {
                                            newImg.push(value1);
                                        }
                                    });
                                    console.log(newImg);
                                    setImg(newImg);
                                }}
                            >
                                <RiDeleteBin6Fill />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
