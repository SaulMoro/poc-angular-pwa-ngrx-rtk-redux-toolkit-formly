import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-upload-dynamic-form',
  template: `
    <mat-form-field class="example-form-field">
      <input
        matInput
        type="text"
        readonly="true"
        (click)="openInputFile($event)"
        [placeholder]="to.label"
        [formControl]="textFile"
        [formlyAttributes]="field"
        [required]="required"
      />
      <button
        class="button-upload-gn"
        type="button"
        (click)="openInputFile($event)"
        [disabled]="to.disabled"
        *ngIf="buttonUpload"
        mat-button
        matSuffix
        mat-icon-button
      >
        <mat-icon>cloud_upload</mat-icon>
      </button>
    </mat-form-field>
    <ng-container *ngIf="errorFile">
      <mat-error class="error-file-gn">
        <p>{{ 'VALIDATIONS.FILE_INCORRECT' | translate }} {{ error }}</p>
      </mat-error>
    </ng-container>
    <input type="text" [hidden]="true" [formControl]="formControl" />
    <input type="file" [hidden]="true" (change)="fileChanged($event)" #inputFile />
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      .error-file-gn {
        margin-top: -15px;
        font-size: 13.5px;
      }
      .button-upload-gn {
        background: none;
        border: none;
      }
    `,
  ],
})
export class InputUploadComponent extends FieldType implements OnInit {
  @ViewChild('inputFile', { static: true }) inputFile;
  error = '';
  errorFile = false;
  // buttonclose = false;
  buttonUpload = true;

  textFile: FormControl = new FormControl();

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {}

  openInputFile(event): void {
    if (!this.to.disabled) {
      event.preventDefault();
      this.inputFile.nativeElement.click();
    }
  }

  fileChanged(event): void {
    const [file] = event.target.files;
    if (file) {
      if (file.type.includes('pdf')) {
        const { changingThisBreaksApplicationSecurity: url } = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ) as any;
        this.getBase64FromURL(url).subscribe(
          (base64) => {
            this.formControl.setValue(base64);
            this.textFile.setValue(file.name);
          },
          () => {
            this.textFile.setValue('');
          }
        );
        this.error = '';
        this.errorFile = false;
        // this.buttonUpload = false;
        // this.buttonclose = true;
      } else {
        this.error = file.name;
        this.errorFile = true;
        // this.buttonUpload = true;
      }
    }
  }

  private getBase64FromURL(url): Observable<string> {
    return this.httpClient.get(url, { responseType: 'arraybuffer' }).pipe(
      map((arrayBuffer: ArrayBuffer) => {
        return this.arrayBufferToBase64(arrayBuffer);
      })
    );
  }

  private arrayBufferToBase64(buffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
