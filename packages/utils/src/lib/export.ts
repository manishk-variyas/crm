import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

export interface ExportColumn {
  header: string;
  key: string;
}

/**
 * Exports data to CSV using PapaParse
 */
export function exportToCSV(data: any[], columns: ExportColumn[], filename: string) {
  const exportData = data.map(item => {
    const row: Record<string, any> = {};
    columns.forEach(col => {
      row[col.header] = item[col.key];
    });
    return row;
  });

  const csv = Papa.unparse(exportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to Excel using SheetJS (XLSX)
 */
export function exportToExcel(data: any[], columns: ExportColumn[], filename: string) {
  const exportData = data.map(item => {
    const row: Record<string, any> = {};
    columns.forEach(col => {
      row[col.header] = item[col.key];
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  // Apply some basic styling to column widths
  const maxChars = columns.map(col => Math.max(col.header.length, 10));
  worksheet['!cols'] = maxChars.map(w => ({ wch: w + 5 }));

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Exports data to PDF using jsPDF and autoTable
 */
export function exportToPDF(data: any[], columns: ExportColumn[], title: string) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Add Title
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175); // Blue-600 color
  doc.text(title, 14, 22);
  
  // Add Date
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  const tableColumn = columns.map(col => col.header);
  const tableRows = data.map(item => columns.map(col => item[col.key]));

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [30, 64, 175],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { top: 35 },
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
}
