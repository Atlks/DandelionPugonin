<?php
   echo  __DIR__.'/conn_db.php';
include './conn_db.php';
$dtm=date("Y-m-d H:i:s");
//https://t.me/qingliao
$grp=$_GET['grp'];$freq=$_GET['freq'];$imp=$_GET['imp'];
if(!$_GET['freq'])
$freq=0;
$botnum=(int)$_GET['botnum'];
//"imp":$imp,

$values = array( '$grp' => $grp, '$freq' => $freq,'$imp' => $imp);
$fld='{"id":1,  "grp":"$grp","id":1,"yicaiji":10,"freq":$freq,"cloudsvr":"1号服务器","stat":"进行中","updt":"'.$dtm.'","imp":10,"av":9}';
 $fld=strtr($fld, $values);

 $_GET['cloudsvr']="1号服务器"; $_GET['updt']=$dtm; $_GET['yicaiji']=10;$_GET['stat']="进行中";
 $fld=json_encode($_GET,JSON_UNESCAPED_UNICODE );
echo $fld;
 //die();
$sql="insert tbx set flds='$fld',typex='lacyonMng'";
echo $sql;
$r=pdo_exec($sql);
echo $r;


?>
<script>
window.location='tg_lacyonMng.htm'

</script>
