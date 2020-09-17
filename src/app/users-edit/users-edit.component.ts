import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {
    FormControl,
    FormGroupDirective,
    FormBuilder,
    FormGroup,
    NgForm,
    Validators
} from '@angular/forms';
import {ApiService} from 'src/service/api.service';

@Component({selector: 'app-users-edit', templateUrl: './users-edit.component.html', styleUrls: ['./users-edit.component.scss']})
export class UsersEditComponent implements OnInit {

    id : number = null;
    productForm : FormGroup;
    nome : String = '';
    cpf : number = null;
    idade : number = null;
    email : String = '';
    telefone : number = null;
    isLoadingResults = false;

    constructor(private router : Router, private route : ActivatedRoute, private api : ApiService, private formBuilder : FormBuilder) {}


    ngOnInit() {
        this.getUser(this.route.snapshot.params[' id']);
        this.productForm = this.formBuilder.group({
            'id': [null],
            'nome': [
                null, Validators.required
            ],
            'cpf': [
                null, Validators.required
            ],
            'idade': [
                null, Validators.required
            ],
            'email': [
                null, Validators.required
            ],
            'telefone': [null, Validators.required]
        });
    }

    getUser(id) {
        this.api.getUser(id).subscribe(data => {
            this.productForm.setValue({
                id: data[0].id,
                nome: data[0].nome,
                cpf: data[0].cpf,
                idade: data[0].idade,
                email: data[0].email,
                telefone: data[0].telefone
            });
        });
    }

    updateUser(form) {
        this.isLoadingResults = true;
        this.api.updateUser(form).subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/users-info/' + form.id]);
        }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
        });
    }

}
