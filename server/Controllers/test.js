/** @format */

function autoSubmitForm() {
    const formURL =
        'https://docs.google.com/forms/d/e/1FAIpQLSdF.../formResponse';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const payload = {
            'entry.1043723050': data[i][0], //Giới tính
            'entry.2114746860': data[i][1], // nghề nghiệp
            'entry.552087540': data[i][2], // tuổi
            'entry.444444': data[i][3], // Câu 2
            'entry.555555': data[i][4], // Câu 3
        };

        const options = {
            method: 'post',
            payload: payload,
        };

        UrlFetchApp.fetch(formURL, options);
        Utilities.sleep(1000); // chờ 1s giữa các lượt gửi để tránh lỗi spam
    }
}
