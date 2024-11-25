import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string; // Property name in the data object
  label: string; // Display name for the column
}

export interface TableAction {
  name: string; // Action name (e.g., 'edit', 'delete')
  label?: string; // Optional tooltip or description
  icon: string; // Material icon name
  color?: string; // Material button color (e.g., 'primary', 'warn')
}


@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25];

  @Output() action = new EventEmitter<{ action: string; element: T }>();

  dataSource = new MatTableDataSource<T>();
  displayedColumns: string[] = [];

  ngOnInit() {
    this.dataSource.data = this.data;
    this.displayedColumns = this.columns.map((col) => col.key);

    if (this.actions.length) {
      this.displayedColumns.push('actions');
    }
  }

  handleAction(action: string, element: T) {
    this.action.emit({ action, element });
  }
}
