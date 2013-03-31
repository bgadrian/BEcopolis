<?php
/**
 * Load the city from the file and outputs as JSON.
 */

header('Content-Type: application/json');

if (!isset($_REQUEST['token']) OR $_REQUEST['token'] != 'alfa34')
    return false;

if (file_exists('data.json'))
    echo file_get_contents('data.json');