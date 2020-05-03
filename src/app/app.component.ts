import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'ZPI-Frontend';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      'admin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/admin.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'leader',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/leader.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'client',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/client.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/user2.svg')
    );
  }
}
