<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
$fld='{"id":1,"name":"tg用户100个","imp":10,"av":9,time:"$dtm"}';
$id  =$_GET['id'];$tpx=$_GET['tpx'];
$sql="select * from  tbx where  id=$id  limit 30";
echo $sql;
$r=pdo_query($sql);

echo ('-----attilax---');
echo json_encode($r[0]);

?>