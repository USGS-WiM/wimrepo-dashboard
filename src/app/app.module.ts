import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WIMRepoService } from './services/wimrepo.service';
import { MatInputModule } from '@angular/material';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule,BrowserAnimationsModule, HttpModule, MatInputModule, MatTableModule, MatSortModule, MatFormFieldModule, MatExpansionModule ],
  providers: [ WIMRepoService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
