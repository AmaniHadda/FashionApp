import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { AiOutlineShop } from 'react-icons/ai';
import CommentLouer from './CommentLouer';
import Ccmarches from './Ccmarches';

export default function Infos() {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    return (
        <div className="banner-list-page">
        <div className="banner-list-container">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="custom-tabs"
                centered
            >
                <Tab icon={<AiOutlineShop />} label="Comment Louer" />

                <Tab icon={<AiOutlineShop />} label="Comment ça Marche" />
            </Tabs>
            {activeTab === 0 && (
          <div >
            <CommentLouer />
          </div>
        )}
        {activeTab === 1 && (
          <div >
            <Ccmarches />
          </div>
        )} 
        </div>
        </div>
    )
}
