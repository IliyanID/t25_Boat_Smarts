import React, {useState} from "react";

import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col
} from "reactstrap";

import DefaultSearch from "./DefaultSearch";
import CoordinateSearch from "./CoordinateSearch";
import { getOriginalServerUrl } from "../../../utils/restfulAPI";

export default function Search(props) {
    const [activeTab, setActiveTab] = useState("defaultSearch");
    let currentURL = getOriginalServerUrl();
        
        let serverURLSet = props.serverSettings && props.serverSettings.serverUrl
            
    let currentURL = serverURLSet ? props.serverSettings.serverUrl : getOriginalServerUrl();

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <>
        <Nav tabs>
            <NavItem>
            <NavLink
                className={classnames({ active: activeTab === "defaultSearch" })}
                onClick={() => {
                    toggle("defaultSearch");
                }}>
                Search
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: activeTab === "coordinateSearch" })}
                onClick={() => {
                    toggle("coordinateSearch");
                }}>
                Coordinates
            </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="defaultSearch">
            <Row>
                <Col sm="12">
                <DefaultSearch currentURL={currentURL} setSearchResults={setSearchResults}/>
                </Col>
            </Row>
            </TabPane>
            <TabPane tabId="coordinateSearch">
            <Row>
                <Col sm="12">
                <CoordinateSearch currentURL={currentURL} setSearchResults={setSearchResults}/>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
        </>
    );
}
