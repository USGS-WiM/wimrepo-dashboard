import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WIMRepoService } from './services/wimrepo.service';
import { MatInputModule } from '@angular/material';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CallbackComponent } from './callback.component';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  declarations: [ AppComponent, CallbackComponent ],
  imports: [ BrowserModule,BrowserAnimationsModule, HttpModule, MatInputModule, MatTableModule, MatSortModule, MatFormFieldModule, MatExpansionModule, HttpClientModule, RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  providers: [ WIMRepoService, AuthService ],
  bootstrap: [ AppComponent, CallbackComponent ]
})

export class AppModule { }
