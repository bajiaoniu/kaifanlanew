<?php
header('Content-Type:application/json');

//解析用户传递来的数据
$start = $_REQUEST['start'];

//连接数据库，从数据库中的kf_dish表中
//的$start位置读5条数据
$conn = mysqli_connect('127.0.0.1',
'root','','kaifanla');
mysqli_query($conn,'set names utf8');

$sql = "select did,name,price,img_sm,material from kf_dish limit $start,5";
$result = mysqli_query($conn,$sql);

//返回给客户端
//①fetchAll ②fetch_assoc
$output=[];
while(true)
{
  $row = mysqli_fetch_assoc($result);
  if(!$row)//没有更多数据退出循环
  {
    break;
  }
  $output[] = $row;
}

echo json_encode($output);



?>