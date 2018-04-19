import { Component, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { WIMRepoService } from './services/wimrepo.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Irepo } from './interfaces/repo.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('withCodeTable') withCodeTableSort: MatSort;
	@ViewChild('withoutCodeTable') withoutCodeTableSort: MatSort;
	public ReposWithCodejson: Array<any>;
	public ReposWithOutCodejson: Array<any>;
	public displayedColumnsWith: Array<string>; 
	public displayedColumnsWithOut: Array<string>; 
	public dataSourceWithCode: MatTableDataSource<Irepo>;
	public dataSourceWithOutCode;
	//public sortedData: any;

	constructor(private _wimrepoService: WIMRepoService, private _cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.ReposWithCodejson = [];
		this.ReposWithOutCodejson = [];
		this.displayedColumnsWith = ['name', 'created_at', 'description', 'liveurl', 'contact', 'status'];
		this.displayedColumnsWithOut = ['name', 'created_at', 'description'];
		this._wimrepoService.RepoList.subscribe((repos: Array<Irepo>) => {
			let index = 0;
			repos.forEach(r => {
				index++;
				this._wimrepoService.getRepoCodejson(r.name).subscribe(code => {
					let decodedContent = atob(code.content);
					let jsonContent = JSON.parse(decodedContent);
					r.status = jsonContent[0].status;
					r.contact = jsonContent[0].contact.name;
					r.liveurl = jsonContent[0].homepageURL;
					this.ReposWithCodejson.push(r);
				}, error => {
					this.ReposWithOutCodejson.push(r);
				});
				
			});
		});
	} // end ngOnInit()

	// set this here after everything is done so that the 'this.ReposWithCodejson will have value
	ngAfterViewChecked() {
		this.dataSourceWithCode  = new MatTableDataSource(this.ReposWithCodejson);
		this.dataSourceWithCode.sort = this.withCodeTableSort;
		this.dataSourceWithOutCode  = new MatTableDataSource(this.ReposWithOutCodejson);
		this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
		this._cdr.detectChanges(); // fixes ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
	}

	public applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSourceWithCode.filter = filterValue;
		//this.dataSourceWithCode.data = this.dataSourceWithCode.filteredData	//trying to get filter to set data
	}
}
