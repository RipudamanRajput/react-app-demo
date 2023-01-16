import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import './Style.css';
import { Stack, Tag } from "@shopify/polaris";

function MultiSelect() {

    // interfaces props
    const [dropdownMaxItems, setdropdownMaxItems] = useState(10);
    const [searchFromStart, setsearchFromStart] = useState(true);
    const [searchHighlight, setsearchHighlight] = useState(true);
    const [Multiselect, setMultiselect] = useState(true);

    // States 
    const [options, setoptions] = useState();
    const [popheight, setpopheight] = useState()
    const [searchtext, setsearchtext] = useState();
    const [searchitem, setsearchitem] = useState();
    const [selectedarray, setselectedarray] = useState([]);

    // refs
    const list = useRef(null);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/dragonofmercy/Tokenize2/master/demo/names.json').then((res) => {
            setoptions(res.data)
        })
    }, [])

    // -------- Seach functionality
    useEffect(() => {
        const containsKeyword = (val) => typeof val == "string" && val.indexOf(searchtext) !== -1;
        const startSearch = (val) => typeof val == 'string' && val.startsWith(searchtext) == true;
        const search = searchFromStart ? startSearch : containsKeyword;
        let filtered = options?.filter(entry => Object.keys(entry).map(key => key !== "value" && entry[key]).some(search));
        searchtext ? setsearchitem(filtered) : setsearchitem(options);
    }, [searchtext])

    function highlight(text) {
        var inputText = document.getElementsByClassName("popup_id");
        Array.from(inputText).forEach(element => {
            var innerHTML = element?.textContent;
            var index = innerHTML?.indexOf(text);
            if (index >= 0) {
                innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
                element.innerHTML = innerHTML;
            }
        });
    }

    // Avoid duplicacy while inserting in object and single and multiple select functionlaity 
    const selecteditem = (data, value) => {
        let newItem = selectedarray.find((cun) => cun.text === data);
        let newcun;

        if (newItem) {
            newcun = selectedarray?.map((element) =>
                element.text === data
                    ? { ...newItem } :
                    { text: element.text, value: element.value }
            );
        } else {
            newcun = [...selectedarray, { text: data, value: value }];
        }
        setselectedarray(newcun);
    }

    const selectsingleitem = (data, value) => {
        setselectedarray([{ text: data, value: value }]);
    }

    useEffect(() => {
        if (!Multiselect && selectedarray.length > 0) {
            setsearchitem(false);
        }
    }, [selectedarray])

    // Delete item from selected array
    const deleteitem = (item, index) => {
        if (item) {
            const arr = selectedarray.filter(element => {
                if (element !== item) {
                    delete selectedarray[index]
                    return (element)
                }
            })
            setselectedarray(arr);
        }
        if (selectedarray.length <= 1) {
            setsearchitem(false);
        }
    }

    // ------- Heaight functionality
    useEffect(() => {
        setTimeout(() => {
            setpopheight(list.current?.offsetHeight)
        }, 100);
    }, [list])

    return (
        <>
            <div className="search-field">
                <Stack alignment="center">
                    {selectedarray?.map((item, index) => {
                        return (
                            <>
                                <Tag key={index} onRemove={() => deleteitem(item, index)}>{item?.text}</Tag>
                            </>
                        )
                    })}

                    <input
                        type={"text"}
                        placeholder="Search"
                        onChange={(e) => {
                            setsearchtext(e.target.value)
                            searchHighlight && setTimeout(() => highlight(e.target.value), 300)
                        }} />
                </Stack>
            </div>

            {(searchitem) &&
                <div className="popover" style={
                    {
                        maxHeight: `${popheight * dropdownMaxItems}px`,
                        display: `${searchtext ? "block" : "none"}`
                    }}>
                    <ul >
                        {searchitem?.length > 0 ?
                            searchitem?.map((item, index) => {
                                return (
                                    <li
                                        style={{ cursor: "pointer" }}
                                        key={index}
                                        ref={list}
                                        onClick={() => { Multiselect ? selecteditem(item.text, item.value) : selectsingleitem(item.text, item.value) }}
                                        className="popup_id">
                                        {item.text}
                                    </li>
                                )
                            }) :
                            <strong>No data Available </strong>
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default MultiSelect