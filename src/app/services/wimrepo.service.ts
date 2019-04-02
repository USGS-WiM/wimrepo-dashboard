// ------------------------------------------------------------------------------
// ------------ wimrepo.service.service --------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2018 WiM - USGS
// purpose:     Service for retrieving github api endpoints (repos and each repo's code.json file)

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CONFIG } from './config';
import { Irepo } from '../interfaces/repo.interface';
import { Icodejson } from '../interfaces/code.interface';
import { GraphQLClient } from 'graphql-request';
// import  * as fetch  from 'isomorphic-fetch';


@Injectable()
export class WIMRepoService {
    private repoList1: Array<Irepo>;
    private repoList2: Array<Irepo>;
    private reposWithVulnerabilities = [];
    private repoNames: any;

    constructor(private _http: Http) { }

    private _repoListSubject: Subject<Array<Irepo>> = new Subject<Array<Irepo>>();
    // getter: subscribed to from app.component.ts (sends every time the _repoListSubject gets updated -
    // which is only once upon initial load)

    public get RepoList(): Observable<Array<Irepo>> {
        return this._repoListSubject.asObservable();
    }

    private _repoVulnSubject: Subject<Object> = new Subject<Object>();
    // getter: subscribed to from app.component.ts (sends every time the _repoListSubject gets updated -
    // which is only once upon initial load)

    public get RepoVuln(): Observable<Object> {
        return this._repoVulnSubject.asObservable();
    }

    public _errorMsgSubject: Subject<string> = new Subject<string>();
    public get ErrorMsgObs(): Observable<string> {
        return this._errorMsgSubject.asObservable();
    }

    // get all the repos (called from constructor)
    public getRepos(creds) {
        const JSON_HEADERS = new Headers({ 'Accept': 'application/json', 'Authorization': creds });
        const options = new RequestOptions({ headers: JSON_HEADERS });
        // need to request the repos in 2 separate calls due to limits on # of repos returned. using '?page=1&per_page=100'
        this._http.get(CONFIG.GETREPOS1_URL, options)
            .map(res => <Array<Irepo>>res.json())
            .catch((err, caught) => this.handleError(err, caught))
            .subscribe(p => {
                this.repoList1 = p;
                // need both pages to be added together
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
                // need both pages to be added together
                if (this.repoList1) {
                    this.repoList2.push.apply(this.repoList2, this.repoList1);
                    this._repoListSubject.next(this.repoList2);
                }
            })
            .add(() => console.log('unsub'));
    }

    // get each repo's code.json file (called from the app.component.ts subscription to RepoList() )
    public getRepoCodejson(repoName, creds): Observable<Icodejson> {
        const JSON_HEADERS = new Headers({ 'Accept': 'application/json', 'Authorization': creds });
        const options = new RequestOptions({ headers: JSON_HEADERS });
        return this._http.get(CONFIG.GETREPO_CODE_URL + repoName + '/contents/code.json', options)
            .map((response: Response) => {
                if (response) {localStorage.setItem('credentials', creds); }
                return <Icodejson>response.json();
            })
            .catch((err, caught) => this.handleError(err, caught));
    }

    // Error Handler
    private handleError(error: any, caught: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
        this._errorMsgSubject.next(errMsg);
        return Observable.throw(errMsg);
    }

    public async getVulnerabilities(pass) {
        this.reposWithVulnerabilities = [];
        const client = new GraphQLClient('https://api.github.com/graphql', {
            headers: {
                Accept: 'application/vnd.github.vixen-preview+json',
                Authorization: 'Bearer ' + atob(pass),
            },
        });
        const query1 = `{organization(login:"USGS-WiM") {
                id
                name
                repositories(first:100) {
                    nodes {
                        id
                        name
                        vulnerabilityAlerts(first:20) {
                            nodes {
                                id
								packageName
								affectedRange
								fixedIn
							}
							totalCount
                        }
                    }
                }
            }
		}`;
        const query2 = `{organization(login:"USGS-WiM") {
				id
				name
				repositories(last:50) {
					nodes {
						id
						name
						vulnerabilityAlerts(first:20) {
							nodes {
								id
								packageName
								affectedRange
								fixedIn
							}
							totalCount
						}
					}
				}
			}
        }`;
        this.repoNames = [];
        const vulnReturn = await client.request(query1);
        this.getVulnData(vulnReturn);
        const vulnReturn2 = await client.request(query2);
        this.getVulnData(vulnReturn2);
        localStorage.setItem('passInput', pass);
        this._repoVulnSubject.next(this.reposWithVulnerabilities);
    }

    public getVulnData(data) {
        const nodes = data['organization']['repositories']['nodes'];
        let vulnAlerts;
        for (const node in nodes) {
            if (this) {
                vulnAlerts = nodes[node].vulnerabilityAlerts.totalCount;
                if (vulnAlerts > 0 && !(this.repoNames.indexOf(nodes[node].name) !== -1)) {
                    const newVulnRepo = { name: '', vulnerabilityAlerts: 0, packages: [] };
                    newVulnRepo.name = nodes[node].name;
                    this.repoNames.push(nodes[node].name);
                    newVulnRepo.vulnerabilityAlerts = vulnAlerts;
                    let i = 0;
                    for (const pkg in nodes[node].vulnerabilityAlerts.nodes) {
                        if (pkg) {
                            const pack = {name: '', affectedRange: '', fixedIn: ''};
                            if (nodes[node].vulnerabilityAlerts.nodes[pkg].packageName) {
                                pack.name = nodes[node].vulnerabilityAlerts.nodes[pkg].packageName;
                            }
                            if (nodes[node].vulnerabilityAlerts.nodes[pkg].affectedRange) {
                                pack.affectedRange = nodes[node].vulnerabilityAlerts.nodes[pkg].affectedRange;
                            }
                            if (nodes[node].vulnerabilityAlerts.nodes[pkg].fixedIn) {
                                pack.fixedIn = nodes[node].vulnerabilityAlerts.nodes[pkg].fixedIn;
                            }
                            if (!this.containsObject(pack, newVulnRepo.packages)) {
                                newVulnRepo.packages.push(pack);
                            }
                            i++;
                        }
                    }
                    this.reposWithVulnerabilities.push(newVulnRepo);
                }
            }
        }
    }

    public containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].packageName === obj.packageName && list[i].affectedRange === obj.affectedRange && list[i].fixedIn === obj.fixedIn) {
                return true;
            }
        }

        return false;
    }
}
