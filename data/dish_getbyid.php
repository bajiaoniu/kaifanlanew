<?php
header('Content-Type:application/json');

//�����û�������������
@$id = $_REQUEST['did'];
if(empty($id))
{
  echo '[]';
  return;
}

//�������ݿ⣬�����ݿ��е�kf_dish����
//��$startλ�ö�5������
$conn = mysqli_connect('127.0.0.1',
'root','','kaifanla');
mysqli_query($conn,'set names utf8');

$sql = "select detail,name,price,img_lg,material from kf_dish where did=$id";
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