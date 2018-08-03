/**
*               �������û����������ݹ������ݿ�  
*/
create database MyManagerSystem
go
use MyManagerSystem
--���ű�

create table t_part
(
   p_id int primary key,--���ű��
   p_name varchar(200),--��������
   p_remark varchar(200),--���ű�ע
   p_is int--0ɾ��,1ûɾ��  
);

select*from t_part
sp_help t_part

select top  3 * from t_part where  p_id  not in(select (p_id) from (select top 0 p_id from t_part  order by p_id asc) as tblTmp) and p_is=1 order by p_id asc

--��������

insert into t_part values(1'���۲�','����1',1);
insert into t_part values('�ֹܲ�','����2',1);
insert into t_part values('����','����3',1);
insert into t_part values('������','����4',1);
insert into t_part values('�ۺ�','����5',1);
insert into t_part values('��6��','����6',1);
insert into t_part values(7,'��7��','����7',1);
------------------------------------------------------------------
------------------------------------------------------------------

--Ա����  >>> ���(����)

create table t_emp
(
   e_id int primary key identity(1601,1),--Ա�����
   p_id int references t_part(p_id),--���ű��(���)
   e_loginname varchar(200),--��½��
   e_psw varchar(200),--��½����
   e_img varchar(200),--Ա��ͼƬ
   e_sex varchar(2),--Ա���Ա�
   e_flag int,--��¼Ա������(0 �չ� 1�������� )
   e_admin int,--��¼Ա������ϵͳ��������(0 ����ͨ������ 1---�������� -1--ϵͳ����Ա)
   e_remark varchar(200),--Ա����ע
   e_truename varchar(200),--Ա����ʵ����
   e_is int--0ɾ��,1ûɾ�� 
);
select*from t_emp
update t_emp set p_id=2, e_loginname='hui', e_img='upfile/2018-05-07/H5R3IM94RBQHVJ5Q7H4UWGY8JUPXH322.jpg', e_sex='undefined', e_flag=0, e_admin=0, e_remark='Ա��32222', e_truename='������2' where e_id=3
select emp0_.e_id as e1_0_, emp0_.p_id as p2_0_, emp0_.e_loginname as e3_0_, emp0_.e_psw as e4_0_, emp0_.e_img as e5_0_, emp0_.e_sex as e6_0_, emp0_.e_flag as e7_0_, emp0_.e_admin as e8_0_, emp0_.e_remark as e9_0_, emp0_.e_truename as e10_0_, emp0_.e_is as e11_0_ from t_emp emp0_ where emp0_.e_is=1
--��������
insert into t_emp values(1,'botao','123','upfile/nan1.jpg','��',1,1,'Ա��1','�Բ���',1);
insert into t_emp values(2,'bin','123','upfile/nan2.jpg','��',1,1,'Ա��2','���',1);
insert into t_emp values(3,'hui','123','upfile/nv1.jpg','Ů',1,1,'Ա��3','������',1);
insert into t_emp values(4,'dong','123','upfile/nv2.jpg','Ů',1,1,'Ա��4','������',1);
insert into t_emp values('mi','123','upfile/nan3.jpg','��',0,0,'Ա��5','С��',1);
insert into t_emp values('ming','123','upfile/nan2.jpg','��',0,0,'Ա��6','С��',1);
insert into t_emp values(3,'hua','123','upfile/nv3.jpg','Ů',0,0,'Ա��7','С��',1);
insert into t_emp values(4,'hong','123','upfile/nv4.jpg','Ů',0,0,'Ա��8','С��',1);
insert into t_emp values(5,'lili','123','upfile/nv3.jpg','Ů',1,1,'Ա��9','����',1);
insert into t_emp values(6,'wanghong','123','upfile/nv4.jpg','Ů',1,1,'Ա��10','����',1);
insert into t_emp values(5,'gang','123','upfile/nan3.jpg','��',0,0,'Ա��11','С��',1);
insert into t_emp values(6,'qiang','123','upfile/nan2.jpg','��',0,0,'Ա��12','Сǿ',1);
------------------------------------------------------------------
------------------------------------------------------------------

--��Ʒ����

create table t_sort
(
   s_id int primary key identity(1,1),--��Ʒ�����
   s_name varchar(200),--�������
   s_remark varchar(200),--���ע
   s_is int--0��ɾ��,1δɾ�� 
);
select*from t_sort

