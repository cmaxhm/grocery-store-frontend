import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {
  constructor(private loginService: LoginService) {}

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.loginService.logout();
  }
}
