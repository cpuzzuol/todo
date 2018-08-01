import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

import { HttpClient, HttpXhrBackend, HttpRequest } from '@angular/common/http';

import { XHRBackend } from '@angular/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useFactory: (backend, options) => {
            return new HttpClient(backend);
          },
          deps: [HttpClientTestingModule, HttpRequest]
        },
        HttpClientTestingModule,
        HttpRequest,
        ApiService
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
