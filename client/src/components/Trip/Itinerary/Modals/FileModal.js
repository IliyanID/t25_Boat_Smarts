import React, { useState } from 'react'
import { Modal, ModalHeader, Nav, TabContent, TabPane, NavItem, NavLink } from 'reactstrap'
import { FileUpload } from './FileUpload'
import { FileDownload } from './FileDownload'
import classnames from 'classnames';
const PackageAllStates = (props) =>{
    const [selectedTab,setSelectedTab] = useState('FileDownload')
    return{
        selectedTab,setSelectedTab,
        ...props
    }
}

export const FileModal = (props) =>{
    const allPackages = PackageAllStates(props);
    return <Modal isOpen={allPackages.fileActionsOpen} toggle={allPackages.toggleFileActions}>
            <Nav tabs>
                <IndividualTab tabId='FileDownload' tabName='Download Trip' {...allPackages}/>
                <IndividualTab tabId='FileUpload' tabName='Upload Trip' {...allPackages}/>
            </Nav>
            <TabContent activeTab={allPackages.selectedTab}>
                <TabPane tabId='FileDownload'>
                    <FileDownload {...allPackages}/>
                </TabPane>
                <TabPane  tabId='FileUpload'>
                    <FileUpload {...allPackages}/>
                </TabPane>
            </TabContent>
        </Modal>
    
    
}


const IndividualTab = (props) =>{
    return (
        <NavItem >
            <NavLink className={classnames({ active: props.selectedTab === props.tabId })} onClick={()=>props.setSelectedTab(props.tabId)}>
                {props.tabName}
            </NavLink>
        </NavItem>
    )
}

export default FileModal