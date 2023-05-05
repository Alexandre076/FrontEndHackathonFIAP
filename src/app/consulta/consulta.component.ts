import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from 'src/app/_services';
import { Reclamacao } from 'src/app/_models/reclamacao.model';

@Component({ templateUrl: 'consulta.component.html' })
export class ConsultaComponent implements OnInit {
    loadedReclamacao: Reclamacao[] = [];
    // @ts-ignore
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private http: HttpClient

    ) {
        
    }


    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            placa: ['', Validators.required],
        });
    }

    private fetchReclamacao() {
        const reclamacao = this.registerForm.controls['id'].value;
        console.log(reclamacao);

        //Note: Provisioned code to connect with backend API
        //The endpoint will be updated when the development phase is finisedh
        /*
        this.http
        .get<{ [key: string]: Reclamacao}>('http://localhost:8080/api/reclamacoes/find?reclamacao='+reclamacao)
        .pipe(
            map(responseData => {
            const reclamacaoArray: Reclamacao[] = [];
            for (const key in responseData){
                if (responseData.hasOwnProperty(key)) {
                reclamacaoArray.push({...responseData[key], Id: key});
                }
            }
            return reclamacaoArray;        
        }))
        .subscribe(reclamacao => {
            this.loadedReclamacao = reclamacao;
            console.log(reclamacao);
        });
        */
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {


        this.submitted = true;

        

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.fetchReclamacao();
    

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
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
