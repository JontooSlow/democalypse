const API_KEY = 'Ваш_API_ключ';
const SPREADSHEET_ID = 'ID_Вашей_таблицы';
const RANGE = 'Лист1!A1:Z100'; // Укажите диапазон

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const tableHead = document.querySelector('#dataTable thead tr');
        const tableBody = document.querySelector('#dataTable tbody');

        // Заполнение заголовков таблицы
        const headers = data.values[0];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHead.appendChild(th);
        });

        // Заполнение данных таблицы
        const rows = data.values.slice(1);
        rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error:', error));
