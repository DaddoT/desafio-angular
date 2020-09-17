import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from 'src/service/api.service';
import {User} from 'src/model/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({selector: 'app-users-search', templateUrl: './users-search.component.html', styleUrls: ['./users-search.component.scss']})
export class UsersSearchComponent implements OnInit {

    productForm : FormGroup;
    isLoadingResults = true;
    dataSource : User;

    constructor(private router : Router, private api : ApiService, private formBuilder : FormBuilder, private _snackBar : MatSnackBar) {}

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            'input': [null, Validators.required]
        });
    }

    getUser(input) {
        this.api.getUserByCPForName(input).subscribe(data => {
            this.dataSource = data;
            if (!data[0]) {
                this._snackBar.open('Nenhum usuário encontrado', 'Fechar', {duration: 60000});
            } else {
                this.router.navigate([
                    '/users-info/', data[0].id
                ]);
            }
        });
    }

}
