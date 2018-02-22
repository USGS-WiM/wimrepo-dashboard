// ------------------------------------------------------------------------------
// ------------ siglservices.service --------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:     Tonia Roddick USGS Web Informatics and Mapping
//              Erik Myers USGS Web Informatics and Mapping
// purpose:     Service for the whole application. setters/getters needed to communicate information with the mapview.component, sidebar.component, and filter.component

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { BehaviorSubject } from 'rxjs';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CONFIG } from "./config";


@Injectable()
export class WIMRepoService {
    private repoList1:Array<any>;
    private repoList2:Array<any>;
    private _repoListSubject: Subject<Array<any>> = new Subject<Array<any>>();

    constructor(private _http: Http){
        this.getRepos();
    }

    public get RepoList():Observable<Array<any>> {
        return this._repoListSubject.asObservable();
    }
    // get all the repos
    private getRepos(){
        let options = new RequestOptions({ headers: CONFIG.JSON_HEADERS });
		this._http.get(CONFIG.GETREPOS1_URL, options)
			.map(res => <Array<any>>res.json())
			.catch((err, caught) => this.handleError(err, caught))
			.subscribe(p => {                
                this.repoList1 = p;
                //need both pages to be added together
                if (this.repoList2) {
                    this.repoList1.push.apply(this.repoList1, this.repoList2);
                    this._repoListSubject.next(this.repoList1);				
                }
            });
            this._http.get(CONFIG.GETREPOS2_URL, options)
			.map(res => <Array<any>>res.json())
			.catch((err, caught) => this.handleError(err, caught))
			.subscribe(p => {
                this.repoList2= p;
                //need both pages to be added together
                if (this.repoList1) {
                    this.repoList2.push.apply(this.repoList2, this.repoList1);                    
                    this._repoListSubject.next(this.repoList2);				
                }
			});
    }

    // get each repo's code.json file
    public getRepoCodejson(repoName):Observable<any> {
        let options = new RequestOptions({ headers: CONFIG.JSON_HEADERS });
        //                                            STNPublic/contents/code.json        
		return this._http.get(CONFIG.GETREPO_CODE_URL + repoName + "/contents/code.json", options)
            .map((response: Response) => <any>response.json());
            //.catch((err, caught) => this.handleError(err, caught));
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log("Body Data = "+body.data);
        return body.data || [];
      }
    //Error Handler
	private handleError(error: any, caught: any) {		
		let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
        return Observable.throw(errMsg);		
	}
}