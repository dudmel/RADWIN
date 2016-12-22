import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { HttpModule, RequestOptions } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { ExHttpService  } from './blocks';
import { Consts } from './shared';
import { AuthGuard } from './blocks/auth';
import { STORE_PROVIDERS } from './blocks/ngrx-store/store-providers';

// Components
import { AlarmsComponent } from './blocks/alarms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard';
import { WModalComponent } from './blocks/modal/modal.component';
import { QuickLookComponent } from './quick-look';
import { LinkStateComponent } from './quick-look/link-state.component';
import { OverviewComponent } from './overview';
import { SystemMonitorComponent, SystemConfigurationComponent } from './system';
import { RadioMonitorComponent, RadioConfigurationComponent } from './radio';
import { NetworkConfigurationComponent, TrapComponent } from './network';
import { DeviceMonitorComponent } from './monitor';
import { RecentEventsComponent } from './recent-events';
import { ChangeBandComponent } from './radio/change-band';
import { WifiConfigurationComponent } from './wifi';
import { SecurityConfigurationComponent } from './security';
import { SwuComponent } from './tools/unit/swu.component';
import { UnitToolsComponent } from './tools/unit/unit-tools.component';
import { OperationsComponent } from './tools/operations/operations.component';
import { RestoreToDeaultsComponent } from './tools/operations/restoreToDefaults/restore-to-defaults-component';
import { NetworkToolsComponent } from './tools/network/network-tools.component';
import { GaugeComponent, options } from './blocks';
import { InputControls } from './blocks/input_controls';


// Pipes
import { UnitsPipe, TimeTicks, ProductPipe, NoneValuePipe, MacPipe } from './blocks';
// 3rd Party
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2Bs3ModalModule   } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// Application wide providers
const APP_PROVIDERS = [
  ExHttpService,
  AuthGuard,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    WModalComponent, DashboardComponent, LoginComponent, QuickLookComponent,
    OverviewComponent, SystemMonitorComponent, SystemConfigurationComponent,
    RadioMonitorComponent, RadioConfigurationComponent,
    NetworkConfigurationComponent, DeviceMonitorComponent, RecentEventsComponent,
    ChangeBandComponent, TrapComponent, WifiConfigurationComponent,
    SecurityConfigurationComponent, UnitToolsComponent, OperationsComponent,
    NetworkToolsComponent, LinkStateComponent, GaugeComponent, AlarmsComponent,
    SwuComponent, RestoreToDeaultsComponent,  InputControls,
    // pipes
    ProductPipe, UnitsPipe, TimeTicks, NoneValuePipe, MacPipe
  ],
  imports: [ // import Angular's modules
    Ng2Bs3ModalModule,
    FileUploadModule,
    ChartsModule,
    ToastModule.forRoot(options),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  entryComponents: [RestoreToDeaultsComponent],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    STORE_PROVIDERS
  ],
})
export class AppModule {
  constructor() {}

}
