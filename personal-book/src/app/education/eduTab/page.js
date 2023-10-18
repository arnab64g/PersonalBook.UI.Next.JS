"use client";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GradeList from '../grade/list/page';
import "./style.css"
export default function EducationTab() {
    return(
        <div>
            <Tabs className='tabs'>
                <TabList>
                    <Tab>Secondary</Tab>
                    <Tab>Graduation</Tab>
                    <Tab>Grade</Tab>
                </TabList>

                <TabPanel>
                    
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

                        </TabPanel>
                        <TabPanel>

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