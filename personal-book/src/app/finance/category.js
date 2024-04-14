"use client";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./finance.css";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { dateOnly } from '../tokenHandle/dateOnly';
import dayjs from "dayjs";
import { getCatSummary } from '@/services/expenseService';
import { Category, Icons } from "../tokenHandle/objects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from '@mui/x-charts/PieChart';

export default function CategoryComp() {
    const [fromDate, setFormDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [data, setData] = useState([]);
    const [catdata, setCatdata] = useState([]);
    const categories = Category;
    const icons = Icons;
   
      

    useEffect(() => {getData()}, [fromDate, toDate])
    const getData = async () =>{
        let fd = null;
        let td = null;
        if (fromDate) {
            fd = dateOnly(fromDate);
        }
        if (toDate) {
            td = dateOnly(toDate);
        }
        const filter = {
            fromDate : fd,
            toDate : td 
        }
        const catdata =  await getCatSummary(filter);
        let cd = [];
        for (let index = 0; index < catdata.length; index++) {
            const element = catdata[index];
            let d = {id : index, value : element.total, label : categories[element.category].name}
            cd.push(d);
        }
        setData(catdata)
        setCatdata(cd);
    }

    return (<>
    <div className='categ'>
        <div className="chart">
            <h1>Category</h1>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={(e) => {setFormDate(dayjs(e).toISOString())}} className="date"  label="From Date"></DatePicker>
                    <DatePicker onChange={(e) => {setToDate(dayjs(e).toISOString())}}  className="date" label="To Date" ></DatePicker>
                </DemoContainer>
            </LocalizationProvider>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell> Category </TableCell>
                        <TableCell> Total </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(x => (<TableRow>
                            <TableCell>  <FontAwesomeIcon icon={icons[x.category - 1]}></FontAwesomeIcon> </TableCell>
                            <TableCell> {categories[x.category].name } </TableCell>
                            <TableCell> {x.total} </TableCell>
                        </TableRow>))
                    }
                </TableBody>
            </Table>
        </div>
        <div className="pi-chart">
        <PieChart
  series={[
    {
      data: catdata
    },
  ]}
  width={400}
  height={200}
/>
        </div>
    </div>
    
    
    </>)
}