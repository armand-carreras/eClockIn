import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { FireService } from '../../shared/services/fire.service';
import { TransferUserService } from '../../shared/services/transfer-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup;
  user: User;
  logError: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private fireService: FireService,
    private authService: AuthService,
    private transferUserService: TransferUserService
    ) { }
  ngOnInit(): void {
    this.buildForm();
    this.user={};
    this.logError = false;
  }

  private buildForm(){
    this.formGroup = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', Validators.required],
      
    });
  }
  
  loginUser(formGroup){
    console.log('entro LoginUSer()');
      this.user.email = formGroup.get('email').value;
      this.user.password = formGroup.get('password').value;
      this.authService.login(this.user.email,this.user.password);
      setTimeout(function(){},100); //let time to login...
      this.router.navigate([`/list-manager`])
  };
  
  


}


