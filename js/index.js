$(function()
{
    var msgBox = document.getElementById("msg-box");
    //Если куки с именем не пустые, тащим имя и заполняем форму с именем
    if($.cookie("name") != null)
    {
        $("#t-box input[class='name']").attr("value", $.cookie("name"));
    }
    else
    {
        window.location.replace("login.html");
    }
    //Переменная отвечает за id последнего пришедшего сообщения
    var maxId = 0;
    //Функция обновления сообщений чата
    var currTable = "green";
    $(".room").click(function(){
        currTable = $(this).attr("name");
        maxId = 0;
        $("#msg-box ul").html("");
        var color = "#56937B";
        var img = "url()"
        switch(currTable)
        {
            case "red": 
                color = "#CE0A00";
                img = "url(img/red.png)"
                break;
            case "yellow":
                color = "#F9CC00";
                img = "url(img/yellow.png)"
                break;
            case "green":
                color = "#56937B";
                img = "url(img/green.png)"
                break;
            case "pink":
                color = "#DE0052";
                img = "url(img/pink.png)"
                break;
            case "chocolate":
                color = "#431700";
                img = "url(img/chocolate.png)"
                break;
            case "blue":
                color = "#009B95";
                img = "url(img/blue.png)"
                break;
            case "indigo":
                color = "#0F0748";
                img = "url(img/indigo.png)"
                break;
            case "black":
                color = "#000000";
                img = "url(img/black.png)"
                break;
            case "white":
                color = "#C9D4DF";
                img = "url(img/white.png)"
                break;
            case "orange":
                color = "#FCB03F";
                img = "url(img/orange.png)"
                break;     
        }
        $(".panel").css("background-color", color);
        $(".send").css("background-color", color);
        $(".logoimg").css("background-image", img);
    });
    function get_message_chat()
    {
    //Генерируем Ajax запрос  
        $.ajaxSetup(
        {
            url: "chat.php",
            type: "GET",
            data: "event=get&maxId="+maxId+"&currTable="+currTable
        });
    
        //Отправляем запрос
        $.ajax(
        {
            //Если все удачно
            success: function(data)
            {
                var obj = JSON.parse(data);
                if (obj.length > 0)
                {
                    for(var i=0; i < obj.length; i++)
                    {
                        $("#msg-box ul").append("<li>"+obj[i].name+": "+obj[i].msg+"</li>");
                        maxId = obj[i].id;
                    }
                    msgBox.scrollTop = msgBox.children[0].childElementCount * msgBox.scrollHeight;
                }
            }
        });
    }
    get_message_chat();
    $("#t-box").everyTime(2000, 'refresh', function() 
    {
        get_message_chat();
    });
    $("#t-box").submit(function() 
    {
        var name = $.cookie("name");  
        var msg = $("#t-box input[class='msg']").val();
        if(msg != "")
        {
            $("#t-box input[class='msg']").attr("value", "");
            $.ajax
            ({
                type: 'GET',
                url: 'chat.php',
                data: 'event=set&name=' + name + '&msg=' +msg + '&currTable=' +    currTable,
                    success: function(data){}
            });          
        } 
        else
        {
            sweetAlert
            (
                'Упс..',
                'Сообщение не должно быть пустым!',
                'error'
            )
        }
    }
    //Возвращаем false, чтобы форма не отправлялась.
    return false;
    });
});