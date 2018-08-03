package com.jidian.ssh.service;

import java.util.List;

import com.jidian.ssh.entity.Client;

public interface ClientService {

	List showClientByEid(int current, String pis,int is,int eid);
	
	void addClient(Client client);
	
	void delClient(int cid);
	
	Client findClientByCid(int cid);
	
	void uppClient(Client client);
	
	List findClientByCid1(int cid);
	
	void backClient(int cid);
}
