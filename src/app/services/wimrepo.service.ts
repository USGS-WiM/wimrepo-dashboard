// ------------------------------------------------------------------------------
// ------------ wimrepo.service.service --------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2018 WiM - USGS
// purpose:     Service for retrieving github api endpoints (repos and each repo's code.json file)

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import { BehaviorSubject } from 'rxjs';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CONFIG } from "./config";
import { Irepo } from '../interfaces/repo.interface';
import { Icodejson } from '../interfaces/code.interface';


@Injectable()
export class WIMRepoService {
    private repoList1: Array<Irepo>;
    private repoList2: Array<Irepo>;

    constructor(private _http: Http) {}

    private _repoListSubject: Subject<Array<Irepo>> = new Subject<Array<Irepo>>();
    // getter: subscribed to from app.component.ts (sends every time the _repoListSubject gets updated - which is only once upon initial load)
    
    public get RepoList(): Observable<Array<Irepo>> {
        return this._repoListSubject.asObservable();
    }

    public _errorMsgSubject: Subject<string> = new Subject<string>();
    public get ErrorMsgObs(): Observable<string> {
        return this._errorMsgSubject.asObservable();
    }

    // get all the repos (called from constructor)
    public getRepos(user, pass) {
        let JSON_HEADERS = new Headers({ "Accept": "application/json", "Authorization": "Basic " + btoa(user + ":" + pass) });
        let options = new RequestOptions({ headers: JSON_HEADERS });
        // need to request the repos in 2 separate calls due to limits on # of repos returned. using '?page=1&per_page=100'
        this._http.get(CONFIG.GETREPOS1_URL, options)
            .map(res => <Array<Irepo>>res.json())
            .catch((err, caught) => this.handleError(err, caught))
            .subscribe(p => {
                this.repoList1 = p;
                //need both pages to be added together
                if (this.repoList2) {
                    this.repoList1.push.apply(this.repoList1, this.repoList2);
                    this._repoListSubject.next(this.repoList1);
                }
            });
        // need to request the repos in 2 separate calls due to limits on # of repos returned. using '?page=2&per_page=100'
        this._http.get(CONFIG.GETREPOS2_URL, options)
            .map(res => <Array<Irepo>>res.json())
            .catch((err, caught) => this.handleError(err, caught))
            .subscribe(p => {
                this.repoList2 = p;
                //need both pages to be added together
                if (this.repoList1) {
                    this.repoList2.push.apply(this.repoList2, this.repoList1);
                    this._repoListSubject.next(this.repoList2);
                }
            });
    }

    // get each repo's code.json file (called from the app.component.ts subscription to RepoList() )
    public getRepoCodejson(repoName, user, pass): Observable<Icodejson> {
        let JSON_HEADERS = new Headers({ "Accept": "application/json", "Authorization": "Basic " + btoa(user + ":" + pass) });
        let options = new RequestOptions({ headers: JSON_HEADERS });
        return this._http.get(CONFIG.GETREPO_CODE_URL + repoName + "/contents/code.json", options)
            .map((response: Response) => <Icodejson>response.json())
            .catch((err, caught) => this.handleError(err, caught));
    }

    //Error Handler
    private handleError(error: any, caught: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
        this._errorMsgSubject.next(errMsg);
        return Observable.throw(errMsg);
    }
}