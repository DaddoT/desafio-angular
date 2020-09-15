import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'cpf', 'idade', 'email', 'telefone'];
  isLoadingResults = true;
  dataSource: User;
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params[' id']);
  }

  getUser(id) {
    this.api.getUser(id)
      .subscribe(data => {
        this.dataSource = data;
        console.log(data)
        this.isLoadingResults = false;
      });
  }
}
