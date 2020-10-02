import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { InteractionService } from '../_services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user : User;
  //model: any = {};
  registerForm: FormGroup;

  constructor(private authService : AuthService,private alertify:AlertifyService,
     private router : Router, private interactionService: InteractionService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      aUsername: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      aname: ['', Validators.required],
      aEmail: ['', [Validators.required,Validators.email]],
      aDob: [null,Validators.required]
    }, {validators: this.passwordMatchValidator});
  }
  passwordMatchValidator(form: FormGroup){
    return form.get('password').value === form.get('confirmPassword').value ? null : {'mismatch' :true};
  }

  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success('Registered Successfully');
        this.authService.login(this.user).subscribe(() => {
          this.interactionService.nextMessage(true);
          this.router.navigate(['/home']);
        }, error => {
          this.alertify.error(error);
        });
      }, error => {
        this.alertify.error(error);
    });
  }
}
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Registered Successfully');
      // this.authService.login(this.model).subscribe(next => {
      //   this.interactionService.nextMessage(true);
      //   this.router.navigate(['/home']);
      // }, error => {
      //   this.alertify.error(error);
      // });
    // }, error => {
    //   this.alertify.error(error);
    // });

  onReset() {
    //this.submitted = false;
    this.registerForm.reset();
  } 

}
