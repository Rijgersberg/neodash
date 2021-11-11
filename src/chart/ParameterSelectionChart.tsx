
import React, { useCallback, useEffect } from 'react';
import { ChartProps } from './Chart';
import { debounce, TextareaAutosize, TextField } from '@material-ui/core';
import { QueryStatus, runCypherQuery } from "../report/CypherQueryRunner";
import NeoFieldSelection from '../component/FieldSelection';
import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Renders Neo4j records as their JSON representation.
 */
const NeoParameterSelectionChart = (props: ChartProps) => {
    try{
        useEffect(() => {
            debouncedQueryCallback && debouncedQueryCallback(query, { input: inputText }, setExtraRecords);
        }, [props.records, inputText]);    
    }catch(e){
        console.log(e);
    }

    
    const [extraRecords, setExtraRecords] = React.useState([]);
    const [inputText, setInputText] = React.useState("");
    const [value, setValue] = React.useState("");
    const debouncedQueryCallback = useCallback(
        debounce(props.queryCallback, 250),
        [],
    );

    
    const records = props.records;
    const query = records[0]["input"];
 
    if (!query) {
        return <div>No selection specified, refresh this report.</div>
    }
   
    const parameter = query.split("\n")[0].split("$")[1];
    const label = query.split("`")[1];
    const property = query.split("`")[3];


    return <div>
        <Autocomplete
            id="autocomplete"
            options={extraRecords.map(r => r["_fields"] && r["_fields"][0] !== null ? r["_fields"][0] : "(no data)")}
            getOptionLabel={(option) => option}
            style={{ width: 300, marginLeft: "15px", marginTop: "5px" }}
            inputValue={inputText}
            onInputChange={(event, value) => {
                setInputText(value);
                debouncedQueryCallback(value);
            }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                props.setGlobalParameter(parameter, newValue);
            }}
            renderInput={(params) => <TextField {...params} label={label + " " + property} variant="outlined" />}
        />

    </div>
}

export default NeoParameterSelectionChart;