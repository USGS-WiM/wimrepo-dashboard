import { Component, ViewChild } from '@angular/core';
import { WIMRepoService } from './services/wimrepo.service';
import { MatTableDataSource, MatSort } from '@angular/material';

function compare(a, b, isAsc) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild(MatSort) sort: MatSort;
	public ReposWithCodejson: Array<any>;
	public ReposWithOutCodejson: Array<any>;
	public displayedColumnsWith: Array<string>; 
	public displayedColumnsWithOut: Array<string>; 
	public dataSourceWithCode;
	public dataSourceWithOutCode;
	//public sortedData: any;

	constructor(private _wimrepoService: WIMRepoService) { }

	ngOnInit() {
		this.ReposWithCodejson = [];
		this.ReposWithOutCodejson = [];
		this.displayedColumnsWith = ['name', 'created_at', 'description', 'contact', 'status'];
		this.displayedColumnsWithOut = ['name', 'created_at', 'description'];
		this._wimrepoService.RepoList.subscribe((repos: Array<any>) => {
			let index = 0;
			repos.forEach(r => {
				index++;
				this._wimrepoService.getRepoCodejson(r.name).subscribe(code => {
					let decodedContent = atob(code.content);
					let jsonContent = JSON.parse(decodedContent);
					r.status = jsonContent[0].status;
					r.contact = jsonContent[0].contact.name
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
		this.dataSourceWithCode.sort = this.sort;
		this.dataSourceWithOutCode  = new MatTableDataSource(this.ReposWithOutCodejson);
		this.dataSourceWithOutCode.sort = this.sort;
	}

	public test(r) {
		let what = "stop";

	}
	/*
	sortData(sort: Sort) {
		const data = this.ReposWithCodejson.slice();
		if (!sort.active || sort.direction == '') {
			this.ReposWithCodejson = data;
			return;
		}
		this.ReposWithCodejson = data.sort((a, b) => {
			let isAsc = sort.direction == 'asc';
			switch (sort.active) {
			  case 'name': return compare(a.name, b.name, isAsc);
			  case 'created_at': return compare(a.created_at, b.created_at, isAsc);
			  case 'description': return compare(a.description, b.description, isAsc);
			  case 'contact': return compare(a.contact, b.contact, isAsc);
			  case 'status': return compare(a.status, b.status, isAsc);
			  default: return 0;
			}
		});
	}*/
	

}
