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
import classnames from 'classnames';

import DefaultSearch from "./SearchOptions/DefaultSearch";
import CoordinateSearch from "./SearchOptions/CoordinateSearch";
import { getOriginalServerUrl } from "../../../utils/restfulAPI";

export default function Search(props) {
    const [activeTab, setActiveTab] = useState("defaultSearch");
        
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
                <Col sm="12" className="my-2">
                <DefaultSearch currentURL={currentURL} setSearchResults={props.setSearchResults}/>
                </Col>
            </Row>
            </TabPane>
            <TabPane tabId="coordinateSearch">
            <Row>
                <Col sm="12">
                <CoordinateSearch currentURL={currentURL} {...props}/>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
        </>
    );
}
