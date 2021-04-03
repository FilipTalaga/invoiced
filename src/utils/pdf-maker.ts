import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.tableLayouts = {
    labelLayout: {
        fillColor: rowIndex => (rowIndex === 0 ? '#ededed' : null),
        hLineWidth: () => 1,
        vLineWidth: () => 1,
    },
    invoiceLayout: {
        fillColor: rowIndex => (rowIndex === 0 ? '#ededed' : null),
    },
    detailsLayout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
    },
};

export const makePdf = pdfMake.createPdf;
