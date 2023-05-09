import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from 'src/app/_services';
import ReclamacoesJson from '../reclamacoes.json';

interface RECLAMACAOES {
      Id: Number,
      Nome: String,
      Email: String,
      Assunto: String,
      Descricao: String,
      Data: String,
      Pedido: Number,
      Reclamacao: Number,
      Status: String
}

@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent implements OnInit {
    // @ts-ignore
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    Users: RECLAMACAOES[] = ReclamacoesJson;   

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private http: HttpClient
    ) 
    {
       
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls;
        
    }

    onSubmit() {
        this.submitted = true;

        console.log(this.registerForm.controls['id'].value);
        //send http request
        
        
        
        
        // reset alerts on submit
        this.alertService.clear();
        

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    }
    navigateToLogin() {
        this.router.navigate(['/login']);
      }
    
    
}
