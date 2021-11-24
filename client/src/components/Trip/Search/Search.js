import React, {useState} from "react";
import FilterSearchModal from '../Itinerary/Modals/FilterSearchModal'
import { useToggle } from '../../../hooks/useToggle';

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
import RandomSearch from "./SearchOptions/RandomSearch";
import CoordinateSearch from "./SearchOptions/CoordinateSearch";
import { getOriginalServerUrl } from "../../../utils/restfulAPI";
const GetTableContentsData = (allPackages) =>{
    return [
        {
            tabId:'defaultSearch',
            tabContent: <>
                            <DefaultSearch {...allPackages}/>
                            <FilterSearchModal {...allPackages}/> 

                        </>,
            className:'my-2'
        },
        {
            tabId:'coordinateSearch',
            tabContent:<CoordinateSearch {...allPackages}/>,
            className:'my-2'
        },
        {
            tabId:'randomSearch',
            tabContent:<RandomSearch {...allPackages}/>,
            className:'mx-auto col-auto'
        }
    ]
}
const SearchTab = (allPackages) =>{
    return <Nav tabs>
            <SingleTab tabId = "defaultSearch" tabLabel = "Search" 
                    {...allPackages}/>
            <SingleTab tabId = "coordinateSearch" tabLabel = "Coordinates"
                     {...allPackages}/>
            <SingleTab tabId = "randomSearch" tabLabel = "Random"
                      {...allPackages}/>
        </Nav>
}

export default function Search(props) {
    const [activeTab, setActiveTab] = useState("defaultSearch");
    const [filterSearchOpen,toggleFilterSearch] = useToggle(false);
 
    let serverURLSet = props.serverSettings && props.serverSettings.serverUrl
            
    let currentURL = serverURLSet ? props.serverSettings.serverUrl : getOriginalServerUrl();
    const allPackages = {
        ...props,
        activeTab,setActiveTab,
        filterSearchOpen,toggleFilterSearch,
        currentURL
    }
    const TableContentsData = GetTableContentsData(allPackages)
    return (
        <>{SearchTab(allPackages)} 
        <TabContent activeTab={activeTab}>
            {TableContentsData.map((tab,key)=>{
                return (<TabPane key={`search-tab-pan-${key}`} tabId={tab.tabId}>
                            <Row>
                                <Col className={tab.className}>
                                    {tab.tabContent}
                                </Col>
                            </Row>
                        </TabPane>)
            })}
        </TabContent></>
    );
}

export function SingleTab(props) {

    const toggle = (tab) => {
        if (props.activeTab !== tab) {
            props.setActiveTab(tab);
            props.setSearchResults(null);
        }
    };
    return (
        <NavItem>
            <NavLink
                className={classnames({ active: props.activeTab === props.tabId })}
                onClick={() => {
                    toggle(props.tabId);
                }}>
                {props.tabLabel}
            </NavLink>
        </NavItem>
    );
}