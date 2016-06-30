
    $("#register-box").submit(function() 
    {
        var name = $("#register-box input[class='register_username_area']").attr("value");  
        if(name != "")
        { 
            var password = $("#register-box input[class='password_username_area']").val();
            if(password != "")
            {
                $.ajax(
                {
                    type: 'GET',
                    url: 'register.php',
                    data: 'name=' + name + '&password='  + password,
                    success: function(data)
                    {
                        if (data == 'Success')
                        {
                            $.cookie("name", name);
                             window.location.replace("index.html");

                        }
                        else
                        {
                            sweetAlert
                            (
                                'Упс..',
                                'Данный пользователь уже зарегистрирован в системе',
                                'error'
                            );
                        }
                    }
                });          
            } 
            else
            {
                sweetAlert
                (
                    'Упс..',
                    'Вы не ввели пароль',
                    'error'
                )
            }
        }
        return false;
    });
