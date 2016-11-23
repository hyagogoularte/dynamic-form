/**
 * @author Hyago Goularte
 * @created 22-Nov-2016
 *
 */

(function($) {

	function openFormWithModal(ref, data) {
		alert('withmodal');
	}

	function mountForm(ref, data) {
		$(ref).append('INICIO <br>');

		var $form = $('<form action="" method="POST">');

		$($form).append(createInput('nameField', 'Nome', {
			type: 'text',
			name: 'nameField',
			value: ''
		}));

		$($form).append(createInput('emailField', 'E-mail', {
			type: 'email',
			name: 'emailField',
			value: ''
		}));
		
		$($form).append(createSelect('stateField', 'Estado', {
			name: 'stateField', 
			data: data['fields']['estado']
		}));
		
		$($form).append(createSelect('levelField', 'Nível', {
			name: 'stateField', 
			data: data['fields']['nível']
		}));
		
		$($form).append(createButton('successButton', 'submit', 'successButton', 'Enviar (http 200)').click(successButton($form)));
		$($form).append(createButton('failureButton', 'submit', 'failureButton', 'Enviar (http 500)').click(failureButton));

		$(ref).append($form);


		$(ref).append('<br> FIM');
	}

	function failureButton() {
		alert('alerta saaaa')
	}

	function successButton($form) {
		var data = $form.serialize()

	 //    $.ajax({
		//   url: "../server/output.php",
		//   method: "POST",
		//   data: data,
		//   dataType: "html"
		// }).success(function(as,asd,asdf,asdfg) {
		// 	console.log('sucess', as,asd,asdf,asdfg);
		// 	alert( "Request failed: " + textStatus );

		// }).error(function(erro, asd, asda) {
		// 	console.log('error', erro, asd, asda);
		// });
	}

	function createButton(id, type, name, value) {
		return $('<button type="' + type + '" name="' + name + '" value="' + value + '">' + value + '</button>');
	}

	function createInput(id, label, options) {
		// options = {
		// 	type: '', 
		// 	name: '', 
		// 	value: ''
		// };

		var template = ''
		template += '<div class="form-group">';
		template += '<label for="' + id + '">' + label + '</label>';
		template += '<input type="' + options.type + '" class="form-control" id="' + id + '" name="' + options.name + '" value="' + options.value + '">';
		template += '</div>';

		return $(template);
	}

	function createSelect(id, label, options) {
		// options = {
		// 	name: '', 
		// 	data: ''
		// };

			var template = ''
		template += '<div class="form-group">';
		template += '<label for="' + id + '">' + label + '</label>';
		template += '<select id="' + id + '" class="form-control" name="' + options.name + '" />';

		for(var value in options.data) {
			template += '<option value="' + options.data[value] + '">' + options.data[value] + '</option>';
		}

		template += '</select>';
		template += '</div>';
		return template;
	}

	$.fn.dynamicForm = function(data) {
		if($.isEmptyObject(data)) {
			alert('Erro - Objeto está vazio.');
			return;
		}

		if(data['modal']) {
			openFormWithModal(this, data);
			return this;
		}

		mountForm(this, data);
		return this;
	};
})($);







