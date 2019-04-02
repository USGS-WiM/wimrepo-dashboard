webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"wim-nav\">\r\n    <div class=\"container\" style=\"width: 100%;\">\r\n        <button class=\"mobile-nav-toggle\" (click)=\"toggleSidebar()\"></button>\r\n        <a href=\"https://wim.usgs.gov\" class=\"nav-branding\">\r\n            <img src=\"https://wim.usgs.gov/visuals/branding/wimvector.png\" />\r\n        </a>\r\n        <span class=\"nav-title\">\r\n            Web Informatics and Mapping Repository Dashboard\r\n        </span>\r\n        <div class=\"nav-links\">\r\n            <a (click)=\"logout()\" *ngIf=\"isLoggedIn\">\r\n                <span>\r\n                    <span class=\"nav-link-text\">Logout</span>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"loginContainer\">\r\n\t<div *ngIf=\"!isLoggedIn\" class=\"login\">\r\n\t\t\t<div *ngIf=\"errorMessage\" id=\"errorMessage\">Username or Password is incorrect.</div>\r\n\t\t\t<label>Username:</label><input id=\"userInput\" placeholder=\"Username\"><br>\r\n\t\t\t<label>Github Token:</label><input type=\"password\" id=\"passInput\" placeholder=\"Password\"><br>\r\n\t\t\t<button (click)=\"login()\">Log In</button>\r\n\t</div>\r\n</div>\r\n<mat-accordion *ngIf=\"isLoggedIn\">\r\n\r\n\t<mat-expansion-panel id=\"repoAccordion\">\r\n\t\t<mat-expansion-panel-header>\r\n\t\t\t<mat-panel-title>Repos with Code.json file</mat-panel-title>\r\n\t\t\t<mat-panel-description>\r\n\t\t\t\tCount: {{countWithCode}}\r\n\t\t\t</mat-panel-description>\r\n\t\t</mat-expansion-panel-header>\r\n\t\t<!-- filter -->\r\n\t\t<div class=\"example-header\">\r\n\t\t\t<mat-form-field>\r\n\t\t\t\t<input class=\"filter\" matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n\t\t\t</mat-form-field>\r\n\t\t</div>\r\n\t\t<!-- Table of Repos with Code.json file-->\r\n\t\t<div class=\"example-container mat-elevation-z8\">\r\n\t\t\t<mat-table #withCodeTable=\"matSort\" [dataSource]=\"dataSourceWithCode\" matSort>\r\n\r\n\t\t\t\t<!-- repo name -->\r\n\t\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Repo Name</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\"> {{repo.name}} </mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- date repo created -->\r\n\t\t\t\t<ng-container matColumnDef=\"created_at\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Created Date</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\"> {{repo.created_at | date: 'MM/dd/yyyy'}} </mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- description -->\r\n\t\t\t\t<ng-container matColumnDef=\"description\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Description</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\"> {{repo.description}} </mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- homepage url -->\r\n\t\t\t\t<ng-container matColumnDef=\"liveurl\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>URL</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\">\r\n\t\t\t\t\t\t<a [href]=\"repo.liveurl\" target=\"_blank\">{{repo.liveurl}}</a>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- contact person -->\r\n\t\t\t\t<ng-container matColumnDef=\"contact\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Contact</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\"> {{repo.contact}} </mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- status -->\r\n\t\t\t\t<ng-container matColumnDef=\"status\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Status</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let repo\"> {{repo.status}} </mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- languages -->\r\n\t\t\t\t<ng-container matColumnDef=\"languages\">\r\n                    <mat-header-cell *matHeaderCellDef>Languages</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let repo\"> \r\n\t\t\t\t\t\t<mat-cell *ngFor=\"let lang of repo.languages\">\r\n\t\t\t\t\t\t\t{{lang}}<br>\r\n\t\t\t\t\t\t</mat-cell>\r\n\t\t\t\t\t</mat-cell>\r\n                </ng-container>\r\n\r\n                <!-- tags -->\r\n\t\t\t\t<ng-container matColumnDef=\"tags\">\r\n                    <mat-header-cell *matHeaderCellDef>Tags</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let repo\"> \r\n\t\t\t\t\t\t<mat-cell *ngFor=\"let tag of repo.tags\">\r\n\t\t\t\t\t\t\t{{tag}}<br>\r\n\t\t\t\t\t\t</mat-cell>\r\n\t\t\t\t\t</mat-cell>\r\n                </ng-container>\r\n\r\n\t\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumnsWith\"></mat-header-row>\r\n\t\t\t\t<mat-row *matRowDef=\"let repo; columns: displayedColumnsWith;\"></mat-row>\r\n\t\t\t</mat-table>\r\n\t\t</div>\r\n\r\n\t</mat-expansion-panel>\r\n\r\n\t<mat-expansion-panel>\r\n\t\t<mat-expansion-panel-header>\r\n\t\t\t<mat-panel-title>Repos with out Code.json file</mat-panel-title>\r\n\t\t\t<mat-panel-description>\r\n\t\t\t\tCount: {{ReposWithOutCodejson.length}}\r\n\t\t\t</mat-panel-description>\r\n\t\t</mat-expansion-panel-header>\r\n\r\n\t\t<!-- Table of Repos without Code.json file-->\r\n\t\t<mat-table #withoutCodeTable=\"matSort\" [dataSource]=\"dataSourceWithOutCode\" matSort>\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Repo Name</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"created_at\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Created Date</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> {{element.created_at | date: 'MM/dd/yyyy'}} </mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"description\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Description</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> {{element.description}} </mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumnsWithOut\"></mat-header-row>\r\n\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumnsWithOut;\"></mat-row>\r\n\t\t</mat-table>\r\n\r\n\t</mat-expansion-panel>\r\n\t<mat-expansion-panel>\r\n\t\t<mat-expansion-panel-header>\r\n\t\t\t<mat-panel-title>Repos with Vulnerabilities</mat-panel-title>\r\n\t\t\t<mat-panel-description>\r\n\t\t\t\tCount: {{countWithVuln}}\r\n\t\t\t</mat-panel-description>\r\n\t\t</mat-expansion-panel-header>\r\n\r\n\t\t<div class=\"example-header\">\r\n\t\t\t<mat-form-field>\r\n\t\t\t\t<input class=\"filter\" matInput (keyup)=\"applyVulnFilter($event.target.value)\" placeholder=\"Filter\">\r\n\t\t\t</mat-form-field>\r\n\t\t</div>\r\n\r\n\t\t<!-- Table of Repos without Code.json file-->\r\n\t\t<mat-table #vulnTable=\"matSort\" [dataSource]=\"dataSourceVuln\" matSort>\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Repo Name</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"vulnerabilityAlerts\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef mat-sort-header>Number of Vulnerabilities</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> {{element.vulnerabilityAlerts}} </mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"vulnerablePackages\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>Packages</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> \r\n\t\t\t\t\t\t<mat-cell *ngFor=\"let pack of element.packages\">\r\n\t\t\t\t\t\t\t{{pack.name}}<br>\r\n\t\t\t\t\t\t</mat-cell>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"affectedRange\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>Affected Version(s)</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> \r\n\t\t\t\t\t<mat-cell *ngFor=\"let pack of element.packages\">\r\n\t\t\t\t\t\t{{pack.affectedRange}}<br>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<ng-container matColumnDef=\"fixedIn\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>Fixed Version(s)</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let element\"> \r\n\t\t\t\t\t\t<mat-cell *ngFor=\"let pack of element.packages\">\r\n\t\t\t\t\t\t\t{{pack.fixedIn}}<br>\r\n\t\t\t\t\t\t</mat-cell>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumnsVuln\"></mat-header-row>\r\n\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumnsVuln;\"></mat-row>\r\n\t\t</mat-table>\r\n\r\n\t</mat-expansion-panel>\r\n\r\n</mat-accordion>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wimrepo_service__ = __webpack_require__("./src/app/services/wimrepo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_wimrepoService) {
        this._wimrepoService = _wimrepoService;
        this.displayedColumnsWith = ['name', 'created_at', 'description', 'liveurl', 'contact', 'status', 'languages', 'tags'];
        this.displayedColumnsWithOut = ['name', 'created_at', 'description'];
        this.displayedColumnsVuln = ['name', 'vulnerabilityAlerts', 'vulnerablePackages', 'affectedRange', 'fixedIn'];
        this.countWithCode = 0;
        this.countWithVuln = 0;
        this.isLoggedIn = false;
        this.errorMessage = false;
        // public sortedData: any;
        this.repoDataLoaded = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.ReposWithCodejson = [];
        this.ReposWithOutCodejson = [];
        this.ReposWithVulnerabilities = [];
        this.passInput = localStorage.getItem('passInput');
        this.creds = localStorage.getItem('credentials');
        if (this.creds && this.passInput && !this.checkSetupTime()) {
            this.ReposWithCodejson = [];
            this.ReposWithOutCodejson = [];
            this.ReposWithVulnerabilities = [];
            this.isLoggedIn = true;
            this.getRepos();
        }
        else {
            this.isLoggedIn = false;
        }
    };
    // end ngOnInit()
    AppComponent.prototype.ngAfterViewChecked = function () {
        // this.dataSourceWithCode = new MatTableDataSource(this.ReposWithCodejson);
        // this.dataSourceWithCode.sort = this.withCodeTableSort;
        // this.dataSourceWithOutCode = new MatTableDataSource(this.ReposWithOutCodejson);
        // this.dataSourceWithOutCode.sort = this.withoutCodeTableSort;
        // this._cdr.detectChanges(); // fixes ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    };
    AppComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceWithCode.filter = filterValue;
        this.countWithCode = this.dataSourceWithCode.filteredData.length;
        // this.dataSourceWithCode.data = this.dataSourceWithCode.filteredData	//trying to get filter to set data
    };
    AppComponent.prototype.getRepos = function () {
        var _this = this;
        this._wimrepoService.getVulnerabilities(this.passInput);
        this._wimrepoService.RepoVuln.subscribe(function (repoList) {
            _this.ReposWithVulnerabilities = repoList;
            _this.countWithVuln = Object.keys(repoList).length;
            _this.dataSourceVuln = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatTableDataSource */](_this.ReposWithVulnerabilities);
            _this.dataSourceVuln.sortingDataAccessor = function (data, sortHeaderId) {
                if (typeof data[sortHeaderId] === 'string') {
                    return data[sortHeaderId].toLocaleLowerCase();
                }
                else {
                    return data[sortHeaderId];
                }
            };
            _this.dataSourceVuln.sort = _this.vulnTableSort;
            _this.dataSourceVuln.filterPredicate = function (data, filter) {
                var accumulator = function (currentTerm, key) {
                    return _this.nestedFilterCheck(currentTerm, data, key);
                };
                var dataStr = Object.keys(data)
                    .reduce(accumulator, '')
                    .toLowerCase();
                // Transform the filter by converting it to lowercase and removing whitespace.
                var transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
            };
        });
        this._wimrepoService.getRepos(this.creds);
        this.ReposWithCodejson = [];
        this.ReposWithOutCodejson = [];
        this._wimrepoService.RepoList.subscribe(function (repos) {
            var index = 0;
            repos.forEach(function (repo) {
                index++;
                _this._wimrepoService.getRepoCodejson(repo.name, _this.creds).subscribe(function (code) {
                    var decodedContent = atob(code.content);
                    var jsonContent = JSON.parse(decodedContent);
                    repo.status = jsonContent[0].status;
                    repo.contact = jsonContent[0].contact.name;
                    repo.liveurl = jsonContent[0].homepageURL;
                    repo.languages = jsonContent[0].languages;
                    repo.tags = jsonContent[0].tags;
                    _this.ReposWithCodejson.push(repo);
                    // BAD 4/19/18: moved these up here to ensure they are being set after all data is in and set
                    _this.dataSourceWithCode = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatTableDataSource */](_this.ReposWithCodejson);
                    _this.dataSourceWithCode.sortingDataAccessor = function (data, sortHeaderId) {
                        if (typeof data[sortHeaderId] === 'string') {
                            return data[sortHeaderId].toLocaleLowerCase();
                        }
                        else {
                            return data[sortHeaderId];
                        }
                    };
                    _this.dataSourceWithCode.sort = _this.withCodeTableSort;
                    _this.countWithCode = _this.ReposWithCodejson.length;
                }, function (error) {
                    _this.ReposWithOutCodejson.push(repo);
                    _this.dataSourceWithOutCode = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatTableDataSource */](_this.ReposWithOutCodejson);
                    _this.dataSourceWithOutCode.sortingDataAccessor = function (data, sortHeaderId) {
                        if (typeof data[sortHeaderId] === 'string') {
                            return data[sortHeaderId].toLocaleLowerCase();
                        }
                        else {
                            return data[sortHeaderId];
                        }
                    };
                    _this.dataSourceWithOutCode.sort = _this.withoutCodeTableSort;
                });
            });
        });
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        this.userInput = document.getElementById('userInput').value;
        this.passInput = document.getElementById('passInput').value;
        this.creds = 'Basic ' + btoa(this.userInput + ':' + this.passInput);
        this.passInput = btoa(this.passInput);
        localStorage.setItem('loggedInUser', this.userInput);
        this.setStorageExpiration();
        if (this.userInput && this.passInput) {
            this.ReposWithCodejson = [];
            this.ReposWithOutCodejson = [];
            this.ReposWithVulnerabilities = [];
            this.getRepos();
        }
        else {
            this.isLoggedIn = false;
        }
        this._wimrepoService.ErrorMsgObs.subscribe(function (errMsg) {
            if (errMsg.includes('401')) {
                _this.isLoggedIn = false;
                _this.errorMessage = true;
            }
            else {
                _this.isLoggedIn = true;
                _this.errorMessage = false;
            }
        });
    };
    AppComponent.prototype.logout = function () {
        this.isLoggedIn = false;
        this.ReposWithCodejson = [];
        this.ReposWithOutCodejson = [];
        this.ReposWithVulnerabilities = [];
        localStorage.clear();
        location.reload();
    };
    AppComponent.prototype.applyVulnFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceVuln.filter = filterValue;
        this.countWithVuln = this.dataSourceVuln.filteredData.length;
        // this.dataSourceWithCode.data = this.dataSourceWithCode.filteredDat
    };
    AppComponent.prototype.nestedFilterCheck = function (search, data, key) {
        if (typeof data[key] === 'object') {
            for (var k in data[key]) {
                if (data[key][k] !== null) {
                    search = this.nestedFilterCheck(search, data[key], k);
                }
            }
        }
        else {
            search += data[key];
        }
        return search;
    };
    AppComponent.prototype.setStorageExpiration = function () {
        var hours = 12; // Reset when storage is more than 12 hours
        var now = new Date().getTime();
        var setupTime = Number(localStorage.getItem('setupTime'));
        localStorage.setItem('setupTime', now.toString());
    };
    AppComponent.prototype.checkSetupTime = function () {
        var tooOld = false;
        var twentyFourHours = 12 * 60 * 60 * 1000;
        var now = new Date().getTime();
        var setupTime = Number(localStorage.getItem('setupTime'));
        if (now - setupTime > twentyFourHours) {
            // is it greater than 12 hours
            tooOld = true;
            localStorage.clear();
        }
        return tooOld;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatSort */])
    ], AppComponent.prototype, "sort", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('withCodeTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatSort */])
    ], AppComponent.prototype, "withCodeTableSort", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('withoutCodeTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatSort */])
    ], AppComponent.prototype, "withoutCodeTableSort", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('vulnTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatSort */])
    ], AppComponent.prototype, "vulnTableSort", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            // tslint:disable:indent
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_wimrepo_service__["a" /* WIMRepoService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wimrepo_service__ = __webpack_require__("./src/app/services/wimrepo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_table__ = __webpack_require__("./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_expansion__ = __webpack_require__("./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_6__angular_material_table__["b" /* MatTableModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatSortModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_expansion__["a" /* MatExpansionModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__services_wimrepo_service__["a" /* WIMRepoService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/services/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
// ------------------------------------------------------------------------------
// ------------ config ----------------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS              
// purpose:     Configuration file for all the urls
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CONFIG = /** @class */ (function () {
    function CONFIG() {
    }
    Object.defineProperty(CONFIG, "GETREPOS1_URL", {
        get: function () { return this.baseURL + "orgs/" + this.ORG + "/repos?page=1&per_page=100"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CONFIG, "GETREPOS2_URL", {
        get: function () { return this.baseURL + "orgs/" + this.ORG + "/repos?page=2&per_page=100"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CONFIG, "GETREPO_CODE_URL", {
        get: function () { return this.baseURL + "repos/" + this.ORG + "/"; },
        enumerable: true,
        configurable: true
    });
    CONFIG.baseURL = "https://api.github.com/";
    CONFIG.ORG = "USGS-WiM";
    CONFIG = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])()
    ], CONFIG);
    return CONFIG;
}());



/***/ }),