--��������
insert into t_sort values('ˮ����','���1',1);
insert into t_sort values('������','���2',1);
insert into t_sort values('������','���3',1);
insert into t_sort values('ʳ����','���4',1);
insert into t_sort values('ë����','���5',1);
insert into t_sort values('�Ǻ���','���6',1);
insert into t_sort values('��Ƿ��','���7',1);
insert into t_sort values('��������','���8',1);
------------------------------------------------------------------
------------------------------------------------------------------

--��Ʒ��  >>> ���(��Ʒ���)
create table t_product
(
   p_id int primary key identity(1001,1),--��Ʒ���
   s_id int references t_sort(s_id),--�����
   p_name varchar(200),--��Ʒ����
   p_area varchar(200),--����
   p_ml varchar(200),--��Ʒ���
   p_is int--0��ɾ��,1δɾ�� 
);
select*from t_product

--��������
insert into t_product values(2,'ƻ��','�Ϻ�','ǧ��',1);
insert into t_product values(2,'�㽶','�人','ǧ��',1);
insert into t_product values(3,'����','����','ƿ',1);
insert into t_product values(3,'ѩ��','����','ƿ',1);
insert into t_product values(4,'ϴ����','�Ϻ�','ƿ',1);
insert into t_product values(4,'ϴ����','����','ƿ',1);
insert into t_product values(1,'����','����','��',1);
insert into t_product values(1,'С��','֣��','��',1);
------------------------------------------------------------------
------------------------------------------------------------------

--��Ʒ��ݱ�   >>> ���(��Ʒ)
create table t_productyear(
   y_id int primary key identity(1,1),--��ݱ��
   p_id int references t_product(p_id),--��Ʒ���
   y_name varchar(200),--���
   y_price int--��һ��ļ۸�
);
select*from t_productyear
select count(*) from t_productyear where p_id=1003
--��������
insert into  t_productyear values(1001,'2015',10);
insert into  t_productyear values(1002,'2015',20);
insert into  t_productyear values(1003,'2015',3);
insert into  t_productyear values(1004,'2015',3);
insert into  t_productyear values(1005,'2015',50);
insert into  t_productyear values(1001,'2015',60);
insert into  t_productyear values(1002,'2015',100);
insert into  t_productyear values(1003,'2015',120);
------------------------------------------------------------------
------------------------------------------------------------------

--��Ʒ����   >>> ���(��Ʒ,Ա��)

create table t_inproduct
(
  d_id number primary key,--�����
  p_id number references t_product(p_id),--��Ʒ���(���)
  e_id number references t_emp(e_id),--������Ա(���)
  d_remark varchar2(200),--��ⱸע 
  d_number number,--�����
  d_time varchar2(200)--���ʱ��
);
create sequence inpro_seq start with 1 increment by 1 minvalue 1;

--��������
insert into t_inproduct values(inpro_seq.nextval,2,4,'ˮ��1',5000,'2016-08-10 13:10:56');
insert into t_inproduct values(inpro_seq.nextval,3,4,'ˮ��1',5000,'2016-08-10 14:13:11');
insert into t_inproduct values(inpro_seq.nextval,4,4,'����1',7000,'2016-08-10 15:20:46');
insert into t_inproduct values(inpro_seq.nextval,5,4,'����1',7000,'2016-08-10 15:22:20');
insert into t_inproduct values(inpro_seq.nextval,6,4,'����1',6000,'2016-08-10 16:46:11');
insert into t_inproduct values(inpro_seq.nextval,8,4,'ʳ��1',6000,'2016-08-10 17:01:56');
insert into t_inproduct values(inpro_seq.nextval,7,4,'1234',6000,'2016-08-10 16:46:11');
insert into t_inproduct values(inpro_seq.nextval,9,4,'4567',6000,'2016-08-10 17:01:56');
------------------------------------------------------------------
------------------------------------------------------------------

--��ƷĿǰ�������   >>> ���(��Ʒ)

create table t_stock
(
  k_id number primary key,--��� 
  p_id number references t_product(p_id),--��Ʒ���(���)
  k_sum number)--Ŀǰ�ܿ����
;
create sequence stock_seq start with 1 increment by 1 minvalue 1;

--��������
insert into t_stock values(stock_seq.nextval,2,4100);
insert into t_stock values(stock_seq.nextval,3,5000);
insert into t_stock values(stock_seq.nextval,4,6050);
insert into t_stock values(stock_seq.nextval,5,7000);
insert into t_stock values(stock_seq.nextval,6,5200);
insert into t_stock values(stock_seq.nextval,7,6000);
insert into t_stock values(stock_seq.nextval,8,5300);
insert into t_stock values(stock_seq.nextval,9,6000);

