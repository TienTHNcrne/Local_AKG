/** @format */

import axios from 'axios';
import { notification } from 'antd';

export default async function Create({
    center,
    search,
    description,
    category,
    AddNewLocal,
    images,
    time,
}) {
    try {
        const formData = new FormData();
        formData.append('lat', center.lat);
        formData.append('lng', center.lng);
        formData.append('name', search);
        formData.append('description', description);
        category.forEach(value => {
            formData.append('category', value);
        });
        formData.append('time', time);
        if (Array.isArray(images)) {
            images.forEach(img => {
                formData.append('images', img.File);
            });
        }
        console.log(formData);
        const res = await axios.post(
            `${import.meta.env.VITE_BE_URL}/v2/api/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('oke', res);
        if (res.data.message !== 'ER') {
            console.log('oke');
            window.alert('Tạo thành công! ');
            notification.success({
                message: 'Tạo địa điểm thành công',
                description: 'Địa điểm mới đã được thêm vào bản đồ.',
            });
        } else {
            console.log('oke');
            window.alert('Yêu cầu tạo của bạn bị từ chối! ');
            notification.error({
                message: 'Yêu cầu tạo của bạn bị từ chối',
                description: 'Mời tạo lại',
            });
        }

        AddNewLocal();
    } catch (err) {
        console.error('UPLOAD FAIL:', err.response?.data || err.message);
    }
}
