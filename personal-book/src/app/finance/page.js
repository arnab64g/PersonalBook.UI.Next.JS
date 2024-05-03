"use client";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Expense from "./expense";
import { useState } from "react";
import CategoryComp from "./category";

export default function Finance() {
    const [tab, setTab] = useState("1");
    const handelChange = (e, v) =>{
        setTab(v)
    }
    
    return (<>
        <Box>
            <TabContext value={tab}> 
                <Box>
                    <TabList onChange={(e, v) => {handelChange(e, v)}}>
                        <Tab label="Expense" value="1"></Tab>
                        <Tab label="Category" value="2"></Tab>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Expense></Expense>
                </TabPanel>
                <TabPanel value="2">
                    <CategoryComp></CategoryComp>
                </TabPanel>
            </TabContext>
        </Box>
    </>)
}