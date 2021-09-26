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

    return (
        <>
        <Nav tabs>
            <SingleTab tabId = "defaultSearch" tabLabel = "Search" activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SingleTab tabId = "coordinateSearch" tabLabel = "Coordinates" activeTab={activeTab} setActiveTab={setActiveTab}/>
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
                <CoordinateSearch currentURL={currentURL} setSearchResults={props.setSearchResults}/>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
        </>
    );
}

export function SingleTab(props) {
    const toggle = (tab) => {
        if (props.activeTab !== tab) props.setActiveTab(tab);
    };
    return (
        <>
        <NavItem>
            <NavLink
                className={classnames({ active: props.activeTab === props.tabId })}
                onClick={() => {
                    toggle(props.tabId);
                }}>
                {props.tabLabel}
            </NavLink>
        </NavItem>
        </>
    );
}