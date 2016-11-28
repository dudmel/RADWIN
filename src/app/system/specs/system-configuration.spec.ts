import {
    it,
    inject,
    injectAsync,
    describe,
    beforeEach,
    beforeEachProviders,
} from 'angular2/testing';
import { Component, provide } from '@angular/core';
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions } from '@angular/http';
import { MockBackend} from '@angular/http/testing';

// Load the implementations that should be tested
import { SystemService,
         ISystem,
         SystemModel,
         SystemConfigurationComponent } from '../../system';
import { ModalService } from '../../blocks';

describe('SystemConfiguration', () => {

    let mockbackend: MockBackend;
    let systemService: SystemService;
    let response = { data:
                      {
                        temperature: 38,
                        hsuName: '10.50.1.91',
                        hbsName: 'HBS',
                        contact: 'yuty',
                        location: 'Loc88',
                        upTime: '003:18: 21:17',
                        hwVersion: '1',
                        swVersion: '4.2.40_b4257_Jan 4 2016',
                        serialNumber: 'VERIF5K_BS_HSU31',
                        aggCapacity: 25,
                        product: 'RW5000/HSU/5525/F58/FCC/SFF/EXT - RW-5525-0C50',
                        encryption: 'AES 128',
                        powerConsumption: 5,
                        macAddress: '00:15:67:0b:0c:31',
                        latitude: '32.252',
                        longitude: '32.312'
                       }
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
        SystemService,
        SystemConfigurationComponent,
        ModalService
    ]);

    beforeEach(inject([MockBackend], (_mockbackend) => {
        mockbackend = _mockbackend;
    }));

    it('should init and get data', inject([ SystemConfigurationComponent ],
    (systemConfiguration: SystemConfigurationComponent) => {

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions(
                { body: JSON.stringify(response) })));
        });

        expect(systemConfiguration.system).toBeUndefined();

        systemConfiguration.ngOnInit();

        expect(systemConfiguration.system.hsuName).toEqual((response.data.hsuName));

        expect(systemConfiguration.system).not.toBeUndefined();

    }));


    it('should refresh data', inject([ SystemConfigurationComponent ],
    (systemConfiguration: SystemConfigurationComponent) => {

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions(
                { body: JSON.stringify(response) })));
        });

        //intial values
        expect(systemConfiguration.system).toBeUndefined();
        expect(systemConfiguration.editSystem).toEqual({});

        //will get data
        systemConfiguration.ngOnInit();

        //check data exists
        expect(systemConfiguration.editSystem.hsuName).toEqual((response.data.hsuName));
        expect(systemConfiguration.editSystem).not.toBeUndefined();

        //dirty
        systemConfiguration.editSystem.hsuName = 'new';

        expect(systemConfiguration.editSystem.hsuName).not.toEqual((response.data.hsuName));

        systemConfiguration.refresh();

        //after refresh
        expect(systemConfiguration.editSystem.hsuName).toEqual((response.data.hsuName));
    }));

});