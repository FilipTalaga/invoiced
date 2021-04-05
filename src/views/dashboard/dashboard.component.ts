import { Component } from '@angular/core';
import { makePdf } from '../../utils/pdf-maker';
import calculateInvoiceData from 'src/utils/invoice-calculator';
import makeDesignDoc from 'src/utils/design-doc-maker';
import { EntryInvoiceData, LegalEntity } from 'src/models/invoice';
import { AuthService } from 'src/services/auth.service';
import { Observable, from, of } from 'rxjs';
import { getCurrencyRate } from 'src/api/external';
import { map } from 'rxjs/operators';
import { DataService } from 'src/services/data.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent {
    templates: Observable<EntryInvoiceData[]> = this.data.getTemplates();
    company: Observable<LegalEntity> = this.data.getCompany();

    constructor(private auth: AuthService, private data: DataService) {}

    public logout = () => this.auth.logout();

    public async generatePdf(entryInvoiceData: EntryInvoiceData) {
        const invoice = calculateInvoiceData(entryInvoiceData);
        const designDoc = makeDesignDoc(invoice);
        const fileName = `faktura-vat-${invoice.invoiceNumber.replace(/\//g, '-')}.pdf`;

        makePdf(designDoc).download(fileName);
    }

    public prepareEntryInvoiceData = (
        template: EntryInvoiceData,
        seller: LegalEntity,
    ) => (): Observable<EntryInvoiceData> => {
        const dateOfIssue = new Date();
        const invoiceData = {
            ...template,
            seller,
            invoiceNumber: 1,
            dateOfIssue,
        };

        if (template.currency === 'PLN') {
            return of(invoiceData);
        }

        return from(getCurrencyRate(template.currency, dateOfIssue)).pipe(
            map(exchangeRate => ({
                ...invoiceData,
                exchangeRate,
            })),
        );
    };
}
