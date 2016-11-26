$(document).ready(function() {
    config($.parseJSON($('input:radio[name="optionsRadios"]:checked').val()));

    $('input:radio[name="optionsRadios"]').change(function() {
        var val = $.parseJSON($(this).val());
        config(val);
    });

    $('#withModal').find('button').click(function() {
        open($.parseJSON($('input:radio[name="optionsRadios"]:checked').val()));
    });

    function config(val) {
        if (val) {
            $('#withoutModal').hide();
            $('#withModal').show();

        } else {
            $('#withoutModal').show();
            $('#withModal').hide();
            open(val);
        }
    }

    function open(value) {
        $('#dynamicForm').html('');
        $('#dynamicForm').dynamicForm({
            "token": "62bb61431348e22850828a5829c4373faafe29c1",
            "secret": "51a266c2844ccd5cac83d88de88d82d05358aa51",
            "modal": value,
            "fields": {
                "estado": ["PR", "SC", "SP", "RS"],
                "nível": ["Iniciante", "Intermediário", "Avançado", "Ninja"]
            }
        });
    }
});
