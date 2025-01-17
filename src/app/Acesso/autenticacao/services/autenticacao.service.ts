import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Registrar } from '../models/Registrar';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable()
export class AutenticaoService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    registrarUsuario(usuario: Registrar): Observable<Registrar> {
        let response = this.http
            .post(this.UrlServiceV1 + 'nova-conta', usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    login(usuario: Registrar): Observable<Registrar> {
        let response = this.http
            .post(this.UrlServiceV1 + 'autenticar', usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    refreshToken(): Observable<Registrar> {
        let response = this.http
            .post(`${this.UrlServiceV1}refresh-token?refreshToken=${this.getRefreshToken()}`, null, this.ObterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    private getRefreshToken() {
        return this.LocalStorage.obterUsuario().refreshToken;
    }

}
