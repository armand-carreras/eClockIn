import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { FireService } from '../../shared/services/fire.service';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private fireService: FireService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.buildForm();
    this.user = {};
  }



  private buildForm(){
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]*$/), this.validatePass]],
      repassword: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]*$/), this.validatePass]],
    },
    // {
    //   validators: this.matchPasswords
    // }
    )
  }



  private validatePass(control: AbstractControl){
    const password = control.value;

    let error = null;
    if(password.includes('$'||'~'||'.'||','||';'||':'||'`'||'¨'||'^'||'?'||'¿'||'¡'||"'"||'@'||'¬'||'&'||'/'||'|')){
      error = { ...error, 'string':"Those characters are not allowed: $ ~ . , ; : ` ^ ¨ ? ¿ ¿ '  @ ¬ & / |"};
    }
  }

  registerUser(formGroup){
    if(formGroup.get('password').value === formGroup.get('repassword').value){
      
      this.authService.signup(formGroup.get('name').value,
                              formGroup.get('email').value,
                              formGroup.get('password').value);
      this.router.navigate(['/login']);
    }
    else{
      window.alert('passwords dont match || email not exist')
    }
  };


}
