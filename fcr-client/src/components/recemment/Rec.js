import React from 'react';
import 'react-tabs/style/react-tabs.css';
import LastBrand from '../Tendance/LastBrand';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "./tabs.css"
import ReceVu from '../RecemmentVu/ReceVu ';
import { useTranslation } from 'react-i18next';


const Rec = () => {
  const { t } = useTranslation()
  return (
    <div className='pt-4 mt-4'>
      <Tabs>
      <TabList className="custom-tab-list">
          <Tab className="custom-tab">{t("button.btn1")}</Tab>
          <Tab className="custom-tab">{t("button.btn2")}</Tab>
        </TabList>
        
        <TabPanel>
        <LastBrand />
        </TabPanel>

        <TabPanel>
          <ReceVu/>
        </TabPanel>

      </Tabs>
    </div>
  );
};

export default Rec;
