import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { HOST } from '../../constants';
import { AppEndpoints } from '../app.endpoints';
import { Order } from '../order-history/models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch orders from API via GET request', () => {
    const mockOrders: Order[] = [
      { "id": 3301, "status": "In Progress", "productLine": "Ready-Mix", "product": "1-200-2-C-28-12-1-3-000", "quantity": "12 m3", "dateRequested": "2022/10/20" },
      { "id": 3305, "status": "Pending", "productLine": "Cement", "product": "Gris CPC 30 R Monterrey Extra 50Kg.", "quantity": "10 TN", "dateRequested": "2022/10/20" },
    ];

    service.getOrders().subscribe(orders => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.ORDERS}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockOrders);
  });
});