------------------------------------------------------------------
------------------------------------------------------------------

--�ͻ���  >>> ���(Ա��)

create table t_client
(
   c_id number primary key,--���  
   e_id number references t_emp(e_id),--Ա�����(���)
   c_name varchar2(200),--�ͻ�����
   c_tel varchar2(200),--�ͻ���ϵ�绰
   c_address varchar2(200),--��ϵ��ַ
   c_is number) --0ɾ��,1ûɾ�� 
;
create sequence client_seq start with 1 increment by 1 minvalue 1;

--��������
insert into t_client values(client_seq.nextval,1,'���','18039110901','����',1);
insert into t_client values(client_seq.nextval,2,'�Բ���','13000000000','����',1);
insert into t_client values(client_seq.nextval,3,'������','15000000000','����',1);
insert into t_client values(client_seq.nextval,4,'������','17000000000','����',1);
------------------------------------------------------------------
------------------------------------------------------------------

--��Ʒ�����    >>> ���(��Ʒ,Ա��[������,������])

create table t_outproduct
(
  o_id number primary key not null,--������
  p_id number references t_product(p_id),--��Ʒ���
  o_number number,--����
  o_time varchar2(200),--��¼��Ʒ�ĳ���ʱ��
  e_id number references t_emp(e_id),--����������
  o_eid number references t_emp(e_id),--������
  o_remark varchar2(200) )--���ⱸע˵��
;
create sequence outpro_seq start with 1 increment by 1 minvalue 1;

