import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {

  productForm: FormGroup;
  isLoadingResults = true;
  dataSource: User;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

   ngOnInit() {
     this.productForm = this.formBuilder.group({   
      'cpf' : [null, Validators.required]
  });
  }

  getUser(cpf) {
    this.api.getUserByCPF(cpf)
      .subscribe( data => {
        this.dataSource = data;
        console.log(data)

         this.router.navigate(['/users-info/', data[0].id]);
      });
  }

}
