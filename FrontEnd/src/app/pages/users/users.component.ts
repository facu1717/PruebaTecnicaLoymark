import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: User[] = []
  dataSource = new MatTableDataSource()
  usersCols: any[] = ['name', 'surname', 'email', 'dateOfBirth', 'phoneNumber', 'countryResidence', 'contactInfo', 'actions']

  @ViewChild("paginator") paginator! : MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public userModal: MatDialog,
    private userService: UserService) {

    this.userModal.afterAllClosed.subscribe(() => {
      this.loadData()
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData() {
    this.userService.getAllUsers()
      .then((resp: any) => {
        this.users = resp
        this.dataSource.data = this.users
      })
  }

  newUser(): void {
    const dialogRef = this.userModal.open(UserModalComponent);
  }

  updateUser(user: User): void {
    const dialogRef = this.userModal.open(UserModalComponent, {
      data: user
    });
  }

  deleteUser(user: User){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez eliminado el usuario no hay marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.userService.deleteUser(user.id!)
        .then(() => {
          this.loadData()
          Swal.fire(
            'Listo',
            'Se ha eliminado el usuario correctamente',
            'success'
          )
        })
        .catch (() => {
          Swal.fire(
            'Ups',
            'Algo ha salido mal',
            'error'
          )
        })
       
      }
    })
  }
}
