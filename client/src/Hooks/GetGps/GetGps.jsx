// useGetGpsUser.jsx
export default async function getGps() {
    // Bước 1: kiểm tra quyền trước
    if (navigator.permissions) {
        try {
            const status = await navigator.permissions.query({
                name: "geolocation",
            });

            if (status.state === "denied") {
                throw new Error("Bạn đã chặn quyền định vị.");
            }
        } catch (err) {
            console.warn("Không check được quyền:", err);
        }
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }),
            (err) => reject(err)
        );
    });
}
