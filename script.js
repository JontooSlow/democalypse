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
        rows.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');

            // Применение стиля для строк 3-6 и 7-9
            if (rowIndex >= 2 && rowIndex <= 5) {
                tr.classList.add('brown-text');
            } else if (rowIndex >= 6 && rowIndex <= 8) {
                tr.classList.add('red-text');
            }

            row.forEach((cell, colIndex) => {
                const td = document.createElement('td');
                td.textContent = cell;

                // Применение стиля для четных столбцов (если colIndex четный)
                if (colIndex > 0 && colIndex % 2 !== 0) {
                    td.classList.add('grey-bg');
                }

                // Изменение цвета шрифта для соответствия условиям 2
                if (colIndex % 2 === 0 && rowIndex >= 9 && rowIndex <= 39) {
                    if (rowIndex > 5) {
                        td.classList.add('yellow-text');
                    }
                    if (rowIndex > 6) {
                        td.classList.add('green-text');
                    }
                }

                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Ошибка:', error));
