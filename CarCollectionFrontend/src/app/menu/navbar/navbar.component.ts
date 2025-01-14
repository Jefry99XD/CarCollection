import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the login state observable
    this.subscription = this.userService.isLoggedIn$.subscribe(
      (loggedInStatus: boolean) => {
        this.isLoggedIn = loggedInStatus;
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
