import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntryInvoiceData, LegalEntity, TemplateDocument } from 'src/models/invoice';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private auth: AuthService, private firestore: AngularFirestore) {}

    getTemplates = (): Observable<EntryInvoiceData[]> =>
        this.get<TemplateDocument>(`templates/${this.auth.user.email}`).pipe(
            map(val => val.templates),
        );

    getCompany = (): Observable<LegalEntity> =>
        this.get<LegalEntity>(`companies/${this.auth.user.email}`);

    private get = <T>(path: string): Observable<T> =>
        this.firestore
            .doc(path)
            .get()
            .pipe(map(val => val.data() as T));
}
