import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = "";

  constructor(private Fb: FormBuilder, private userService: UserService, private actRoute: ActivatedRoute,
    private router: Router) {
    this.userForm = this.Fb.group(
      {
        Id: "0",
        Nome: "",
        sobrenome: "",
        Idade: '',
        Profissao: ""
      })
  }

  ngOnInit(): void {
    this.getUsers();
    this.actRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');

      if (this.userId != null) {
        this.userService.getUser(this.userId).subscribe(result => {
          this.userForm.patchValue({
            Id: result[0].Id,
            Nome: result[0].Nome,
            sobrenome: result[0].sobrenome,
            Idade: result[0].Idade,
            Profissao: result[0].Profissao
          })
        })
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }


  actionButton() {
    if (this.userId != null){
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(){
    this.userForm.get('Id')?.patchValue(this.users.length + 1);
    this.userService.postUser(this.userForm.value).subscribe(result => {
      alert(`Usuário ${result.Nome} cadastrado com sucesso`)
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(result => {
      console.log('Login atualizado', result);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }
}
