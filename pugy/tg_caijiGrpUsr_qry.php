<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
 
$sql="select * from tbx where typex='caij_grp_ur' order by id desc  limit 30";
echo $sql;
$r=pdo_query($sql);

echo ('-----attilax---');
echo json_encode($r);

?>