import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private router = inject(Router);
  timedOutCloser: any;

  enter() {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
  }

  leave(trigger: MatMenuTrigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 100); // Atraso de 100ms
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
