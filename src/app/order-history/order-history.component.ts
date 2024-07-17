import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subject, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { takeUntil, map, debounceTime } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from './models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Order> = new MatTableDataSource();

  public selectedStatuses$ = new BehaviorSubject<string[]>([]);
  public orders$ = new BehaviorSubject<Order[]>([]);
  public selectedProductLine$ = new BehaviorSubject<string | null>(null);
  public productLineOptions$ = new BehaviorSubject<string[]>([]);
  public setupFilter$ = new Subject<void>();
  public destroy$: Subject<void> = new Subject<void>();
  
  startDate: Date | null = null;
  endDate: Date | null = null;
  orderNumber: number | null = null;
  displayedColumns: string[] = ['status', 'id', 'productLine', 'product', 'quantity', 'dateRequested'];
  
  @ViewChild('orderNumberInput') orderNumberInputElement!: ElementRef;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
    this.setupFilter();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrders() {
    this.orderService.getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => this.orders$.next(orders));
  }

  onStatusChange(status: string, isChecked: boolean) {
    const currentStatuses = this.selectedStatuses$.value;
    if (isChecked) {
      this.selectedStatuses$.next([...currentStatuses, status]);
    } else {
      this.selectedStatuses$.next(currentStatuses.filter(s => s !== status));
    }
  }

  onProductLineChange(productLine: string | null) {
    this.selectedProductLine$.next(productLine);
  }

  onDateChange() {
    this.setupFilter();
  }

  onOrderNumberBlur() {
    this.setupFilter();
  }

  setupFilter() {
    combineLatest([this.orders$, this.selectedStatuses$, this.selectedProductLine$])
      .pipe(
        map(([orders, selectedStatuses, selectedProductLine]) => {
          return orders.filter(order => {
            const statusFilter = selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
            const productLineFilter = !selectedProductLine || order.productLine === selectedProductLine;
            const dateFilter = (!this.startDate || new Date(order.dateRequested) >= this.startDate) && (!this.endDate || new Date(order.dateRequested) <= this.endDate);
            const orderNumberFilter = !this.orderNumber || order.id === this.orderNumber;

            return statusFilter && productLineFilter && dateFilter && orderNumberFilter;
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(filteredOrders => {
        this.dataSource.data = filteredOrders;
        const productLines = Array.from(new Set(filteredOrders.map(order => order.productLine)));
        this.productLineOptions$.next(productLines);
      });
  }

  onOrderNumberInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.orderNumber = /^\d+$/.test(value) ? parseInt(value, 10) : null;
    this.setupFilterDebounced();
  }
  
  setupFilterDebounced() {
    this.setupFilter$.next();
  
    this.setupFilter$
      .pipe(
        debounceTime(800),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setupFilter();
      });
  }
}
