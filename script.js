const API_KEY = 'AIzaSyBmSkNijS0qEa9j8ZrvFItYggN_FgXe5jg';
const SPREADSHEET_ID = '1Z6MkmyCU_xELc_riP_xeCRzXr4rNhTQ2pyjwQ0ZcGYk';
const RANGE = 'Phys!A1:Z100'; // Укажите диапазон

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
