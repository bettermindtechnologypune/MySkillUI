import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import Header from './Header';
let li: [];
export const UpdateLevelOne = (props: { history: string[]; title: string; state: string; }) => {
    const [product, setProduct] = useState<any>();
    const [products, setProductData] = useState<any>();
    const [cou, setCount] = useState<any>(0);
    useEffect(() => {
        (async () => {
            var products1 = await getProducts();
        })()

    }, [])

    const getProducts = () => {
        const requestHeaders: HeadersInit = new Headers();
        let token;
        token = localStorage.getItem('token');
        requestHeaders.set('Authorization', token || "");
        requestHeaders.set('Content-Type', 'application/json');
        let buid = localStorage.getItem('buid');
        let httpGetObject = {
            method: 'GET',
            headers: requestHeaders
        }
        fetch('https://localhost:44369/api/LevelOne/' + buid, httpGetObject)
            .then(response => response.json())
            .then(data => {
                if (data.status == 404) {
                    console.log("Data Not Found");
                    var olddata = document.getElementById("searchProducts");
                    while (olddata?.firstChild) {
                        olddata?.removeChild(olddata.firstChild);
                    }
                } else if (data.status == 400) {
                    console.log("No data Found")
                }
                else if (data != undefined) {
                    setProductData(data)
                    li = data;
                    var sel = document.getElementById('searchProducts');
                    while (sel?.firstChild) {
                        sel?.removeChild(sel.firstChild);
                    }
                    var opt = null; let brek = null; var label1; let count = 0;
                    for (let i = 0; i < data.length; i++) {
                        brek = document.createElement("br");
                        label1 = document.createElement("LABEL");
                        label1.innerHTML = "Product Name :  ";
                        opt = document.createElement('input');
                        opt.className = "form-control";
                        opt.id = data[i].id;
                        opt.value = data[i].name;
                        opt.innerHTML = data[i].name;
                        count == 0 ? (sel == null ? document.getElementById('searchProducts') : sel.appendChild(label1)) : count++;
                        sel == null ? document.getElementById('searchProducts') : sel.appendChild(opt);
                        sel == null ? document.getElementById('searchProducts') : sel.addEventListener("change", updateValue);
                        sel == null ? document.getElementById('searchProducts') : sel.appendChild(brek);
                        count++;
                    }
                    return data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    function updateValue(e: { target: { value: any; id: any }; }) {
        var arrray1 = li; let checkBol = true
        for (let userObject of arrray1) {
            console.log(userObject);
            if (userObject.id == e.target.id) {
                let index = arrray1.indexOf(userObject);
                li?.splice(index, 1);
                userObject.name = parseInt(e.target.value);
                li?.push(userObject);
                checkBol = false;
            }
        }
        if (checkBol) {
            let obj = {
                id: e.target.id != "" ? e.target.id : undefined,
                name: e.target.value,
                buid: localStorage.getItem('buid')
            }
            li.push(obj);
        }
    }

    const submitBack = (e: { preventDefault: () => void; }) => {
        props.history.push("/HrAdminHomePage");
    }
    const submit = (e: { preventDefault: () => void; }) => {
        console.log("Started");
        e.preventDefault();
        {
            const arr = [];
            if (li != undefined) {
                for (let i = 0; i < li.length; i++) {
                    var obj = {
                        id: li[i].id,
                        buid: li[i].buid,
                        name: li[i].name,
                        isLastLevel: false
                    }
                    arr.push(obj)
                }
            }
            fetch('https://localhost:44369/api/LevelOne/Update', {
                method: 'PATCH',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arr),
            })
                .then(response => {
                    if (response.status == 200)
                        return response.json()
                    else {
                        console.log(response)
                        throw new Error("Unauthorized")
                    }
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            alert("Products Updated Successfully");
            props.history.push("./HrAdminHomePage");
        }
    }
    const addFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        var sel = document.getElementById('searchProducts');
        var opt = null; var opt1 = null; var lineB = null; let brek = null; var label1; var label2; let count = 0;
        lineB = document.createElement("br");
        opt = document.createElement('input');
        opt.className = "form-control";
        sel == null ? document.getElementById('searchProducts') : sel.appendChild(opt);
        sel == null ? document.getElementById('searchProducts') : sel.appendChild(lineB);
        setCount(cou + 1);
    }
    const clearFields = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var sel = document.getElementById('searchProducts');
        if (cou > 0) {
            for (let i = 0; i < 2; i++) {
                sel?.removeChild(sel.lastElementChild);
                setCount(cou - 1);
            }
        }
    }
    return (
        <div>
            <View>
                <View >
                    <Header />
                </View>
            </View>
            <div className="text-center col-6 mx-auto">
                <h3>Edit Products !!</h3><br /><br />
                <form onSubmit={submit}>
                    <div className="col-sm-12">
                        <div className="row">
                            {products &&
                                <div id="searchProducts" className=" text-center col-6 mx-auto form-group">
                                    <br />
                                </div>
                            }
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" onClick={addFields} >Add</button>&nbsp; &nbsp;
                        <button type="submit" className="btn btn-primary" onClick={clearFields}>Clear</button>&nbsp; &nbsp;
                        <button type="submit" className="btn btn-primary" >Submit</button>&nbsp; &nbsp;
                        <button button-type='submit' className="btn btn-primary" onClick={submitBack}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default UpdateLevelOne;
UpdateLevelOne.defaultProps = {
    title: "Skill Base",
    searchBar: true
}