/***/ "./src/app/services/wimrepo.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WIMRepoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__("./src/app/services/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_graphql_request__ = __webpack_require__("./node_modules/graphql-request/dist/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_graphql_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_graphql_request__);
// ------------------------------------------------------------------------------
// ------------ wimrepo.service.service --------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2018 WiM - USGS
// purpose:     Service for retrieving github api endpoints (repos and each repo's code.json file)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









// import  * as fetch  from 'isomorphic-fetch';
var WIMRepoService = /** @class */ (function () {
    function WIMRepoService(_http) {
        this._http = _http;
        this.reposWithVulnerabilities = [];
        this._repoListSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this._repoVulnSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this._errorMsgSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
    }
    Object.defineProperty(WIMRepoService.prototype, "RepoList", {
        // getter: subscribed to from app.component.ts (sends every time the _repoListSubject gets updated -
        // which is only once upon initial load)
        get: function () {
            return this._repoListSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WIMRepoService.prototype, "RepoVuln", {
        // getter: subscribed to from app.component.ts (sends every time the _repoListSubject gets updated -
        // which is only once upon initial load)
        get: function () {
            return this._repoVulnSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WIMRepoService.prototype, "ErrorMsgObs", {
        get: function () {
            return this._errorMsgSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // get all the repos (called from constructor)
    WIMRepoService.prototype.getRepos = function (creds) {
        var _this = this;
        var JSON_HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Authorization': creds });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: JSON_HEADERS });
        // need to request the repos in 2 separate calls due to limits on # of repos returned. using '?page=1&per_page=100'
        this._http.get(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* CONFIG */].GETREPOS1_URL, options)
            .map(function (res) { return res.json(); })
            .catch(function (err, caught) { return _this.handleError(err, caught); })
            .subscribe(function (p) {
            _this.repoList1 = p;
            // need both pages to be added together
            if (_this.repoList2) {
                _this.repoList1.push.apply(_this.repoList1, _this.repoList2);
                _this._repoListSubject.next(_this.repoList1);
            }
        });
        // need to request the repos in 2 separate calls due to limits on # of repos returned. using '?page=2&per_page=100'
        this._http.get(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* CONFIG */].GETREPOS2_URL, options)
            .map(function (res) { return res.json(); })
            .catch(function (err, caught) { return _this.handleError(err, caught); })
            .subscribe(function (p) {
            _this.repoList2 = p;
            // need both pages to be added together
            if (_this.repoList1) {
                _this.repoList2.push.apply(_this.repoList2, _this.repoList1);
                _this._repoListSubject.next(_this.repoList2);
            }
        })
            .add(function () { return console.log('unsub'); });
    };
    // get each repo's code.json file (called from the app.component.ts subscription to RepoList() )
    WIMRepoService.prototype.getRepoCodejson = function (repoName, creds) {
        var _this = this;
        var JSON_HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Authorization': creds });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: JSON_HEADERS });
        return this._http.get(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* CONFIG */].GETREPO_CODE_URL + repoName + '/contents/code.json', options)
            .map(function (response) {
            if (response) {
                localStorage.setItem('credentials', creds);
            }
            return response.json();
        })
            .catch(function (err, caught) { return _this.handleError(err, caught); });
    };
    // Error Handler
    WIMRepoService.prototype.handleError = function (error, caught) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg);
        this._errorMsgSubject.next(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    WIMRepoService.prototype.getVulnerabilities = function (pass) {
        return __awaiter(this, void 0, void 0, function () {
            var client, query1, query2, vulnReturn, vulnReturn2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reposWithVulnerabilities = [];
                        client = new __WEBPACK_IMPORTED_MODULE_8_graphql_request__["GraphQLClient"]('https://api.github.com/graphql', {
                            headers: {
                                Accept: 'application/vnd.github.vixen-preview+json',
                                Authorization: 'Bearer ' + atob(pass),
                            },
                        });
                        query1 = "{organization(login:\"USGS-WiM\") {\n                id\n                name\n                repositories(first:100) {\n                    nodes {\n                        id\n                        name\n                        vulnerabilityAlerts(first:20) {\n                            nodes {\n                                id\n\t\t\t\t\t\t\t\tpackageName\n\t\t\t\t\t\t\t\taffectedRange\n\t\t\t\t\t\t\t\tfixedIn\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttotalCount\n                        }\n                    }\n                }\n            }\n\t\t}";
                        query2 = "{organization(login:\"USGS-WiM\") {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\trepositories(last:50) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvulnerabilityAlerts(first:20) {\n\t\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tpackageName\n\t\t\t\t\t\t\t\taffectedRange\n\t\t\t\t\t\t\t\tfixedIn\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttotalCount\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n        }";
                        this.repoNames = [];
                        return [4 /*yield*/, client.request(query1)];
                    case 1:
                        vulnReturn = _a.sent();
                        this.getVulnData(vulnReturn);
                        return [4 /*yield*/, client.request(query2)];
                    case 2:
                        vulnReturn2 = _a.sent();
                        this.getVulnData(vulnReturn2);
                        localStorage.setItem('passInput', pass);
                        this._repoVulnSubject.next(this.reposWithVulnerabilities);
                        return [2 /*return*/];
                }
            });
        });
    };
    WIMRepoService.prototype.getVulnData = function (data) {
        var nodes = data['organization']['repositories']['nodes'];
        var vulnAlerts;
        for (var node in nodes) {
            if (this) {
                vulnAlerts = nodes[node].vulnerabilityAlerts.totalCount;
                if (vulnAlerts > 0 && !(this.repoNames.indexOf(nodes[node].name) !== -1)) {
                    var newVulnRepo = { name: '', vulnerabilityAlerts: 0, packages: [] };
                    newVulnRepo.name = nodes[node].name;
                    this.repoNames.push(nodes[node].name);
                    newVulnRepo.vulnerabilityAlerts = vulnAlerts;
                    var i = 0;
                    for (var pkg in nodes[node].vulnerabilityAlerts.nodes) {
                        if (pkg) {
                            var pack = { name: '', affectedRange: '', fixedIn: '' };
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
    };
    WIMRepoService.prototype.containsObject = function (obj, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].packageName === obj.packageName && list[i].affectedRange === obj.affectedRange && list[i].fixedIn === obj.fixedIn) {
                return true;
            }
        }
        return false;
    };
    WIMRepoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], WIMRepoService);
    return WIMRepoService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map