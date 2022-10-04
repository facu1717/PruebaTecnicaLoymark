import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, AfterViewInit {

  activities: Activity[] = []
  dataSource = new MatTableDataSource()
  activityCols: any[] = ['fullName', 'description', 'activityDate']

  @ViewChild("paginator") paginator! : MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getAllActivities()
    .then((resp: any) => {
      this.activities = resp
      this.dataSource.data = this.activities
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
  