import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from 'src/service/api.service';
import {User} from 'src/model/user';

@Component({selector: 'app-users-new', templateUrl: './users-new.component.html', styleUrls: ['./users-new.component.scss']})
export class UsersNewComponent implements OnInit {

  user = {} as User;
  productForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

   ngOnInit() {
     this.productForm = this.formBuilder.group({   
    'nome'     : [null, Validators.required],
    'cpf'      : [null, Validators.required],
    'idade'    : [null, Validators.required],
    'email'    : [null, Validators.required],
    'telefone' : [null, Validators.required]
  });
  }

    addUser(form : NgForm) {
        this.isLoadingResults = true;

        this.api.addUser(form).subscribe(res => {
            const id = res['id'];
            this.isLoadingResults = false;
            this.router.navigate(['/users-info/', id]);

        }, (err) => {

            console.log(err);

            this.isLoadingResults = false;
        });
    }

}
