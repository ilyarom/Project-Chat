  //Событие отправки формы
    $("#login-box").submit(function() 
    {
        var name = $("#login-box input[class='login_username_area']").attr("value");  
        //Запрашиваем имя у юзера.
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
            //Если сообщение не пустое
            if(password != "")
            {
                //Чистим форму
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
                            //Добавляем в куки имя
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
        //Возвращаем false, чтобы форма не отправлялась.
        return false;
    });
