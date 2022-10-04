import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from 'src/app/interfaces/countries.inteface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import countriesJson from '../../../assets/json/countries.json';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD"
  },
  display: {
    dateInput: "YYYY-MM-DD",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})

export class UserModalComponent implements OnInit {

  countries: Country[] = []
  userData: User = {
    name: '',
    surname: '',
    email: '',
    residenceCountry: '',
    contactInfo: false,
    dateOfBirth: new Date()
  }

  newUser: boolean = false

  userModalForm: FormGroup = this.formBuilder.group({
    name: [this.data?.name, [Validators.required]],
    surname: [this.data?.surname, [Validators.required]],
    email: [this.data?.email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    phoneNumber: [this.data?.phoneNumber],
    dateOfBirth: [this.data?.dateOfBirth, [Validators.required]],
    residenceCountry: [this.findCountry(), [Validators.required]],
    contactInfo: [this.data?.contactInfo, [Validators.required]]
  })

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    public utils: UtilsService) { }

  ngOnInit(): void {
    if (this.data == null) this.newUser = true
  }

  findCountry() {
    this.countries = countriesJson
    return this.countries.find(c => c.code == this.data?.residenceCountry)?.code
  }

  sendData() {
    if (this.userModalForm.valid) {
      this.spinner.show()
      this.userData = this.userModalForm.value
      
      if (this.newUser) {
        this.userService.newUser(this.userData)
          .then(() => {
            this.spinner.hide()
            this.dialogRef.close()
            Swal.fire({
              title: 'Excelente',
              text: 'Se ha guardado el usuario con exito',
              icon: 'success'
            })
          })
          .catch (() => {
            this.spinner.hide()
            this.dialogRef.close()
            Swal.fire(
              'Ups',
              'Algo ha salido mal',
              'error'
            )
          })
      }

      else {

        this.userData.id = this.data.id
        this.userService.updateUser(this.userData)
          .then(() => {
            this.spinner.hide()
            this.dialogRef.close()
            Swal.fire({
              title: 'Excelente',
              text: 'Se ha actualizado el usuario con exito',
              icon: 'success'
            })
          })
          .catch (() => {
            this.spinner.hide()
            this.dialogRef.close()
            Swal.fire(
              'Ups',
              'Algo ha salido mal',
              'error'
            )
          })
      }

    }

    else {
      this.userModalForm.markAllAsTouched()
    }
  }
}
