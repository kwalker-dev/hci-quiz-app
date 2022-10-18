import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { User } from './core/user';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { NotificationService } from './shared/notification.service';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  loaded: boolean = false;
  title = 'SLAAK Quiz';
  user!: User;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.loaded = false;
    this.loading = true;
        this.user = {
      id: 0,
      userid: ''
    };
    
    this.userService.getUser().subscribe({
      next: (data: User) => {
        this.router.navigate(['quiz']);
        this.loaded = true;
      },
      error: err => {
        console.log(err);
        this.user.userid = '';
        this.router.navigate(['error']);
        this.loaded = true;
      }
    });

    this.notificationService.openSnackBar('this is a test notification on start up.')
  }
}
