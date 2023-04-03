import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loadWeb3 } from "./Connectivity/Connectivity";
import { abi, address } from "./Connectivity/Contracy";
import {tokenAbi, tokenAddress} from './Connectivity/token'
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
export default function Page1() {
  const [btnTxt, setBtTxt] = useState("click to connect");
  const [account, setAccount] = useState("0000");

  /*Model States */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  /* Function States */
  const [mint, setMint] = useState("");
  const [tokenId, setTokenId] = useState();
  const [user, userSet] = useState("");
  const [rent, setRent] = useState();
  const [advance, setAdvancePayment] = useState();
  const [startTime, setStartTime] = useState();
  const [expires, setExpires] = useState();
  const [transferToken, setTransferToken] = useState();
  const [amount, setAmount] = useState();
  const [rentalAmount, setRentalAmount] = useState();
  const [rentalTokenId, setRentalTokenId] = useState();
  const [agreementTokenId, setAgreementTokenId] = useState();
  const [time, setTiming] = useState();
  const [aproveAdress, setAproveAdress] = useState("");
  const [aproveAmount, setAproveAmount] = useState();
  const [changeTokenId, setChangeTokenId] = useState();
  const [changeExpireTime,setChangeExpireTime]=useState()
  /* Read State*/
  const [users, setUsers] = useState();
  const [usersInfo, setUsersInfo] = useState({});
  const [checkRent, setCheckRent] = useState();
  const [returnRent, setReturnRent] = useState({});
  const [owner, setOwner] = useState();
  const [returnOwner, setReturnOwner] = useState("");
  const [userof, setUserOf] = useState();
  const [returnUserOfAdress, setUserReturnAdress] = useState("");
  const [userExpire, setUserExpire] = useState();
  const [returnExpireValue, setReturnExpireValue] = useState();
  const [checkid,setCheckId]=useState()
  const [linkUri,setLinkUri]=useState()

  const handleClick = async () => {
    let [acc, net_id] = await loadWeb3();
    console.log(net_id);
    if (acc == "No Wallet") {
      setBtTxt("No Wallet");
    } else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network");
    } else {
      setAccount(acc);
      let myAcc = acc;
      setBtTxt("connected");
      console.log("acc", acc);
    }
  };

  const mintFunc = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.mint(mint).send({
        from: account,
      });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const UserSet = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const rant = web3.utils.toWei(rent);
      const advanc = web3.utils.toWei(advance);
      const stime=new Date(startTime).getTime()
      const etime=new Date(expires).getTime()
      const data = await contractAdd.methods
        .setUser(tokenId, user, rant, advanc, stime, etime)
        .send({
          from: account,
        });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const advanceTransfer = async () => {
    try {
    

        const web3 = window.web3;
        let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
        
        let contractAdd = new web3.eth.Contract(abi, address);
        const amounts = web3.utils.toWei(amount.toString());
        await tokenContract.methods.approve(address, amounts).send({
          from:account
        })
        await contractAdd.methods
        .transferadvance(transferToken, amounts)
        .send({
          from: account,
        });
        toast.success("Transaction Successful");
    
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const paymentRental = async () => {
    try {
      const web3 = window.web3;
      let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
      let contractAdd = new web3.eth.Contract(abi, address);
      const rentAmount = web3.utils.toWei(rentalAmount.toString());
      await tokenContract.methods.approve(address, rentAmount).send({
        from:account
      })
      const data = await contractAdd.methods
        .rentalPayment(rentAmount, rentalTokenId)
        .send({
          from: account,
          // to: "0xAD4f1d02ad3e819AD86D3eD27dfd13F31A19a09a",
        });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const cancelAgreement = async () => {
    try {
      const web3 = window.web3;
      let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
      let contractAdd = new web3.eth.Contract(abi, address);
      const userData=await contractAdd.methods._users(agreementTokenId).call();
      const amt=userData.advancepayment
      const tkadress=userData.user
      await tokenContract.methods.approve(tkadress,amt).send({
        from:account
      })
      const data = await contractAdd.methods
        .agreementCancel(agreementTokenId)
        .send({
          from: account,
        });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const TimeSet = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.setTime(time).send({
        from: account,
      });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const Aprove = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const amount = web3.utils.toWei(aproveAmount);
      const data = await contractAdd.methods
        .approve(aproveAdress, amount)
        .send({
          from: account,
        });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const Expire=async()=>{
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods
        .approve()
        .send({
          from: account,
        });
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  }

  /*Read Function */

  const userInfo = async () => {
    try {
      let obj = {};
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods._users(users).call();
      let timeStart= data.startTime;
      let timeStart1= new Date(Number(timeStart))
      let timeExpire= data.expires;
      let timeExpire1= new Date(Number(timeExpire))
      let paymentTime= data.lastPaymentDate;
      let timePayment= new Date(Number(paymentTime))
      obj["address"]=data[0]
      obj["address1"]=timeStart1.toString()
      obj["address2"]=web3.utils.fromWei(data[2])
      obj["address3"]=timeExpire1.toString()
      obj["address4"]=data[4]
      obj["address5"]=data.lastPaymentDate=="0"?"DD/MM/YY":timePayment;
      obj["address6"]=data[6]==true?"cancel":"approved"
      obj["address7"]=web3.utils.fromWei(data[7])
      obj["address8"]=data[8]==true? "transfered":"not transfered"
      console.log("data",data);
      console.log("obj",obj);
      setUsersInfo(obj);
      setShow(true);
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const CheckRent = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.checkRentPayment(checkRent).call();
      console.log("user",data);
      setReturnRent(data);
      setShow1(true)
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const Owner = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.ownerOf(owner).call();
      console.log(data);
      setReturnOwner(data);
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const UserOF = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.userOf(userof).call();
      console.log(data);
      setUserReturnAdress(data);
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const USEREXPIRE = async () => {
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.userExpires(userExpire).call();
      let timeStart= data;
      let timeStart1= new Date(Number(timeStart))
      console.log(timeStart1);
      setReturnExpireValue(timeStart1.toString());
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }
  };

  const IDCheck=async()=>{
    try {
      const web3 = window.web3;
      let contractAdd = new web3.eth.Contract(abi, address);
      const data = await contractAdd.methods.checkID(checkid).call();
      console.log("return value",data)
      setLinkUri(data)
      toast.success("Transaction Successful");
    } catch (e) {
      console.log("e", e);
      toast.error("Transaction failed");
    }

  }

  return (
    <div className="container">
      <div className="text-end pt-2">
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          {btnTxt}
        </button>
        <br />
        <span className="">
          {account?.substring(0, 4) +
            "..." +
            account?.substring(account?.length - 4)}
        </span>
      </div>
      {account && account != "0000" ? (
        <>
          <div className="container">
            <div className="row gap-5">
              <div className="col-5">
                <Form>
                  <Form.Group className="w-100 " style={{ marginLeft: "8px" }}>
                    <Form.Label>List Property For Rent:{mint}</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Uri"
                      onChange={(e) => {
                        setMint(e.target.value);
                      }}
                    />
                    <Button width="100%" onClick={mintFunc}>
                      Submit
                    </Button>
                    <br />
                    <Form.Label className="mt-4">Tenant Detail:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="adress"
                      onChange={(e) => userSet(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="rent_Amount"
                      onChange={(e) => setRent(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="advance_Payment"
                      onChange={(e) => setAdvancePayment(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="date"
                      placeholder="start_Time"
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="date"
                      placeholder="expire"
                      onChange={(e) => setExpires(e.target.value)}
                    />
                    <Button color="" width="100%" onClick={UserSet}>
                      Submit
                    </Button>
                    <br />
                    <Form.Label className="mt-4">
                      Transfer Advance Payment:
                    </Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="number"
                      placeholder="token_Id"
                      onChange={(e) => setTransferToken(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="number"
                      placeholder="amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button onClick={advanceTransfer}>trnasferAdvance</Button>
                    <br />
                    <Form.Label className="mt-4">Pay Rent:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="Amount"
                      onChange={(e) => setRentalAmount(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setRentalTokenId(e.target.value)}
                    />
                    <Button onClick={paymentRental}>Pay Rent</Button>
                    <br />
                    <Form.Label className="mt-4">Agreement Cancel:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setAgreementTokenId(e.target.value)}
                    />
                    <Button onClick={cancelAgreement}>Agreement Cancel</Button>
                    <br />

                
                    {/* <Form.Label className="mt-4">Approve </Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="adress"
                      onChange={(e) => setAproveAdress(e.target.value)}
                    />
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="amount"
                      onChange={(e) => setAproveAmount(e.target.value)}
                    />
                    <Button onClick={Aprove}>Approve</Button> */}
                  </Form.Group>
                </Form>
              </div>

              <div className="col-5">
                <Form>
                  <Form.Group className="w-100 " style={{ marginLeft: "8px" }}>
                    <Form.Label>User_Info</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="index_number"
                      onChange={(e) => {
                        setUsers(e.target.value);
                      }}
                    />
                    <Button width="100%" onClick={userInfo}>
                      User_Info
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title> Detail</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {usersInfo ? (
                          <div>
                            <p>User Address:<br/>{usersInfo.address}</p>
                            <p>Agreement Start Time:<br/>{usersInfo.address1}</p>
                            <p>Per Month Rent:<br/>{usersInfo.address2}</p>
                            <p>Agreement Expire Time:<br/>{usersInfo.address3}</p>
                            <p>Rent Status :<br/>{usersInfo.address4}</p>
                            <p>Last Payment history :<br/>{usersInfo.address5}</p>
                            <p>Agreement Status :<br/>{usersInfo.address6}</p>
                            <p>Advance Payment :<br/>{usersInfo.address7}</p>
                            <p>Advance Payment Status :<br/>{usersInfo.address8}</p>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <br />
                    <Form.Label className="mt-4">Check Rent Status:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setCheckRent(e.target.value)}
                    />
                    <Button color="" width="100%" onClick={CheckRent}>
                      Check Rent
                    </Button>
                    <Modal show={show1} onHide={handleClose1}>
                      <Modal.Header closeButton>
                        <Modal.Title>Rental Detail</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {returnRent? (
                          <div>
                            <p>Total Month:<br/>{returnRent.totalmonth}</p>
                            <p>Month:<br/>{returnRent.months}</p>
                            <p>Day:<br/>{returnRent.dayAftermonth}</p>
                            <p>Total Rent:<br/>{returnRent.amount}</p>
                            
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <br />
                    <Form.Label className="mt-4">Check Owner:</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="number"
                      placeholder="token_Id"
                      onChange={(e) => setOwner(e.target.value)}
                    />
                    <div className="d-flex gap-4">
                      <Button onClick={Owner}>Check Owner</Button>
                      <p>{returnOwner}</p>
                    </div>
                    <br />

                    <Form.Label className="mt-4">Check Id :</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="link_URI"
                      onChange={(e) => setCheckId(e.target.value)}
                    />
                    <div className="d-flex gap-4">
                      <Button onClick={IDCheck}>Check </Button>
                      <p>{linkUri}</p>
                    </div>
                    <br />
  
                    <Form.Label className="mt-4">Check User :</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setUserOf(e.target.value)}
                    />
                    <div className="d-flex gap-4">
                      <Button onClick={UserOF}>Check User</Button>
                      <p>{returnUserOfAdress}</p>
                    </div>
                    <br />
                    <Form.Label className="mt-4">
                      Agreement Expire Time:
                    </Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder="token_Id"
                      onChange={(e) => setUserExpire(e.target.value)}
                    />
                    <div className="d-flex gap-4">
                    <Button onClick={USEREXPIRE}>Agreement Expire Time</Button>
                    <p>{returnExpireValue}</p>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// let timeStamp= data.startTime;
// console.log(new Date(Number(timeStamp)));
