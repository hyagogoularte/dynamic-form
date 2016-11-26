describe('DynamicForm plugin test', function() {
    var options;
    var spyEvent;

    beforeEach(function() {
        $('#dynamicForm').remove();
        $('body').append('<div id="dynamicForm"></div>');

        options = {
            "token": "62bb61431348e22850828a5829c4373faafe29c1",
            "secret": "51a266c2844ccd5cac83d88de88d82d05358aa51",
            "modal": false,
            "fields": {
                "estado": ["PR", "SC", "SP", "RS"],
                "nível": ["Iniciante", "Intermediário", "Avançado", "Ninja"]
            }
        };

        $('#dynamicForm').dynamicForm(options);
    });

    it('should exist the plugin', function() {
        expect($('#dynamicForm')).toExist();
    });

    it('should plugin is defined', function() {
        expect($.fn.dynamicForm !== undefined).toExist();
    });

    describe('Must contains all the elements', function() {
        it('should contain the name field', function() {
            expect($('#nameField').length > 0).toBe(true);
        });

        it('should contain the email field', function() {
            expect($('#emailField').length > 0).toBe(true);
        });

        it('should contain the state field', function() {
            expect($('#stateField').length > 0).toBe(true);
        });

        it('should contain the level field', function() {
            expect($('#levelField').length > 0).toBe(true);
        });
    });

    describe('The fields must be empty or index 0', function() {
        it('should be empty', function() {
            expect($('#nameField').html()).toContainText('');
            expect($('#emailField').html()).toContainText('');
        });

        it('should be on the index 0', function() {
            expect($('#stateField')[0]).toContainText('Selecione um item');
            expect($('#levelField')[0]).toContainText('Selecione um item');
        });
    });

    // describe('The field name and email should be mandatory', function() {
    //     it('should be field name mandatory', function() {
    //     	spyEvent = spyOnEvent('#successButton', 'click');
    //     	$('#successButton').trigger("click");

    //     });
    // });

    //   it('should invoke trowns if options object is empty', function() {
    // spyEvent = spyOn(window, 'alert');
    //   	$('#dynamicForm').remove();
    //       $('body').append('<div id="dynamicForm"></div>');
    //       $('#dynamicForm').dynamicForm({})
    //       expect(spyEvent).toHaveBeenTriggered()
    //   });

    it('should invoke the successButton click event.', function() {
        spyEvent = spyOnEvent('#successButton', 'click');
        $('#successButton').trigger("click");
        expect('click').toHaveBeenTriggeredOn('#successButton');
        expect(spyEvent).toHaveBeenTriggered();
    });

    describe("Form Validation Tests", function() {

        function sendRequest(callbacks, config, value) {
            $.ajax({
                url: config.url,
                contentType: 'application/json',
                type: 'POST',
                data: value,
                success: function(data) {
                    callbacks.checkForInformation(data);
                },
                error: function(data) {
                    callbacks.displayErrorMessage();
                },
                timeout: config.remainingCallTime
            });
        }

        var config = {
            url: 'http://localhost:3000/contact/',
            contentType: 'application/json',
            type: 'POST'
        };

        var jsonExpect = "{ 'token': '62bb61431348e22850828a5829c4373faafe29c1', 'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51', 'lead':{ 'name':'Front end Ninja','email':'frontend.ninja@resultadosdigitais.com.br', 'estado':'SC', 'nível':'Ninja' } }";

        it('should invoke the successButton click event, but do nothing.', function() {
            spyEvent = spyOnEvent('#successButton', 'click');
            $('#successButton').trigger("click");
            expect('click').toHaveBeenTriggeredOn('#successButton');
            expect(spyEvent).toHaveBeenTriggered();
        });

        it("should make an Ajax request to the correct URL", function() {
            spyOn($, "ajax");
            sendRequest(undefined, config);
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(config.url);
        });

        it("should make an Ajax request success", function() {
            spyOn($, "ajax").and.callFake(function(e) {
                e.success({});
            });

            var callbacks = {
                checkForInformation: jasmine.createSpy(),
                displayErrorMessage: jasmine.createSpy(),
            };

            sendRequest(callbacks, config);
            expect(callbacks.checkForInformation).toHaveBeenCalled();
            expect(callbacks.displayErrorMessage).not.toHaveBeenCalled();

        });

        it("should make an Ajax request error", function() {
            spyOn($, "ajax").and.callFake(function(e) {
                e.error({});
            });

            var callbacks = {
                checkForInformation: jasmine.createSpy(),
                displayErrorMessage: jasmine.createSpy(),
            };

            sendRequest(callbacks, config);
            expect(callbacks.displayErrorMessage).toHaveBeenCalled();
            expect(callbacks.checkForInformation).not.toHaveBeenCalled();
        });

        it("should send correct json to server", function() {
          	 spyOn($, "ajax");
            sendRequest(undefined, config, jsonExpect);
            expect($.ajax.calls.mostRecent().args[0]["data"]).toEqual(jsonExpect);
        });

    });

});
