<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
//https://t.me/qingliao
$grp=$_GET['grp'];$freq=$_GET['freq'];$imp=$_GET['imp'];

$values = array( '$grp' => $grp, '$freq' => $freq,'$imp' => $imp);
$fld='{"id":1,  "grp":"$grp","id":1,"imp":$imp,"yicaiji":10,"freq":$freq,"cloudsvr":"1号服务器","stat":"进行中","updt":"'.$dtm.'","imp":10,"av":9}';
 $fld=strtr($fld, $values);
$sql="insert caiji_grp_usr set flds='$fld'";
echo $sql;
$r=pdo_exec($sql);
echo $r;


?>
<script>
window.location='tg_caijiGrpUsr.htm'

</script>
