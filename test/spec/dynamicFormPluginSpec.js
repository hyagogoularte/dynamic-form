describe('jQuery plugin test', function() {
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

    it('should invoke the successButton click event.', function() {
        spyEvent = spyOnEvent('#successButton', 'click');
        $('#successButton').trigger("click");

        expect('click').toHaveBeenTriggeredOn('#successButton');
        expect(spyEvent).toHaveBeenTriggered();
    });

});
