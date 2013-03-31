<?php
/**
 * Save the received data in a file.
 */

//TODO make this work with a real database

//file_put_contents(json_encode($_REQUEST));

if ( ! isset($_REQUEST['token']) OR $_REQUEST['token'] != 'alfa34')
    return false;

if ( ! isset($_REQUEST['data']))
{echo 'Error data';return false;}

$data = json_decode(stripslashes($_REQUEST['data']),true);

if (!isset($data['stats']) OR !isset($data['attr']))
{echo 'Error stats/attr';var_dump($data,$_REQUEST['data']);return false;}

//file_put_contents('debug.save.txt',$data['stats']);

$save_data = array(
    'stats'  => $data['stats'],
    'attr'   => $data['attr']
);

file_put_contents('./data.json',json_encode($save_data));

echo '1';


