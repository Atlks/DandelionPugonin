<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
$fld='{"id":1,"name":"tg用户100个","imp":10,"av":9,"time":"'.$dtm.'"}';
$sql="insert tgbot set flds='$fld'";
echo $sql;
$r=pdo_exec($sql);
echo $r;


?>
<script>
window.location='tg_batMng.htm'

</script>
