"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

export default function Expense(params) {
    return(<>
    <div className="tabs">
    <Tabs className="tabs">
        <TabList>
            <Tab>Expense</Tab>
            <Tab>Category</Tab>
        </TabList>
        <TabPanel>
            <h1>Expense</h1>
        </TabPanel>
        <TabPanel>
            <h1>Category</h1>
        </TabPanel>
    </Tabs>
    </div>
    </>)
}