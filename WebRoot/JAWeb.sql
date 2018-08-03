/**
*               江岸日用化工大型数据管理数据库  
*/
create database MyManagerSystem
go
use MyManagerSystem
--部门表

create table t_part
(
   p_id int primary key,--部门编号
   p_name varchar(200),--部门名称
   p_remark varchar(200),--部门备注
   p_is int--0删除,1没删除  
);

select*from t_part
sp_help t_part

select top  3 * from t_part where  p_id  not in(select (p_id) from (select top 0 p_id from t_part  order by p_id asc) as tblTmp) and p_is=1 order by p_id asc

--测试数据

insert into t_part values(1'销售部','部门1',1);
insert into t_part values('仓管部','部门2',1);
insert into t_part values('财务部','部门3',1);
insert into t_part values('开发部','部门4',1);
insert into t_part values('售后部','部门5',1);
insert into t_part values('第6部','部门6',1);
insert into t_part values(7,'第7部','部门7',1);
------------------------------------------------------------------
------------------------------------------------------------------

--员工表  >>> 外键(部门)

create table t_emp
(
   e_id int primary key identity(1601,1),--员工编号
   p_id int references t_part(p_id),--部门编号(外键)
   e_loginname varchar(200),--登陆名
   e_psw varchar(200),--登陆密码
   e_img varchar(200),--员工图片
   e_sex varchar(2),--员工性别
   e_flag int,--记录员工级别(0 普工 1部门主管 )
   e_admin int,--记录员工进入系统操作级别(0 —普通操作者 1---部门主管 -1--系统管理员)
   e_remark varchar(200),--员工备注
   e_truename varchar(200),--员工真实姓名
   e_is int--0删除,1没删除 
);
select*from t_emp
update t_emp set p_id=2, e_loginname='hui', e_img='upfile/2018-05-07/H5R3IM94RBQHVJ5Q7H4UWGY8JUPXH322.jpg', e_sex='undefined', e_flag=0, e_admin=0, e_remark='员工32222', e_truename='王龙辉2' where e_id=3
select emp0_.e_id as e1_0_, emp0_.p_id as p2_0_, emp0_.e_loginname as e3_0_, emp0_.e_psw as e4_0_, emp0_.e_img as e5_0_, emp0_.e_sex as e6_0_, emp0_.e_flag as e7_0_, emp0_.e_admin as e8_0_, emp0_.e_remark as e9_0_, emp0_.e_truename as e10_0_, emp0_.e_is as e11_0_ from t_emp emp0_ where emp0_.e_is=1
--测试数据
insert into t_emp values(1,'botao','123','upfile/nan1.jpg','男',1,1,'员工1','赵波涛',1);
insert into t_emp values(2,'bin','123','upfile/nan2.jpg','男',1,1,'员工2','李彬',1);
insert into t_emp values(3,'hui','123','upfile/nv1.jpg','女',1,1,'员工3','王龙辉',1);
insert into t_emp values(4,'dong','123','upfile/nv2.jpg','女',1,1,'员工4','董华丽',1);
insert into t_emp values('mi','123','upfile/nan3.jpg','男',0,0,'员工5','小米',1);
insert into t_emp values('ming','123','upfile/nan2.jpg','男',0,0,'员工6','小明',1);
insert into t_emp values(3,'hua','123','upfile/nv3.jpg','女',0,0,'员工7','小花',1);
insert into t_emp values(4,'hong','123','upfile/nv4.jpg','女',0,0,'员工8','小红',1);
insert into t_emp values(5,'lili','123','upfile/nv3.jpg','女',1,1,'员工9','李丽',1);
insert into t_emp values(6,'wanghong','123','upfile/nv4.jpg','女',1,1,'员工10','王红',1);
insert into t_emp values(5,'gang','123','upfile/nan3.jpg','男',0,0,'员工11','小刚',1);
insert into t_emp values(6,'qiang','123','upfile/nan2.jpg','男',0,0,'员工12','小强',1);
------------------------------------------------------------------
------------------------------------------------------------------

--产品类别表

create table t_sort
(
   s_id int primary key identity(1,1),--产品类别编号
   s_name varchar(200),--类别名称
   s_remark varchar(200),--类别备注
   s_is int--0已删除,1未删除 
);
select*from t_sort

--测试数据
insert into t_sort values('水果类','类别1',1);
insert into t_sort values('饮料类','类别2',1);
insert into t_sort values('日用类','类别3',1);
insert into t_sort values('食物类','类别4',1);
insert into t_sort values('毛线类','类别5',1);
insert into t_sort values('呵呵类','类别6',1);
insert into t_sort values('哈欠类','类别7',1);
insert into t_sort values('余忠巧类','类别8',1);
------------------------------------------------------------------
------------------------------------------------------------------

--产品表  >>> 外键(产品类别)
create table t_product
(
   p_id int primary key identity(1001,1),--产品编号
   s_id int references t_sort(s_id),--类别编号
   p_name varchar(200),--产品名称
   p_area varchar(200),--产地
   p_ml varchar(200),--产品规格
   p_is int--0已删除,1未删除 
);
select*from t_product

--测试数据
insert into t_product values(2,'苹果','上海','千克',1);
insert into t_product values(2,'香蕉','武汉','千克',1);
insert into t_product values(3,'可乐','北京','瓶',1);
insert into t_product values(3,'雪碧','广州','瓶',1);
insert into t_product values(4,'洗面奶','上海','瓶',1);
insert into t_product values(4,'洗面奶','北京','瓶',1);
insert into t_product values(1,'大米','杭州','袋',1);
insert into t_product values(1,'小麦','郑州','袋',1);
------------------------------------------------------------------
------------------------------------------------------------------

