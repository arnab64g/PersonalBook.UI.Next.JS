"use client";

import './style.css';
import GradeList from '../grade/list/page';
import SemesterList from '../graduation/semester/list/page';
import Courses from '../graduation/courses/courses';
import SecondaryResult from '../secondary/secondary';
import Result from '../graduation/result/result';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';

export default function EducationTab() {
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(1);
    const handelChange = (event, value) => {
        setValue1(value)
    }
    const handelChange2 = (event, value) => {
        setValue2(value)
    }
    return(
        <Box>
            <TabContext value={value1}>
                <Box>
                    <TabList onChange={(e, v) => {handelChange(e, v)}}>
                        <Tab  label="Secondary" value={1}></Tab>
                        <Tab color='primary' label="graduation" value={2}></Tab>
                        <Tab label="Grade" value={3}></Tab>
                    </TabList>                
                </Box>
                <TabPanel value={1}>
                    <SecondaryResult></SecondaryResult>
                </TabPanel>
                <TabPanel value={2}>
                    <Box>
                        <TabContext value={value2}>
                            <Box>
                                <TabList onChange={(e, v) => {handelChange2(e, v)}}>
                                    <Tab label='Result' value={1}></Tab>
                                    <Tab label="Course" value={2}></Tab>
                                    <Tab label="Semester" value={3}></Tab>
                                </TabList>
                            </Box>
                            <TabPanel value={1}>
                                <Result></Result>
                            </TabPanel>
                            <TabPanel value={2}>
                                <Courses></Courses>
                            </TabPanel>
                            <TabPanel value={3}>
                                <SemesterList></SemesterList>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </TabPanel>
                <TabPanel value={3}>
                    <GradeList></GradeList>
                </TabPanel>
            </TabContext>
        </Box>
        
        
    );
}