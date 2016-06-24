<?php
    function setQuery($link, $query)
    {
        $res = mysqli_query($link, $query) or die(mysqli_error($link));
        return $res;
    }
    $link = @mysqli_connect('localhost', 'root', 'qwerty') or die("Не могу соединиться с MySQL.");
    @mysqli_select_db($link, 'chatdb') or die("Не могу подключиться к базе.");
    @mysqli_query('SET NAMES utf8;');
    $name = ($_GET['name']);
    $password = ($_GET['password']);
    $query = "SELECT * FROM user WHERE username = '".$name."'";
    $res = setQuery($link, $query);
    if (mysqli_num_rows($res) != 0)
    {
        //$res = setQuery($link, "INSERT INTO user (username, password) VALUES ('".mysqli_real_escape_string($link, $name)."', '".mysqli_real_escape_string($link, $password)."')");
        $row = mysqli_fetch_array($res);
        if ($row['password'] == $password)
        {
            echo('Success');
        }
        else
        {
            echo ('Error-2');
        }
    }
    else
    {
        echo ('Error-1');
    }
    
