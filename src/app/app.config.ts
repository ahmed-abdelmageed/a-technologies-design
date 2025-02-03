import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzConfig, NzConfig } from 'ng-zorro-antd/core/config';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu'; 

const routes: Routes = [
  { path: '', loadComponent: () => import('./components/number-parent/number-parent.component').then(m => m.NumberParentComponent) }
];

const ngZorroConfig: NzConfig = {
  message: { nzDuration: 3000 },
  button: { nzSize: 'large' }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideNzConfig(ngZorroConfig),
    NzMessageService,
    importProvidersFrom(
      NzTableModule,
      NzButtonModule,
      NzInputModule,
      NzModalModule,
      NzDropDownModule,
      NzIconModule,
      NzMenuModule 
    )
  ]
};
