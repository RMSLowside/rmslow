import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'rms-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs-forms';

  constructor(
    public dialog: MatDialog
  ) { }

  
  async openForms() {
    import('@rms-frontend/forms').then(
      ({ FormsModule }) => {
        import('libs/forms/src/lib/dynamic-form-modal/dynamic-form-modal.component').then(
          ({ DynamicFormModalComponent }) => {
            const dialogRef = this.dialog.open(DynamicFormModalComponent, {
              width: '500px',
              data: { form: 'test' }
            });

            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          }
        )
      }
    )
  }

}
