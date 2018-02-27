import { Ilink } from "./link.interface";

export interface Icodejson {
    content: string;
    download_url: string;
    encoding: string;
    git_url: string;
    html_url: string;
    name: string;
    path: string;
    sha: string;
    size: number;
    type: string;
    url: string;
    _links: Ilink;

}