<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$fld='{"id":1,"name":"tg用户100个","imp":10,"av":9,time:"2020-11-11 11:11:11"}';
$sql="insert tgbot set flds='$fld'";
echo $sql;
$r=pdo_exec($sql);
echo $r;

?>