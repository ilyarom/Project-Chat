<?php
    function setQuery($link, $query)
    {
        $res = mysqli_query($link, $query) or die(mysqli_error($link));
        return $res;
    }
    $link = @mysqli_connect('localhost', 'root', 'qwerty') or die("Не могу соединиться с MySQL.");
    @mysqli_select_db($link, 'chatdb') or die("Не могу подключиться к базе.");
    @mysqli_query('SET NAMES utf8;');

    switch($_GET["event"])
    {
        case "get":
            $maxId = $_GET['maxId'];
            $currTable = $_GET['currTable'];
            $msg = array();
            $query = "SELECT * FROM $currTable WHERE id > $maxId";
            $res = setQuery($link, $query);
            while($row = mysqli_fetch_array($res))
            {
                $msg[] = array("id"=>$row['id'], "name"=>$row['name'], "msg"=>$row['text']);
            }
            echo json_encode($msg);
            break;
	
        case "set":
            $name = htmlspecialchars($_GET['name']);
            $msg = htmlspecialchars($_GET["msg"]);
            $currTable = $_GET['currTable'];
            $result = setQuery($link, "INSERT INTO $currTable (`name` ,`text` ) VALUES ('".mysqli_real_escape_string($link, $name)."', '".mysqli_real_escape_string($link, $msg)."')");
            echo $result;
            break;
   }
