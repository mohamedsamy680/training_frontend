import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackBaseComponent } from '../../shared/back-base/back-base.component';
import { MsgService } from '../../shared/services/msg.service';
import * as regex from '../../shared/data/regex-patterns';

import { ChangePasswordService } from './change-password.service';
import { IChangePassword } from './change-password-view-model';
import { WrappedResponse } from '../../shared/data/api-data';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BackBaseComponent implements OnInit {

    myForm: FormGroup;
    @ViewChild('btnReset', { static: true }) btnReset: ElementRef<HTMLElement>;

    saveEditString: string = 'Change Password';
    saveButtonString: string = 'Save';

    hideOld = true;
    hideNew = true;
    hideConfirm = true;
    savedObj: any;

    constructor(
        public dialogRef: MatDialogRef<any, any>,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private msg: MsgService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) data: any,
        private service: ChangePasswordService
    ) {
        super(dialog, msg, null);
    }

    get oldPasswordCtrl() { return this.myForm.get('oldPassword'); }
    get newPasswordCtrl() { return this.myForm.get('newPassword'); }
    get newConfirmPasswordCtrl() { return this.myForm.get('newConfirmPassword'); }

    ngOnInit() {

        this.myForm = this.fb.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(regex.passwordPattern3)]],
                newConfirmPassword: ['', [Validators.required, , Validators.minLength(8), Validators.maxLength(16), Validators.pattern(regex.passwordPattern3)]]
            }
        );

    }

    onSubmit() {

        if (this.oldPasswordCtrl.value && this.newPasswordCtrl.value && this.oldPasswordCtrl.value === this.newPasswordCtrl.value) {
            this.msg.showWarning("New password seems to be the old one, please write a new password!");
            return;
        }

        if (this.newPasswordCtrl.value && this.newConfirmPasswordCtrl.value && this.newPasswordCtrl.value !== this.newConfirmPasswordCtrl.value) {
            this.msg.showWarning("Password and confirm password not matched !");
            return;
        }

        if (this.myForm.valid && this.myForm.touched && this.myForm.dirty) {

            let obj = {} as IChangePassword;
            obj.oldPassword = this.oldPasswordCtrl.value;
            obj.newPassword = this.newPasswordCtrl.value;
            obj.employeeId = this.userTokenId;

            //console.log("NOW CALL THE SERVER: ", obj);
            this.service.changePassword<IChangePassword, WrappedResponse<string>>(this.userTokenId, obj).subscribe(response => {

                this.msg.showSuccess("Password Updated Successfully Please Login again");
                this.dialogRef.close(this.savedObj);
                localStorage.clear();
                this.router.navigate(['/']);
            }, error => {
              console.log(error);
              this.msg.handleErrorV2(error);
            });
        } else {
            this.msg.showInfo('Invalid Form data!');
        }
    }

}
