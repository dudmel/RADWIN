import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecentEventsService } from './recent-events.service';
import { IRecentEvents } from './recent-events.model';
import { Consts } from '../shared/consts';
import { exLog } from '../shared/global-methods';
import { AppStore } from '../blocks';

@Component({
  selector: 'recent-events',
  providers: [RecentEventsService],
  styles: [require('./recent-events.styles.scss')],
  template: require('./recent-events.component.html')
})

export class RecentEventsComponent implements OnInit, OnDestroy {
  private legendStatus;
  private events: IRecentEvents[];
  private eventsSub;
  private hideSection=true;
  get isMobile() {
      return Consts.isMobile;
  }

  constructor(private _recentEventsService: RecentEventsService,
    private _store: Store<AppStore>) {
  }

  getRecentEvents() {
    this._recentEventsService.getData();
  }

  ngOnInit() {
    exLog('hello Recent Events component');

    this.eventsSub = this._store.select('events')
      .subscribe((events: IRecentEvents[]) => {
        if (events.length > 0)
          this.events = events;
      });

    this.getRecentEvents();
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

  refresh() {
    event.stopPropagation();
    exLog('Refresh Recent Events table');
    this.getRecentEvents();
  }

  getSeverityClass(severity: string) {
    switch (severity) {
      case Consts.TrapType[Consts.TrapType.Info]:
        return 'severity-circle info';
      case Consts.TrapType[Consts.TrapType.Normal]:
        return 'severity-circle normal';
      case Consts.TrapType[Consts.TrapType.Warning]:
        return 'severity-circle warning';
      case Consts.TrapType[Consts.TrapType.Minor]:
        return 'severity-circle minor';
      case Consts.TrapType[Consts.TrapType.Major]:
        return 'severity-circle major';
      case Consts.TrapType[Consts.TrapType.Critical]:
        return 'severity-circle critical';
      default:
        return 'severity-circle';
    }
  }

}
