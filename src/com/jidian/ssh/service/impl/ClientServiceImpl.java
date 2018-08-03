package com.jidian.ssh.service.impl;

import java.util.List;

import com.jidian.ssh.dao.ClientDao;
import com.jidian.ssh.entity.Client;
import com.jidian.ssh.service.ClientService;

public class ClientServiceImpl implements ClientService{

	private ClientDao clientDao;
	
	public ClientDao getClientDao() {
		return clientDao;
	}

	public void setClientDao(ClientDao clientDao) {
		this.clientDao = clientDao;
	}

	@Override
	public List showClientByEid(int num, String size, int is, int eid) {
		int pageNum=0;
		if(num==0){
			pageNum=1;
		}else{
			pageNum=new Integer(num);
		}
		int pageSize=0;
		if(size==null||size==""){
			pageSize=5;
		}else{
			pageSize=new Integer(size);
		}
		return clientDao.showClientByEid(pageNum, pageSize, is, eid);
	}

	@Override
	public void addClient(Client client) {
		clientDao.addClient(client);
	}

	@Override
	public void delClient(int cid) {
		clientDao.delClient(cid);
	}

	@Override
	public Client findClientByCid(int cid) {
		return clientDao.findClientByCid(cid);
	}

	@Override
	public void uppClient(Client client) {
		clientDao.uppClient(client);
	}

	@Override
	public List findClientByCid1(int cid) {
		return clientDao.findClientByCid1(cid);
	}

	@Override
	public void backClient(int cid) {
		clientDao.backClient(cid);
	}

	
}
