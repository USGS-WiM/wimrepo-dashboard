// ------------------------------------------------------------------------------
// ------------ config ----------------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS              
// purpose:     Configuration file for all the urls

import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";

@Injectable()
export class CONFIG {
    private static baseURL: string = "https://api.github.com/";
    private static ORG: string = "USGS-WiM";

    public static get GETREPOS1_URL(): string { return this.baseURL + "orgs/" + this.ORG + "/repos?page=1&per_page=100"; };
    public static get GETREPOS2_URL(): string { return this.baseURL + "orgs/" + this.ORG + "/repos?page=2&per_page=100"; };

    public static get GETREPO_CODE_URL(): string { return this.baseURL + "repos/" + this.ORG + "/" }
}
