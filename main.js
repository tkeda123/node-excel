const path = require('path');
const XLSX = require('xlsx');
const dayjs = require('dayjs');

const jsonToXlsx = (sheetsData) => {
  const wb = XLSX.utils.book_new();
  sheetsData.forEach((sheetData, index) => {
    const ws = XLSX.utils.json_to_sheet([sheetData]);
    const sheetName = sheetData['シート名'] || `Sheet${index + 1}`;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // ファイル書き込み
  XLSX.writeFile(
    wb,
    `${dayjs().format('YYYY:MM:DD')}.xlsx`,
    { bookType: 'xlsx', type: 'buffer' },
    (err) => {
      if (err) {
        console.log('ファイルの書き込み中にエラーが発生しました:', err);
      } else {
        console.log('ファイルが正常に書き込まれました: output.xlsx');
      }
    }
  );
};

async function main(targetColumn) {
  const source = path.join(__dirname, 'sample.xlsx');
  try {
    const workbook = XLSX.readFile(source); // <1>
    const sheetNames = workbook.SheetNames;
    // const today = formatDate(new Date());
    const today = dayjs('1948-06-21').format('YYYY/MM/DD');
    // const today = dayjs().format('YYYY/MM/DD');
    const sheetsData = sheetNames.map((sheet, index) => {
      const sheetDataJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      const todayColumn = sheetDataJson.filter((v) => {
        return v[targetColumn] === today;
      });
      return { シート名: sheet, ...todayColumn[index] };
    });
    jsonToXlsx(sheetsData);
    // データをシートに追加
  } catch (err) {
    console.error(err);
  }
  // console.log(sheet);
  // const sheet = workbook.Sheets['Sheet1']; // <2>
  // const sheet = workbook.Sheets[sheetName];
}

main('誕生日');
