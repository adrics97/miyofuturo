import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { LoginService } from 'src/app/services/login.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {

  userEmail = new FormControl('')

  constructor(
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private loginSvc: LoginService
  ) { }

  ngOnInit(): void {
  }

  sendEmail(){
    try{    
      const email = this.userEmail.value
      this.loginSvc.resetPassword(email);
      Swal.fire('Email enviado', '', 'success')
      this.dialogRef.close()
    }
    catch(error){
      console.log(error)
    }
  }
}
