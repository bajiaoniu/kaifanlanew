<?php
header('Content-Type:application/json');

//解析用户传递来的数据
@$userName = $_REQUEST['userName'];
@$userSex = $_REQUEST['userSex'];
@$userAddr = $_REQUEST['userAddr'];
@$userPhone = $_REQUEST['userPhone'];
@$userDid = $_REQUEST['userDid'];
if(empty($userName)||empty($userSex)
|| empty($userAddr) || empty($userPhone)
|| empty($userDid))
{
  echo '[]';
  return;
}
//得到当前的时间戳
$userTime = time()*1000;

//连接数据库，从数据库中的kf_dish表中
//的$start位置读5条数据
$conn = mysqli_connect('127.0.0.1',
'root','','kaifanla');
mysqli_query($conn,'set names utf8');

$sql = "insert into kf_order values(null,$userPhone,'$userName',$userSex,$userTime,'$userAddr',$userDid)";
$result = mysqli_query($conn,$sql);

//返回给客户端
//①fetchAll ②fetch_assoc
$output=[];
if($result)//插入成功
{
  $myResult['msg']="success";
  $myResult['oid']=mysqli_insert_id($conn);
}
else
{
  $myResult['msg']='error';
}
$output[] = $myResult;
echo json_encode($output);

?>