"use client";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GradeList from '../grade/list/page';
import SemesterList from '../graduation/semester/list/page'
import { Courses } from '../graduation/courses/courses';
import SecondaryResult from '../secondary/secondary';

export default function EducationTab() {
    return(
        <div className='tabs'>
            <Tabs className='tabs'>
                <TabList>
                    <Tab>Secondary</Tab>
                    <Tab>Graduation</Tab>
                    <Tab>Grade</Tab>
                </TabList>

                <TabPanel>
                    <SecondaryResult></SecondaryResult>
                </TabPanel>
                <TabPanel>
                    <Tabs>
                        <TabList>
                            <Tab> Result </Tab>
                            <Tab> Course </Tab>
                            <Tab> Semester </Tab>
                        </TabList>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>
                            <Courses></Courses>
                        </TabPanel>
                        <TabPanel>
                            <SemesterList></SemesterList>
                        </TabPanel>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                    <GradeList></GradeList>
                </TabPanel>
            </Tabs>
        </div>
    );
}