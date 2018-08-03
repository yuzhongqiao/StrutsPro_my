package com.jidian.ssh.dao;

import java.util.List;

import com.jidian.ssh.entity.Client;

public interface ClientDao {

	List showClientByEid(int current, int pis,int is,int eid);
	
	void addClient(Client client);
	
	void delClient(int cid);
	
	Client findClientByCid(int cid);
	
	void uppClient(Client client);
	
	List findClientByCid1(int cid);
	
	void backClient(int cid);
}
