import {
    it,
    inject,
    injectAsync,
    describe,
    beforeEach,
    beforeEachProviders,
    TestComponentBuilder,
} from 'angular2/testing';
import { Component, provide } from '@angular/core';
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { SystemService, ISystem, SystemModel } from '../../system';

describe('SystemService', () => {

    let mockbackend: MockBackend;
    let service: SystemService;
    let response = { data:
                      { key: 'value' }
                    };

    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
            useFactory: function(backend, defaultOptions) {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        }),
        SystemService
    ]);

    beforeEach(inject([MockBackend, SystemService], (_mockbackend, _service) => {
        mockbackend = _mockbackend;
        service = _service;
    }));

    //it('should have http', () => {
    //   expect(!!service.http).toEqual(true);
    //});

    it('should get data from server', () => {

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions(
                { body: JSON.stringify(response) })));
        });

        service.getData().subscribe(res => {
            expect(res).toEqual({ key: 'value' });
        });

    });

    it('should set data to server', () => {

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions(
                { body: JSON.stringify(response) })));
        });

        service.setData(<ISystem>{}).subscribe(res => {
            expect(res).toEqual({ key: 'value' });
        });

    });
});
