  //Событие отправки формы
    $("#register-box").submit(function() 
    {
        var name = $("#register-box input[class='register_username_area']").attr("value");  
        //Запрашиваем имя у юзера.
        if(name == "")
        { 
            alert("Пожалуйста, введите свое имя!")
        }
        else
        {
            //Добавляем в куки имя
			//Тащим сообщение из формы
            var password = $("#register-box input[class='password_username_area']").val();
            //Если сообщение не пустое
            if(password != "")
            {
                //Чистим форму
                $.ajax(
                {
                    type: 'GET',
                    url: 'register.php',
                    data: 'name=' + name + '&password='  + password,
                    success: function(data){
                        if (data == 'Success')
                        {
                            //Добавляем в куки имя
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
        //Возвращаем false, чтобы форма не отправлялась.
        return false;
    });
