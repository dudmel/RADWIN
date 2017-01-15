import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '../overview';
import { UnitToolsComponent } from '../tools/unit/unit-tools.component';
import { NetworkToolsComponent } from '../tools/network/network-tools.component';
import { OperationsComponent } from '../tools/operations/operations.component';
import { SystemConfigurationComponent } from '../system/';
import { NetworkConfigurationComponent } from '../network/';
import { RadioConfigurationComponent } from '../radio/'; 
import { WifiConfigurationComponent } from '../wifi/';
import { SecurityConfigurationComponent } from '../security/';
import { CanDeactivateGuard } from '../blocks/can-deactivate.guard';
import { RssMonitorComponent } from '../rss-monitor' 

export const ROUTES: Routes = [ 
  { path: '', redirectTo: 'overview' },
  { path: 'overview', component: OverviewComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'system-configuration', component: SystemConfigurationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'radio-configuration', component: RadioConfigurationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'network-configuration', component: NetworkConfigurationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'wifi-configuration', component: WifiConfigurationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'security-configuration', component: SecurityConfigurationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'unit-tools', component: UnitToolsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'network-tools', component: NetworkToolsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'operations-tools', component: OperationsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'rss-monitor', component: RssMonitorComponent, canDeactivate: [CanDeactivateGuard] },

];
