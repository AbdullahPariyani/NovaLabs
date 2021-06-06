import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private authenticationService: AuthenticationService
  ) { }


  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get e() { return this.registerForm.controls; }

  onSubmit() {
    debugger
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .subscribe(
        data => {
          alert('Registered successfully');
          this.registerForm.reset();
          this.loading = false;
          this.submitted = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
