<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
$fld='{"id":1,"name":"tg用户100个","imp":10,"av":9,time:"$dtm"}';
$tbx=$_GET['t'];$tpx=$_GET['tpx'];$id=(int)$_GET['id'];
$sql="delete   from  tgbot where id=$id";
echo $sql;
$r=pdo_exec($sql);

echo ('-----attilax---');
echo json_encode($r);

?>