--产品年份表   >>> 外键(产品)
create table t_productyear(
   y_id int primary key identity(1,1),--年份编号
   p_id int references t_product(p_id),--产品编号
   y_name varchar(200),--年份
   y_price int--这一年的价格
);
select*from t_productyear
select count(*) from t_productyear where p_id=1003
--测试数据
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

--产品入库表   >>> 外键(产品,员工)

create table t_inproduct
(
  d_id number primary key,--入库编号
  p_id number references t_product(p_id),--产品编号(外键)
  e_id number references t_emp(e_id),--入库操作员(外键)
  d_remark varchar2(200),--入库备注 
  d_number number,--入库量
  d_time varchar2(200)--入库时间
);
create sequence inpro_seq start with 1 increment by 1 minvalue 1;

--测试数据
insert into t_inproduct values(inpro_seq.nextval,2,4,'水果1',5000,'2016-08-10 13:10:56');
insert into t_inproduct values(inpro_seq.nextval,3,4,'水果1',5000,'2016-08-10 14:13:11');
insert into t_inproduct values(inpro_seq.nextval,4,4,'饮料1',7000,'2016-08-10 15:20:46');
insert into t_inproduct values(inpro_seq.nextval,5,4,'饮料1',7000,'2016-08-10 15:22:20');
insert into t_inproduct values(inpro_seq.nextval,6,4,'日用1',6000,'2016-08-10 16:46:11');
insert into t_inproduct values(inpro_seq.nextval,8,4,'食物1',6000,'2016-08-10 17:01:56');
insert into t_inproduct values(inpro_seq.nextval,7,4,'1234',6000,'2016-08-10 16:46:11');
insert into t_inproduct values(inpro_seq.nextval,9,4,'4567',6000,'2016-08-10 17:01:56');
------------------------------------------------------------------
------------------------------------------------------------------

--产品目前库存量表   >>> 外键(产品)

create table t_stock
(
  k_id number primary key,--编号 
  p_id number references t_product(p_id),--产品编号(外键)
  k_sum number)--目前总库存量
;
create sequence stock_seq start with 1 increment by 1 minvalue 1;

--测试数据
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

--客户表  >>> 外键(员工)

create table t_client
(
   c_id number primary key,--编号  
   e_id number references t_emp(e_id),--员工编号(外键)
   c_name varchar2(200),--客户姓名
   c_tel varchar2(200),--客户联系电话
   c_address varchar2(200),--联系地址
   c_is number) --0删除,1没删除 
;
create sequence client_seq start with 1 increment by 1 minvalue 1;

--测试数据
insert into t_client values(client_seq.nextval,1,'李彬','18039110901','河南',1);
insert into t_client values(client_seq.nextval,2,'赵波涛','13000000000','河南',1);
insert into t_client values(client_seq.nextval,3,'王龙辉','15000000000','河南',1);
insert into t_client values(client_seq.nextval,4,'董华丽','17000000000','河南',1);
------------------------------------------------------------------
------------------------------------------------------------------

--产品出库表    >>> 外键(产品,员工[申请人,经办人])

create table t_outproduct
(
  o_id number primary key not null,--出库编号
  p_id number references t_product(p_id),--产品编号
  o_number number,--数量
  o_time varchar2(200),--记录产品的出库时间
  e_id number references t_emp(e_id),--出库申请人
  o_eid number references t_emp(e_id),--经办人
  o_remark varchar2(200) )--出库备注说明
;
create sequence outpro_seq start with 1 increment by 1 minvalue 1;

insert into t_outproduct values(outpro_seq.nextval,2,200,'2016-01-10 00:00:00',1,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,4,150,'2016-01-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,6,300,'2016-01-10 00:00:00',2,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,8,200,'2016-01-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-02-10 00:00:00',1,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-02-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-03-10 00:00:00',2,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-03-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-04-10 00:00:00',2,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-04-10 00:00:00',2,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-05-10 00:00:00',1,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-05-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-06-10 00:00:00',2,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-07-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-07-10 00:00:00',1,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-08-10 00:00:00',1,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-08-10 00:00:00',2,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-10-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-10-10 00:00:00',1,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-10-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-10-10 00:00:00',2,0,'出库1');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-11-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-11-10 00:00:00',1,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-11-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-11-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,6,100,'2016-12-10 00:00:00',1,0,'出库2');
insert into t_outproduct values(outpro_seq.nextval,8,100,'2016-12-10 00:00:00',1,0,'出库3');
insert into t_outproduct values(outpro_seq.nextval,2,100,'2016-12-10 00:00:00',2,0,'出库4');
insert into t_outproduct values(outpro_seq.nextval,4,100,'2016-12-10 00:00:00',2,0,'出库4');
------------------------------------------------------------------
------------------------------------------------------------------

--订单表  >>> 外键(员工,顾客)

create table t_orders
(
   r_id number primary key,--编号 
   e_id number references t_emp(e_id),--下单人(员工)(外键)
   c_id number references t_client(c_id),--客户编号(外键)
   r_time varchar2(200),--下单时间
   r_is number)--1代表订单已下单但没有确定。2代表已确定。0代表订单已废弃
;
create sequence orders_seq start with 1 increment by 1 minvalue 1;

--测试数据
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

--订单明细表    >>> 外键(订单,产品,产品年份)

create table t_ordersmx
(
   x_id number primary key,--编号
   r_id number references t_orders(r_id),--订单编号(外键)
   p_id number references t_product(p_id),--产品编号(外键)
   y_id number references t_productyear(y_id),--产品年份(外键)
   x_count number,--数量
   x_price number)--现价
;

create sequence smx_seq start with 1 increment by 1 minvalue 1;

--测试数据
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
*删除全部的表以及序列

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
