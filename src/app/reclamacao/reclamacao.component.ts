import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from 'src/app/_services';

@Component({ templateUrl: 'reclamacao.component.html' })
export class ReclamacaoComponent implements OnInit {
    // @ts-ignore
    registerForm: FormGroup;
    loading = false;
    submitted = false;

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
        this.registerForm = this.formBuilder.group({
            nomeCompleto: ['', Validators.required],
            cpf: ['', Validators.required],
            email: ['', Validators.required],
            celular: ['', Validators.required],
            assunto: ['', Validators.required],
            descricao: ['', Validators.required], 
            numeroPedido: ['', Validators.required], 
            anexos: ['', Validators.required],
            data: ['', [Validators.required, ]
            ]
        });
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls;
        
    }

    onSubmit() {
        this.submitted = true;

        console.log(this.registerForm.controls['nomeCompleto'].value);
        //send http request
        
        const postData = {
            nomeCompleto: this.registerForm.controls['nomeCompleto'].value,
            cpf: this.registerForm.controls['cpf'].value,
            endereco: this.registerForm.controls['endereco'].value,
            email: this.registerForm.controls['email'].value,
            celular: this.registerForm.controls['celular'].value,
            telefone: this.registerForm.controls['telefone'].value,
            assunto: this.registerForm.controls['assunto'].value,
            descricao: this.registerForm.controls['descricao'].value,
            data: this.registerForm.controls['data'].value,
            numeroPedido: this.registerForm.controls['numeroPedido'].value,
          };
        
        //Cors example
        const headers = { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', }
        this.http.post('http://localhost:8081/api/infracoes/',postData,{headers}).subscribe(responseData => {
            console.log(responseData);
            this.alertService.success('Cadastro realizado com sucesso', true);
            this.router.navigate(['/cadastro']);
        });
        // reset alerts on submit
        this.alertService.clear();
        

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Cadastro realizado com sucesso', true);
                    this.router.navigate(['/cadastro']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    navigateToLogin() {
        this.router.navigate(['/login']);
      }
    
    
}
