"use client";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import Expense from "./expense";

export default function Finance() {
    return(<>
    <div className="tabs">
    <Tabs className="tabs">
        <TabList>
            <Tab>Expense</Tab>
            <Tab>Category</Tab>
        </TabList>
        <TabPanel>
            <Expense></Expense>
        </TabPanel>
        <TabPanel>
            <h1>Category</h1>
        </TabPanel>
    </Tabs>
    </div>
    </>)
}