import XLSX from 'xlsx';
import AdmZip from 'adm-zip';

export const parseExcelBuffer = (buffer: Buffer): any[] => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  // ✅ Ensure at least one sheet exists
  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    throw new Error('No sheets found in the Excel file.');
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in workbook.`);
  }

  return XLSX.utils.sheet_to_json(sheet);
};

export const parseUploadedFile = (file: Express.Multer.File): any[] => {
  let rows: any[] = [];

  if (file.originalname.toLowerCase().endsWith('.zip')) {
    const zip = new AdmZip(file.buffer);
    const zipEntries = zip.getEntries();

    for (const entry of zipEntries) {
      if (entry.entryName.endsWith('.xlsx') || entry.entryName.endsWith('.xls')) {
        const data = zip.readFile(entry);
        if (data) {
          const parsed = parseExcelBuffer(data);
          rows = rows.concat(parsed);
        }
      }
    }
  } else {
    rows = parseExcelBuffer(file.buffer);
  }

  return rows;
};
