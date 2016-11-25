/**
 * @author Hyago Goularte
 * @created 22-Nov-2016
 *
 */

(function($) {

    $.fn.dynamicForm = function(data) {
        function createButton(id, type, name, value) {
            return $('<button type="' + type + '" class="btn btn-default buttonForm" name="' + name + '" value="' + value + '">' + value + '</button>');
        }

        function createInput(id, label, options) {
            // options = {
            //  type: '', 
            //  name: '', 
            //  value: '',
            //  required: true
            // };

            if (options.type === 'hidden') {
                return $('<input type="' + options.type + '" required="' + options.required + '" class="form-control" id="' + id + '" name="' + options.name + '" value="' + options.value + '">');
            }

            var template = ''
            template += '<div class="form-group">';
            template += '<label for="' + id + '">' + label + '</label>';
            template += '<input type="' + options.type + '" class="form-control" id="' + id + '" name="' + options.name + '" value="' + options.value + '" required="' + options.required + '">';
            template += '</div>';

            return $(template);
        }

        function createSelect(id, label, options) {
            // options = {
            //  name: '', 
            //  data: ''
            // };

            var template = ''
            template += '<div class="form-group">';
            template += '<label for="' + id + '">' + label + '</label>';
            template += '<select id="' + id + '" class="form-control" name="' + options.name + '">';
            template += '<option value="">Selecione um item</option>';
            for (var value in options.data) {
                template += '<option value="' + options.data[value] + '">' + options.data[value] + '</option>';
            }

            template += '</select>';
            template += '</div>';
            return template;
        }

        function openFormWithModal(ref, data) {
            alert('withmodal');
        }

        function mountForm(ref, data) {
            console.log('mountForm', ref, data);
            var $form = $('<form method="post"/>');

            $($form).append(createInput('secretField', 'secretField', {
                type: 'hidden',
                name: 'secretField',
                value: data.secret,
                required: true
            }));

            $($form).append(createInput('tokenField', 'tokenField', {
                type: 'hidden',
                name: 'tokenField',
                value: data.token,
                required: true
            }));

            $($form).append(createInput('nameField', 'Nome*', {
                type: 'text',
                name: 'nameField',
                value: '',
                required: true
            }));

            $($form).append(createInput('emailField', 'E-mail*', {
                type: 'email',
                name: 'emailField',
                value: '',
                required: true
            }));

            $($form).append(createSelect('stateField', 'Estado', {
                name: 'stateField',
                data: data['fields']['estado']
            }));

            $($form).append(createSelect('levelField', 'Nível', {
                name: 'stateField',
                data: data['fields']['nível']
            }));

            var $formGroup = $('<div class="form-group actionButtons"/>');
            $formGroup.append(createButton('successButton', 'submit', 'successButton', 'Enviar'));
            $($form).append($formGroup);

            $($form).submit(function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        secret: e.target[0].value,
                        token: e.target[1].value,
                        name: e.target[2].value,
                        email: e.target[3].value,
                        state: e.target[4].value,
                        level: e.target[5].value
                    }),
                    contentType: 'application/json',
                    url: 'http://localhost:3000/contact/',
                    success: function(response) {
                        alert(response);
                        $($form).trigger('reset')
                    },
                    error: function(e) {
                        alert(e.responseText);
                    }
                });

            })

            $(ref).append($form);
        }


        if ($.isEmptyObject(data)) {
            alert('Erro - Objeto está vazio.');
            return;
        }

        if (data['modal']) {
            openFormWithModal(this, data);
            return this;
        }

        mountForm(this, data);
        return this;
    };
})($);
