import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { WIMRepoService } from './services/wimrepo.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Irepo } from './interfaces/repo.interface';

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

	public displayedColumnsWith = ['name', 'created_at', 'description', 'liveurl', 'contact', 'status'];
	public displayedColumnsWithOut = ['name', 'created_at', 'description'];

	public ReposWithCodejson: Irepo[];
	public ReposWithOutCodejson: Irepo[];

	public dataSourceWithCode: MatTableDataSource<Irepo>;
	public dataSourceWithOutCode: MatTableDataSource<Irepo>;

	public countWithCode: any;

	// public sortedData: any;

	repoDataLoaded = false;

	constructor(private _wimrepoService: WIMRepoService, private _cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.ReposWithCodejson = [];
		this.ReposWithOutCodejson = [];

		this._wimrepoService.RepoList.subscribe(
			(repos: Array<Irepo>) => {

				let index = 0;
				repos.forEach(repo => {
					index++;
					this._wimrepoService.getRepoCodejson(repo.name).subscribe(code => {
						let decodedContent = atob(code.content);
						let jsonContent = JSON.parse(decodedContent);
						repo.status = jsonContent[0].status;
						repo.contact = jsonContent[0].contact.name;
						repo.liveurl = jsonContent[0].homepageURL;
						this.ReposWithCodejson.push(repo);

						// BAD 4/19/18: moved these up here to ensure they are being set after all data is in and set
						this.dataSourceWithCode = new MatTableDataSource(this.ReposWithCodejson);
						this.dataSourceWithCode.sort = this.withCodeTableSort;
						this.countWithCode = this.ReposWithCodejson.length;
					}, error => {
						this.ReposWithOutCodejson.push(repo);
						this.dataSourceWithOutCode = new MatTableDataSource(this.ReposWithOutCodejson);
						this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
					});
				});
			});

	}
	// end ngOnInit()

	ngAfterViewChecked() {
		// this.dataSourceWithCode = new MatTableDataSource(this.ReposWithCodejson);
		// this.dataSourceWithCode.sort = this.withCodeTableSort;
		// this.dataSourceWithOutCode = new MatTableDataSource(this.ReposWithOutCodejson);
		// this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
		//this._cdr.detectChanges(); // fixes ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
	}

	public applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSourceWithCode.filter = filterValue;
		this.countWithCode = this.dataSourceWithCode.filteredData.length;
		
		//this.dataSourceWithCode.data = this.dataSourceWithCode.filteredData	//trying to get filter to set data
	}
}