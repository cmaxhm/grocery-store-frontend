import { Component, HostListener } from '@angular/core';
import { RESPONSIVE_BREAKPOINTS } from '../../utilities/responsive-breakpoints.utility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Indicates if the screen is responsive.
   */
  public isResponsive: boolean;

  /**
   * Indicates if the menu should be displayed.
   */
  public isMenuDisplayed: boolean;

  constructor() {
    this.isResponsive = window.innerWidth <= RESPONSIVE_BREAKPOINTS.lg;
    this.isMenuDisplayed = !this.isResponsive;
  }

  /**
   * Listener for Window resize and updates the isResponsive property.
   *
   * @private
   */
  @HostListener('window:resize')
  private onWindowResize(): void {
    this.isResponsive = window.innerWidth <= RESPONSIVE_BREAKPOINTS.lg;
    this.isMenuDisplayed = !this.isResponsive;
  }

  /**
   * Toggles the menu display.
   */
  public toggleMenu(): void {
    this.isMenuDisplayed = !this.isMenuDisplayed;
  }
}
