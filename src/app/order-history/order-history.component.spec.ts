import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { OrderHistoryComponent } from './order-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Order } from './models/order.model';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      imports:[
        HttpClientTestingModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideClientHydration(),
        provideHttpClient(withFetch()),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty data source', () => {
    expect(component.dataSource.data).toEqual([]);
  });

  it('should load orders on initialization', () => {
    const orders: Order[] = [
      { "id": 3301, "status": "In Progress", "productLine": "Ready-Mix", "product": "1-200-2-C-28-12-1-3-000", "quantity": "12 m3", "dateRequested": "2022/10/20" },
    ];
    spyOn(orderService, 'getOrders').and.returnValue(new Subject<Order[]>());
    component.ngOnInit();
    component.orders$.next(orders);
    expect(component.dataSource.data).toEqual(orders);
  });

  it('should filter orders based on status, product line, date, and order number', fakeAsync(() => {
    const orders: Order[] = [
      { "id": 3301, "status": "In Progress", "productLine": "Ready-Mix", "product": "1-200-2-C-28-12-1-3-000", "quantity": "12 m3", "dateRequested": "2022/10/20" },
      { "id": 3305, "status": "Pending", "productLine": "Cement", "product": "Gris CPC 30 R Monterrey Extra 50Kg.", "quantity": "10 TN", "dateRequested": "2022/10/20" },
    ];
    component.orders$.next(orders);
    component.selectedStatuses$.next(['Pending']);
    component.selectedProductLine$.next('Cement');
    component.startDate = new Date('2020-01-01');
    component.endDate = new Date('2023-12-31');
    component.orderNumber = 3305;

    component.setupFilter();
    tick();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].id).toBe(3305);
  }));
});


