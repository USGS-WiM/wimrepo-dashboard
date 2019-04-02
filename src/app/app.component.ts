import { Component, ViewChild, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { WIMRepoService } from './services/wimrepo.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Irepo } from './interfaces/repo.interface';
import * as jwt from 'express-jwt';

@Component({
  // tslint:disable:indent
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('withCodeTable') withCodeTableSort: MatSort;
  @ViewChild('withoutCodeTable') withoutCodeTableSort: MatSort;
  @ViewChild('vulnTable') vulnTableSort: MatSort;

  public displayedColumnsWith = ['name', 'created_at', 'description', 'liveurl', 'contact', 'status'];
  public displayedColumnsWithOut = ['name', 'created_at', 'description'];
  public displayedColumnsVuln = ['name', 'vulnerabilityAlerts', 'vulnerablePackages', 'affectedRange', 'fixedIn'];

  public ReposWithCodejson: Irepo[];
  public ReposWithOutCodejson: Irepo[];
  public ReposWithVulnerabilities: any;

  public dataSourceWithCode: MatTableDataSource<Irepo>;
  public dataSourceWithOutCode: MatTableDataSource<Irepo>;
  public dataSourceVuln: MatTableDataSource<any>;

  public countWithCode = 0;
  public countWithVuln = 0;

  public userInput;
  public passInput;
  public creds;
  public storedPass;

  public isLoggedIn = false;
  public errorMessage = false;

  // public sortedData: any;

  repoDataLoaded = false;

  constructor(private _wimrepoService: WIMRepoService) {}

  ngOnInit() {
    this.ReposWithCodejson = [];
    this.ReposWithOutCodejson = [];
    this.ReposWithVulnerabilities = [];
    this.creds = localStorage.getItem('passInput');
    this.storedPass = localStorage.getItem('credentials');

    if (this.creds && this.storedPass && !this.checkSetupTime()) {
      this.ReposWithCodejson = [];
      this.ReposWithOutCodejson = [];
      this.ReposWithVulnerabilities = [];
      this.isLoggedIn = true;
      this.getRepos();
    } else {
      this.isLoggedIn = false;
    }
  }
  // end ngOnInit()

  ngAfterViewChecked() {
    // this.dataSourceWithCode = new MatTableDataSource(this.ReposWithCodejson);
    // this.dataSourceWithCode.sort = this.withCodeTableSort;
    // this.dataSourceWithOutCode = new MatTableDataSource(this.ReposWithOutCodejson);
    // this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
    // this._cdr.detectChanges(); // fixes ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceWithCode.filter = filterValue;
    this.countWithCode = this.dataSourceWithCode.filteredData.length;

    // this.dataSourceWithCode.data = this.dataSourceWithCode.filteredData	//trying to get filter to set data
  }

  public getRepos() {
    this._wimrepoService.getVulnerabilities(this.passInput);
    this._wimrepoService.RepoVuln.subscribe(repoList => {
      this.ReposWithVulnerabilities = repoList;
      this.countWithVuln = Object.keys(repoList).length;
      this.dataSourceVuln = new MatTableDataSource(this.ReposWithVulnerabilities);
      this.dataSourceVuln.sortingDataAccessor = (data, sortHeaderId) => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        } else {
          return data[sortHeaderId];
        }
      };
      this.dataSourceVuln.sort = this.vulnTableSort;
      this.dataSourceVuln.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });
    this._wimrepoService.getRepos(this.creds);
    this.ReposWithCodejson = [];
    this.ReposWithOutCodejson = [];

    this._wimrepoService.RepoList.subscribe(
        (repos: Array<Irepo>) => {

      let index = 0;
      repos.forEach(repo => {
        index++;
        this._wimrepoService.getRepoCodejson(repo.name, this.creds).subscribe(code => {
            const decodedContent = atob(code.content);
            const jsonContent = JSON.parse(decodedContent);
            repo.status = jsonContent[0].status;
            repo.contact = jsonContent[0].contact.name;
            repo.liveurl = jsonContent[0].homepageURL;
            this.ReposWithCodejson.push(repo);

            // BAD 4/19/18: moved these up here to ensure they are being set after all data is in and set
            this.dataSourceWithCode = new MatTableDataSource(this.ReposWithCodejson);
            this.dataSourceWithCode.sortingDataAccessor = (data, sortHeaderId) => {
              if (typeof data[sortHeaderId] === 'string') {
                return data[sortHeaderId].toLocaleLowerCase();
              } else {
                return data[sortHeaderId];
              }
            };
            this.dataSourceWithCode.sort = this.withCodeTableSort;
            this.countWithCode = this.ReposWithCodejson.length;
          }, error => {
            this.ReposWithOutCodejson.push(repo);
            this.dataSourceWithOutCode = new MatTableDataSource(this.ReposWithOutCodejson);
            this.dataSourceWithOutCode.sortingDataAccessor = (data, sortHeaderId) => {
              if (typeof data[sortHeaderId] === 'string') {
                return data[sortHeaderId].toLocaleLowerCase();
              } else {
                return data[sortHeaderId];
              }
            };
            this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
          });
      });
    });

  }

  public login() {
    this.userInput = (<HTMLInputElement>document.getElementById('userInput')).value;
    this.passInput = (<HTMLInputElement>document.getElementById('passInput')).value;

    this.creds = 'Basic ' + btoa(this.userInput + ':' + this.passInput);
    // this.passInput = btoa(this.passInput) // not working, even with Bearer added
    localStorage.setItem('loggedInUser', this.userInput);
    this.setStorageExpiration();

    if (this.userInput && this.passInput) {
      this.ReposWithCodejson = [];
      this.ReposWithOutCodejson = [];
      this.ReposWithVulnerabilities = [];
      this.getRepos();
    } else {
      this.isLoggedIn = false;
    }

    this._wimrepoService.ErrorMsgObs.subscribe((errMsg: string) => {
      if (errMsg.includes('401')) {
        this.isLoggedIn = false;
        this.errorMessage = true;
      } else {
        this.isLoggedIn = true;
        this.errorMessage = false;
      }
    });
  }

  public logout() {
    this.isLoggedIn = false;
    this.ReposWithCodejson = [];
    this.ReposWithOutCodejson = [];
    this.ReposWithVulnerabilities = [];
    localStorage.clear();
  }

  public applyVulnFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceVuln.filter = filterValue;
    this.countWithVuln = this.dataSourceVuln.filteredData.length;

    // this.dataSourceWithCode.data = this.dataSourceWithCode.filteredDat
  }
  public nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  private setStorageExpiration(): void {
    const hours = 12; // Reset when storage is more than 12 hours
    const now: number = new Date().getTime();
    const setupTime: number = Number(localStorage.getItem('setupTime'));
    localStorage.setItem('setupTime', now.toString());
  }

  private checkSetupTime(): boolean {
    let tooOld = false;

    const twentyFourHours: number = 12 * 60 * 60 * 1000;
    const now: number = new Date().getTime();
    const setupTime: number = Number(localStorage.getItem('setupTime'));
    if (now - setupTime > twentyFourHours) {
        // is it greater than 12 hours
        tooOld = true;
        localStorage.clear();
    }

    return tooOld;
    }
}
