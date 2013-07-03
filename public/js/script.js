var search = document.getElementById('search');

search.onkeyup =  function (e)
{
    autocompletion(search.value);
};

function autocompletion(param) 
{
    $.ajax({
        url: "/getautocomp",
        type: "POST",
        cache: false,
        data: { field1: param },
        complete: function ()
        {
            console.log('process complete');
        },

        success: function (data)
        {
            if (data != "")
            {
                $('#results').show();
                $('#results').empty();
                for (var i = 0, c = data.length; i < c; i++)
                {
                    $('<p onclick=select(this)>' + data[i] + '</p>').appendTo('#results');
                }
            } else
            {
                $('#results').hide();
            }
        },

        error: function ()
        {
            console.log('process error');
            alert('erreur');
        }
    });
};

function select(balise) 
{
    search.value = balise.innerHTML;
    $('#results').hide();
}