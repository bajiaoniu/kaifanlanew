<?php
header('Content-Type:application/json');

//�����û�������������
$start = $_REQUEST['start'];

//�������ݿ⣬�����ݿ��е�kf_dish����
//��$startλ�ö�5������
$conn = mysqli_connect('127.0.0.1',
'root','','kaifanla');
mysqli_query($conn,'set names utf8');

$sql = "select did,name,price,img_sm,material from kf_dish limit $start,5";
$result = mysqli_query($conn,$sql);

//���ظ��ͻ���
//��fetchAll ��fetch_assoc
$output=[];
while(true)
{
  $row = mysqli_fetch_assoc($result);
  if(!$row)//û�и��������˳�ѭ��
  {
    break;
  }
  $output[] = $row;
}

echo json_encode($output);



?>