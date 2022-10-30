import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, merge, of, Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
  })
  export class StatusService {
    status: boolean = false;
    subscription: Subscription = Subscription.EMPTY;

    constructor(
        private notificationService: NotificationService,
        private router: Router,
    ) {

    }
  
  isOnline(): boolean {
    return navigator.onLine
  }

  getCurrentStatus() {
    return merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => this.isOnline()))
  }

  getStatus() {
    this.status = this.isOnline()
    this.subscription = this.getCurrentStatus()
      .subscribe(retStatus => {
        if (this.router.url === '/quiz/offline') {
          this.status = retStatus;
          return;
        }
        
        if (retStatus != this.status) {
          if (retStatus) {
            this.notificationService.openSnackBar('Internet connection has been restored.')
          } else if (this.router.url === '/quiz/started') {
            this.notificationService.openSnackBar('Internet connection was lost. Please continue until time expires.')
          } else {
            this.notificationService.openSnackBar('Internet connection was lost.')
          }
        }
        this.status = retStatus;
      });
  }

}