insert into t_outproduct values(outpro_seq.nextval,2,200,'2016-01-10 00:00:00',1,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,4,150,'2016-01-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,6,300,'2016-01-10 00:00:00',2,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,8,200,'2016-01-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-02-10 00:00:00',1,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-02-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-03-10 00:00:00',2,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-03-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-04-10 00:00:00',2,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-04-10 00:00:00',2,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-05-10 00:00:00',1,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-05-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-06-10 00:00:00',2,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-07-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-07-10 00:00:00',1,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-08-10 00:00:00',1,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-08-10 00:00:00',2,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-10-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-10-10 00:00:00',1,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-10-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-10-10 00:00:00',2,0,'����1');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-11-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-11-10 00:00:00',1,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-11-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-11-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-12-10 00:00:00',1,0,'����2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-12-10 00:00:00',1,0,'����3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-12-10 00:00:00',2,0,'����4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-12-10 00:00:00',2,0,'����4');
------------------------------------------------------------------
------------------------------------------------------------------

--������  >>> ���(Ա��,�˿�)

create table t_orders
(
   r_id number primary key,--��� 
   e_id number references t_emp(e_id),--�µ���(Ա��)(���)
   c_id number references t_client(c_id),--�ͻ����(���)
   r_time varchar2(200),--�µ�ʱ��
   r_is number)--1���������µ���û��ȷ����2������ȷ����0�������ѷ���
;
create sequence orders_seq start with 1 increment by 1 minvalue 1;

--��������
insert into t_orders values(orders_seq.nextval,1,2,'2016-01-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-01-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-02-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-02-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,1,2,'2016-03-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,2,3,'2016-03-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-04-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,2,3,'2016-04-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-05-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-05-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-06-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,2,3,'2016-06-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-07-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-07-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,1,2,'2016-08-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-08-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-09-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,2,3,'2016-09-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,1,2,'2016-10-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-10-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-11-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-11-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,1,2,'2016-12-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,2,3,'2016-12-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,3,4,'2016-08-10 00:00:00',1);
insert into t_orders values(orders_seq.nextval,4,5,'2016-08-10 00:00:00',1);
insert into t_orders values(orders_seq.nextval,3,4,'2016-08-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,4,5,'2016-08-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,3,4,'2016-09-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,4,5,'2016-09-10 00:00:00',0);
insert into t_orders values(orders_seq.nextval,3,4,'2016-10-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,4,5,'2016-10-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,3,4,'2016-11-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,4,5,'2016-11-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,3,4,'2016-12-10 00:00:00',2);
insert into t_orders values(orders_seq.nextval,4,5,'2016-12-10 00:00:00',2);

------------------------------------------------------------------
------------------------------------------------------------------

--������ϸ��    >>> ���(����,��Ʒ,��Ʒ���)

create table t_ordersmx
(
   x_id number primary key,--���
   r_id number references t_orders(r_id),--�������(���)
   p_id number references t_product(p_id),--��Ʒ���(���)
   y_id number references t_productyear(y_id),--��Ʒ���(���)
   x_count number,--����
   x_price number)--�ּ�
;

create sequence smx_seq start with 1 increment by 1 minvalue 1;

--��������
insert into t_ordersmx values(smx_seq.nextval,2,2,2,200,50);
insert into t_ordersmx values(smx_seq.nextval,2,4,3,150,40);
insert into t_ordersmx values(smx_seq.nextval,3,6,4,300,20);
insert into t_ordersmx values(smx_seq.nextval,3,8,5,200,10);
insert into t_ordersmx values(smx_seq.nextval,4,2,2,100,60);
insert into t_ordersmx values(smx_seq.nextval,4,4,3,100,40);
insert into t_ordersmx values(smx_seq.nextval,5,6,4,100,50);
insert into t_ordersmx values(smx_seq.nextval,5,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,6,2,2,100,50);
insert into t_ordersmx values(smx_seq.nextval,6,4,3,100,50);
insert into t_ordersmx values(smx_seq.nextval,7,6,4,100,50);
insert into t_ordersmx values(smx_seq.nextval,7,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,8,2,2,100,50);
insert into t_ordersmx values(smx_seq.nextval,8,4,3,100,50);
insert into t_ordersmx values(smx_seq.nextval,9,6,4,100,50);
insert into t_ordersmx values(smx_seq.nextval,9,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,10,2,2,100,50);
insert into t_ordersmx values(smx_seq.nextval,11,4,3,100,50);
insert into t_ordersmx values(smx_seq.nextval,12,6,4,100,50);
insert into t_ordersmx values(smx_seq.nextval,12,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,13,2,2,100,50);
insert into t_ordersmx values(smx_seq.nextval,14,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,14,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,15,8,5,100,30);
insert into t_ordersmx values(smx_seq.nextval,16,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,17,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,18,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,18,8,5,100,30);
insert into t_ordersmx values(smx_seq.nextval,19,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,19,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,20,6,4,100,40);
insert into t_ordersmx values(smx_seq.nextval,20,8,5,100,40);
insert into t_ordersmx values(smx_seq.nextval,21,2,2,100,40);
insert into t_ordersmx values(smx_seq.nextval,21,4,3,100,40);
insert into t_ordersmx values(smx_seq.nextval,22,6,4,100,40);
insert into t_ordersmx values(smx_seq.nextval,22,8,5,100,40);
insert into t_ordersmx values(smx_seq.nextval,23,2,2,100,40);
insert into t_ordersmx values(smx_seq.nextval,23,4,3,100,40);
insert into t_ordersmx values(smx_seq.nextval,24,6,4,100,40);
insert into t_ordersmx values(smx_seq.nextval,24,8,5,100,40);
insert into t_ordersmx values(smx_seq.nextval,25,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,25,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,26,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,26,8,5,100,30);
insert into t_ordersmx values(smx_seq.nextval,27,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,27,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,27,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,27,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,28,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,28,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,29,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,29,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,29,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,30,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,30,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,31,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,31,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,32,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,32,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,33,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,33,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,34,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,34,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,35,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,35,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,36,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,36,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,36,8,5,100,50);
insert into t_ordersmx values(smx_seq.nextval,37,2,2,100,30);
insert into t_ordersmx values(smx_seq.nextval,37,4,3,100,30);
insert into t_ordersmx values(smx_seq.nextval,37,6,4,100,30);
insert into t_ordersmx values(smx_seq.nextval,37,8,5,100,50);

commit;

------------------------------------------------------------------
------------------------------------------------------------------

select * from t_part;
select * from t_emp;
select * from t_client;
select * from t_sort;
select * from t_product;
select * from t_productyear;
select * from t_inproduct;
select * from t_stock;
select * from t_outproduct;
select * from t_orders;
select * from t_ordersmx;
select * from t_orders where e_id=1;
select * from t_ordersmx where r_id=2 
------------------------------------------------------------------
------------------------------------------------------------------


/**
*ɾ��ȫ���ı��Լ�����

drop table t_ordersmx;
drop table t_orders;
drop table t_productyear;
drop table t_client;
drop table t_outproduct;
drop table t_inproduct;
drop table t_stock;
drop table t_product;
drop table t_sort;
drop table t_emp;
drop table t_part;

drop sequence  emp_seq;
drop sequence  part_seq;
drop sequence  sort_seq;
drop sequence  product_seq;
drop sequence year_seq;
drop sequence inpro_seq;
drop sequence stock_seq;
drop sequence outpro_seq;
drop sequence client_seq;
drop sequence orders_seq;
drop sequence smx_seq;
*/
