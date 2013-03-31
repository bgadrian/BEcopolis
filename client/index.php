<?php
session_start();

/* requires php 5.4
if (session_status() !== PHP_SESSION_ACTIVE)
{
    echo 'Server error session, we are sorry.';
    return false;
}*/
echo '<script>var SESSIONID = "'.session_id().'"</script>';

print file_get_contents('body.html');