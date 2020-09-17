import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from 'src/service/api.service';
import {User} from 'src/model/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({selector: 'app-users', templateUrl: './users.component.html', styleUrls: ['./users.component.scss']})

export class UsersComponent implements OnInit {

    displayedColumns : string[] = [
        'nome',
        'idade',
        'telefone',
        'acao',
        'edit',
        'delete'
    ];
    ids : number[] = [];
    dataSource : User[];

    constructor(private _api : ApiService, private router : Router, private _snackBar : MatSnackBar) {}

    ngOnInit(): void {
        this._api.getUsers().subscribe(res => {
            this.dataSource = res;
            if (res.length === 0) {
                this._snackBar.open('Nenhum usuário encontrado', 'Fechar', {duration: 60000});
            }
        }, err => {
            console.log(err);
        });
    }

    deleteUser(id) {
        this._api.deleteUser(id).subscribe(res => {
            this.router.navigate(['/users']);
        }, (err) => {
            console.log(err);
        });
    }
}
