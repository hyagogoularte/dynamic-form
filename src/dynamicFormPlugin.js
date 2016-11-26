/**
 * @author Hyago Goularte
 * @created 22-Nov-2016
 *
 */

(function($) {

    $.fn.dynamicForm = function(data) {
        function createButton(id, type, name, value) {
            return $('<button type="' + type + '" id="' + id + '" class="btn btn-default buttonForm" name="' + name + '" value="' + value + '">' + value + '</button>');
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
            var template = '';
            template += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
            template += '  <div class="modal-dialog" role="document">';
            template += '    <div class="modal-content">';
            template += '      <div class="modal-header">';
            template += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            template += '        <h4 class="modal-title" id="myModalLabel">Formulário</h4>';
            template += '      </div>';
            template += '      <div class="modal-body"></div>';
            template += '   </div>';
            template += ' </div>';
            template += '</div>';

            $modalForm = $(template);
            mountForm($modalForm.find('.modal-body')[0], data);
            $modalForm.modal('show');
        }

        function mountForm(ref, data) {
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
            $formGroup.append(createButton('successButton', 'button', 'successButton', 'Enviar'));
            $($form).append($formGroup);

            $($form).find('#successButton').click(function(e) {
                e.preventDefault();

                var values = $($form).serializeArray();
                $.ajax({
                    url: 'http://localhost:3000/contact/',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify({
                        secret: values[0].value,
                        token: values[1].value,
                        lead: {
                            name: values[2].value,
                            email: values[3].value,
                            state: values[4].value,
                            level: values[5].value
                        }
                    }),
                    success: function(response) {
                        alert(response);
                        $($form).trigger('reset');
                    },
                    error: function(e) {
                        alert(e.responseText);
                    }
                });

            })

            $(ref).append($form);
        }

        if ($.isEmptyObject(data)) {
            alert("Object is empty.");
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
