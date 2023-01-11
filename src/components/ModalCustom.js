import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import request from "../assets/icons/actions/request.png"

import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "./Dashboard/Dashboard.css"
import { Select } from 'antd';
import error from "../assets/icons/actions/error.png"
import success from "../assets/icons/actions/success.png"

export const ModalCustom = 
  function FancyModalButton(props) {
    const [selectedStadium, setSelectedStadium] = useState("Choose a Stadium");
    const [selectedStadiumName, setSelectedStadiumName] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        setSuccessMsg("");
        setErrMsg("");
    }, [])

    const [requests, setRequests] = useState("");
    useEffect(() => {
        axios.get('http://localhost:5000/viewRequests')
        .then(res => setRequests(res.data))
    }, [requests])

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    function toggleModal(e) {
      setOpacity(0);
      setIsOpen(!isOpen);
    }
    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 100);
    }
    function beforeClose() {
      return new Promise((resolve) => {
        setOpacity(0);
        setTimeout(resolve, 300);
      });
    }
    const data = props.availableStadiums.availableStadiums.map((stadium) => {
        return {"value": stadium.sm_id, "label": stadium.name}
    });

    const clickAddHostRequest = async (e) => {
        e.preventDefault();
        var existingRequest = false;
        requests.forEach(req => {
            if (req.representative_id === props.cr_id && req.manager_id === selectedStadium && req.match_id === props.m_id) {
                existingRequest = true;   
            }
        })
        if (existingRequest) {setErrMsg("You have already sent a request to this stadium."); setSuccessMsg("");}
        else if (selectedStadium != "Choose a Stadium") {
            console.log(selectedStadium)
            await fetch(`http://localhost:5000/addHostRequest`, {
                method: 'POST', 
                url: 'http://localhost:5000',
                header : {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    cr_id: parseInt({props}.props.cr_id),
                    sm_id: parseInt({selectedStadium}.selectedStadium),
                    m_id: parseInt({props}.props.m_id)
                })
            })
            .then(res => res.json())
            .then(setSuccessMsg(`A request to host your match on the stadium ${JSON.stringify({selectedStadiumName}.selectedStadiumName.label)} has been sent.`))
            .then(setErrMsg(""))
        }
    }

    return (
      <div>
        <button  style={{backgroundColor: "transparent", cursor:"pointer"}} onClick={toggleModal}><img width="50px" src={request} alt="alternative text" style={{backgroundColor: "transparent"}} title="Send a host request" /> </button>
        <ModalCustom className="blackme" isOpen={isOpen} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal} opacity={opacity} backgroundProps={{ opacity }}>
            <div style={{display: "flex", textAlign:"center", flexDirection:"column", gap:"20px"}}>
                <div style={{color:'white'}}>
                <h2>Choose a Stadium to Send a Request to Host Your Match on it</h2>
                <h3>{props.host.toString().toUpperCase()} VS {props.guest.toString().toUpperCase()}  { }
                    AT {props.startTime.substring(11,13)}:{props.startTime.substring(14,16)} { }
                    ON {props.startTime.substring(8,10)}/{props.startTime.substring(5,7)}/{props.startTime.substring(0,4)}
                </h3>
                </div>
                <Select onClick={(e) => {setSuccessMsg(""); setErrMsg("")}} value={selectedStadium} onChange={(value, label) => {setSelectedStadium(value); setSelectedStadiumName(label)}} size="large" style={{width: "30%", alignSelf:"center"}} options= {data}/>
            </div>
            <div style={{display: "flex", textAlign:"center", flexDirection:"column", gap:"20px"}}>
                <button style={{justifySelf:"center", alignSelf:"center"}} onClick={clickAddHostRequest} className="sendRequestButton">Send Request</button>
                <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px'/>{' '} {errMsg}</p>
            </div>
        </ModalCustom>
      </div>
    );
  }
//   const FadingBackground = styled(BaseModalBackground)`
//   opacity: ${(props) => props.opacity};
//   transition: all 0.3s ease-in-out;
// `;
