import React, { useState, Fragment } from "react";
import TabNav from './TabNav'
import Tab from './Tab'

import ProfileAnalysisTab from "./ProfileAnalysisTab";
import CompareProfilesTab from "./CompareProfilesTab";
import VRCTab from "./VRCTab";

const Analyze = () => {

  const [SelectedTab, setSelectedTab] = useState('Profile Analysis');

  const setTab = (tab) => {
    setSelectedTab(tab);
  }

  return (
    <>
      <TabNav tabs={['Profile Analysis', 'Compare Profiles', 'Virtual Rating Change']} selected={SelectedTab} setSelected={setTab}>

        <Tab isSelected={SelectedTab === 'Profile Analysis'}>
          <Fragment>
            <ProfileAnalysisTab />
          </Fragment>
        </Tab>
        
        <Tab isSelected={SelectedTab === 'Compare Profiles'}>
          <Fragment>
            <CompareProfilesTab />
          </Fragment>
        </Tab>

        <Tab isSelected={SelectedTab === 'Virtual Rating Change'}>
          <Fragment>
            <VRCTab />
          </Fragment>
        </Tab>
      
      </TabNav>
    </>
  );
};

export default Analyze;
