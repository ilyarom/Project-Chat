    $("#login-box").submit(function() 
    {
        var name = $("#login-box input[class='login_username_area']").attr("value");  
        if(name == "")
        { 
            sweetAlert
            (
                'Упс..',
                'Пожалуйста, введите свое имя',
                'error'
            )
        }
        else
        {
            var password = $("#login-box input[class='password_username_area']").val();
            if(password != "")
            {
                $.ajax(
                {
                    type: 'GET',
                    url: 'login.php',
                    data: 'name=' + name + '&password='  + password,
                    success: function(data)
                    {
                        if (data == 'Success')
                        {
                            window.location.replace("index.html");
                            $.cookie("name", name);
                        }
                        if (data == 'Error-1')
                        {
                            sweetAlert
                            (
                                'Упс..',
                                'Данный пользователь не зарегистрирован в системе',
                                'error'
                            )
                        }
                        if (data == 'Error-2')
                        {
                            sweetAlert
                            (
                                'Упс..',
                                'Неверный пароль',
                                'error'
                            )
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
